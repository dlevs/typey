export const splitInclusive = (
  str: string,
  char: string
) => {
  return str
    .split(char)
    .map((value, i, array) => {
      return i < array.length - 1
        ? `${value}${char}`
        : value
    })
    .filter(value => value !== '')
}
