import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import ButtonGroup from "./ButtonGroup"

export interface LabeledInputFieldProps {
  /** Field name. */
  name: string
  fieldProps?: UseFieldConfig<number>
  disabled?: boolean
}

export const ButtonGroupField: React.FC<LabeledInputFieldProps> = ({
  name,
  fieldProps,
  disabled = false,
}) => {
  const {
    input,
    meta: { touched, error },
  } = useField<number>(name, fieldProps)

  const normalizedError = Array.isArray(error) ? error.join(", ") : error

  return (
    <div>
      <ButtonGroup
        disabled={disabled}
        value={input.value}
        onChange={input.onChange}
        error={touched && normalizedError}
      />
      {touched && normalizedError && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default ButtonGroupField
