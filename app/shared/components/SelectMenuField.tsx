import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import SelectMenu from "./SelectMenu"

export interface SelectMenuFieldProps {
  /** Field name. */
  name: string
  items: { name: string; id: string | number }[]
}

export const LabeledInputField: React.FC<SelectMenuFieldProps> = ({ name, items }) => {
  const {
    input,
    meta: { touched, error, submitError, submitting },
  } = useField<string>(name)

  const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

  return <SelectMenu items={items} onChange={input.onChange} />
}

export default LabeledInputField
