import { Form, FormProps } from "app/core/components/Form"
import { LabeledInputField } from "app/core/components/LabeledInputField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function SectionForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledInputField name="number" label="Number" placeholder="Number" />
      <LabeledInputField name="name" label="Name" placeholder="Name" />
    </Form>
  )
}
