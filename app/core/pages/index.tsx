import { Suspense, useState } from "react"
import LocationBarChart from "../components/LocationBarChart"
import { Image, Link, BlitzPage, useMutation, useQuery, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import getLocations from "app/locations/queries/getLocations"
import getRegions from "app/regions/queries/getRegions"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import LocationToggle from "app/core/components/LocationToggle"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <div>
        <LocationBarChart />
        <div
          onClick={async () => {
            await logoutMutation()
          }}
        >
          logout
        </div>
      </div>
    )
  } else {
    throw Error("Only Users are able to access this Area")
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  )
}

Home.authenticate = { redirectTo: "/login" }
Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Audit Report">{page}</Layout>

export default Home
