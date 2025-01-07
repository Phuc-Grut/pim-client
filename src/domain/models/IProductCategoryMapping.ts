export interface IFDataProductCategoryMapping {
    id: string
    productId: string
    categoryId: string
    displayOrder?: number | undefined
}

export interface IFResponseListProductCategoryMappingApi {
    items: IFDataProductCategoryMapping[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductCategoryMappingApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string
    $categoryId?: string
    $productId?: string
}