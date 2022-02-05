import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/outline"
import React, { useState, Fragment, ReactNode } from "react"
import { Transition, Disclosure } from "@headlessui/react"

interface StackedListProps {
  list: {
    name: string
    description?: string
    renderPanel: () => ReactNode
  }[]
}

const StackedList: React.FC<StackedListProps> = ({ list }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {list.map((item) => (
          <li
            key={item.name}
            // onClick={() => setActiveItem(index == activeItem ? null : index)}
          >
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button as={Fragment}>
                    <div
                      className={`block cursor-pointer ${
                        open && "border-b-gray-200 border-b bg-gray-50"
                      }`}
                    >
                      <div className="px-4 py-4 flex items-center sm:px-6 hover:bg-gray-50">
                        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                          <div className="truncate">
                            <p className="font-bold text-gray-700 truncate">{item.name}</p>
                            <p className="flex-shrink-0 font-normal text-gray-500 text-sm">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="ml-5 flex-shrink-0">
                          {open ? (
                            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          ) : (
                            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </Disclosure.Button>

                  {open && (
                    <div>
                      <Disclosure.Panel>{item.renderPanel()}</Disclosure.Panel>
                    </div>
                  )}
                </>
              )}
            </Disclosure>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StackedList
