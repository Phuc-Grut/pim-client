import requester from '../requester'
import { PRODUCTBRAND } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxProductBrandApi, IFDataProductBrand, IFPagingProductBrandApi } from '@src/domain/models/IProductBrand'
import { IFSort } from '@src/domain/interfaces/ISort'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const productBrandApi = {
  getPagingApi: (params: IFPagingProductBrandApi) => requester.get(PRODUCTBRAND.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxProductBrandApi) => requester.get(PRODUCTBRAND.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataProductBrand) => requester.post(PRODUCTBRAND.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductBrand) => requester.put(PRODUCTBRAND.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(PRODUCTBRAND.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTBRAND.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { productBrandApi }
