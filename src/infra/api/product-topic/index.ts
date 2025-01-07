import requester from '../requester'
import { PRODUCTTOPIC } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFPagingProductTopicApi, IProductTopic, IProductTopicParamsListbox } from '@src/domain/models/IProductTopic'
import { IFSort } from '@src/domain/interfaces/ISort'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const productTopicApi = {
  getPagingApi: (params: IFPagingProductTopicApi) => requester.get(PRODUCTTOPIC.URL_API.GET_DATA_API, params, config),
  getListboxApi: (params: IProductTopicParamsListbox) => requester.get(PRODUCTTOPIC.URL_API.GET_LIST_BOX_API, params, config),
  getByIdApi: (id: string) => requester.get(`${PRODUCTTOPIC.URL_API.GET_BY_ID_API}/${id}`, {}, config),
  addApi: (params: IProductTopic) => requester.post(PRODUCTTOPIC.URL_API.ADD_API, params, config),
  editApi: (params: IProductTopic) => requester.put(PRODUCTTOPIC.URL_API.UPDATE_API, params, config),
  sortApi: (params: IFSort) => requester.put(PRODUCTTOPIC.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTTOPIC.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { productTopicApi }
