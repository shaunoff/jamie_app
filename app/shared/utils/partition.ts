const partition = <T>(array: T[], filter: (el: T, index: number, arr: T[]) => boolean) => {
  let pass: T[] = []
  let fail: T[] = []
  array.forEach((el, index, arr) => (filter(el, index, arr) ? pass : fail).push(el))
  return [pass, fail] as const
}

export default partition
