import React, { useState, useEffect } from "react"
import { useRouter, Routes } from "blitz"
import db, { Location } from "db"
import { PencilAltIcon } from "@heroicons/react/outline"
interface LocationTableProps {
  locations: Location[]
  admin?: boolean
}

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
  },
]

const headCells = ["Name", "Location", "POC", "Contact"]

const LocationTable: React.FC<LocationTableProps> = ({ locations, admin = false }) => {
  const router = useRouter()
  return (
    <div>
      {admin && (
        <div className="flex justify-end py-2">
          {/* <Link href={Routes.NewLocationPage()}>
            <a>Create Location</a>
          </Link> */}
          <button
            onClick={() => router.push(Routes.NewLocationPage())}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Location
          </button>
        </div>
      )}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {headCells.map((cell) => (
                      <th
                        key={cell}
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider"
                      >
                        {cell}
                      </th>
                    ))}
                    {admin && <th></th>}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {locations.map((location) => (
                    <tr key={location.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <h3 className="text-sm font-bold text-gray-800">{location.name}</h3>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {`${location.address1}, ${location.city}, ${location.postCode}.`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {location.poc}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {location.contact}
                      </td>
                      {admin && (
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <PencilAltIcon
                            className="text-blue-500 cursor-pointer h-5 w-5"
                            onClick={() =>
                              router.push(Routes.ShowLocationPage({ locationId: location.id }))
                            }
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationTable
