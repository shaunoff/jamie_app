import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTemplate = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateTemplate),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const template = await db.template.update({ where: { id }, data })

    return template
  }
)
