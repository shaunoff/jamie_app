import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

import { UpdateLocation } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateLocation),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.update({ where: { id }, data })

    return location
  }
)
