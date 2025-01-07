
export interface IFDataProductBrand {
    id: string 
    name?: string | undefined
    code?: string | undefined
    displayOrder?: number | undefined
    image?: string
    tags?: any[]
    description?: string | undefined
    status?: number | undefined
    createdBy: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedDate: Date | undefined
}
export interface IFResponseListProductBrandApi {
    items: IFDataProductBrand[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductBrandApi {
    Filter?: string,
    Order?: string,
    PageNumber: number,
    PageSize: number,
    Keyword?: string
}
export interface IFListboxProductBrandApi {
    $status?: number | undefined
    $keyword?: string | undefined
}