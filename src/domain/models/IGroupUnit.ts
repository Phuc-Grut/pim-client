
export interface IFDataGroupUnit {
    id: string 
    name?: string | undefined
    code?: string | undefined
    description?: string | undefined
    status?: number | undefined
    displayOrder?: number | undefined
    createdBy: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedDate: Date | undefined
}
export interface IFResponseListGroupUnitApi {
    items: IFDataGroupUnit[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingGroupUnitApi {
    Filter?: string,
    Order?: string,
    PageNumber: number,
    PageSize: number,
    Keyword?: string
}
export interface IFListboxGroupUnitApi {
    $status?: number | undefined
    $keyword?: string | undefined
}