import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetAuditsInput
  extends Pick<Prisma.AuditFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100, include }: GetAuditsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: audits,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.audit.count({ where }),
      query: (paginateArgs) => db.audit.findMany({ ...paginateArgs, where, orderBy, include }),
    })

    return {
      audits,
      nextPage,
      hasMore,
      count,
    }
  }
)
