export interface IFDataProductAttributeOption {
    id: string
    productAttributeId: string
    name: string
    alias: string
    mediaFileId?: number
    color: string | undefined
    priceAdjustment: number | undefined
    weightAdjustment?: number | undefined
    isPreSelected?: boolean | undefined
    displayOrder?: number | undefined
    valueTypeId?: number | undefined
    linkedProductId?: string | undefined
    quantity?: number | undefined
    createdBy: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedDate: Date | undefined
}

export interface IFResponseListProductAttributeOptionApi {
    items: IFDataProductAttributeOption[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductAttributeOptionApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string
    $productAttributeId?: string
}
export interface IFListboxProductAttributeOptionApi {
    $productAttributeId?: string
    $keyword?: string
}