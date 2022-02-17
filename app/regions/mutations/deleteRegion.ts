import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteRegion = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteRegion), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const region = await db.region.deleteMany({ where: { id } })

  return region
})
