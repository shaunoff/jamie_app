import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const CreateSection = z.object({
  name: z.string(),
  number: z.number(),
  auditTypeId: z.number(),
  auditActions: z.array(z.object({ name: z.string(), number: z.number() })),
})

export default resolver.pipe(resolver.zod(CreateSection), resolver.authorize(), async (input) => {
  const section = await db.auditSection.create({ data: input })

  return section
})
