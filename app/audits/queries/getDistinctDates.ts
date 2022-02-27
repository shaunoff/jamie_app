import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

export default resolver.pipe(resolver.authorize(), async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const audits = await db.audit.findMany({
    distinct: ["dateId"],
    include: {
      date: true,
    },
  })

  return {
    dates: audits.map((audit) => audit.date),
  }
})
