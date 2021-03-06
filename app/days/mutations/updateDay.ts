import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateDay = z.object({
  id: z.number(),
  name: z.string(),
})
//TODO: update validation
export default resolver.pipe(
  resolver.zod(UpdateDay),
  resolver.authorize(),
  async ({ id, ...data }: any) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const day = await db.day.update({ where: { id }, data })

    return day
  }
)
