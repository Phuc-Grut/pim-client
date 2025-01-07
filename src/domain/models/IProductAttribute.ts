export interface IFDataProductAttribute {
    id: string
    code: string
    name: string
    description?: string
    alias: string | undefined
    allowFiltering: boolean | undefined
    searchType?: number | undefined
    IsOption?: boolean | undefined
    status?: number | undefined
    displayOrder?: number | undefined
    mapping?: string | undefined
    options?: IFDataOption[]
    deletes?: Delete[]
}
export interface Delete {
    id: string
}
export interface IFDataOption {
    id: string
    ProductAttributeId: string
    name?: string | undefined
    alias?: string | undefined
    image?: string | undefined
    Color?: string | undefined
    priceAdjustment: number | undefined
    weightAdjustment?: number | undefined
    isPreSelected?: boolean | undefined
    displayOrder?: number | undefined
    valueTypeId?: number | undefined
    linkedProductId?: string | undefined
    quantity?: number | undefined
}
export interface IFResponseListProductAttributeApi {
    items: IFDataProductAttribute[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductAttributeApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string
}

export interface IFListboxProductAttributeApi {
    $keyword?: string
}