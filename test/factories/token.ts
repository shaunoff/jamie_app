import { PromiseReturnType } from "next/types/utils"
import signup from "app/auth/mutations/signup"
import Chance from "chance"
import { generateToken, hash256 } from "blitz"
import db from "db"

const chance = new Chance()

const ctx = {
  session: { $create: () => {} },
}

type TokenAttributes = {
  email?: string
  password: string
  name?: string
}

export const resetToken = async ({
  email = chance.email(),
  password,
  name = chance.string(),
}: TokenAttributes) => {
  await signup({ email, password, name }, ctx as any)

  // const token = await db.token.create({
  //   data: {
  //     user: { connect: { id: user.id } },
  //     type: "RESET_PASSWORD",
  //     expiresAt,
  //     hashedToken,
  //     sentTo: email,
  //   },
  // })

  // return { user, token }

  const user = await db.user.findFirst({ where: { email } })

  // 2. Generate the token and expiration date.
  const tokenGen = generateToken()
  const hashedToken = hash256(tokenGen)
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + 4)

  // 3. If user with this email was found

  // 4. Delete any existing password reset tokens
  await db.token.deleteMany({ where: { type: "RESET_PASSWORD", userId: user?.id } })
  // 5. Save this new token in the database.
  const token = await db.token.create({
    data: {
      user: { connect: { id: user?.id } },
      type: "RESET_PASSWORD",
      expiresAt,
      hashedToken,
      sentTo: user?.email || "",
    },
  })

  return { user, token }
}

export type UserResetToken = PromiseReturnType<typeof resetToken>
