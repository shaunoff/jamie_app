import { useMutation } from "blitz"
import { LabeledInputField } from "app/core/components/LabeledInputField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div>
      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "", name: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledInputField name="name" label="Name" placeholder="Name" data-testid="signup-name" />
        <LabeledInputField
          name="email"
          label="Email"
          placeholder="Email"
          data-testid="signup-email"
        />
        <LabeledInputField
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          data-testid="signup-password"
        />
      </Form>
    </div>
  )
}

export default SignupForm
