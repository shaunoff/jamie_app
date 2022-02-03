import React from "react"
import { CheckCircleIcon, ChevronRightIcon, MailIcon } from "@heroicons/react/solid"
import TextArea from "app/core/components/TextArea"
import { EmojiHappyIcon } from "@heroicons/react/outline"
import { EmojiSadIcon } from "@heroicons/react/outline"
import { ExclamationCircleIcon } from "@heroicons/react/outline"

const applications = [
  {
    number: "1.1",
    text: "Foods and raw materials to be purchased from MOD food contractor or approved",
  },
  {
    number: "1.2",
    text: "All deliveries to be inspected are presentable.",
  },
  {
    number: "1.1",
    text: "In respect of temperature sensitive deliveries the temperature to be taken and recorded.",
  },
]

export default function Example() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {applications.map((application, i) => (
          <li key={i}>
            <div className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                        {application.number}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <span>{application.text}</span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <p className="block text-base text-gray-500 font-bold">Assessment</p>
                      <div className="mt-1 relative z-0 inline-flex shadow-sm rounded-md">
                        <button
                          type="button"
                          className={`${
                            i == 0 && "bg-green-50"
                          } relative inline-flex items-center px-6 py-4 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                        >
                          <EmojiHappyIcon
                            className={`h-12 w-12 ${i == 0 ? "text-green-400" : "text-green-100"}`}
                          />
                        </button>
                        <button
                          type="button"
                          className={`${
                            i == 2 && "bg-yellow-50"
                          } relative inline-flex items-center px-6 py-4  border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                        >
                          <ExclamationCircleIcon
                            className={`h-12 w-12 ${
                              i == 2 ? "text-yellow-400" : "text-yellow-100"
                            }`}
                          />
                        </button>
                        <button
                          type="button"
                          className={`${
                            i == 1 && "bg-red-50"
                          } relative inline-flex items-center px-6 py-4 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                        >
                          <EmojiSadIcon
                            className={`h-12 w-12 ${i == 1 ? "text-red-400" : "text-red-100"}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/3">
                  <TextArea label="Comments" rows={3} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
