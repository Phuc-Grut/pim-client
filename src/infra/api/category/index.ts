import { IFSort } from '@src/domain/interfaces/ISort'
import requester from '../requester'
import { CATEGORY } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxCategoryApi, IFDataCategory, IFPagingCategoryApi } from '@src/domain/models/ICategory'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const categoryApi = {
  getPagingApi: (params: IFPagingCategoryApi) => requester.get(CATEGORY.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxCategoryApi) => requester.get(CATEGORY.URL_API.GET_LISTBOX_API, params, config),
  getCbxApi: (params: IFListboxCategoryApi) => requester.get(CATEGORY.URL_API.GET_CBX_API, params, config),
  addApi: (params: IFDataCategory) => requester.post(CATEGORY.URL_API.ADD_API, params, config),
  editApi: (params: IFDataCategory) => requester.put(CATEGORY.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${CATEGORY.URL_API.DELETE_API}/${id}`, {}, config),
  getApi: (id: string) => requester.get(`${CATEGORY.URL_API.GET_CATEGORY_API}/${id}`, {}, config),
  sortApi: (params: IFSort) => requester.put(CATEGORY.URL_API.SORT_API, params, config),
  getParentApi: (id: string) => requester.get(`${CATEGORY.URL_API.GET_PARENT_API}/${id}`, {}, config)
}

export default { categoryApi }
