
export interface IFDataPermissionGroupUserApi {
  listPrivile: string[]
  listRole: string[]
}

export interface IFDataPermissionUserApi {
  listPrivile: string[]
  listUser: string[]
}
export interface IFDataGetPermissionGroupUserApi {
  productCode?: string
  roleId: string
}
export interface IFDataGetPagingIdentityToAddApi {
  $skip?: number | undefined
  $top?: number | undefined
  $keyword?: string | undefined
  $resourceId: string
  $productId?: string
  $productCode?: string
}

export interface IFDataPermissionUserApi {
  listPrivile: string[]
  listUser: string[]
}

export interface IFDataGetPermissionUserApi {
  productCode?: string
  userId: string
}

export interface IFDataGetPermissionInfoApi {
  productCode?: string
  type: string
}