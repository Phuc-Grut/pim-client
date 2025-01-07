import { IFPagingApiParams } from "./IPaging"

export interface IFDataCurrency {
    id: string 
    name?: string | undefined,
    code?: string | undefined,
    locale?: string | undefined,
    customFormatting?: string | undefined,
    status?: number | undefined,
    displayOrder?: number | undefined,
    createdBy: string | undefined,
    createdDate: Date | undefined,
    updatedBy: string | undefined,
    updatedDate: Date | undefined
}
export interface IFResponseListCurrencyApi {
    items: IFDataCurrency[]
    total: number,
    pageSize: number,
    pageIndex: number,
    status: boolean,
    detailErrors: any
}
export interface IFPagingCurrencyApi extends IFPagingApiParams {
    Status?: number 
}
export interface IFCbxCurrencyApi {
    $status?: number | undefined
    $keyword?: string | undefined
}