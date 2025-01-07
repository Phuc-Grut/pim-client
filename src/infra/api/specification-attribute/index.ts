import requester from '../requester'
import { SPECIFICATIONATTRIBUTE, SPECIFICATIONATTRIBUTEOPTION } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFDataSpecificationAttribute } from '@src/domain/models/ISpecificationAttribute'
import { IFListboxSpecificationAttributeOptionApi, IFDataSpecificationAttributeOption, IFPagingSpecificationAttributeOptionApi } from '@src/domain/models/ISpecificationAttributeOption'
import { IFSort } from '@src/domain/interfaces/ISort'
import { IFPagingApiParams } from '@src/domain/models/IPaging'
import { IListBoxApiParams } from '@src/domain/models/IListBox'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const specificationAttributeApi = {
  getPagingApi: (params: IFPagingApiParams) => requester.get(SPECIFICATIONATTRIBUTE.URL_API.GET_PAGING, params, config),
  getListBoxApi: (params: IListBoxApiParams) => requester.get(SPECIFICATIONATTRIBUTE.URL_API.GET_LISTBOX_API, params, config),
  getByIdApi: (id: string) => requester.get(`${SPECIFICATIONATTRIBUTE.URL_API.GET_BY_ID_API}/${id}`, {}, config),
  addApi: (params: IFDataSpecificationAttribute) => requester.post(SPECIFICATIONATTRIBUTE.URL_API.ADD_API, params, config),
  editApi: (params: IFDataSpecificationAttribute) => requester.put(SPECIFICATIONATTRIBUTE.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(SPECIFICATIONATTRIBUTE.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${SPECIFICATIONATTRIBUTE.URL_API.DELETE_API}/${id}`, {}, config)
}

const specificationAttributeOptionApi = {
  getAllApi: () => requester.get(SPECIFICATIONATTRIBUTEOPTION.URL_API.GET_LIST_API, {}, config),
  getPagingApi: (params: IFPagingSpecificationAttributeOptionApi) => requester.get(SPECIFICATIONATTRIBUTEOPTION.URL_API.GET_PAGING, params, config),
  getListBoxApi: (params: IFListboxSpecificationAttributeOptionApi) => requester.get(SPECIFICATIONATTRIBUTEOPTION.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataSpecificationAttributeOption) => requester.post(SPECIFICATIONATTRIBUTEOPTION.URL_API.ADD_API, params, config),
  editApi: (params: IFDataSpecificationAttributeOption) => requester.put(SPECIFICATIONATTRIBUTEOPTION.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${SPECIFICATIONATTRIBUTEOPTION.URL_API.DELETE_API}/${id}`, {}, config)
}


export default { specificationAttributeOptionApi, specificationAttributeApi }
