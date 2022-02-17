import { Form, FormProps } from "app/core/components/Form"
import { LabeledInputField } from "app/core/components/LabeledInputField"
import SelectMenuField from "app/shared/components/SelectMenuField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"
import getRegions from "app/regions/queries/getRegions"
import { useQuery } from "blitz"

export function LocationForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [{ regions }] = useQuery(getRegions, {})
  return (
    <Form<S> {...props}>
      <div className="pt-8">
        {/* <div>
          <h3 className="text-xl leading-6 font-bold text-gray-800">Create Location</h3>
          <p className="mt-1 text-sm text-gray-500">
            This is a place to put location information or some other words bla bla
          </p>
        </div> */}
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6 md:col-span-6 lg:col-span-2">
            <LabeledInputField name="name" label="Location Name" placeholder="Location Name" />
          </div>

          <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
            <LabeledInputField name="address1" label="Address 1" placeholder="Address 1" />
          </div>

          <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
            <LabeledInputField name="address2" label="Address 2" placeholder="Address 2" />
          </div>
          <div className="sm:col-span-2">
            <LabeledInputField name="city" label="City" placeholder="City" />
          </div>

          <div className="sm:col-span-2">
            {" "}
            <LabeledInputField name="county" label="County" placeholder="County" />
          </div>

          <div className="sm:col-span-2">
            <LabeledInputField name="postCode" label="Post Code" placeholder="PostCode" />
          </div>
          <div className="sm:col-span-2">
            <LabeledInputField name="poc" label="Point of Contact" placeholder="Point of Contact" />
          </div>

          <div className="sm:col-span-2">
            <LabeledInputField name="contact" label="Contact Number" placeholder="Contact Number" />
          </div>
          <div className="sm:col-span-2">
            <SelectMenuField
              name="regionId"
              items={regions.map((region) => ({ value: region.id, label: region.name }))}
              label="Region"
            />
          </div>
        </div>
      </div>
    </Form>
  )
}
