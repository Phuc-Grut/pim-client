import requester from '../requester'
import { PRODUCTTAG } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxProductTagApi, IFDataProductTag } from '@src/domain/models/IProductTag'
import { IFPagingApiParams } from '@src/domain/models/IPaging'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const productTagApi = {
  getPagingApi: (params: IFPagingApiParams) => requester.get(PRODUCTTAG.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxProductTagApi) => requester.get(PRODUCTTAG.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataProductTag) => requester.post(PRODUCTTAG.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductTag) => requester.put(PRODUCTTAG.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTTAG.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { productTagApi }
