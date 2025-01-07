
export interface IFResponseRoleApi {
  items: IFDataRoleApi[]
  total: number,
  pageSize: number,
  pageIndex: number,
  status: boolean,
  detailErrors: any
}

export interface IFDataRoleApi {
  id?: string
  fullName?: string
  role?: string
  description?: string | undefined
  status?: number | undefined
  createdBy?: string | undefined
  createdDate?: string | undefined
  modifiedBy?: string | undefined
  modifiedDate?: string | undefined
}

export interface IFDeleteApi {
  id: string
}
