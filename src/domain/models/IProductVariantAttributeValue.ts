export interface IFDataProductVariantAttributeValue {
    id?: string
    productVariantAttributeId?: string
    code?: string
    name?: string
    alias?: string
    image?: string
    color?: string | undefined
    priceAdjustment?: number | undefined
    weightAdjustment?: number | undefined
    displayOrder?: number | undefined
    createdBy?: string | undefined
    createdDate?: Date | undefined
    updatedBy?: string | undefined
    updatedDate?: Date | undefined
    createdByName?: string | undefined
    updatedByName?: string | undefined
}
export interface IFDataTableProductVariantAttributeValue {
    rowid?: string
    fieldid?:string
    id?: string
    productVariantAttributeId?: string
    code?: string
    name?: string
    alias?: string
    image?: string
    color?: string | undefined
    priceadjustment?: number | undefined
    weightadjustment?: number | undefined
    displayOrder?: number | undefined
    createdBy?: string | undefined
    createdDate?: Date | undefined
    updatedBy?: string | undefined
    updatedDate?: Date | undefined
    createdByName?: string | undefined
    updatedByName?: string | undefined
}

export interface IFResponseListProductVariantAttributeValueApi {
    items: IFDataProductVariantAttributeValue[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductVariantAttributeValueApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string
    $productVariantAttributeId?: string
}
export interface IFListboxProductVariantAttributeValueApi {
    $productVariantAttributeId?: string
    $keyword?: string
}