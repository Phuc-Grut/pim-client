import requester from '../requester'
import { PRODUCTTYPE } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxProductTypeApi, IFDataProductType } from '@src/domain/models/IProductType'
import { IFSort } from '@src/domain/interfaces/ISort'
import { IFPagingApiParams } from '@src/domain/models/IPaging'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const productTypeApi = {
  getPagingApi: (params: IFPagingApiParams) => requester.get(PRODUCTTYPE.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxProductTypeApi) => requester.get(PRODUCTTYPE.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataProductType) => requester.post(PRODUCTTYPE.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductType) => requester.put(PRODUCTTYPE.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(PRODUCTTYPE.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTTYPE.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { productTypeApi }
