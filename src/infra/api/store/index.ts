import requester from '../requester'
import { STORE } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxStoreApi, IFDataStore, IFPagingStoreApi } from '@src/domain/models/IStore'
import { IFSort } from '@src/domain/interfaces/ISort'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const storeApi = {
  getPagingApi: (params: IFPagingStoreApi) => requester.get(STORE.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxStoreApi) => requester.get(STORE.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataStore) => requester.post(STORE.URL_API.ADD_API, params, config),
  editApi: (params: IFDataStore) => requester.put(STORE.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(STORE.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${STORE.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { storeApi }
