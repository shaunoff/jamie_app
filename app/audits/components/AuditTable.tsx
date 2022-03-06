import React, { useState, useEffect } from "react"
import { useRouter, Routes } from "blitz"
import db, { Audit, AuditType, Location, Day, AuditAssessment } from "db"
import {
  EmojiHappyIcon,
  EmojiSadIcon,
  ExclamationCircleIcon,
  EyeIcon,
  PencilAltIcon,
  PrinterIcon,
} from "@heroicons/react/outline"
import printAudit from "../lib/printAudit"
import PrintAudit from "./PrintAudit"

//figure out how to infer the nested types
interface AuditTableProps {
  audits: (
    | Audit & {
        auditType: AuditType
        location: Location
        date: Day
        auditAssessments: AuditAssessment[]
      }
  )[]
}

const headCells = [
  "Location",
  "AuditType",
  "Month",
  <EmojiHappyIcon key="good" className={"text-gray-500 h-6 w-6"} />,
  <ExclamationCircleIcon key="ok" className={"text-gray-500 h-6 w-6"} />,
  <EmojiSadIcon key="poor" className={"text-gray-500 h-6 w-6"} />,
  "View",
]

const AuditTable: React.FC<AuditTableProps> = ({ audits }) => {
  const router = useRouter()
  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {headCells.map((cell, i) => (
                      <th
                        key={i}
                        scope="col"
                        className="px-6 py-3 text-center text-sm font-bold text-gray-500 uppercase tracking-wider"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {audits.map((audit) => {
                    const good = audit?.auditAssessments?.filter((x) => x.assessment === 2)
                    const satisfactory = audit?.auditAssessments?.filter((x) => x.assessment === 1)
                    const poor = audit?.auditAssessments?.filter((x) => x.assessment === 0)
                    return (
                      <tr key={audit.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <h3 className="text-sm font-bold text-gray-800">{audit.location.name}</h3>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <h3 className="text-sm font-bold text-gray-800">
                            {audit.auditType.name}
                          </h3>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <h3 className="text-sm font-bold text-gray-800">{`${audit.date.monthName}, ${audit.date.year}`}</h3>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <h3 className="text-sm font-bold text-gray-800">
                            {good ? good.length : 0}
                          </h3>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <h3 className="text-sm font-bold text-gray-800">
                            {satisfactory ? satisfactory.length : 0}
                          </h3>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <h3 className="text-sm font-bold text-gray-800">
                            {poor ? poor.length : 0}
                          </h3>
                        </td>
                        <td className="flex justify-center items-center p-4">
                          <EyeIcon
                            className="text-blue-600 h-5 w-5"
                            onClick={() => router.push(Routes.EditAuditPage({ auditId: audit.id }))}
                          />
                          <PrintAudit id={audit.id} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuditTable
