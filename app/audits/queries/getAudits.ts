import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetAuditsInput
  extends Pick<Prisma.AuditFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, include }: GetAuditsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const audits = await db.audit.findMany({ where, orderBy, include })

    const uniqueDates = new Set<number>()
    audits.forEach((audit) => uniqueDates.add(audit.dateId))

    const dateIds = Array.from(uniqueDates)
    const whereQuery = dateIds.map((id) => ({
      id: {
        equals: id,
      },
    }))
    const dates = await db.day.findMany({
      where: {
        OR: whereQuery,
      },
    })

    return {
      audits,
      dates,
    }
  }
)
