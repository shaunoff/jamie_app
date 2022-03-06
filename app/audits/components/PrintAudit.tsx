import { PrinterIcon } from "@heroicons/react/outline"
import React, { useState } from "react"
import { useQuery } from "blitz"
import getAudit from "app/audits/queries/getAudit"
import printAudit from "../lib/printAudit"

interface PrintAuditProps {
  id: number
}

const PrintAudit: React.FC<PrintAuditProps> = ({ id }) => {
  const [audit, { refetch }] = useQuery(
    getAudit,
    { id },
    {
      enabled: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        if (audit) printAudit(audit)
      },
    }
  )
  return (
    <PrinterIcon className="text-blue-600 h-5 w-5 ml-2 cursor-pointer" onClick={() => refetch()} />
  )
}

export default PrintAudit
