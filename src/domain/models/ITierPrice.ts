export interface IFDataTierPrice {
    id?: string
    productId?: string
    storeId?: string | undefined
    quantity: number | undefined
    price: number | undefined
    calculationMethod: number
    startDate?: Date
    endDate?: Date
}

export interface IFResponseListTierPriceApi {
    items: IFDataTierPrice[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingTierPriceApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string| undefined
    $productId?: string| undefined
    $startDate?: Date| undefined
    $endDate?: string| undefined
    $storeId?: string| undefined
}