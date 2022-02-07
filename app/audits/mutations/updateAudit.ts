import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateAudit = z.object({
  id: z.number(),
  text: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateAudit),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const audit = await db.audit.update({ where: { id }, data })

    return audit
  }
)