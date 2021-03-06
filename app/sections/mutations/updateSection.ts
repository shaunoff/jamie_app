import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateSection = z.object({
  id: z.number(),
  name: z.string(),
  number: z.number(),
  actions: z.array(z.object({ title: z.string() })),
})

export default resolver.pipe(
  resolver.zod(UpdateSection),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const section = await db.auditSection.update({ where: { id }, data })

    return section
  }
)
