import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateDay = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateDay), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const day = await db.day.create({ data: input })

  return day
})
