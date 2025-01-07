export interface IFDataRelatedProduct {
    id: string
    productId1: string
    productId2: string
    displayOrder: number | undefined
}

export interface IFResponseListRelatedProductApi {
    items: IFDataRelatedProduct[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingRelatedProductApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string| undefined
    $productId1?: string| undefined
    $productId2?: string| undefined
}