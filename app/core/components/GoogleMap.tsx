import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api"
import React, { useCallback, useEffect, useState } from "react"
import { Pie, PieChart, ResponsiveContainer } from "recharts"
import Chart from "./Chart"
import { LocationData } from "./LocationBarChart"

const containerStyle = {
  width: "100%",
  height: "100%",
}

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
]

//Default to Boston
const defaultBounds = {
  lat: 42.3601,
  lng: -71.0589,
}

interface GoogleMapProps {
  locations: LocationData
  style?: React.CSSProperties
}

const GoogleMapContainer: React.FC<GoogleMapProps> = ({ locations, style = {} }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS!,
  })
  const [map, setMap] = React.useState<null | google.maps.Map>(null)

  useEffect(() => {
    if (map) {
      const boundInstance = new window.google.maps.LatLngBounds()
      let bounds
      if (locations.length) {
        bounds = locations
          .filter((loc) => loc.lat)
          .map((location) => new window.google.maps.LatLng(location.lat!, location.lng!))
      } else {
        bounds = [new window.google.maps.LatLng(defaultBounds.lat, defaultBounds.lng)]
      }

      bounds.forEach((latLng) => {
        boundInstance.extend(latLng)
      })

      map.fitBounds(boundInstance)
    }
  }, [map, locations])

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setOptions({ maxZoom: 15 })
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ ...containerStyle, ...style }}
      center={defaultBounds}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {locations
        .filter((loc) => loc.lat)
        .map((location, i) => (
          <Marker
            onClick={(e) => setActiveIndex(i)}
            key={i} // eslint-disable-line react/no-array-index-key
            position={{
              lat: location.lat!,
              lng: location.lng!,
            }}
          >
            {activeIndex === i && (
              <InfoWindow onCloseClick={() => setActiveIndex(null)}>
                <Chart location={location} />
              </InfoWindow>
            )}
          </Marker>
        ))}
    </GoogleMap>
  ) : (
    <div style={{ ...containerStyle, ...style }}>Loading</div>
  )
}
export default GoogleMapContainer
