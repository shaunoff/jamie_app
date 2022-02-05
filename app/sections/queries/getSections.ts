import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetAuditSectionsInput
  extends Pick<Prisma.AuditSectionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetAuditSectionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: sections,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.auditSection.count({ where }),
      query: (paginateArgs) =>
        db.auditSection.findMany({
          ...paginateArgs,
          where,
          include: {
            auditActions: true,
          },
          orderBy,
        }),
    })

    return {
      sections,
      nextPage,
      hasMore,
      count,
    }
  }
)
