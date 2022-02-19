import { useMutation, validateZodSchema } from "blitz"
import { LabeledTextAreaField } from "app/core/components/LabeledTextAreaField"

import ButtonGroupField from "./ButtonGroupField"
import { z } from "zod"
import SelectMenuField from "app/shared/components/SelectMenuField"
import { Location, Day, Audit, AuditType, AuditSection, AuditAction } from "db"
import RadioGroup from "./RadioGroup"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import Notification from "app/shared/components/Notification"

//AuditTypes
import { AuditTypes } from "app/audit-types/components/AuditTypesAdmin"
import normalizedAuditTypeData from "app/audit-types/lib/normalizeAuditData"
import Button from "app/core/components/Button"
import { FormApi } from "final-form"
import { AuditFormSchema } from "../validations"
import createAudit from "app/audits/mutations/createAudit"

interface AuditFormProps {
  locations: Location[]
  auditTypes: AuditTypes
  months: Day[]
  audit?: Audit & {
    auditType: AuditType & {
      auditSection: (AuditSection & {
        auditActions: AuditAction[]
      })[]
    }
  }
}

export const AuditForm: React.FC<AuditFormProps> = ({ locations, auditTypes, months, audit }) => {
  const [createAuditMutation] = useMutation(createAudit)

  const onSubmit = async (vals: z.infer<typeof AuditFormSchema>, form: FormApi) => {
    console.log("passed validation", vals)
    await createAuditMutation(vals)
    Notification({
      locationName: locations.find((location) => vals.locationId === location.id)?.name,
      auditType: vals.auditType.name,
    })
    form.reset()
  }
  const normalizedMonths = months.map((month) => ({
    value: month.id,
    label: `${month.monthName}, ${month.year}`,
  }))

  //Todo: what if the month isnt there?
  const defaultMonth = audit
    ? normalizedMonths.find((month) => month.value === audit.dateId)
    : normalizedMonths[1]

  const normalizedLocations = locations.map((location) => ({
    value: location.id,
    label: location.name,
  }))
  return (
    <div>
      <FinalForm
        initialValues={
          { ...audit, monthId: audit?.dateId } || { auditType: {}, month: defaultMonth }
        }
        validate={(vals) => validateZodSchema(AuditFormSchema)(vals)}
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, submitError, values, errors }) => {
          const selectedAuditType = auditTypes.find(
            (auditType) => auditType.id === values.auditType.id
          )
          console.log(values, errors)
          return (
            <form onSubmit={handleSubmit} className="form">
              <>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-2/3 md:pr-4 mb-8">
                    <p className="block text-xl text-gray-600 font-bold mb-2">Location</p>
                    <SelectMenuField items={normalizedLocations} name="locationId" />
                  </div>
                  <div className="w-full md:w-1/3 mb-8">
                    <p className="block text-xl text-gray-600 font-bold mb-2">Date</p>
                    <SelectMenuField items={normalizedMonths} name="monthId" />
                  </div>
                </div>

                {values.locationId && <RadioGroup auditTypes={auditTypes} name="auditType" />}
                {selectedAuditType && (
                  <>
                    <p className="block text-xl text-gray-600 font-bold">Action Items</p>
                    <ul>
                      {selectedAuditType.auditSection.map((section, sectionIndex) => (
                        <li key={section.id}>
                          {section.number !== -1 && (
                            <div className="flex py-4">
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-400 mr-4">
                                <span className="text-sm font-bold leading-none text-white">
                                  {section.number}
                                </span>
                              </span>

                              <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {section.name}
                              </h3>
                            </div>
                          )}
                          <div className="bg-white shadow overflow-hidden sm:rounded-md">
                            <ul role="list" className="divide-y divide-gray-200">
                              {section.auditActions.map((application, i) => (
                                <li key={i}>
                                  <div className="block hover:bg-gray-50">
                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                      <div className="min-w-0 flex-1 flex items-center">
                                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                          <div>
                                            <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                                              {section.number !== -1 && `${section.number} .`}
                                              {` ${application.position + 1}`}
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                              <span>{application.name}</span>
                                            </p>
                                          </div>
                                          <div className="hidden md:block">
                                            <p className="block text-base text-gray-500 font-bold">
                                              Assessment
                                            </p>
                                            <ButtonGroupField
                                              name={`auditType.auditSection[${sectionIndex}].auditActions[${i}].assessment`}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="w-1/3">
                                        <LabeledTextAreaField
                                          name={`auditType.auditSection[${sectionIndex}].auditActions[${i}].comment`}
                                          label="Comment"
                                          placeholder="Add comment here..."
                                          rows={3}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
              {selectedAuditType && (
                <Button className="mt-4" type="submit" disabled={submitting} block>
                  Submit Audit
                </Button>
              )}
            </form>
          )
        }}
      />
    </div>
  )
}

export default AuditForm
