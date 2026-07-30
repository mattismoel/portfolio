/**
 * @description Checks if the input string fits into the the union type of values.
 */
export const fitsStringUnion = <const T extends readonly string[]>(value: string, allowed: T): value is T[number] => {
  return allowed.includes(value)
}
