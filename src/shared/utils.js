export function isNullish(a) {
  return a === null || typeof a === 'undefined'
}

export function stringCaseInsensitiveEquals(a, b) {
  return typeof a === 'string' && typeof b === 'string'
    ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
    : a === b
}

export function stringCaseInsensitiveCompare(a, b) {
  return typeof a === 'string' && typeof b === 'string'
    ? a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true })
    : a - b
}

export function stringCaseInsensitiveContains(a, b) {
  return typeof a === 'string' && typeof b === 'string'
    ? a.toLocaleLowerCase().includes(b.toLocaleLowerCase())
    : a === b
}

export function stringIsFalse(a) {
  return typeof a === 'string' ? a.toLocaleLowerCase() === 'false' : a === false
}

export function stringIsTrue(a) {
  return typeof a === 'string' ? a.toLocaleLowerCase() === 'true' : a === true
}

export function stringIsEmpty(a) {
  if (isNullish(a)) return true
  return typeof a === 'string' ? a.length === 0 : false
}

export function stringIsBlank(a) {
  if (isNullish(a)) return true
  return typeof a === 'string' ? a.trim().length === 0 : false
}

export function stringToTitleCase(a) {
  if (typeof a === 'string') {
    return a.replace(
      /\w\S*/g,
      (txt) =>
        txt.charAt(0).toLocaleUpperCase() + txt.substr(1).toLocaleLowerCase()
    )
  }
  return a
}
