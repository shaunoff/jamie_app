import { PromiseReturnType } from "next/types/utils"
import { hash256 } from "blitz"
import db from "db"
import Chance from "chance"

const chance = new Chance()

const ctx = {
  session: { $create: () => {} },
}

type TokenAttributes = {
  email: string
  type: "future" | "past"
  token: string
}

export const resetToken = async ({ email, type, token }: TokenAttributes) => {
  const date = new Date()
  if (type === "future") {
    date.setHours(date.getHours() + 4)
  } else {
    date.setHours(date.getHours() - 4)
  }

  await db.user.create({
    data: {
      email: email,
      tokens: {
        // Create old token to ensure it's deleted
        create: {
          type: "RESET_PASSWORD",
          hashedToken: hash256(token),
          expiresAt: date,
          sentTo: email,
        },
      },
    },
    include: { tokens: true },
  })

  return token
  // // 1. Get the user
  // const user = await db.user.findFirst({ where: { email } })

  // // 2. Generate the token and expiration date.
  // const token = generateToken()
  // const hashedToken = hash256(token)
  // const expiresAt = new Date()
  // expiresAt.setHours(expiresAt.getHours() + 4)

  // if (user) {
  //   // 3. Delete any existing password reset tokens
  //   await db.token.deleteMany({ where: { type: "RESET_PASSWORD", userId: user.id } })
  //   // 4. Save this new token in the database.
  //   const newToken = await db.token.create({
  //     data: {
  //       user: { connect: { id: user.id } },
  //       type: "RESET_PASSWORD",
  //       expiresAt,
  //       hashedToken,
  //       sentTo: user.email,
  //     },
  //   })
  // }
  // return token
}

export type ResetToken = PromiseReturnType<typeof resetToken>
