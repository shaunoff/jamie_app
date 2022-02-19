import { fn } from "cypress/types/jquery"
import db from "../index"
// const CreateAudit = z.object({
//   comment: z.string().optional(),
//   locationId: z.number(),
//   dateId: z.number(),
//   auditTypeId: z.number(),
//   auditAssessments: z.object({
//     create: z.array(
//       z.object({
//         assessment: z.number(),
//         comment: z.string().nullable(),
//         sectionId: z.number(),
//         actionId: z.number(),
//         auditTypeId: z.number(),
//       })
//     ),
//   }),
// })

const createAudits = async () => {
  console.log("seeeding CREATE_AUDITS")
  const actions = await db.auditAssessment.deleteMany()
  const sections = await db.audit.deleteMany()
  console.log("removed current audits")

  const assessmentPromises: any = []
  const months = [20220101, 20220201]
  const locations = await db.location.findMany({})
  const auditTypes = await db.auditType.findMany({
    include: {
      auditSection: {
        orderBy: {
          number: "asc",
        },
        include: {
          auditActions: {
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
    orderBy: {
      position: "asc",
    },
  })

  months.forEach(async (monthId, monthIndex) => {
    locations.forEach(async (location, locationIndex) => {
      auditTypes.forEach(async (auditType, auditTypeIndex) => {
        const testy = setTimeout(() => {}, 100)
        console.log(
          "month",
          monthIndex + 1,
          "location",
          locationIndex + 1,
          "auditType",
          auditTypeIndex + 1
        )
        const assessments: any = []
        auditType.auditSection.forEach((section) => {
          section.auditActions.forEach((action) => {
            const assess = Math.floor(Math.random() * 3)
            const assessment = {
              assessment: assess,
              comment: assess === 0 ? "random comment" : null,
              sectionId: section.id,
              actionId: action.id,
              auditTypeId: auditType.id,
              locationId: location.id,
              monthId,
            }
            assessments.push(assessment)
          })
        })
        const data = {
          auditTypeId: auditType.id,
          locationId: location.id,
          dateId: monthId,
          auditAssessments: {
            create: assessments,
          },
        }

        assessmentPromises.push(() => db.audit.create({ data }))
      })
    })
  })

  sequence(assessmentPromises)
}

export default createAudits

const sequence = (tasks: any[]) => {
  return tasks.reduce(
    async (promise: any, task: any) => await promise.then(() => task()),
    Promise.resolve()
  )
}
