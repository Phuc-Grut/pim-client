import requester from '../requester'
import { EXCHANGERATE } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFCbxExchangeRateApi, IFDataExchangeRate, IFPagingExchangeRateApi } from '@src/domain/models/IExchangeRate'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const exchangeRateApi = {
  getPagingApi: (params: IFPagingExchangeRateApi) => requester.get(EXCHANGERATE.URL_API.GET_DATA_API, params, config),
  getlistApi: (params: IFCbxExchangeRateApi) => requester.get(EXCHANGERATE.URL_API.GET_LIST_CBX_API, params, config),
  addApi: (params: IFDataExchangeRate) => requester.post(EXCHANGERATE.URL_API.ADD_API, params, config),
  editApi: (params: IFDataExchangeRate) => requester.put(EXCHANGERATE.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${EXCHANGERATE.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { exchangeRateApi }
