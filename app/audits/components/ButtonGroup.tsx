import React, { useState } from "react"
import { EmojiHappyIcon } from "@heroicons/react/outline"
import { EmojiSadIcon } from "@heroicons/react/outline"
import { ExclamationCircleIcon } from "@heroicons/react/outline"

interface ButtonGroupProps {
  value?: number
  onChange: (num: number) => void
}

const baseButtonStyle =
  "relative inline-flex items-center px-6 py-4 bg-white border-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none"
const baseIconStyle = `h-12 w-12`

const ButtonGroup: React.FC<ButtonGroupProps> = ({ value, onChange }) => {
  return (
    <div className="mt-1 relative z-0 inline-flex shadow-sm rounded-md">
      <button
        onClick={() => onChange(2)}
        type="button"
        className={`${baseButtonStyle} bg-white rounded-l-md ${
          value === 2 ? "border-blue-400" : "border border-gray-300"
        }`}
      >
        <EmojiHappyIcon
          className={`${baseIconStyle} ${value === 2 ? "text-blue-400" : "text-gray-200"}`}
        />
      </button>
      <button
        onClick={() => onChange(1)}
        type="button"
        className={`${baseButtonStyle} bg-white ${
          value === 1 ? "border-blue-400" : "border border-gray-300"
        }`}
      >
        <ExclamationCircleIcon
          className={`${baseIconStyle} ${value === 1 ? "text-blue-400" : "text-gray-200"}`}
        />
      </button>
      <button
        onClick={() => onChange(0)}
        type="button"
        className={`${baseButtonStyle} bg-white rounded-r-md ${
          value === 0 ? "border-blue-400" : "border border-gray-300"
        }`}
      >
        <EmojiSadIcon
          className={`${baseIconStyle} ${value === 0 ? "text-blue-400" : "text-gray-200"}`}
        />
      </button>
    </div>
  )
}

export default ButtonGroup
