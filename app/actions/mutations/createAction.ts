import { resolver } from "blitz"
import db from "db"
import { z, ZodString } from "zod"

const CreateAction = z.object({
  name: z.string(),
  number: z.number(),
  auditSectionId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateAction), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const action = await db.auditAction.create({ data: input })

  return action
})
