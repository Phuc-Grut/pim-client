
export interface IFDataWarehouse {
    id: string 
    name?: string
    code?: string
    latitude?: number
    longitude?: number
    company?: string
    country?: string
    province?: string
    district?: string
    ward?: string
    address?: string
    postalCode?: string
    phoneNumber?: string
    api?: string
    token?: string
    displayOrder?: number
    status?: number
    createdBy?: string
    createdDate?: Date
    updatedBy?: string
    updatedDate?: Date
    coordinates: string
}
export interface IFResponseListWarehouseApi {
    items: IFDataWarehouse[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingWarehouseApi {
    Filter?: string,
    Order?: string,
    PageNumber: number,
    PageSize: number,
    Keyword?: string
}
export interface IFListboxWarehouseApi {
    $keyword?: string
    $status?: number
}