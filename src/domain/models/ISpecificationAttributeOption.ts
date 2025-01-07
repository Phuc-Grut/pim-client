export interface IFDataSpecificationAttributeOption {
    id: string
    specificationAttributeId: string
    name: string
    alias?: string
    displayOrder: number | undefined
    numberValue: number | undefined
    mediaFileId: number | undefined
    color: string | undefined
    createdBy: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedDate: Date | undefined
}

export interface IFResponseListSpecificationAttributeOptionApi {
    items: IFDataSpecificationAttributeOption[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingSpecificationAttributeOptionApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string
    $specificationAttributeId?: string
}
export interface IFListboxSpecificationAttributeOptionApi {
    $specificationAttributeId?: string
    $keyword?: string
}