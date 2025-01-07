import requester from '../requester'
import { PRODUCTATTRIBUTE, PRODUCTATTRIBUTEOPTION, PRODUCTATTRIBUTEOPTIONSET } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFDataProductAttribute } from '@src/domain/models/IProductAttribute'
import { IFListboxProductAttributeOptionApi, IFDataProductAttributeOption, IFPagingProductAttributeOptionApi } from '@src/domain/models/IProductAttributeOption'
import { IFListboxProductAttributeOptionSetApi, IFDataProductAttributeOptionSet, IFPagingProductAttributeOptionSetApi } from '@src/domain/models/IProductAttributeOptionSet'
import { IFSort } from '@src/domain/interfaces/ISort'
import { IFPagingApiParams } from '@src/domain/models/IPaging'
import { IListBoxApiParams } from '@src/domain/models/IListBox'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const productAttributeApi = {
  getPagingApi: (params: IFPagingApiParams) => requester.get(PRODUCTATTRIBUTE.URL_API.GET_PAGING, params, config),
  getListBoxApi: (params: IListBoxApiParams) => requester.get(PRODUCTATTRIBUTE.URL_API.GET_LISTBOX_API, params, config),
  getByIdApi: (id: string) => requester.get(`${PRODUCTATTRIBUTE.URL_API.GET_BY_ID_API}/${id}`, {}, config),
  addApi: (params: IFDataProductAttribute) => requester.post(PRODUCTATTRIBUTE.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductAttribute) => requester.put(PRODUCTATTRIBUTE.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(PRODUCTATTRIBUTE.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTATTRIBUTE.URL_API.DELETE_API}/${id}`, {}, config)
}

const productAttributeOptionApi = {
  getPagingApi: (params: IFPagingProductAttributeOptionApi) => requester.get(PRODUCTATTRIBUTEOPTION.URL_API.GET_PAGING, params, config),
  getListBoxApi: (params: IFListboxProductAttributeOptionApi) => requester.get(PRODUCTATTRIBUTE.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataProductAttributeOption) => requester.post(PRODUCTATTRIBUTEOPTION.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductAttributeOption) => requester.put(PRODUCTATTRIBUTEOPTION.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTATTRIBUTEOPTION.URL_API.DELETE_API}/${id}`, {}, config)
}

const productAttributeOptionSetApi = {
  getPagingApi: (params: IFPagingProductAttributeOptionSetApi) => requester.get(PRODUCTATTRIBUTEOPTIONSET.URL_API.GET_PAGING, params, config),
  getListBoxApi: (params: IFListboxProductAttributeOptionSetApi) => requester.get(PRODUCTATTRIBUTEOPTIONSET.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataProductAttributeOptionSet) => requester.post(PRODUCTATTRIBUTEOPTIONSET.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductAttributeOptionSet) => requester.put(PRODUCTATTRIBUTEOPTIONSET.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTATTRIBUTEOPTIONSET.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { productAttributeOptionSetApi, productAttributeOptionApi, productAttributeApi }
