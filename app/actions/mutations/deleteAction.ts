import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteAction = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteAction), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const action = await db.action.deleteMany({ where: { id } })

  return action
})
