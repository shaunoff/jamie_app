import db from "../index"

const regions = [
  {
    name: "Wales & West",
  },
  {
    name: "Scotland & NI",
  },
  {
    name: "East",
  },
  {
    name: "South East",
  },
  {
    name: "North",
  },
  {
    name: "South West",
  },
]

const createLocations = () => {
  db.region.deleteMany({})

  regions.forEach(async (region) => {
    await db.region.create({
      data: {
        ...region,
      },
    })
  })
}

export default createLocations
