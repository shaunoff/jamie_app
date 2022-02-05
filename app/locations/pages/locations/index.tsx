import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLocations from "app/locations/queries/getLocations"
import LocationTable from "../../components/LocationTable"

const ITEMS_PER_PAGE = 100

export const LocationsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0

  const [{ locations, hasMore }] = usePaginatedQuery(getLocations, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  console.log("locations", locations)
  return (
    <div>
      {/* <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <Link href={Routes.ShowLocationPage({ locationId: location.id })}>
              <a>{location.name}</a>
            </Link>
          </li>
        ))}
      </ul> */}
      <LocationTable locations={locations} />

      {/* <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button> */}
    </div>
  )
}

const LocationsPage: BlitzPage = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Locations</title>
      </Head>

      <div>
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

        <Suspense fallback={<div>Loading...</div>}>
          <LocationsList />
        </Suspense>
      </div>
    </>
  )
}

LocationsPage.authenticate = true
LocationsPage.getLayout = (page) => <Layout title="Locations">{page}</Layout>

export default LocationsPage
