import requester from '../requester'
import { MANUFACTURER } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxManufacturerApi, IFDataManufacturer, IFPagingManufacturerApi } from '@src/domain/models/IManufacturer'
import { IFSort } from '@src/domain/interfaces/ISort'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const manufacturerApi = {
  getPagingApi: (params: IFPagingManufacturerApi) => requester.get(MANUFACTURER.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxManufacturerApi) => requester.get(MANUFACTURER.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataManufacturer) => requester.post(MANUFACTURER.URL_API.ADD_API, params, config),
  editApi: (params: IFDataManufacturer) => requester.put(MANUFACTURER.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(MANUFACTURER.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${MANUFACTURER.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { manufacturerApi }
