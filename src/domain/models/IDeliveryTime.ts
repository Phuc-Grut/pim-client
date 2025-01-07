
export interface IFDataDeliveryTime {
    id: string 
    name?: string | undefined
    isDefault?: boolean | undefined
    minDays?: number | undefined
    maxDays?: number | undefined
    displayOrder?: number | undefined
    status?: number
    createdBy: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedDate: Date | undefined
}
export interface IFResponseListDeliveryTimeApi {
    items: IFDataDeliveryTime[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingDeliveryTimeApi {
    Filter?: string,
    Order?: string,
    PageNumber: number,
    PageSize: number,
    Keyword?: string
}
export interface IFListboxDeliveryTimeApi {
    $keyword?: string | undefined
}