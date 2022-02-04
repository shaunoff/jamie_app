import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import Container from "app/core/components/Container"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Container className="" centerContents>
      <div className="lg:w-1/3 sm:w-7/12 md:w-1/2 w-9/12">
        <div className="w-full p-6">{/* <Image src={sprightly} alt="sprightly" /> */}</div>
        <SignupForm onSuccess={() => router.push(Routes.Home())} />
      </div>
    </Container>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
// SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
