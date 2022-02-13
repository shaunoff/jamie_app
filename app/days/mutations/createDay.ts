import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateDay = z.object({
  year: z.number(),
})

//TODO add types to validation
export default resolver.pipe(resolver.zod(CreateDay), resolver.authorize(), async (input: any) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const day = await db.day.create({ data: input })

  return day
})
