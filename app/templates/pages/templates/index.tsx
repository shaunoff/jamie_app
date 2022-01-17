import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTemplates from "app/templates/queries/getTemplates"

const ITEMS_PER_PAGE = 100

export const TemplatesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ templates, hasMore }] = usePaginatedQuery(getTemplates, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {templates.map((template) => (
          <li key={template.id}>
            <Link href={Routes.ShowTemplatePage({ templateId: template.id })}>
              <a>{template.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TemplatesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Templates</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTemplatePage()}>
            <a>Create Template</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TemplatesList />
        </Suspense>
      </div>
    </>
  )
}

TemplatesPage.authenticate = true
TemplatesPage.getLayout = (page) => <Layout>{page}</Layout>

export default TemplatesPage
