import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import week from "dayjs/plugin/weekOfYear"
import dayYear from "dayjs/plugin/dayOfYear"

dayjs.extend(dayYear)
dayjs.extend(advancedFormat)
dayjs.extend(week)

const startDate = dayjs("2022-06-25")

const id = parseInt(startDate.format("YYYYMMDD"))
const actualDate = startDate.format("YYYY-MM-DD")
const year = parseInt(startDate.format("YYYY"))
const weekOfYear = parseInt(startDate.format("w"))
const unix = parseInt(startDate.format("X"))
const dayOfWeek = parseInt(startDate.format("d"))
const dayOfMonth = parseInt(startDate.format("D"))
const daySuffix = startDate.format("Do")
const dayName = startDate.format("dddd")
const dayOfYear = startDate.dayOfYear()
const monthOfYear = parseInt(startDate.format("M"))
const monthNameAbbreviated = startDate.format("MMM")
const monthName = startDate.format("MMMM")
const mmyyyy = startDate.format("MMYYYY")
const mmddyyyy = startDate.format("MMDDYYYY")

const data = {
  id,
  unix,
  actualDate,
  year,
  weekOfYear,
  dayOfWeek,
  dayOfMonth,
  daySuffix,
  dayName,
  dayOfYear,
  monthOfYear,
  monthNameAbbreviated,
  monthName,
  isWeekend: dayOfWeek >= 6,
  mmyyyy,
  mmddyyyy,
}

export default data
