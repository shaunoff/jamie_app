import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetAction = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetAction), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const action = await db.auditAction.findFirst({ where: { id } })

  if (!action) throw new NotFoundError()

  return action
})
