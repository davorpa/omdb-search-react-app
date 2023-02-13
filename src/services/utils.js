export function stringCaseInsensitiveEquals(a, b) {
  return typeof a === 'string' && typeof b === 'string'
    ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
    : a === b
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
