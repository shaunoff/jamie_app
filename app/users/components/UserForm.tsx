import { Form, FormProps } from "app/core/components/Form"
import { LabeledInputField } from "app/core/components/LabeledInputField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function UserForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledInputField name="name" label="Name" placeholder="Name" />
      <LabeledInputField name="email" label="Email" placeholder="Email" />
      <LabeledInputField name="role" label="Role" placeholder="Role" />
    </Form>
  )
}
