
export interface IFDataStore {
    id: string 
    name?: string | undefined
    code?: string | undefined
    description?: string | undefined
    address?: string | undefined
    phone?: string | undefined
    displayOrder?: number | undefined
}
export interface IFResponseListStoreApi {
    items: IFDataStore[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingStoreApi {
    Filter?: string,
    Order?: string,
    PageNumber: number,
    PageSize: number,
    Keyword?: string
}
export interface IFListboxStoreApi {
    $keyword?: string | undefined
}