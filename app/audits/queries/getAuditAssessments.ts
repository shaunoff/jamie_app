import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetAuditsInput
  extends Pick<Prisma.AuditFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, include }: GetAuditsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const auditAssessments = await db.auditAssessment.findMany({ where, orderBy, include })

    return {
      auditAssessments,
    }
  }
)
