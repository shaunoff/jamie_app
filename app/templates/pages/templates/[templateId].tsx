import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTemplate from "app/templates/queries/getTemplate"
import deleteTemplate from "app/templates/mutations/deleteTemplate"

export const Template = () => {
  const router = useRouter()
  const templateId = useParam("templateId", "number")
  const [deleteTemplateMutation] = useMutation(deleteTemplate)
  const [template] = useQuery(getTemplate, { id: templateId })

  return (
    <>
      <Head>
        <title>Template {template.id}</title>
      </Head>

      <div>
        <h1>Template {template.id}</h1>
        <pre>{JSON.stringify(template, null, 2)}</pre>

        <Link href={Routes.EditTemplatePage({ templateId: template.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTemplateMutation({ id: template.id })
              router.push(Routes.TemplatesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowTemplatePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TemplatesPage()}>
          <a>Templates</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Template />
      </Suspense>
    </div>
  )
}

ShowTemplatePage.authenticate = true
ShowTemplatePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTemplatePage
