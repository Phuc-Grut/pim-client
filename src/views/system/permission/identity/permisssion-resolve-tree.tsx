
const PermissionResolveChildren = (resource: any, result: any[], parent: any[]) => {

  const list = parent.filter((x: any) => x)
  list.push(resource.name)
  resource.children.map((ele: any) => {
    PermissionResolveChildren(ele, result, list)
  })
  result.push({ ...resource, children: {}, title: list })

}

export const PermissionResolveTree = (data: any) => {
  const result: any[] = []
  data.map((item: any) => {
    PermissionResolveChildren(item, result, [])
  })
  return result
}
