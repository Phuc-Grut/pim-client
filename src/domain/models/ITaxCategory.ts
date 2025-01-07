
export interface IFDataTaxCategory {
    id: string 
    name?: string | undefined
    code?: string | undefined
    rate?: number | undefined
    group?: string | undefined
    description?: string | undefined
    status?: number | undefined
    displayOrder?: number | undefined
    createdBy: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedDate: Date | undefined
    type?: number
}
export interface IFResponseListTaxCategoryApi {
    items: IFDataTaxCategory[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingTaxCategoryApi {
    $inlinecount?: string | undefined
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string | undefined
    $status?: number | undefined
}
export interface IFListboxTaxCategoryApi {
    $status?: number | undefined
    $keyword?: string | undefined
}