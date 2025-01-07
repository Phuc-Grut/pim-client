export interface IFPagingApi {
    skip?: number | undefined,
    top?: number | undefined,
    keyword?: string | undefined,
    startDate?: Date | undefined,
    endDate?: Date | undefined,
    listFilter?: any
}
export interface IFPagingApiParams {
    Filter?: string,
    Order?: string,
    PageNumber: number,
    PageSize: number,
    Keyword?: string
  }  

export interface IFGetInventoryByListIdApi {
    $listProduct: string
}
export interface IFResponseInventory {
    id: string,
    code: string, 
    stockQuantity?: number,
    plannedQuantity?: number,
    reservedQuantity?: number
}