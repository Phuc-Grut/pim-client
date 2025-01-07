import requester from '../requester'
import { DELIVERYTIME } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFDataDeliveryTime, IFPagingDeliveryTimeApi } from '@src/domain/models/IDeliveryTime'
import { IFSort } from '@src/domain/interfaces/ISort'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const deliveryTimeApi = {
  getPagingApi: (params: IFPagingDeliveryTimeApi) => requester.get(DELIVERYTIME.URL_API.GET_DATA_API, params, config),
  getListBoxApi: () => requester.get(DELIVERYTIME.URL_API.GET_LISTBOX_API, {}, config),
  addApi: (params: IFDataDeliveryTime) => requester.post(DELIVERYTIME.URL_API.ADD_API, params, config),
  editApi: (params: IFDataDeliveryTime) => requester.put(DELIVERYTIME.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(DELIVERYTIME.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${DELIVERYTIME.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { deliveryTimeApi }
