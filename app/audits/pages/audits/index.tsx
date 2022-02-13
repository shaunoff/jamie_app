import { Suspense } from "react"
import { Head, useRouter, BlitzPage, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAudits from "app/audits/queries/getAudits"
import AuditTable from "../../components/AuditTable"

const ITEMS_PER_PAGE = 100

export const AuditsList = () => {
  const [{ audits }] = useQuery(getAudits, {
    include: {
      auditType: true,
      date: true,
      location: true,
      auditAssessments: true,
    },
  })

  console.log(audits)
  return <AuditTable audits={audits} />
}

const AuditsPage: BlitzPage = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Audits</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <AuditsList />
        </Suspense>
      </div>
    </>
  )
}

AuditsPage.authenticate = true
AuditsPage.getLayout = (page) => <Layout title="Audits">{page}</Layout>

export default AuditsPage
