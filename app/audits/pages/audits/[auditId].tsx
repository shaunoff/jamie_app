import { Link, useRouter, useMutation, BlitzPage, Routes, Head, useQuery, useParam } from "blitz"
import Layout from "app/core/layouts/Layout"
import React, { useState, Suspense } from "react"
import AuditForm from "../../components/AuditForm"
import getLocations from "app/locations/queries/getLocations"
import getAudit from "app/audits/queries/getAudit"
import getAuditTypes from "app/audit-types/queries/getAuditTypes"
import getDays from "app/days/queries/getDays"
import createAuditMonthsParams from "../../lib/createAuditMonthsParams"
import Loading from "app/shared/components/Loading"

const EditAudit: BlitzPage = () => {
  const router = useRouter()
  const auditId = useParam("auditId", "number")

  const [{ locations, hasMore }] = useQuery(
    getLocations,
    {
      orderBy: { id: "asc" },
    },
    {
      refetchOnWindowFocus: false,
    }
  )

  const [{ auditTypes }] = useQuery(
    getAuditTypes,
    {},
    {
      refetchOnWindowFocus: false,
    }
  )

  const [audit] = useQuery(
    getAudit,
    { id: auditId },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess: () => console.log("refetched"),
    }
  )
  // get the first day of the previous, current and next Months
  const [{ days: months }] = useQuery(
    getDays,
    {
      where: createAuditMonthsParams(),
    },
    {
      refetchOnWindowFocus: false,
    }
  )

  //  console.log(auditTypes)
  // const router = useRouter()
  // const [createTemplateMutation] = useMutation(createTemplate)

  return <AuditForm locations={locations} auditTypes={auditTypes} months={months} audit={audit} />
}

const EditAuditPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Edit Audit</title>
      </Head>

      <div>
        <Suspense fallback={<Loading className="w-full h-full flex justify-center items-center" />}>
          <EditAudit />
        </Suspense>
      </div>
    </>
  )
}

EditAuditPage.authenticate = true
EditAuditPage.getLayout = (page) => <Layout title={"Edit Audit"}>{page}</Layout>

export default EditAuditPage
