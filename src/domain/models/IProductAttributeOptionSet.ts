export interface IFDataProductAttributeOptionSet {
    id: string
    name?: string
    productAttributeId?: string
}


export interface IFResponseListProductAttributeOptionSetApi {
    items: IFDataProductAttributeOptionSet[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductAttributeOptionSetApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string
    $productAttributeId?: string
}
export interface IFListboxProductAttributeOptionSetApi {
    $productAttributeId?: string
    $keyword?: string
}