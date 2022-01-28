import { user } from "./user"
export * from "./user"
import { resetToken } from "./token"
export * from "./token"

export const Factories = {
  user,
  resetToken,
}

export function factory<
  T extends keyof typeof Factories,
  F extends (...args: any) => any = typeof Factories[T]
>({
  name,
  attrs,
}: {
  name: T
  //attrs: any
  //TODO figure this out
  attrs: Parameters<F>[0]
}) {
  return Factories[name](attrs)
}
