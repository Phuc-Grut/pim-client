import requester from '../requester'
import { TAXCATEGORY } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxTaxCategoryApi, IFDataTaxCategory } from '@src/domain/models/ITaxCategory'
import { IFSort } from '@src/domain/interfaces/ISort'
import { IFPagingApiParams } from '@src/domain/models/IPaging'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const taxCategoryApi = {
  getPagingApi: (params: IFPagingApiParams) => requester.get(TAXCATEGORY.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxTaxCategoryApi) => requester.get(TAXCATEGORY.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataTaxCategory) => requester.post(TAXCATEGORY.URL_API.ADD_API, params, config),
  editApi: (params: IFDataTaxCategory) => requester.put(TAXCATEGORY.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(TAXCATEGORY.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${TAXCATEGORY.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { taxCategoryApi }
