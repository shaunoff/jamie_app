import { useRouter, BlitzPage, Image } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import Container from "app/core/components/Container"
import logo from "public/logo.jpeg"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Container className="" centerContents>
      <div className="lg:w-1/3 sm:w-7/12 md:w-1/2 w-9/12 bg-white p-4 rounded-lg shadow-lg">
        <div className="w-full p-6">{/* <Image src={logo} alt="logo" /> */}</div>
        <LoginForm
          onSuccess={(_user) => {
            const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
            router.push(next)
          }}
        />
      </div>
    </Container>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
// LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
