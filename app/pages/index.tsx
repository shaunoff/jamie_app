import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { useCurrentDay } from "app/core/hooks/useCurrentDay"
import logout from "app/auth/mutations/logout"
import sprightly from "public/sprightly.svg"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const currentDay = useCurrentDay()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          data-tast-id="logout-button"
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <h5>{`${currentDay.monthName}, ${currentDay.daySuffix}, ${currentDay.year}`}</h5>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <div className="h-3/12 w-3/12">
          <Image src={sprightly} alt="sprightly" />
        </div>
        <p>
          <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
        </p>
        <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
        <p>
          <strong>
            To add a new model to your app, <br />
            run the following in your terminal:
          </strong>
        </p>
        <pre>
          <code>blitz generate all project name:string</code>
        </pre>
        <div style={{ marginBottom: "1rem" }}>(And select Yes to run prisma migrate)</div>
        <div>
          <p>
            Then <strong>restart the server</strong>
          </p>
          <pre>
            <code>Ctrl + c</code>
          </pre>
          <pre>
            <code>blitz dev</code>
          </pre>
          <p>
            and go to{" "}
            <Link href="/projects">
              <a>/projects</a>
            </Link>
          </p>
        </div>
        <div className="buttons" style={{ marginTop: "5rem" }}>
          <a
            className="button"
            href="https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <a
            className="button-outline"
            href="https://github.com/blitz-js/blitz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Repo
          </a>
          <a
            className="button-outline"
            href="https://discord.blitzjs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord Community
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Blitz.js
        </a>
      </footer>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
