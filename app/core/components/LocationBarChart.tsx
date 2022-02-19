import React, { useEffect, useRef, useState } from "react"
import { Image, useQuery } from "blitz"
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

import getBasicAuditTypes from "app/audit-types/queries/getBasicAuditTypes"
import getAudits from "app/audits/queries/getAudits"
import SelectMenu from "app/shared/components/SelectMenu"

const LocationBarChart = () => {
  const hasDates = useRef<null | number[]>(null)
  const [{ locations }] = useQuery(getLocations, {})
  const [{ auditTypes }] = useQuery(getBasicAuditTypes, {})
  const [{ audits, dates }] = useQuery(getAudits, {})

  const [{ regions }] = useQuery(getRegions, {})

  console.log("dates", dates)

  return (
    <div className="w-full h-8/12 border bg-white rounded-md shadow-md p-2">
      <Tabs tabs={auditTypes}>
        {({ currentIndex }) => {
          return (
            <Chart
              regions={regions}
              locations={locations}
              auditTypeId={auditTypes[currentIndex]?.id}
              dates={dates}
            />
          )
        }}
      </Tabs>
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
}

const Chart: React.FC<ChartProps> = ({ regions, locations, auditTypeId, dates }) => {
  const [type, setType] = useState("region")

  const normalizedMonths = dates.map((month) => ({
    value: month.id,
    label: `${month.monthName}, ${month.year}`,
  }))

  const [selectedMonth, setSelectedMonth] = useState(dates[0]?.id)

  const data = locations.map(({ name, auditAssessments }) => {
    let good = 0
    let satisfactory = 0
    let poor = 0
    const mapFunction = (x: AuditAssessment) =>
      x.assessment == 2 ? (good += 1) : x.assessment === 1 ? (satisfactory += 1) : (poor += 1)
    console.log(auditAssessments)
    if (auditTypeId) {
      auditAssessments.filter((x) => x.auditTypeId === auditTypeId).forEach(mapFunction)
    }
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
      const mapFunction = (x: AuditAssessment) =>
        x.assessment == 2 ? (good += 1) : x.assessment === 1 ? (satisfactory += 1) : (poor += 1)

      if (auditTypeId) {
        auditAssessments.filter((x) => x.auditTypeId === auditTypeId).forEach(mapFunction)
      }
    })

    return {
      name: region.name,
      good,
      satisfactory,
      poor,
    }
  })
  return (
    <>
      <div className="flex justify-between">
        <LocationToggle onChange={(e) => setType(e === false ? "region" : "site")} />
        <div className="w-80">
          <SelectMenu
            items={normalizedMonths}
            onChange={(month) => setSelectedMonth(month)}
            value={selectedMonth}
          />
        </div>
      </div>
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
    </>
  )
}
