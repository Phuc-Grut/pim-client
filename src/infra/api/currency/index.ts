import requester from '../requester'
import { CURRENCY } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFCbxCurrencyApi, IFDataCurrency, IFPagingCurrencyApi } from '@src/domain/models/ICurrency'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const currencyApi = {
  getPagingApi: (params: IFPagingCurrencyApi) => requester.get(CURRENCY.URL_API.GET_DATA_API, params, config),
  getlistApi: (params: IFCbxCurrencyApi) => requester.get(CURRENCY.URL_API.GET_LIST_CBX_API, params, config),
  addApi: (params: IFDataCurrency) => requester.post(CURRENCY.URL_API.ADD_API, params, config),
  editApi: (params: IFDataCurrency) => requester.put(CURRENCY.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${CURRENCY.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { currencyApi }
