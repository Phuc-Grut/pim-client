import requester from '../requester'
import { UNIT } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxUnitApi, IFDataUnit, IFPagingUnitApi } from '@src/domain/models/IUnit'
import { IFSort } from '@src/domain/interfaces/ISort'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const unitApi = {
  getPagingApi: (params: IFPagingUnitApi) => requester.get(UNIT.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxUnitApi) => requester.get(UNIT.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataUnit) => requester.post(UNIT.URL_API.ADD_API, params, config),
  editApi: (params: IFDataUnit) => requester.put(UNIT.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(UNIT.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${UNIT.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { unitApi }
