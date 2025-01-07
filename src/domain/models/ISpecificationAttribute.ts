export interface IFDataSpecificationAttribute {
    id: string | undefined
    code: string | undefined
    name: string | undefined
    alias: string | undefined
    description: string | undefined
    status: number | undefined
    displayOrder: number | undefined
    options?: IFDataOption[]
    deletes?: Delete[]
}
export interface Delete {
    id: string
}
export interface IFDataOption {
    id: string
    specificationAttributeId: string
    name?: string
    alias?: string
    code?: string
    numberValue: number | undefined
    color: string | undefined
    displayOrder: number | undefined
    createdDate: Date | undefined
    updatedDate: Date | undefined
    createdBy: string | undefined
    updatedBy: string | undefined
}
export interface IFResponseListSpecificationAttributeApi {
    items: IFDataSpecificationAttribute[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingSpecificationAttributeApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string
}