import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetRegion = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetRegion), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const region = await db.region.findFirst({ where: { id } })

  if (!region) throw new NotFoundError()

  return region
})
