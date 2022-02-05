import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteAuditType = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteAuditType),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const auditType = await db.auditType.deleteMany({ where: { id } })

    return auditType
  }
)
