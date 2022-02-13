import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateAudit = z.object({
  text: z.string(),
  locationId: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateAudit),
  resolver.authorize(),
  //TODO: chnage typing
  async (input: any) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const audit = await db.audit.create({ data: input })

    return audit
  }
)
