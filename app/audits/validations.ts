import z from "zod"

export const LocationSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const AuditActionSchema = z.object({
  id: z.number(),
  name: z.string(),
  position: z.number(),
  comment: z.string().optional(),
  assessment: z.number({
    required_error: "Action Items require an Assessment",
  }),
})

export const AuditSectionsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    number: z.number(),
    auditActions: z.array(AuditActionSchema),
  })
)
export const AuditTypeSchema = z.object({
  id: z.number(),
  //TODO: Do we need these in the schema?
  name: z.string(),
  position: z.number(),
  auditSection: AuditSectionsSchema,
})

//todo: move to validations folder
export const AuditFormSchema = z.object({
  location: LocationSchema,
  auditType: AuditTypeSchema,
})
