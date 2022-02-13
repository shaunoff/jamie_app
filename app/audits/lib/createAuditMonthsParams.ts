import { Prisma } from "@prisma/client"
import dayjs from "dayjs"

const currentMonth = dayjs().month()
const currentMonthYear = dayjs().year()

const prevMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1
const prevMonthYear = currentMonth < prevMonth ? currentMonthYear - 1 : currentMonthYear

const nextMonth = currentMonth + 1 === 12 ? 0 : currentMonth + 1
const nextMonthYear = nextMonth < currentMonth ? currentMonthYear + 1 : currentMonthYear

const createAuditMonthsParams = (): Prisma.DayWhereInput => {
  return {
    OR: [
      {
        AND: [
          {
            dayOfMonth: { equals: 1 },
          },
          {
            monthOfYear: { equals: prevMonth + 1 },
          },
          {
            year: { equals: prevMonthYear },
          },
        ],
      },
      {
        AND: [
          {
            dayOfMonth: { equals: 1 },
          },
          {
            monthOfYear: { equals: currentMonth + 1 },
          },
          {
            year: { equals: currentMonthYear },
          },
        ],
      },
      {
        AND: [
          {
            dayOfMonth: { equals: 1 },
          },
          {
            monthOfYear: { equals: nextMonth + 1 },
          },
          {
            year: { equals: nextMonthYear },
          },
        ],
      },
    ],
  }
}

export default createAuditMonthsParams
