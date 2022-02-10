import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { LabeledInputField } from "app/core/components/LabeledInputField"
import { LabeledTextAreaField } from "app/core/components/LabeledTextAreaField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
// import { Login } from "app/auth/validations"
import ButtonGroup from "./ButtonGroup"
import ButtonGroupField from "./ButtonGroupField"
import { z } from "zod"
import SelectMenu from "app/shared/components/SelectMenu"
import { Location } from "db"
import { useState } from "react"

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
}

export const AuditForm: React.FC<AuditFormProps> = ({ locations }) => {
  const [selected, setSelected] = useState(null)
  return (
    <div>
      <Form
        //submitText="Login"
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
        {/* <ButtonGroupField name="testy" />
        <LabeledTextAreaField
          name="email"
          label="Email"
          placeholder="Email"
          data-testid="login-email"
        /> */}
        <p className="block text-xl text-gray-600 font-bold">Location</p>
        <SelectMenu items={locations} onChange={setSelected} />
        {selected && (
          <div className="w-full flex px-16 py-64 text-4xl text-gray-600 justify-center border rounded-lg bg-white">
            {" "}
            When location is selected Form to fill in will go here
          </div>
        )}
      </Form>
    </div>
  )
}

export default AuditForm
