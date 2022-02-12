import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { LabeledInputField } from "app/core/components/LabeledInputField"
import { LabeledTextAreaField } from "app/core/components/LabeledTextAreaField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import ButtonGroup from "./ButtonGroup"
import ButtonGroupField from "./ButtonGroupField"
import { z } from "zod"
import SelectMenuField from "app/shared/components/SelectMenuField"
import { Location } from "db"
import { useState } from "react"
import RadioGroup from "./RadioGroup"

//AuditTypes
import { AuditTypes } from "app/audit-types/components/AuditTypesAdmin"
import normalizedAuditTypeData from "app/audit-types/lib/normalizeAuditData"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())
//todo: move to validations folder
export const Login = z.object({
  email,
  testy: z.number(),
})

interface AuditFormProps {
  locations: Location[]
  auditTypes: AuditTypes
}

export const AuditForm: React.FC<AuditFormProps> = ({ locations, auditTypes }) => {
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <Form
        {...(selected ? { submitText: "Submit Audit" } : {})}
        schema={Login}
        initialValues={{ email: "", testy: 0 }}
        onSubmit={async (values) => {
          // try {
          //   const user = await loginMutation(values)
          //   props.onSuccess?.(user)
          // } catch (error: any) {
          //   if (error instanceof AuthenticationError) {
          //     return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
          //   } else {
          //     return {
          //       [FORM_ERROR]:
          //         "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
          //     }
          //   }
          // }
        }}
      >
        {({ values }) => {
          console.log("formValues", values)
          return (
            <>
              <p className="block text-xl text-gray-600 font-bold">Location</p>
              <SelectMenuField items={locations} name="location" />
              <div className="h-2" />
              {values.location && <RadioGroup auditTypes={auditTypes} name="auditType" />}
              {values.auditType && (
                <>
                  <div className="h-2" />
                  <p className="block text-xl text-gray-600 font-bold">Action Items</p>
                  <ul>
                    {values.auditType.auditSection.map((section, sectionIndex) => (
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
                                            name={`auditSection[${sectionIndex}].actionItem[${i}].assessment`}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="w-1/3">
                                      <LabeledTextAreaField
                                        name={`auditSection[${sectionIndex}].actionItem[${i}].comment`}
                                        label="Comment"
                                        placeholder="Add comment here..."
                                        data-testid="login-email"
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
          )
        }}
      </Form>
    </div>
  )
}

export default AuditForm
