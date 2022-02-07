import React, { useState, useEffect } from "react"
import db, { Location, AuditType, AuditSection, AuditAction } from "db"
import { AuditTypes } from "./AuditTypesAdmin"
import ActionItemList from "./ActionItemList"
import CreateActionItem from "./CreateActionItem"

type AuditSectionNested = (AuditSection & {
  auditActions: AuditAction[]
})[]

interface AuditSectionListProps {
  auditSection: AuditSectionNested
  auditTypes: AuditTypes
  updateAuditTypes: (AuditTypes: AuditTypes) => void
  auditTypeId: number
}

const AuditSectionList: React.FC<AuditSectionListProps> = ({
  updateAuditTypes,
  auditTypes,
  auditSection,
  auditTypeId,
}) => {
  return (
    <div>
      <ul>
        {auditSection.map((section) => (
          <li key={section.id}>
            {section.number !== -1 && (
              <div className="flex p-4">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-400 mr-4">
                  <span className="text-sm font-bold leading-none text-white">
                    {section.number}
                  </span>
                </span>
                <h3 className="text-lg leading-6 font-medium text-gray-900">{section.name}</h3>
              </div>
            )}
            <ActionItemList
              auditTypeId={auditTypeId}
              sectionId={section.id}
              auditTypes={auditTypes}
              updateAuditTypes={updateAuditTypes}
            />
            <CreateActionItem
              auditTypeId={auditTypeId}
              sectionId={section.id}
              auditTypes={auditTypes}
              updateAuditTypes={updateAuditTypes}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AuditSectionList
