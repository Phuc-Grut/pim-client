
export interface IFDataServiceAdd {
    id: string 
    name?: string | undefined
    code?: string | undefined
    description?: string | undefined
    calculationMethod?: number | undefined
    price?: number | undefined
    priceSyntax?: string | undefined
    minPrice?: number | undefined
    maxPrice?: number | undefined
    status?: number | undefined
    displayOrder?: number | undefined
    currency?: string | undefined
}
export interface IFResponseListServiceAddApi {
    items: IFDataServiceAdd[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingServiceAddApi {
    Filter?: string,
    Order?: string,
    PageNumber: number,
    PageSize: number,
    Keyword?: string
}
export interface IFListboxServiceAddApi {
    $keyword?: string | undefined
    $status?: number | undefined
}