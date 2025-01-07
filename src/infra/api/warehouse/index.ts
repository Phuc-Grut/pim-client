import requester from '../requester'
import { WAREHOUSE } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxWarehouseApi, IFDataWarehouse, IFPagingWarehouseApi } from '@src/domain/models/IWarehouse'
import { IFSort } from '@src/domain/interfaces/ISort'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const warehouseApi = {
  getPagingApi: (params: IFPagingWarehouseApi) => requester.get(WAREHOUSE.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxWarehouseApi) => requester.get(WAREHOUSE.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataWarehouse) => requester.post(WAREHOUSE.URL_API.ADD_API, params, config),
  editApi: (params: IFDataWarehouse) => requester.put(WAREHOUSE.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(WAREHOUSE.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${WAREHOUSE.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { warehouseApi }
