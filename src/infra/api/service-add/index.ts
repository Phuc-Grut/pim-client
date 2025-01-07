import requester from '../requester'
import { SERVICEADD, SERVICEADDPRICESYNTAX } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxServiceAddApi, IFDataServiceAdd, IFPagingServiceAddApi } from '@src/domain/models/IServiceAdd'
import { IFSort } from '@src/domain/interfaces/ISort'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const serviceAddApi = {
  getPagingApi: (params: IFPagingServiceAddApi) => requester.get(SERVICEADD.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxServiceAddApi) => requester.get(SERVICEADD.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataServiceAdd) => requester.post(SERVICEADD.URL_API.ADD_API, params, config),
  editApi: (params: IFDataServiceAdd) => requester.put(SERVICEADD.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(SERVICEADD.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${SERVICEADD.URL_API.DELETE_API}/${id}`, {}, config),

  getListBoxPriceSyntaxApi: () => requester.get(SERVICEADDPRICESYNTAX.URL_API.GET_LISTBOX_API, {}, config)
}

export default { serviceAddApi }
