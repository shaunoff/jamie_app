import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateAuditTypes = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    position: z.number(),
    auditSection: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        number: z.number(),
        auditActions: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            position: z.number(),
          })
        ),
      })
    ),
  })
)

export default resolver.pipe(resolver.zod(UpdateAuditTypes), resolver.authorize(), async (data) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  //const auditType = await db.auditType.updateMany({ data })
  data.forEach(async ({ id, auditSection, ...data }) => {
    await db.auditType.update({
      where: {
        id,
      },
      data,
    })
    auditSection.forEach(async ({ id, auditActions, ...data }) => {
      await db.auditSection.update({
        where: {
          id,
        },
        data,
      })
      auditActions.forEach(async ({ id, ...data }) => {
        await db.auditAction.update({
          where: {
            id,
          },
          data,
        })
      })
    })
  })
})
