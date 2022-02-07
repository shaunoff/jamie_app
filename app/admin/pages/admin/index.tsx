import { Suspense } from "react"
import { Head, Link, useQuery, useRouter, BlitzPage, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSections from "app/sections/queries/getSections"
import TextArea from "app/core/components/TextArea"
import { EmojiHappyIcon } from "@heroicons/react/outline"
import { EmojiSadIcon } from "@heroicons/react/outline"
import { ExclamationCircleIcon } from "@heroicons/react/outline"
import getLocations from "app/locations/queries/getLocations"
import getAuditTypes from "app/audit-types/queries/getAuditTypes"
import LocationTable from "app/locations/components/LocationTable"
import AuditTypesAdmin from "app/audit-types/components/AuditTypesAdmin"
import updateAuditTypes from "app/audit-types/mutations/updateAuditTypes"
import Tabs from "app/shared/components/Tabs"

const ITEMS_PER_PAGE = 100

export const Admin = () => {
  const [{ locations }] = useQuery(getLocations, {})
  const tabs = [{ name: "Audits" }, { name: "Locations" }]

  return (
    <div>
      <Tabs tabs={tabs}>
        {({ currentIndex }) => {
          if (currentIndex === 0) {
            return <AuditTypesAdmin />
          }
          if (currentIndex === 1) {
            return <LocationTable locations={locations} admin={true} />
          }
        }}
      </Tabs>
    </div>
  )
}

const AdminPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>

      <Suspense fallback={<div>Loading...</div>}>
        <Admin />
      </Suspense>
    </>
  )
}

AdminPage.authenticate = true
AdminPage.getLayout = (page) => <Layout title="Admin">{page}</Layout>

export default AdminPage
