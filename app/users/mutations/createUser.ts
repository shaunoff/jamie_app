import { resolver, SecurePassword } from "blitz"
import db from "db"
import { z } from "zod"

const CreateUser = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateUser),
  resolver.authorize(),
  async ({ password, name, email }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({ data: { name, email, hashedPassword, role: "USER" } })

    return user
  }
)
