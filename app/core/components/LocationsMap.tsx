import React, { useState, memo, useRef, useEffect } from "react"
import { Wrapper, Status } from "@googlemaps/react-wrapper"

const render = (status: Status) => {
  return <h1>{status}</h1>
}

const LocationsMap = () => {
  const center = { lat: 54.5, lng: -4 }
  const zoom = 6.15

  const apiKey = process.env.GOOGLE_MAPS
  if (!apiKey) {
    return <div>No map API KEY</div>
  }
  return (
    <div className="w-full h-full border bg-white rounded-md shadow-md p-4">
      <Wrapper apiKey={apiKey} render={render}>
        <MyMapComponent center={center} zoom={zoom} />
      </Wrapper>
    </div>
  )
}

function MyMapComponent({ center, zoom }: { center: google.maps.LatLngLiteral; zoom: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { zoom, center }))
    }
  }, [ref, map, center, zoom])

  return <div ref={ref} id="map" style={{ height: "100%" }} />
}

export default LocationsMap
