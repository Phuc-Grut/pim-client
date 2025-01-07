import requester from '../requester'
import { PRODUCTTOPICQUERY } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IProductTopicQuery, IProductTopicQueryParamsListbox } from '@src/domain/models/IProductTopicQuery'
import { IFPagingApiParams } from '@src/domain/models/IPaging'
import { IFSort } from '@src/domain/interfaces/ISort'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const productTopicQueryApi = {
  getPagingApi: (params: IFPagingApiParams) => requester.get(PRODUCTTOPICQUERY.URL_API.GET_DATA_API, params, config),
  getListboxApi: (params: IProductTopicQueryParamsListbox) => requester.get(PRODUCTTOPICQUERY.URL_API.GET_LIST_BOX_API, params, config),
  getByIdApi: (id: string) => requester.get(`${PRODUCTTOPICQUERY.URL_API.GET_BY_ID_API}/${id}`, {}, config),
  addApi: (params: IProductTopicQuery) => requester.post(PRODUCTTOPICQUERY.URL_API.ADD_API, params, config),
  editApi: (params: IProductTopicQuery) => requester.put(PRODUCTTOPICQUERY.URL_API.UPDATE_API, params, config),
  sortApi: (params: IFSort) => requester.put(PRODUCTTOPICQUERY.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTTOPICQUERY.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { productTopicQueryApi }
