import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteAudit = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteAudit), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const audit = await db.audit.deleteMany({ where: { id } })

  return audit
})
