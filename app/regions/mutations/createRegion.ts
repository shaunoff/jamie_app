import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateRegion = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateRegion), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const region = await db.region.create({ data: input })

  return region
})
