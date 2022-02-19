import { resolver } from "blitz"
import db, { AuditAssessment } from "db"
import { z } from "zod"
import { AuditFormSchema } from "../validations"

const CreateAudit = z.object({
  comment: z.string().optional(),
  locationId: z.number(),
  dateId: z.number(),
  auditTypeId: z.number(),
  auditAssessments: z.object({
    create: z.array(
      z.object({
        assessment: z.number(),
        comment: z.string().nullable(),
        sectionId: z.number(),
        locationId: z.number(),
        actionId: z.number(),
        auditTypeId: z.number(),
      })
    ),
  }),
})

type AssessmentData = Omit<AuditAssessment, "id" | "createdAt" | "updatedAt" | "auditId">

export default resolver.pipe(
  resolver.zod(AuditFormSchema),
  resolver.authorize(),

  async (input) => {
    const { auditType, locationId, monthId } = input

    const assessments: AssessmentData[] = []

    auditType.auditSection.forEach((section) => {
      const sectionId = section.id
      section.auditActions.forEach((action) => {
        const assessment: AssessmentData = {
          assessment: action.assessment,
          comment: action.comment ?? null,
          sectionId,
          locationId: locationId,
          actionId: action.id,
          auditTypeId: auditType.id,
          monthId,
        }
        assessments.push(assessment)
      })
    })
    //TODO validate and throw error if fail validation
    const data: z.infer<typeof CreateAudit> = {
      auditTypeId: auditType.id,
      locationId: locationId,
      dateId: monthId,
      auditAssessments: {
        create: assessments,
      },
    }

    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const auditCreated = await db.audit.create({ data })

    return auditCreated
  }
)
