export const replaceNumberNullOrUndefined = (d: any) => {
  if (d === null || d === '' || d === undefined || isNaN(d)) {
    return 0
  } else {
    return d
  }
}
