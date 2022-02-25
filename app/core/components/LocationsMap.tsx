import React, { useState, memo, useRef, useEffect } from "react"
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import { Location, Region, AuditAssessment } from "@prisma/client"
import { getLocationData } from "./LocationBarChart"

const render = (status: Status) => {
  return <h1>{status}</h1>
}

interface LocationsMapProps {
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
  return (
    <div className="w-full h-full border bg-white rounded-md shadow-md p-4">
      <Wrapper apiKey={apiKey} render={render}>
        <MyMapComponent center={center} zoom={zoom} locations={locations}>
          {locationData
            .filter((loc) => !!loc.lat)
            .reduce((acc, location, i) => {
              return [
                ...acc,
                ...[
                  <Circle
                    key={i + "good"} // eslint-disable-line react/no-array-index-key
                    center={{
                      lat: location.lat!,
                      lng: location.lng!,
                    }}
                    radius={1200 * location.good}
                    fillColor="green"
                    strokeColor="green"
                  />,
                  <Circle
                    key={i + "ok"} // eslint-disable-line react/no-array-index-key
                    center={{
                      lat: location.lat!,
                      lng: location.lng!,
                    }}
                    radius={1200 * location.satisfactory}
                    fillColor="orange"
                    strokeColor="orange"
                  />,
                  <Circle
                    key={i + "poor"} // eslint-disable-line react/no-array-index-key
                    center={{
                      lat: location.lat!,
                      lng: location.lng!,
                    }}
                    radius={1200 * location.poor}
                    fillColor="red"
                    strokeColor="red"
                  />,
                ],
              ]
            }, [])}
        </MyMapComponent>
      </Wrapper>
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

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { zoom, center }))
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
  }, [ref, map, center, zoom])

  return (
    <div ref={ref} id="map" style={{ height: "100%" }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map })
        }
      })}
    </div>
  )
}

export default LocationsMap

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>()

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker())
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null)
      }
    }
  }, [marker])

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options)
    }
  }, [marker, options])

  return null
}

const Circle: React.FC<google.maps.CircleOptions> = (options) => {
  const [circle, setCircle] = React.useState<google.maps.Circle>()

  React.useEffect(() => {
    if (!circle) {
      setCircle(new google.maps.Circle())
    }

    // remove marker from map on unmount
    return () => {
      if (circle) {
        circle.setMap(null)
      }
    }
  }, [circle])

  React.useEffect(() => {
    if (circle) {
      circle.setOptions({
        strokeOpacity: 1,
        strokeWeight: 0.5,
        fillOpacity: 0.2,
        ...options,
      })
    }
  }, [circle, options])

  return null
}
// useEffect(() => {
//   if (map) {
//     const boundInstance = new window.google.maps.LatLngBounds()
//     let bounds
//     if (locations.length) {
//       bounds = locations.map(
//         (location) =>
//           new window.google.maps.LatLng(
//             parseFloat(location.latitude),
//             parseFloat(location.longitude),
//           ),
//       )
//     } else {
//       bounds = [
//         new window.google.maps.LatLng(defaultBounds.lat, defaultBounds.lng),
//       ]
//     }

//     bounds.forEach((latLng) => {
//       boundInstance.extend(latLng)
//     })

//     map.fitBounds(boundInstance)
//   }
// }, [map, locations])
