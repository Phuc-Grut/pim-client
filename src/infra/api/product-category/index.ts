import { IFSort } from '@src/domain/interfaces/ISort'
import requester from '../requester'
import { PRODUCTCATEGORY } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxProductCategoryApi, IFDataProductCategory, IFPagingProductCategoryApi } from '@src/domain/models/IProductCategory'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const productCategoryApi = {
  getPagingApi: (params: IFPagingProductCategoryApi) => requester.get(PRODUCTCATEGORY.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxProductCategoryApi) => requester.get(PRODUCTCATEGORY.URL_API.GET_LISTBOX_API, params, config),
  getListComboBoxApi: () => requester.get(PRODUCTCATEGORY.URL_API.GET_LIST_CBX, {}, config),
  addApi: (params: IFDataProductCategory) => requester.post(PRODUCTCATEGORY.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductCategory) => requester.put(PRODUCTCATEGORY.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTCATEGORY.URL_API.DELETE_API}/${id}`, {}, config),
  getApi: (id: string) => requester.get(`${PRODUCTCATEGORY.URL_API.GET_PRODUCTCATEGORY_API}/${id}`, {}, config),
  sortApi: (params: IFSort) => requester.put(PRODUCTCATEGORY.URL_API.SORT_API, params, config),
  getParentApi: (id: string) => requester.get(`${PRODUCTCATEGORY.URL_API.GET_PARENT_API}/${id}`, {}, config)
}

export default { productCategoryApi }
