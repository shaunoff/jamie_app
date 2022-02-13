import createDates from "./seedFunctions/createDates"
import createAuditTypes from "./seedFunctions/createAuditTypes"
import createLocations from "./seedFunctions/createLocations"
import db from "./index"
//const fs = require("fs")
/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  await createAuditTypes()
  await createLocations()
  await createDates()
  // const locations = await db.location.findMany()
  // console.log(locations)
  // //createDates()
  // fs.writeFile("user.json", JSON.stringify(locations), (err) => {
  //   if (err) {
  //     throw err
  //   }
  //   console.log("JSON data is saved.")
  // })
  //createSections()
  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }
}

export default seed
