export interface IFDataProductSpecificationAttributeMapping {
    id?: string
    productId?: string
    specificationAttributeOptionId?: string
    specificationAttributeId?: string
    displayOrder?: number
    // listOptionId?: string[]
}

export interface IFResponseListProductSpecificationAttributeMappingApi {
    items: IFDataProductSpecificationAttributeMapping[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductSpecificationAttributeMappingApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string
    $productId?: string
    $specificationAttributeOptionId?: string
}