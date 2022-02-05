import React, { useState, useEffect } from "react"
import { useRouter, Routes } from "blitz"
import db, { Location, AuditType, AuditSection, AuditAction } from "db"
import { ChevronRightIcon, PencilAltIcon } from "@heroicons/react/outline"
import StackedList from "app/shared/components/StackedList"

interface AuditTypesTableProps {
  auditTypes: (AuditType & {
    auditSection: (AuditSection & {
      auditActions: AuditAction[]
    })[]
  })[]
}

const headCells = ["Name", "Location", "POC", "Contact"]

const AuditTypesAdmin: React.FC<AuditTypesTableProps> = ({ auditTypes }) => {
  console.log(auditTypes)
  const arr = auditTypes.map((type) => ({
    name: type.name,
    description: type.description,
    renderPanel: () => <ActionItemList sections={type.auditSection} />,
  }))

  return <StackedList list={arr} />
}

export default AuditTypesAdmin

interface TestyProps {
  sections: (AuditSection & {
    auditActions: AuditAction[]
  })[]
}

const ActionItemList: React.FC<TestyProps> = ({ sections }) => {
  return (
    <ul>
      {sections.map((section) => (
        <li key={section.id}>
          {section.number !== -1 && (
            <div className="flex p-4">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-400 mr-4">
                <span className="text-sm font-bold leading-none text-white">{section.number}</span>
              </span>
              <h3 className="text-lg leading-6 font-medium text-gray-900">{section.name}</h3>
            </div>
          )}

          <ul role="list" className="divide-y divide-gray-200">
            {section.auditActions.map((application, i) => (
              <li key={i}>
                <div className="flex items-center px-2 py-4 sm:px-6">
                  <div className="mr-4 flex justify-center flex-shrink-0">
                    <p className="px-2.5 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800">{`${
                      section.number !== -1 ? `${section.number} .` : ""
                    } ${application.number}`}</p>
                  </div>

                  <p className="text-sm text-gray-500">
                    <span>{application.name}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
