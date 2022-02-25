import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createUser from "app/users/mutations/createUser"
import { UserForm, FORM_ERROR } from "app/users/components/UserForm"
import Container from "app/core/components/Container"
import SignupForm from "app/auth/components/SignupForm"

const NewUserPage: BlitzPage = () => {
  const router = useRouter()
  const [createUserMutation] = useMutation(createUser)

  return (
    <div>
      <Container className="" centerContents>
        <div className="lg:w-1/3 sm:w-7/12 md:w-1/2 w-9/12">
          <div className="w-full p-6">{/* <Image src={sprightly} alt="sprightly" /> */}</div>
          <SignupForm onSuccess={() => router.push(Routes.UsersPage())} />
        </div>
      </Container>
      {/* <UserForm
        submitText="Create User"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateUser}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const user = await createUserMutation(values)
            router.push(Routes.ShowUserPage({ userId: user.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      /> */}
    </div>
  )
}

NewUserPage.authenticate = true
NewUserPage.getLayout = (page) => <Layout title={"Create New User"}>{page}</Layout>

export default NewUserPage
