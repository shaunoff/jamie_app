import React, { useState, memo } from "react"
import { useMutation, useQuery } from "blitz"
import { AuditType, AuditSection, AuditAction } from "db"
import updateAuditTypes from "app/audit-types/mutations/updateAuditTypes"
import getAuditTypes from "app/audit-types/queries/getAuditTypes"
import AuditTypesList from "./AuditTypesList"

export type AuditTypes = (AuditType & {
  auditSection: (AuditSection & {
    auditActions: AuditAction[]
  })[]
})[]

const AuditTypesAdmin = () => {
  // Get the nested auditTypes object at the root of the tree
  const [{ auditTypes: originalAuditTypes }] = useQuery(getAuditTypes, {})
  const [updateAuditTypesMutation] = useMutation(updateAuditTypes, {
    onSuccess: () => {
      console.info("Successful Update")
    },
  })

  const [auditTypes, setAuditTypes] = useState<AuditTypes>(originalAuditTypes)

  const optimisticUpdate = (data: AuditTypes) => {
    setAuditTypes(data)
    updateAuditTypesMutation(data)
  }

  return <AuditTypesList updateAuditTypes={optimisticUpdate} auditTypes={auditTypes} />
}

export default memo(AuditTypesAdmin)
