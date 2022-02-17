import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRegionsInput
  extends Pick<Prisma.RegionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetRegionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: regions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.region.count({ where }),
      query: (paginateArgs) => db.region.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      regions,
      nextPage,
      hasMore,
      count,
    }
  }
)
