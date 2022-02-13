/* This example requires Tailwind CSS v2.0+ */
import { useState } from "react"
import { RadioGroup } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/solid"

//AuditTypes
import { AuditTypes } from "app/audit-types/components/AuditTypesAdmin"
import normalizedAuditTypeData from "app/audit-types/lib/normalizeAuditData"
import { useField } from "react-final-form"

const mailingLists = [
  { id: 1, title: "Newsletter", description: "Last message sent an hour ago", users: "621 users" },
  {
    id: 2,
    title: "Existing Customers",
    description: "Last message sent 2 weeks ago",
    users: "1200 users",
  },
  { id: 3, title: "Trial Users", description: "Last message sent 4 days ago", users: "2740 users" },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

interface AuditTypeRadioGroupProps {
  auditTypes: AuditTypes
  name: string
}

const AuditTypeRadioGroup: React.FC<AuditTypeRadioGroupProps> = ({ auditTypes, name }) => {
  const {
    input,
    meta: { touched, error, submitError, submitting },
  } = useField<AuditTypes[number]>(name)
  const normalizedAuditTypes = normalizedAuditTypeData(auditTypes)
  return (
    <RadioGroup
      value={input.value.name}
      onChange={(val) => {
        const auditType = auditTypes.find((auditType) => auditType.name === val)
        if (auditType) {
          const { id, name, position, auditSection } = auditType
          input.onChange({ id, name, position, auditSection })
        }
      }}
    >
      <RadioGroup.Label className="text-xl font-bold text-gray-600">Audit Type</RadioGroup.Label>

      <div className="mt-2 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {normalizedAuditTypes.map((auditType) => (
          <RadioGroup.Option
            key={auditType.name}
            value={auditType.name}
            className={({ checked, active }) =>
              classNames(
                checked ? "border-transparent" : "border-gray-300",
                active ? "ring-2 ring-blue-500" : "",
                "relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <div className="flex-1 flex">
                  <div className="flex flex-col">
                    <RadioGroup.Label as="span" className="block text-lg font-bold text-gray-600">
                      {auditType.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="mt-1 flex items-center text-sm text-gray-500"
                    >
                      {auditType.count} action items
                    </RadioGroup.Description>
                    {/* <RadioGroup.Description
                      as="span"
                      className="mt-6 text-sm font-medium text-gray-900"
                    >
                      {mailingList.users}
                    </RadioGroup.Description> */}
                  </div>
                </div>
                <CheckCircleIcon
                  className={classNames(!checked ? "invisible" : "", "h-5 w-5 text-blue-600")}
                  aria-hidden="true"
                />
                <div
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-blue-500" : "border-transparent",
                    "absolute -inset-px rounded-lg pointer-events-none"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

export default AuditTypeRadioGroup
