import db, { Section } from "../index"

const createSections = async () => {
  await db.section.deleteMany({})

  const data = [
    { number: "1", name: "Raw Materials" },
    { number: "2", name: "Storage" },
    { number: "3", name: "Preparation" },
    { number: "4", name: "Cooking" },
    { number: "5", name: "Service" },
    { number: "6", name: "Cleaning" },
    { number: "7", name: "Pest Control" },
    { number: "8", name: "Personnel" },
    { number: "9", name: "Management Control" },
  ]

  return db.section.createMany({ data })
}

export default createSections
