import React, { Component, useCallback, useEffect, useRef, useState } from "react"
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import { useField, useForm } from "react-final-form"
import Input from "app/core/components/Input"

interface GoogleAddressFieldProps {
  label: string
  disabled?: boolean
  name: string
  placeholder?: string
}

const GoogleAddressField: React.FC<GoogleAddressFieldProps> = (props) => {
  const form = useForm()
  const mapRef = useRef<google.maps.places.Autocomplete>()
  const [domNode, setDomNode] = useState(null)

  const apiKey = process.env.GOOGLE_MAPS

  const onRefChange = useCallback((node) => {
    setDomNode(node)
  }, [])

  const {
    input,
    meta: { touched, error, submitError, submitting },
  } = useField(props.name)

  useEffect(() => {
    const fillInAddress = () => {
      const place = mapRef.current?.getPlace()
      let address1 = ""
      const location = place?.geometry?.location
      if (location) {
        form.change("lat", location.lat())
        form.change("lng", location.lng())
      }
      for (const component of place?.address_components as google.maps.GeocoderAddressComponent[]) {
        const componentType = component.types[0]
        switch (componentType) {
          case "street_number": {
            address1 = `${component.long_name} ${address1}`
            break
          }

          case "route": {
            address1 += component.short_name
            break
          }

          case "postal_code": {
            form.change("postCode", `${component.long_name}`)
            break
          }
          case "postal_town": {
            form.change("city", `${component.long_name}`)
            break
          }

          case "postal_code_suffix": {
            form.change("postCode", `${component.long_name}`)
            break
          }

          case "administrative_area_level_2": {
            form.change("county", `${component.short_name}`)
            break
          }
        }
      }
      form.change("address1", `${address1}`)
    }
    if (domNode && !mapRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(domNode, {
        componentRestrictions: { country: "uk" },
        fields: ["address_components", "geometry", "name", "name"],
        types: ["address"],
      })
      autocomplete.addListener("place_changed", fillInAddress)
      mapRef.current = autocomplete
    }
  }, [domNode, form])

  if (!apiKey) {
    return <div>No map API KEY</div>
  } else {
    const geoError = form.getState().errors?.lat ? form.getState().errors?.lat : null
    const normalizedError = Array.isArray(error)
      ? error.join(", ")
      : error || submitError || geoError
    return (
      <Wrapper apiKey={apiKey} libraries={["places"]}>
        <form>
          <Input
            ref={onRefChange}
            autoComplete="off"
            {...props}
            error={touched && normalizedError}
            valid={input.value && touched && !error}
          />
        </form>
      </Wrapper>
    )
  }
}

export default GoogleAddressField
