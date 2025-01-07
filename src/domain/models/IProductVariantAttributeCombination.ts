export interface IFDataProductVariantAttributeCombination {
    id: string
    name?: string
    productId: string
    sku?: string
    gtin?: string
    manufacturerPartNumber?: string
    price?: number | undefined
    weight?: number | undefined
    length?: number | undefined
    width?: number | undefined
    height?: number | undefined
    isActive: number
    basePriceAmount?: number | undefined
    basePriceBaseAmount?: number | undefined
    assignedMediaFileIds?: string | undefined
    deliveryTimeId?: string | undefined
    quantityUnitId?: string | undefined
    attributesXml?: string | undefined
    stockQuantity: number
    allowOutOfStockOrders: number
    createdDate?: number | undefined
    updatedDate?: number | undefined
    createdBy?: string
    updatedBy?: string
}

export interface IFResponseListProductVariantAttributeCombinationApi {
    items: IFDataProductVariantAttributeCombination[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductVariantAttributeCombinationApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string | undefined
    $productId?: string | undefined
    $deliveryTimeId?: string | undefined
    $quantityUnitId?: string | undefined
}

export interface IFListboxProductVariantAttributeCombinationApi {
    $keyword?: string | undefined
    $productId?: string | undefined
    $deliveryTimeId?: string | undefined
    $quantityUnitId?: string | undefined
}