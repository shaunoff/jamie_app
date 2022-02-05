import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLocation from "app/locations/queries/getLocation"
import updateLocation from "app/locations/mutations/updateLocation"
import { LocationForm, FORM_ERROR } from "app/locations/components/LocationForm"

import { UpdateLocation } from "../../validations"

export const Location = () => {
  const router = useRouter()
  const locationId = useParam("locationId", "number")
  const [updateLocationMutation] = useMutation(updateLocation)
  const [location] = useQuery(getLocation, { id: locationId })

  return (
    <>
      <Head>
        <title>Location {location.id}</title>
      </Head>

      <div>
        {/* <h1>Location {location.id}</h1> */}
        {/* <pre>{JSON.stringify(location, null, 2)}</pre> */}

        {/* <Link href={Routes.EditLocationPage({ locationId: location.id })}>
          <a>Edit</a>
        </Link> */}
        <LocationForm
          submitText="Create Location"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={CreateLocation}
          initialValues={location as any}
          schema={UpdateLocation}
          onSubmit={async (values) => {
            try {
              await updateLocationMutation(values)
              router.push(Routes.LocationsPage())
              //router.push(Routes.ShowLocationPage({ locationId: location.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
        {/* <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteLocationMutation({ id: location.id })
              router.push(Routes.LocationsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button> */}
      </div>
    </>
  )
}

const ShowLocationPage: BlitzPage = () => {
  return (
    <div>
      {/* <p>
        <Link href={Routes.LocationsPage()}>
          <a>Locations</a>
        </Link>
      </p> */}

      <Suspense fallback={<div>Loading...</div>}>
        <Location />
      </Suspense>
    </div>
  )
}

ShowLocationPage.authenticate = true
ShowLocationPage.getLayout = (page) => <Layout title="Edit Location">{page}</Layout>

export default ShowLocationPage
