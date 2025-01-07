import requester from '../requester'
import { GROUPUNIT } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxGroupUnitApi, IFDataGroupUnit, IFPagingGroupUnitApi } from '@src/domain/models/IGroupUnit'
import { IFSort } from '@src/domain/interfaces/ISort'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const groupUnitApi = {
  getPagingApi: (params: IFPagingGroupUnitApi) => requester.get(GROUPUNIT.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxGroupUnitApi) => requester.get(GROUPUNIT.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataGroupUnit) => requester.post(GROUPUNIT.URL_API.ADD_API, params, config),
  editApi: (params: IFDataGroupUnit) => requester.put(GROUPUNIT.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(GROUPUNIT.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${GROUPUNIT.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { groupUnitApi }
