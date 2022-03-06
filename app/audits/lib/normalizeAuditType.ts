import { Audit, AuditAction, AuditType, AuditSection, Day, AuditAssessment, Location } from "db"
import produce from "immer"

const normalizeAuditType = (originalData: any) => {
  const data = originalData as Audit & {
    month: { value: number; label: string }
    monthId?: number
    auditType: AuditType & {
      auditSection: (AuditSection & {
        auditActions: (AuditAction & {
          comment?: string | null
          assessment?: number
          assessmentId?: number
          auditAssessments: AuditAssessment[]
        })[]
      })[]
    }
    date: Day
    location: Location
  }
  const nextStore = produce(data, (draft) => {
    draft.month = {
      value: draft.date.id,
      label: `${draft.date.monthName}, ${draft.date.year}`,
    }
    draft.monthId = draft.date.id
    draft.auditType.auditSection.forEach((auditSection) => {
      auditSection.auditActions.forEach((auditAction) => {
        const test = auditAction.auditAssessments[0]
        auditAction.comment = test?.comment
        auditAction.assessment = test?.assessment
        auditAction.assessmentId = test?.id
      })
    })
  })
  return nextStore
}

export default normalizeAuditType
