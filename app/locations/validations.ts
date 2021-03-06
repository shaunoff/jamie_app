import { string, z } from "zod"

export const CreateLocation = z.object({
  name: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  county: z.string().optional(),
  postCode: z.string(),
  poc: z.string(),
  contact: z.string(),
  regionId: z.number().optional(),
  lat: z.number({ required_error: "Valid Address Required" }),
  lng: z.number({ required_error: "Valid Address Required" }),
})

export const UpdateLocation = z.object({
  id: z.number(),
  name: z.string(),
  address1: z.string(),
  address2: z.string().nullable(),
  city: z.string(),
  county: z.string().nullable(),
  postCode: z.string(),
  poc: z.string(),
  contact: z.string(),
  regionId: z.number(),
  lat: z.number({ required_error: "Valid Address Required" }),
  lng: z.number({ required_error: "Valid Address Required" }),
})
