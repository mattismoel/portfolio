/**
 * @description Returns whether or not the input array is non-empty, meaning it is defined and has at least one element.
 */
export const hasItems = <T>(arr: T[] | undefined | null): arr is [T, ...T[]] => {
  return arr !== undefined && arr !== null && arr.length > 0
}


/**
 * @description Sorts the input array alphabetically based on the property key.
 */
export const sortAlphabeticallyByProperty = <
  T extends Record<K, string>,
  K extends keyof T
>(arr: T[], key: K, order: "asc" | "desc" = "asc") => {
  return arr.sort((a, b) => {
    const strA = a[key].toUpperCase()
    const strB = b[key].toUpperCase()

    return order === "asc" ? strA.localeCompare(strB) : strB.localeCompare(strA)
  })
}
