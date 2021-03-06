import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTemplate = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTemplate), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const template = await db.template.findFirst({ where: { id } })

  if (!template) throw new NotFoundError()

  return template
})
