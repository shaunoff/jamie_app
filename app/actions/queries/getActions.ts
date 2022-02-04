import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetActionsInput
  extends Pick<Prisma.ActionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetActionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: actions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.action.count({ where }),
      query: (paginateArgs) => db.action.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      actions,
      nextPage,
      hasMore,
      count,
    }
  }
)
