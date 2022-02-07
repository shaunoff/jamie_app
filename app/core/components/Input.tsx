import React, { forwardRef, ComponentPropsWithoutRef } from "react"
import clsx from "clsx"
import { overrideTailwindClasses } from "tailwind-override"
import { ExclamationCircleIcon } from "@heroicons/react/solid"
import { CheckCircleIcon } from "@heroicons/react/solid"

interface Props extends React.ComponentPropsWithRef<"input"> {
  valid?: boolean
  disabled?: boolean
  error?: boolean | string
  label?: string
  value?: string | number | readonly string[] | undefined
  name?: string
  helperText?: string
  type?: string
  className?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const input = {
  label: "block text-base text-gray-500 font-bold",
  disabled: "opacity-50",
  container: {
    base: "mt-1 w-full",
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
  icon: {
    base: "absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none",
    valid: "h-5 w-5 text-green-500",
    error: "h-5 w-5 text-red-500",
  },
}

const TextField = forwardRef<HTMLInputElement, Props>(function TextField(props: Props, ref) {
  const {
    valid,
    disabled,
    label,
    error,
    name,
    type = "text",
    helperText,
    className,
    onChange,
  } = props

  const labelStyle = input.label
  const containerStyle = clsx(
    input.container.base,
    error && input.container.error,
    valid && input.container.valid
  )
  const inputStyle = overrideTailwindClasses(
    clsx(input.input.base, (error || valid) && input.input.icon, className)
  )
  const helperTextStyle = input.helperText.base
  const disabledStyle = clsx(disabled && input.disabled)

  return (
    <div className={`w-full ${disabledStyle}`}>
      {!!label && (
        <label htmlFor={name} className={labelStyle}>
          {label}
        </label>
      )}
      <div className={containerStyle}>
        <input {...props} className={inputStyle} ref={ref} type={type} onChange={onChange} />
        {(error || valid) && (
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            {error ? (
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            ) : (
              <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
            )}
          </div>
        )}
      </div>
      {helperText && <p className={helperTextStyle}>{helperText}</p>}
      {error && typeof error === "string" && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {valid && typeof valid === "string" && <p className="mt-1 text-xs text-green-500">{valid}</p>}
    </div>
  )
})

export default TextField
