import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateAuditType = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateAuditType), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const auditType = await db.auditType.create({ data: input })

  return auditType
})
