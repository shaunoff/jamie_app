import { Suspense, useEffect, useState } from "react"
import { Head, useRouter, BlitzPage, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAudits from "app/audits/queries/getAudits"
import getDistinctDates from "app/audits/queries/getDistinctDates"
import getLocations from "app/locations/queries/getLocations"
import AuditTable from "../../components/AuditTable"
import getBasicAuditTypes from "app/audit-types/queries/getBasicAuditTypes"
import SelectMenu from "app/shared/components/SelectMenu"
import Loading from "app/shared/components/Loading"

const ITEMS_PER_PAGE = 100

export const AuditsList = () => {
  const [{ dates }] = useQuery(getDistinctDates, {})
  const [{ auditTypes }] = useQuery(getBasicAuditTypes, {})
  const [{ locations }] = useQuery(getLocations, {})

  const normalizedMonths = dates.map((month) => ({
    value: month.id,
    label: `${month.monthName}, ${month.year}`,
  }))

  const normalizedLocations = locations.map((location) => ({
    value: location.id,
    label: location.name,
  }))

  const [locationId, setLocationId] = useState<number | undefined>(undefined)
  const [dateId, setDateId] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (dates.length && dates[0]?.id) {
      setDateId(dates[0]?.id)
    }
    if (locations.length && locations[0]?.id) {
      setLocationId(locations[0]?.id)
    }
  }, [dates, locations])

  const [data] = useQuery(
    getAudits,
    {
      include: {
        auditType: true,
        date: true,
        location: true,
        auditAssessments: true,
      },
      where: {
        AND: [
          { dateId: dateId ? dateId : undefined },
          { locationId: locationId ? locationId : undefined },
        ],
      },
    },
    {
      enabled: !!dates.length && !!auditTypes.length,
    }
  )
  if (!data?.audits) {
    return null
  }
  return (
    <div>
      <div className="flex py-2 space-x-2 > *">
        <SelectMenu
          items={normalizedMonths}
          onChange={(month) => setDateId(month)}
          value={dateId}
        />
        <SelectMenu
          items={normalizedLocations}
          onChange={(location) => setLocationId(location)}
          value={locationId}
        />
      </div>
      <AuditTable audits={data?.audits as any} />
    </div>
  )
}

const AuditsPage: BlitzPage = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Audits</title>
      </Head>

      <div>
        <Suspense fallback={<Loading className="w-full h-96 flex justify-center items-center" />}>
          <AuditsList />
        </Suspense>
      </div>
    </>
  )
}

AuditsPage.authenticate = { redirectTo: "/login" }
AuditsPage.getLayout = (page) => <Layout title="Audits">{page}</Layout>

export default AuditsPage
