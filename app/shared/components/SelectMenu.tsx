import { Fragment, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"

interface SelectMenuProps<T> {
  items: { value: T; label: string }[]
  onChange: any
  value?: T
  label?: string
  disabled?: boolean
}

const SelectMenu = <T extends unknown>({
  items,
  onChange,
  value,
  label,
  disabled,
}: SelectMenuProps<T>) => {
  return (
    <>
      {!!label && <label className={"block text-base text-gray-500 font-bold mb-1"}>{label}</label>}
      <Listbox
        disabled={disabled}
        value={value}
        onChange={(e) => {
          onChange(e)
        }}
      >
        <div className={`relative mt-0 ${disabled && "opacity-40"}`}>
          <Listbox.Button className="border border-gray-300 h-10 relative w-full py-1 pl-3 pr-10 text-left bg-white rounded-md shadow-sm cursor-default sm:text-sm">
            <span className="block truncate">
              {(value && items.find((item) => item.value === value))?.label ?? (
                <span className="text-gray-400">Select a Location...</span>
              )}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {items.map((item, itemId) => (
                <Listbox.Option
                  key={itemId}
                  className={({ active }) =>
                    `${active ? "text-blue-900 bg-blue-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={item.value}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${selected ? "font-medium" : "font-normal"} block truncate`}
                      >
                        {item.label}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? "text-blue-600" : "text-blue-600"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  )
}

export default SelectMenu
