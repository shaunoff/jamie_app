import { useEffect, useState } from "react"
import { Switch } from "@headlessui/react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  onChange: (val: boolean) => void
}

const Example: React.FC<Props> = ({ onChange }) => {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch.Group as="div" className="flex items-center p-2">
      <Switch.Label as="span" className="mr-3">
        <span className="text-sm font-bold text-gray-700">Site </span>
      </Switch.Label>
      <Switch
        checked={enabled}
        onChange={(val) => {
          onChange(val)
          setEnabled(val)
        }}
        className={classNames(
          "bg-blue-600",
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-bold text-gray-700">Region</span>
      </Switch.Label>
    </Switch.Group>
  )
}

export default Example
