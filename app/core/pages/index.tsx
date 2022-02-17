import { Suspense, useState } from "react"
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
  const [{ locations }] = useQuery(getLocations, {
    include: {
      auditAssessments: true,
    },
  })

  const [{ regions }] = useQuery(getRegions, {})

  const data = locations.map(({ name, auditAssessments }: any) => {
    let good = 0
    let satisfactory = 0
    let poor = 0
    auditAssessments.forEach((x) =>
      x.assessment == 2 ? (good += 1) : x.assessment === 1 ? (satisfactory += 1) : (poor += 1)
    )
    return {
      name,
      good,
      satisfactory,
      poor,
    }
  })

  const regionData = regions.map((region) => {
    let good = 0
    let satisfactory = 0
    let poor = 0
    region.Location.map(({ auditAssessments }) => {
      auditAssessments.forEach((x) =>
        x.assessment == 2 ? (good += 1) : x.assessment === 1 ? (satisfactory += 1) : (poor += 1)
      )
    })

    return {
      name: region.name,
      good,
      satisfactory,
      poor,
    }
  })

  console.log(regionData)

  const [logoutMutation] = useMutation(logout)
  const [type, setType] = useState("region")

  if (currentUser) {
    return (
      <div>
        <LocationToggle onChange={(e) => setType(e === false ? "region" : "site")} />
        <div className="w-full h-8/12 border bg-white rounded-md shadow-md">
          <ResponsiveContainer width="99%" height={400}>
            <BarChart
              width={500}
              height={300}
              data={type === "region" ? regionData : data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide={type === "site"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="poor" stackId="a" fill="red" />
              <Bar dataKey="satisfactory" stackId="a" fill="orange" />
              <Bar dataKey="good" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]
