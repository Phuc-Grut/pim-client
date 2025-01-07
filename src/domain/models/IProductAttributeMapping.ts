import { IFDataTableProductVariantAttributeValue } from "./IProductVariantAttributeValue"

export interface IFDataProductAttributeMapping {
    id: string
    productId: string
    productAttributeId: string
    textPrompt?: string
    customData?: string
    isRequired: boolean | undefined
    attributeControlTypeId?: number | undefined
    displayOrder?: number | undefined,
    listDetail?: IFDataTableProductVariantAttributeValue[]
}

export interface IFResponseListProductAttributeMappingApi {
    items: IFDataProductAttributeMapping[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductAttributeMappingApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string
    $productId?: string
    $productAttribute?: string
}
