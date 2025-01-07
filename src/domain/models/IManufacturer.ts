
export interface IFDataManufacturer {
    id: string 
    name?: string | undefined
    code?: string | undefined
    displayOrder?: number | undefined
    description?: string | undefined
    status?: number | undefined
}
export interface IFResponseListManufacturerApi {
    items: IFDataManufacturer[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingManufacturerApi {
    Filter?: string,
    Order?: string,
    PageNumber: number,
    PageSize: number,
    Keyword?: string
}
export interface IFListboxManufacturerApi {
    $keyword?: string | undefined
    $status?: number | undefined
}