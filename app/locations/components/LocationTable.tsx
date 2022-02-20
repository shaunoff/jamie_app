import React, { useState, useEffect } from "react"
import { useRouter, Routes, useMutation } from "blitz"
import db, { Location, Region } from "db"
import { CheckCircleIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline"
import deleteLocation from "app/locations/mutations/deleteLocation"

interface LocationTableProps {
  locations: (Location & {
    region: Region | null
  })[]
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

const headCells = ["Name", "Region", "Location", "GeoLocation", "POC", "Contact"]

const LocationTable: React.FC<LocationTableProps> = ({ locations, admin = true }) => {
  const router = useRouter()
  const [deleteLocationMutation] = useMutation(deleteLocation, {
    onSuccess: () => {
      console.info("Successful Update")
    },
  })
  console.log(locations)
  return (
    <div>
      {admin && (
        <div className="flex justify-end py-2">
          {/* <Link href={Routes.NewLocationPage()}>
            <a>Create Location</a>
          </Link> */}
          <button
            onClick={() => router.push(Routes.NewLocation())}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <h3 className="text-sm font-bold text-gray-800">{location.region?.name}</h3>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {`${location.address1}, ${location.city}, ${location.postCode}.`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center">
                        {location?.lat ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : null}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {location.poc}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {location.contact}
                      </td>
                      {admin && (
                        <td className="px-6 py-4 whitespace-nowrap text-right flex">
                          <PencilAltIcon
                            className="text-blue-500 cursor-pointer h-5 w-5"
                            onClick={() =>
                              router.push(Routes.ShowLocationPage({ locationId: location.id }))
                            }
                          />
                          <TrashIcon
                            className="text-red-300 ml-2 cursor-pointer h-5 w-5"
                            onClick={() => deleteLocationMutation({ id: location.id })}
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
