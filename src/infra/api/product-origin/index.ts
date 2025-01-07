import requester from '../requester'
import { PRODUCTORIGIN } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxProductOriginApi, IFDataProductOrigin, IFPagingProductOriginApi } from '@src/domain/models/IProductOrigin'
import { IFSort } from '@src/domain/interfaces/ISort'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const productOriginApi = {
  getPagingApi: (params: IFPagingProductOriginApi) => requester.get(PRODUCTORIGIN.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxProductOriginApi) => requester.get(PRODUCTORIGIN.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataProductOrigin) => requester.post(PRODUCTORIGIN.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductOrigin) => requester.put(PRODUCTORIGIN.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(PRODUCTORIGIN.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTORIGIN.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { productOriginApi }
