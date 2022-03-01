import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createLocation from "app/locations/mutations/createLocation"
import { LocationForm, FORM_ERROR } from "app/locations/components/LocationForm"

import { CreateLocation } from "../../validations"
import { Suspense } from "react"
import Loading from "app/shared/components/Loading"

const NewLocationPage: BlitzPage = () => {
  const router = useRouter()
  const [createLocationMutation] = useMutation(createLocation)

  return (
    <div>
      {/* <h1>Create New Location</h1> */}

      <LocationForm
        submitText="Create Location"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateLocation}
        initialValues={{}}
        schema={CreateLocation}
        onSubmit={async (values) => {
          try {
            await createLocationMutation(values)
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

      {/* <p>
        <Link href={Routes.LocationsPage()}>
          <a>Locations</a>
        </Link>
      </p> */}
    </div>
  )
}

const NewLocation: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading className="w-full h-full flex justify-center items-center" />}>
        <NewLocationPage />
      </Suspense>
    </div>
  )
}

NewLocation.authenticate = true
NewLocation.getLayout = (page) => <Layout title={"Create New Location"}>{page}</Layout>

export default NewLocation
