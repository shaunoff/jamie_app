import { useQuery } from "blitz"
import getCurrentDay from "app/days/queries/getCurrentDay"

export const useCurrentDay = () => {
  const [day] = useQuery(getCurrentDay, null)
  return day
}
