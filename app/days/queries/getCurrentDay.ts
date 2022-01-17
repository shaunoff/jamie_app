import { Ctx, NotFoundError } from "blitz"
import db from "db"
import dayjs from "dayjs"

export default async function getCurrentDay(_ = null, { session }: Ctx) {
  //TODO refactor model to make a string
  const id = parseInt(dayjs().format("YYYYMMDD"))
  const day = await db.day.findFirst({ where: { id } })

  if (!day) throw new NotFoundError()

  return day
}
