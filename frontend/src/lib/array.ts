/**
 * @description Returns whether or not the input array is non-empty, meaning it is defined and has at least one element.
 */
export const hasItems = <T>(arr: T[] | undefined | null): arr is [T, ...T[]] => {
  return arr !== undefined && arr !== null && arr.length > 0
}
