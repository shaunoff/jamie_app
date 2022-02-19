import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetAuditTypesInput
  extends Pick<Prisma.AuditTypeFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetAuditTypesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: auditTypes,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.auditType.count({ where }),
      query: (paginateArgs) =>
        db.auditType.findMany({
          ...paginateArgs,
          where,
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
          orderBy: {
            position: "asc",
          },
        }),
    })

    return {
      auditTypes,
      nextPage,
      hasMore,
      count,
    }
  }
)
