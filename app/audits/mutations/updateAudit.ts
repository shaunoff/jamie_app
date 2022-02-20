import { resolver } from "blitz"
import db, { AuditAssessment } from "db"
import { z } from "zod"
import { AuditFormSchema } from "../validations"

const UpdateAudit = z.object({
  id: z.number(),
  monthId: z.number(),
  comment: z.string().optional(),
  locationId: z.number(),
  dateId: z.number(),
  auditTypeId: z.number(),
  auditAssessments: z.object({
    create: z.array(
      z.object({
        id: z.number(),
        assessment: z.number().optional(),
        comment: z.string().nullable().optional(),
        sectionId: z.number(),
        locationId: z.number(),
        actionId: z.number(),
        auditTypeId: z.number(),
      })
    ),
  }),
})

type AssessmentData = Omit<AuditAssessment, "createdAt" | "updatedAt" | "auditId">

export default resolver.pipe(resolver.zod(AuditFormSchema), resolver.authorize(), async (input) => {
  const { auditType, locationId, monthId } = input

  const assessments: AssessmentData[] = []

  auditType.auditSection.forEach((section) => {
    const sectionId = section.id
    section.auditActions.forEach((action) => {
      const assessment: AssessmentData = {
        id: action.assessmentId!,
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
  const data = {
    auditTypeId: auditType.id,
    locationId: locationId,
    dateId: monthId,
    // auditAssessments: {
    //   create: assessments,
    // },
  }
  assessments.forEach(async (assessment) => {
    console.log(assessment)
    const test = await db.auditAssessment.update({ where: { id: assessment.id }, data: assessment })
  })

  return data
})
