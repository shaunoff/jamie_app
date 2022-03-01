import { Link, useRouter, useMutation, BlitzPage, Routes, Head, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import React, { useState, Suspense } from "react"
import AuditForm from "../../components/AuditForm"
import getLocations from "app/locations/queries/getLocations"
import getAuditTypes from "app/audit-types/queries/getAuditTypes"
import getDays from "app/days/queries/getDays"
import createAuditMonthsParams from "../../lib/createAuditMonthsParams"
import Loading from "app/shared/components/Loading"

const NewAudit: BlitzPage = () => {
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

  // get the first day of the previous, current and next Months
  const [{ days: months }] = useQuery(getDays, {
    where: createAuditMonthsParams(),
  })

  //  console.log(auditTypes)
  // const router = useRouter()
  // const [createTemplateMutation] = useMutation(createTemplate)

  return <AuditForm locations={locations} auditTypes={auditTypes} months={months} />
}

const NewAuditPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Create New Audit</title>
      </Head>

      <div>
        <Suspense fallback={<Loading className="w-full h-full flex justify-center items-center" />}>
          <NewAudit />
        </Suspense>
      </div>
    </>
  )
}

NewAuditPage.authenticate = true
NewAuditPage.getLayout = (page) => <Layout title={"Create New Audit"}>{page}</Layout>

export default NewAuditPage
