import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  Head,
  BlitzPage,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"

import "app/core/styles/index.css"
import { Suspense } from "react"
import Loading from "app/shared/components/Loading"

function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        onReset={useQueryErrorResetBoundary().reset}
      >
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}

const AppSuspense = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Suspense fallback={<Loading className="w-full h-full flex justify-center items-center" />}>
        <App Component={Component} {...pageProps} />
      </Suspense>
    </div>
  )
}

export default AppSuspense
