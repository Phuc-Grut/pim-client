export const listify = (obj: any, mapFn: any) => Object.entries(obj).reduce((acc: any, [key, value]) => {
    if (value) {
      acc.push(mapFn(key, value))
    }
    return acc
  }, [])
  
  export const getPermisions = (code: any) => {
    const resources = localStorage.getItem('resources')
  
    const allPermission = resources ? JSON.parse(resources) : []
  
    const find = allPermission.find((i: any) => i.code === code) ?? {}
  
    const listPermission = listify(find.privileges ?? [], (key: string, value: any) => ({ id: key, ...value }))
    return listPermission
  }