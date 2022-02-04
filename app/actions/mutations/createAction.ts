import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateAction = z.object({
  title: z.string(),
})

export default resolver.pipe(resolver.zod(CreateAction), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const action = await db.action.create({ data: input })

  return action
})
