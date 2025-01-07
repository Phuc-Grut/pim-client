export interface IFDataProductServiceAdd {
    id?: string
    productId?: string
    serviceAddId?: string | undefined
    payRequired: number
    price: number | undefined
    maxPrice: number | undefined
    minPrice: number | undefined
    calculationMethod: number
    priceSyntax: string | undefined
    currency: string | undefined
    status: number
    startDate?: Date
    endDate?: Date
}

export interface IFResponseListProdcuctServiceAddApi {
    items: IFDataProductServiceAdd[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProdcuctServiceAddApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string| undefined
    $productId?: string| undefined
    $serviceAddId?: string| undefined
    $startDate?: Date| undefined
    $endDate?: string| undefined
}