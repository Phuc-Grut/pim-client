
export interface IFDataProductTag {
    id: string 
    name?: string | undefined
    type?: number
    status?: number | undefined
    createdBy: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedDate: Date | undefined
}
export interface IFResponseListProductTagApi {
    items: IFDataProductTag[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductTagApi {
    $inlinecount?: string | undefined
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string | undefined
    $status?: number | undefined
}
export interface IFListboxProductTagApi {
    $status?: number
    $type?: number
    $keyword?: string
}