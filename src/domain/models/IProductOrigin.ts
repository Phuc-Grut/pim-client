
export interface IFDataProductOrigin {
    id: string 
    name?: string | undefined
    code?: string | undefined
    displayOrder?: number | undefined
    description?: string | undefined
    status?: number | undefined
    createdBy: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedDate: Date | undefined
}
export interface IFResponseListProductOriginApi {
    items: IFDataProductOrigin[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductOriginApi {
    Filter?: string,
    Order?: string,
    PageNumber: number,
    PageSize: number,
    Keyword?: string
}
export interface IFListboxProductOriginApi {
    $status?: number | undefined
    $keyword?: string | undefined
}