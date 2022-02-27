import React, { useState, memo, useRef, useEffect } from "react"
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import { Location, Region, AuditAssessment } from "@prisma/client"
import { getLocationData } from "./LocationBarChart"
import ReactDOMServer from "react-dom/server"
import { Pie, PieChart, ResponsiveContainer } from "recharts"
import GoogleMap from "./GoogleMap"
import Chart from "./Chart"

const render = (status: Status) => {
  return <h1>{status}</h1>
}

export interface LocationsMapProps {
  locations: (Location & {
    region: Region | null
    auditAssessments: AuditAssessment[]
  })[]
  regions: Region[]
  auditTypeId?: number
}

const LocationsMap: React.FC<LocationsMapProps> = ({ locations, auditTypeId }) => {
  const locationData = getLocationData(locations, auditTypeId)
  const center = { lat: 54.5, lng: -4 }
  const zoom = 6.15

  const apiKey = process.env.GOOGLE_MAPS
  if (!apiKey) {
    return <div>No map API KEY</div>
  }
  console.log("render")
  return (
    <div className="w-full h-full border bg-white rounded-md shadow-md p-4">
      <GoogleMap locations={locationData} />
    </div>
  )
}

interface MyMapComponentProps {
  center: google.maps.LatLngLiteral
  zoom: number
  locations: Location[]
}

const MyMapComponent: React.FC<MyMapComponentProps> = ({ center, zoom, locations, children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>()

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { zoom, center }))
      setInfoWindow(new window.google.maps.InfoWindow())
    }
    if (map) {
      const boundInstance = new window.google.maps.LatLngBounds()
      let bounds: any = [{ lat: 54.5, lng: -4 }]
      bounds = locations
        .filter((loc) => !!loc.lat)
        .map((location) => new window.google.maps.LatLng(location.lat!, location.lng!))
      bounds.forEach((latLng) => {
        boundInstance.extend(latLng)
      })

      map.fitBounds(boundInstance)
    }
  }, [ref, map, center, zoom, infoWindow, locations])

  return (
    <div ref={ref} id="map" style={{ height: "100%" }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map, infoWindow })
        }
      })}
    </div>
  )
}

export default LocationsMap
