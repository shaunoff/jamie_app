import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTemplate from "app/templates/queries/getTemplate"
import updateTemplate from "app/templates/mutations/updateTemplate"
import { TemplateForm, FORM_ERROR } from "app/templates/components/TemplateForm"

export const EditTemplate = () => {
  const router = useRouter()
  const templateId = useParam("templateId", "number")
  const [template, { setQueryData }] = useQuery(
    getTemplate,
    { id: templateId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTemplateMutation] = useMutation(updateTemplate)

  return (
    <>
      <Head>
        <title>Edit Template {template.id}</title>
      </Head>

      <div>
        <h1>Edit Template {template.id}</h1>
        <pre>{JSON.stringify(template, null, 2)}</pre>

        <TemplateForm
          submitText="Update Template"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTemplate}
          initialValues={template}
          onSubmit={async (values) => {
            try {
              const updated = await updateTemplateMutation({
                id: template.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowTemplatePage({ templateId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditTemplatePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTemplate />
      </Suspense>

      <p>
        <Link href={Routes.TemplatesPage()}>
          <a>Templates</a>
        </Link>
      </p>
    </div>
  )
}

EditTemplatePage.authenticate = true
EditTemplatePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTemplatePage
