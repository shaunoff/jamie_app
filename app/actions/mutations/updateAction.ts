import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateAction = z.object({
  id: z.number(),
  title: z.string(),
  number: z.number(),
  auditSectionId: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateAction),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const action = await db.auditAction.update({ where: { id }, data })

    return action
  }
)
