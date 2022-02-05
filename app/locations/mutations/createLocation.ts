import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { CreateLocation } from "app/locations/validations"

export default resolver.pipe(resolver.zod(CreateLocation), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const location = await db.location.create({ data: input })

  return location
})
