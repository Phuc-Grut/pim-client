
export interface IFDataUnit {
    id: string 
    name?: string | undefined
    code?: string | undefined
    namePlural?: string | undefined
    description?: string | undefined
    displayLocale?: string | undefined
    isDefault?: boolean
    groupUnitId?: string | undefined
    rate?: number | undefined
    status?: number | undefined
    displayOrder?: number | undefined
    createdBy?: string | undefined
    createdDate?: Date | undefined
    updatedBy?: string | undefined
    updatedDate?: Date | undefined
}
export interface IFResponseListUnitApi {
    items: IFDataUnit[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingUnitApi {
    Filter?: string,
    Order?: string,
    PageNumber: number,
    PageSize: number,
    Keyword?: string
}
export interface IFListboxUnitApi {
    $status?: number | undefined
    $keyword?: string | undefined
    $groupUnitId?: string | undefined
    $nullAble?: boolean | undefined
}