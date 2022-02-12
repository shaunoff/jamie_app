import { AuditType, AuditSection, AuditAction } from "db"

export type NestedAuditType = AuditType & {
  auditSection: (AuditSection & {
    auditActions: AuditAction[]
  })[]
}

import { AuditTypes } from "../components/AuditTypesAdmin"

const normalizeAuditData = (auditTypes: AuditTypes) => {
  return auditTypes.map((auditType) => {
    let count = 0
    const { auditSection } = auditType
    auditSection.forEach((section) => (count += section.auditActions.length))
    return { name: auditType.name, count }
  })
}

export default normalizeAuditData
