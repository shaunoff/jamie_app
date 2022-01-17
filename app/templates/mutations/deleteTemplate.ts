import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTemplate = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteTemplate), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const template = await db.template.deleteMany({ where: { id } })

  return template
})
