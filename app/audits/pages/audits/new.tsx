import { Link, useRouter, useMutation, BlitzPage, Routes, Head, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import React, { useState, Suspense } from "react"
import AuditForm from "../../components/AuditForm"
import getLocations from "app/locations/queries/getLocations"
import getAuditTypes from "app/audit-types/queries/getAuditTypes"

const NewAudit: BlitzPage = () => {
  const [{ locations, hasMore }] = useQuery(getLocations, {
    orderBy: { id: "asc" },
  })

  const [{ auditTypes }] = useQuery(getAuditTypes, {})

  //  console.log(auditTypes)
  // const router = useRouter()
  // const [createTemplateMutation] = useMutation(createTemplate)

  return <AuditForm locations={locations} auditTypes={auditTypes} />
}

const NewAuditPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Create New Audit</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <NewAudit />
        </Suspense>
      </div>
    </>
  )
}

NewAuditPage.authenticate = true
NewAuditPage.getLayout = (page) => <Layout title={"Create New Audit"}>{page}</Layout>

export default NewAuditPage
