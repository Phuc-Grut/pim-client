export interface IFDataProductManufacturerMapping {
    id: string
    productId: string
    manufacturerId: string
    displayOrder?: number | undefined
}

export interface IFResponseListProductManufacturerMappingApi {
    items: IFDataProductManufacturerMapping[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductManufacturerMappingApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string
    $productId?: string
    $manufacturerId?: string
}