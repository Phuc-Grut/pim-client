import requester from '../requester'
import { PRODUCTTOPICPAGE } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IParamsListbox } from '@src/domain/models/IParamsListbox'
import { IFPagingApiParams } from '@src/domain/models/IPaging'
import { IProductTopicPage } from '@src/domain/models/IProductTopicPage'
import { IFSort } from '@src/domain/interfaces/ISort'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const productTopicPageApi = {
  getListboxApi: (params: IParamsListbox) => requester.get(PRODUCTTOPICPAGE.URL_API.GET_LIST_BOX_API, params, config),
  getPagingApi: (params: IFPagingApiParams) => requester.get(PRODUCTTOPICPAGE.URL_API.GET_DATA_API, params, config),
  getByIdApi: (id: string) => requester.get(`${PRODUCTTOPICPAGE.URL_API.GET_BY_ID_API}/${id}`, {}, config),
  addApi: (params: IProductTopicPage) => requester.post(PRODUCTTOPICPAGE.URL_API.ADD_API, params, config),
  editApi: (params: IProductTopicPage) => requester.put(PRODUCTTOPICPAGE.URL_API.UPDATE_API, params, config),
  sortApi: (params: IFSort) => requester.put(PRODUCTTOPICPAGE.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTTOPICPAGE.URL_API.DELETE_API}/${id}`, {}, config)

}

export default { productTopicPageApi }
