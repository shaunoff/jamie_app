import db, { Day } from "../index"

const createAuditTypes = async () => {
  const actions = db.auditAction.deleteMany()
  const sections = db.auditSection.deleteMany()
  const types = db.auditType.deleteMany()

  await db.$transaction([actions, sections, types])

  const auditTypes = [
    {
      name: "External Audit",
      description: "This a brief description about the external audit",
      position: 0,
      sections: [
        {
          number: 1,
          name: "Raw Materials",
          actions: [
            {
              position: 0,
              name: "Foods and raw materials to be purchased from MOD food contractor or approved supplier.",
            },
            {
              position: 1,
              name: "All deliveries to be inspected to ensure that they are acceptable.",
            },
            {
              position: 2,
              name: "In respect of temperature-sensitive deliveries the temperature to be taken and recorded.",
            },
            { position: 3, name: "Records of delivery checks to be maintained for 12 months." },
            {
              position: 4,
              name: "Rejected, damaged, unfit or contaminated material on delivery to be segregated and clearly labelled.",
            },
            {
              position: 5,
              name: "After checking, goods to be labelled with goods received date and immediately placed in appropriate storage.",
            },
          ],
        },
        {
          number: 2,
          name: "Storage",
          actions: [
            {
              position: 1,
              name: "Food to be stored in clean containers ensuring containers have not previously been used for contaminants like cleaning chemicals.",
            },
            {
              position: 0,
              name: "Stock to be arranged on a first in, first out basis, ensuring date expired items removed from storage.",
            },
            {
              position: 2,
              name: "Containers to be kept off the floor or in other hygienic locations.",
            },
            {
              position: 3,
              name: "Temperature sensitive foods to be kept under temperature control and temperatures recorded at least thrice daily, keeping records for 12 months.",
            },
          ],
        },
        {
          number: 3,
          name: "Preparation",
          actions: [
            {
              position: 0,
              name: "Raw food and food to be served without further heat treatment to be kept apart at all times.",
            },
            {
              position: 1,
              name: "Foods during thawing to be kept separate from other foods; thawed in suitable areas and are completely thawed before use.",
            },
            { position: 2, name: "Minimise food handling as much as possible." },
            {
              position: 3,
              name: "Ensure frequent washing of hands during each task and between different tasks. Wash hand basins only must be used for hand washing.",
            },
            {
              position: 4,
              name: "Ensure temperature-sensitive foods are kept as cool as possible during preparation and return to temperature control when appropriate.",
            },
            {
              position: 5,
              name: "Worktables must be kept clean and tidy.  Where possible one surface is to be used for one purpose only and washed, sanitised and dried between each task.",
            },
            {
              position: 6,
              name: "Separate tools and utensils for preparing raw and high-risk foods are to be used. As a minimum, knives and boards must be colour coded. The colour code is to be displayed.",
            },
            {
              position: 7,
              name: "Paper towels are preferably to be used as wiping cloths.  Where material cloths are used, they must be clean, discarded or sterilised at the end of the day and colour coded if used in raw and prepared food areas.",
            },
          ],
        },
        {
          number: 4,
          name: "Cooking",
          actions: [
            {
              position: 1,
              name: "Ensure food is thoroughly cooked to a core temperature of 750C, recording temperatures and maintaining records for 12 months.",
            },
            { position: 2, name: "Ensure foods are not contaminated after cooking." },
            {
              position: 3,
              name: "Ensure foods to be cooked are chilled and stored <80C within 90 minutes. Cook: Chill <50C within 90 minutes.",
            },
            {
              position: 4,
              name: "Ensure when reheating foods that they are thoroughly heated to a core temperature of 820C for 2 mins in Scotland and 750C for 2 mins in the rest of UK. Record temperatures and maintaining records for 12 months.",
            },
          ],
        },
        {
          number: 5,
          name: "Service",
          actions: [
            {
              position: 1,
              name: "Ensure foods kept hot before service are held at a temperature in excess of 630C.",
            },
            {
              position: 2,
              name: "Ensure foods to be served cold are kept at a temperature below <80C.",
            },
            { position: 3, name: "Ensure that foods held for service are not contaminated." },
            {
              position: 4,
              name: "Ensure that containers in which prepared foods are placed are in a clean and sanitised condition.",
            },
          ],
        },
        {
          number: 6,
          name: "Cleaning",
          actions: [
            {
              position: 1,
              name: "Ensure that a comprehensive cleaning schedule and cleaning materials chart are maintained.",
            },
            {
              position: 2,
              name: "Ensure that suitable cleaning materials and chemicals are available for use, suitably stored and utilised to prevent product contamination.",
            },
            { position: 3, name: "Ensure that cleaning equipment is kept in a clean condition." },
            {
              position: 4,
              name: "Ensure that adequate protective clothing is available for staff when carrying out cleaning tasks.",
            },
            {
              position: 5,
              name: "Ensure that all food and hand contact surfaces are maintained in a clean condition.",
            },
            {
              position: 6,
              name: "Ensure that all other areas are maintained in a clean condition.",
            },
          ],
        },
        {
          number: 7,
          name: "Pest Control",
          actions: [
            {
              position: 1,
              name: "Employ an Environmental Health approved contractor to carry out surveys and treatments, in respect of pests.",
            },
            { position: 2, name: "Maintain the premises free of pests." },
            {
              position: 3,
              name: "Maintain the premises pest proof so that pests cannot gain entry.",
            },
            {
              position: 4,
              name: "Ensure all refuse is removed from kitchen as quickly as possible, is never left in such areas overnight and is stored correctly prior to collection in a manner to prevent attraction of pests.",
            },
            {
              position: 5,
              name: "Ensure that electric fly killing devices are in suitable locations, kept clean and in working order.",
            },
          ],
        },
        {
          number: 8,
          name: "Personnel",
          actions: [
            {
              position: 1,
              name: "Food handlers, prior to employment, to complete a medical questionnaire which is to be examined by a competent person to determine the suitability of the applicant for food handling tasks.",
            },
            { position: 2, name: "Persons returning to work after sickness, to be assessed." },
            {
              position: 3,
              name: "Food handlers to be provided with and wear clean protective clothing which completely covers their ordinary clothing and prevents contamination of food.",
            },
            {
              position: 4,
              name: "Adequate first aid facilities are to be readily available including the provision and use of blue waterproof plasters to cover any cut or wound.",
            },
          ],
        },
        {
          number: 9,
          name: "Management Control",
          actions: [
            {
              position: 1,
              name: "Ensure the premises and equipment are maintained in a good state of repair, especially surfaces and equipment that come into contact with food.",
            },
            {
              position: 2,
              name: "Ensure that temperature-controlled areas, rooms and equipment are maintained in a good working order.",
            },
            {
              position: 3,
              name: "Ensure that all probe thermometers and other temperature measuring devices are calibrated at least annually.",
            },
            {
              position: 4,
              name: "Ensure that visitors, maintenance workers, observe appropriate hygiene practices.",
            },
          ],
        },
      ],
    },
    {
      name: "Cleaning and Estate Audit",
      description: "This a brief description about the cleaning and Estate audit",
      position: 1,
      sections: [
        {
          number: -1,
          name: "none",
          actions: [
            {
              position: 1,
              name: "Ensure the premises and equipment are maintained in a good state of repair, especially surfaces and equipment that come into contact with food.",
            },
            {
              position: 2,
              name: "Ensure that temperature-controlled areas, rooms and equipment are maintained in a good working order.",
            },
            {
              position: 3,
              name: "Ensure that all probe thermometers and other temperature measuring devices are calibrated at least annually.",
            },
            {
              position: 4,
              name: "Ensure that visitors, maintenance workers, observe appropriate hygiene practices.",
            },
          ],
        },
      ],
    },
    {
      name: "Food Audit",
      description: "This a brief description about the food audit",
      position: 2,
      sections: [
        {
          number: -1,
          name: "none",
          actions: [
            {
              position: 1,
              name: "Ensure the premises and equipment are maintained in a good state of repair, especially surfaces and equipment that come into contact with food.",
            },
            {
              position: 2,
              name: "Ensure that temperature-controlled areas, rooms and equipment are maintained in a good working order.",
            },
            {
              position: 3,
              name: "Ensure that all probe thermometers and other temperature measuring devices are calibrated at least annually.",
            },
            {
              position: 4,
              name: "Ensure that visitors, maintenance workers, observe appropriate hygiene practices.",
            },
          ],
        },
      ],
    },
  ]

  auditTypes.forEach(async (auditType) => {
    const type = await db.auditType.create({
      data: {
        name: auditType.name,
        description: auditType.description,
        position: auditType.position,
      },
    })
    auditType.sections.forEach(async (auditSection) => {
      const section = await db.auditSection.create({
        data: {
          name: auditSection.name,
          auditTypeId: type.id,
          number: auditSection.number,
        },
      })
      auditSection.actions.forEach(async (auditAction) => {
        const action = await db.auditAction.create({
          data: {
            name: auditAction.name,
            auditSectionId: section.id,
            position: auditAction.position,
          },
        })
      })
    })
  })
}

export default createAuditTypes

// data.forEach(async (section) => {
//   await db.section.create({
//     data: {
//       ...section,
//       actions: {
//         create: section.actions,
//       },
//     },
//   })
// })
