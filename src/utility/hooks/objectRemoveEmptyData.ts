export const removeEmpty = (data:any) => {
  const entries = Object.entries(data).filter(([, value]) => value !== null)
  const clean:any = entries.map(([key, v]) => {
    return [key, v]
  })

  return Object.fromEntries(clean)
}