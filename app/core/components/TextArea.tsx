import React, { forwardRef, ComponentPropsWithoutRef } from "react"
import clsx from "clsx"
import { overrideTailwindClasses } from "tailwind-override"

interface Props extends React.ComponentPropsWithRef<"textarea"> {
  valid?: boolean
  disabled?: boolean
  error?: boolean | string
  label?: string
  value?: string | number | readonly string[] | undefined
  name?: string
  helperText?: string
  type?: string
  className?: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  rows?: number
}

const textArea = {
  label: "block text-base text-gray-500 font-bold",
  disabled: "opacity-70",
  container: {
    base: "mt-1",
    error: "relative rounded-md shadow-sm",
    valid: "relative rounded-md shadow-sm",
  },
  input: {
    base: "placeholder-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md",
    icon: "pr-9",
  },
  helperText: {
    base: "mt-1 text-xs text-gray-500",
    error: "text-red-500",
    valid: "text-green-500",
  },
}

const TextField = forwardRef<HTMLTextAreaElement, Props>(function TextField(props: Props, ref) {
  const { valid, disabled, label, error, name, helperText, className, onChange, rows = 4 } = props

  const labelStyle = textArea.label
  const containerStyle = clsx(
    textArea.container.base,
    error && textArea.container.error,
    valid && textArea.container.valid
  )
  const textAreaStyle = overrideTailwindClasses(clsx(textArea.input.base, className))
  const helperTextStyle = textArea.helperText.base
  const disabledStyle = clsx(disabled && textArea.disabled)

  return (
    <div className={disabledStyle}>
      <label htmlFor={name} className={labelStyle}>
        {label}
      </label>
      <div className={containerStyle}>
        <textarea {...props} rows={rows} className={textAreaStyle} ref={ref} onChange={onChange} />
      </div>
      {helperText && <p className={helperTextStyle}>{helperText}</p>}
      {error && typeof error === "string" && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {valid && typeof valid === "string" && <p className="mt-1 text-xs text-green-500">{valid}</p>}
    </div>
  )
})

export default TextField
