import React, { useState, useEffect } from "react"
import { useRouter, Routes, useMutation } from "blitz"
import db, { User } from "db"
import { CheckCircleIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline"
import deleteUser from "app/users/mutations/deleteUser"

const headCells = ["Name", "Email", "Role"]

interface UserTableProps {
  users: User[]
  admin?: boolean
}

const UserTable: React.FC<UserTableProps> = ({ users, admin = true }) => {
  const router = useRouter()
  const [deleteUserMutation] = useMutation(deleteUser, {
    onSuccess: () => {
      console.info("Successful Update")
    },
  })

  return (
    <div>
      {admin && (
        <div className="flex justify-end py-2">
          {/* <Link href={Routes.NewLocationPage()}>
            <a>Create Location</a>
          </Link> */}
          <button
            onClick={() => router.push(Routes.NewUserPage())}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create User
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
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <h3 className="text-sm font-bold text-gray-800">{user.name}</h3>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <h3 className="text-sm font-bold text-gray-800">{user.email}</h3>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <h3 className="text-sm font-bold text-gray-800">{user.role}</h3>
                      </td>
                      {admin && (
                        <td className="px-6 py-4 whitespace-nowrap text-right flex">
                          <PencilAltIcon
                            className="text-blue-500 cursor-pointer h-5 w-5"
                            onClick={() => router.push(Routes.EditUserPage({ userId: user.id }))}
                          />
                          <TrashIcon
                            className="text-red-300 ml-2 cursor-pointer h-5 w-5"
                            onClick={() => deleteUserMutation({ id: user.id })}
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

export default UserTable
