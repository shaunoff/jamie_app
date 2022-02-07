import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSections from "app/sections/queries/getSections"
import TextArea from "app/core/components/TextArea"
import { EmojiHappyIcon } from "@heroicons/react/outline"
import { EmojiSadIcon } from "@heroicons/react/outline"
import { ExclamationCircleIcon } from "@heroicons/react/outline"

const ITEMS_PER_PAGE = 100

export const SectionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ sections, hasMore }] = usePaginatedQuery(getSections, {
    orderBy: { number: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  console.log(sections)
  return (
    <div>
      <ul>
        {sections.sort().map((section) => (
          <li key={section.id}>
            <div className="flex py-4">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-400 mr-4">
                <span className="text-sm font-bold leading-none text-white">{section.number}</span>
              </span>
              <Link href={Routes.ShowSectionPage({ sectionId: section.id })}>
                <h3 className="text-lg leading-6 font-medium text-gray-900">{section.name}</h3>
              </Link>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {section.auditActions.map((application, i) => (
                  <li key={i}>
                    <div className="block hover:bg-gray-50">
                      <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="min-w-0 flex-1 flex items-center">
                          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                              <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                                {`${section.number} . ${application.position}`}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                <span>{application.name}</span>
                              </p>
                            </div>
                            <div className="hidden md:block">
                              <p className="block text-base text-gray-500 font-bold">Assessment</p>
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

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const SectionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Sections</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewSectionPage()}>
            <span className="text-xl font-bold leading-none text-gray-600">Action Items</span>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <SectionsList />
        </Suspense>
      </div>
    </>
  )
}

SectionsPage.authenticate = true
SectionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default SectionsPage
