import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTemplatesInput
  extends Pick<Prisma.TemplateFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTemplatesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: templates,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.template.count({ where }),
      query: (paginateArgs) => db.template.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      templates,
      nextPage,
      hasMore,
      count,
    }
  }
)
