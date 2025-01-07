export interface IFDataProductRelated {
    id: string
    productId1: string
    productId2: []
    displayOrder?: number | undefined,
    idGroupCategories?: string,
    categoryId?: string
}

export interface IFResponseListProductRelatedApi {
    items: IFDataProductRelated[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductRelatedApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string
    $productId?: string
}