import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetAudit = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetAudit), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const audit = await db.audit.findFirst({
    where: { id },
    include: {
      auditType: {
        include: {
          auditSection: {
            orderBy: {
              number: "asc",
            },
            include: {
              auditActions: {
                orderBy: {
                  position: "asc",
                },
              },
            },
          },
        },
      },
    },
  })

  if (!audit) throw new NotFoundError()

  return audit
})
