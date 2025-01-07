import { IFPagingApiParams } from "./IPaging"

export interface IFDataExchangeRate {
    id: string
    currencyId?: string | undefined,
    fromCurrency?: string | undefined,
    fromCurrencyName?: string | undefined,
    toCurrency?: string | undefined,
    rate?: number | undefined,
    activeDate: Date | undefined,
    status?: number | undefined,
    createdBy: string | undefined,
    createdDate: Date | undefined,
    updatedBy: string | undefined,
    updatedDate: Date | undefined
}
export interface IFResponseListExchangeRateApi {
    items: IFDataExchangeRate[]
    total: number,
    pageSize: number,
    pageIndex: number,
    status: boolean,
    detailErrors: any
}

export interface IFCbxExchangeRateApi {
    $status?: number | undefined
    $currencyId?: string | undefined
    $keyword?: number | undefined
}

export interface IFPagingExchangeRateApi extends IFPagingApiParams {
    $currency?: string | undefined
    $status?: number | undefined
}