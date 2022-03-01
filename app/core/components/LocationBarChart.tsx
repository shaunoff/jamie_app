import React, { Dispatch, useEffect, useRef, useState } from "react"
import { Image, Routes, useQuery, useRouter } from "blitz"
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
import { Region, AuditAssessment, Location, Day } from "db"
import Tabs from "app/shared/components/Tabs"
import LocationsMap from "./LocationsMap"

import getBasicAuditTypes from "app/audit-types/queries/getBasicAuditTypes"
import getAudits from "app/audits/queries/getAudits"
import SelectMenu from "app/shared/components/SelectMenu"
import Loading from "app/shared/components/Loading"

const LocationBarChart = () => {
  const hasDates = useRef<null | number[]>(null)

  const [{ auditTypes }] = useQuery(getBasicAuditTypes, {})

  const [{ audits, dates }] = useQuery(getAudits, {})

  const [type, setType] = useState("site")

  const normalizedMonths = dates.map((month) => ({
    value: month.id,
    label: `${month.monthName}, ${month.year}`,
  }))

  const [dateId, setDateId] = useState<number | null>(null)

  const [regionData] = useQuery(
    getRegions,
    {
      include: {
        Location: {
          // include: {
          //   auditAssessments: true,
          // },
          select: {
            auditAssessments: {
              where: {
                monthId: dateId,
              },
            },
          },
        },
      },
    },
    {
      enabled: !!dateId,
    }
  )

  const [locationData] = useQuery(
    getLocations,
    {
      include: {
        region: true,
        auditAssessments: {
          where: {
            monthId: dateId,
          },
        },
      },
    },
    {
      enabled: !!dateId,
    }
  )

  useEffect(() => {
    if (dates.length && dates[0]?.id) {
      setDateId(dates[0]?.id)
    }
  }, [dates])

  if (!regionData || !dateId || !locationData) {
    return <Loading className="w-full h-full flex justify-center items-center" />
  }

  return (
    <div className="flex flex-wrap">
      <div className="flex justify-between w-full md:w-1/2 flex-col">
        <div className="flex justify-between">
          <LocationToggle onChange={(e) => setType(e === false ? "site" : "region")} />
          <div className="w-80">
            <SelectMenu
              items={normalizedMonths}
              onChange={(month) => setDateId(month)}
              value={dateId}
            />
          </div>
        </div>
        {auditTypes.map((auditType) => {
          return (
            <div
              key={auditType.id}
              className="w-full h-8/12 border bg-white rounded-md shadow-md p-2 mb-2"
            >
              <Chart
                regions={regionData?.regions!}
                locations={locationData?.locations!}
                auditTypeId={auditType?.id}
                dates={dates}
                dateId={dateId!}
                setDateId={setDateId}
                type={type}
                name={auditType.name}
              />
            </div>
          )
        })}
      </div>
      <div className="w-full md:w-1/2 pl-2 h-screen">
        <LocationsMap
          locations={locationData?.locations}
          regions={regionData?.regions!}
          auditTypeId={auditTypes[0]?.id}
        />
      </div>
    </div>
  )
}

export default LocationBarChart

interface ChartProps {
  regions: (Region & {
    Location: (Location & {
      auditAssessments: AuditAssessment[]
    })[]
  })[]
  locations: (Location & {
    region: Region | null
    auditAssessments: AuditAssessment[]
  })[]
  auditTypeId?: number
  dates: Day[]
  dateId: number
  setDateId: Dispatch<number | null>
  type: string
  name: string
}

const Chart: React.FC<ChartProps> = ({
  regions,
  locations,
  auditTypeId,
  dates,
  dateId,
  setDateId,
  type,
  name,
}) => {
  const router = useRouter()

  const data = getLocationData(locations ?? [], auditTypeId)

  const regionData = (regions ?? []).map((region) => {
    let good = 0
    let satisfactory = 0
    let poor = 0
    let auditIds = new Set()
    region.Location.map(({ auditAssessments }) => {
      const mapFunction = (x: AuditAssessment) => {
        x.assessment == 2 ? (good += 1) : x.assessment === 1 ? (satisfactory += 1) : (poor += 1)
        auditIds.add(x.auditId)
      }

      if (auditTypeId) {
        auditAssessments.filter((x) => x.auditTypeId === auditTypeId).forEach(mapFunction)
      }
    })

    return {
      name: region.name,
      good,
      satisfactory,
      poor,
      auditIds,
    }
  })
  return (
    <>
      <h1 className="p-1 font-lg text-lg text-blue-600">{name}</h1>
      <ResponsiveContainer width="99%" height={200}>
        <BarChart
          width={300}
          height={200}
          data={type === "region" ? regionData : data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          onClick={(e) => {
            if (type === "site") {
              const id = Array.from(e.activePayload?.[0].payload.auditIds)[0] as number
              console.log(id)
              router.push(Routes.EditAuditPage({ auditId: id }))
            }
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
    </>
  )
}

export const getLocationData = (
  locations: (Location & {
    region: Region | null
    auditAssessments: AuditAssessment[]
  })[],
  auditTypeId?: number
) => {
  return (locations ?? []).map(({ name, auditAssessments, lat, lng }) => {
    let good = 0
    let satisfactory = 0
    let poor = 0
    let auditIds = new Set()
    const mapFunction = (x: AuditAssessment) => {
      x.assessment == 2 ? (good += 1) : x.assessment === 1 ? (satisfactory += 1) : (poor += 1)
      auditIds.add(x.auditId)
    }
    // console.log(auditAssessments)
    if (auditTypeId) {
      auditAssessments.filter((x) => x.auditTypeId === auditTypeId).forEach(mapFunction)
    }
    return {
      name,
      good,
      satisfactory,
      poor,
      auditIds,
      lat,
      lng,
    }
  })
}

export type LocationData = ReturnType<typeof getLocationData>
