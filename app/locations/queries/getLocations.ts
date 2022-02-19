import { paginate, resolver } from "blitz"
import db, { Prisma, Location, AuditAssessment, Region } from "db"

interface GetLocationsInput
  extends Pick<Prisma.LocationFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100, include }: GetLocationsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: locations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.location.count({ where }),
      query: (paginateArgs) =>
        db.location.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include,
        }),
    })

    return {
      locations: locations as (Location & {
        region: Region | null
        auditAssessments: AuditAssessment[]
      })[],
      nextPage,
      hasMore,
      count,
    }
  }
)
