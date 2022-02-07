import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateAuditActions = z.array(
  z.object({
    id: z.number(),
    position: z.number(),
  })
)

export default resolver.pipe(
  resolver.zod(UpdateAuditActions),
  resolver.authorize(),
  async (data) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    //const auditType = await db.auditType.updateMany({ data })
    data.forEach(async ({ id, ...data }) => await db.auditAction.update({ where: { id }, data }))
  }
)
