import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import SelectMenu from "./SelectMenu"

export interface SelectMenuFieldProps<T> {
  /** Field name. */
  name: string
  items: { label: string; value: T }[]
  label?: string
}

export const LabeledInputField = <T extends unknown>({
  name,
  items,
  label,
}: SelectMenuFieldProps<T>) => {
  const {
    input,
    meta: { touched, error, submitError, submitting },
  } = useField<T>(name)

  const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

  return <SelectMenu items={items} onChange={input.onChange} value={input.value} label={label} />
}

export default LabeledInputField
