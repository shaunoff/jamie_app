import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, useQuery, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { useCurrentDay } from "app/core/hooks/useCurrentDay"
import logout from "app/auth/mutations/logout"
import sprightly from "public/sprightly.svg"
import StackedList from "app/core/components/StackedList"
import getSections from "app/sections/queries/getSections"
import TextArea from "app/core/components/TextArea"
import { EmojiHappyIcon } from "@heroicons/react/outline"
import { EmojiSadIcon } from "@heroicons/react/outline"
import { ExclamationCircleIcon } from "@heroicons/react/outline"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [{ sections, hasMore }] = useQuery(getSections, {
    orderBy: { number: "asc" },
  })
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <ul>
          {sections.sort().map((section) => (
            <li key={section.id}>
              <div className="flex py-4">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-400 mr-4">
                  <span className="text-sm font-bold leading-none text-white">
                    {section.number}
                  </span>
                </span>
                <Link href={Routes.ShowSectionPage({ sectionId: section.id })}>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{section.name}</h3>
                </Link>
              </div>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {section.actions.map((application, i) => (
                    <li key={i}>
                      <div className="block hover:bg-gray-50">
                        <div className="flex items-center px-4 py-4 sm:px-6">
                          <div className="min-w-0 flex-1 flex items-center">
                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                              <div>
                                <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                                  {`${section.number} . ${application.number}`}
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                  <span>{application.title}</span>
                                </p>
                              </div>
                              <div className="hidden md:block">
                                <p className="block text-base text-gray-500 font-bold">
                                  Assessment
                                </p>
                                <div className="mt-1 relative z-0 inline-flex shadow-sm rounded-md">
                                  <button
                                    type="button"
                                    className={`bg-green-50"
                                  } relative inline-flex items-center px-6 py-4 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                                  >
                                    <EmojiHappyIcon className="h-12 w-12 text-green-400" />
                                  </button>
                                  <button
                                    type="button"
                                    className={`bg-yellow-50"
                                  } relative inline-flex items-center px-6 py-4  border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                                  >
                                    <ExclamationCircleIcon className="h-12 w-12 text-yellow-400" />
                                  </button>
                                  <button
                                    type="button"
                                    className={`
                                  relative inline-flex items-center px-6 py-4 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                                  >
                                    <EmojiSadIcon className="h-12 w-12 text-red-400" />
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
            </li>
          ))}
        </ul>
        <div
          onClick={async () => {
            await logoutMutation()
          }}
        >
          logout
        </div>
      </>
    )
  } else {
    throw Error("Only Users are able to access this Area")
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  )
}

Home.authenticate = { redirectTo: "/login" }
Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Audit Report">{page}</Layout>

export default Home
