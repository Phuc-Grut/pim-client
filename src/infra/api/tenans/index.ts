import requester from '../requester'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFDataTenantsApi, IFGetPagingApiParams } from '@src/domain/models/ITenants'
//import { IFDataRoleApi } from '@src/domain/models/IRolesPermissions'
import { TENANTS } from '@src/domain/constants'

const { URL_API } = TENANTS

const config:AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const tenantApi = {
  getTenantApi: (id: string) => requester.get(`${URL_API.GET_TENANTS}/${id}`, {}, config),
  getDataTenantApi: (params: IFGetPagingApiParams) => requester.get(URL_API.GET_PAGING_TENANTS_API, params, config),
  addTenantsApi: (params: IFDataTenantsApi) => requester.post(URL_API.ADD_TENANTS, params, config),
  editTenantsApi: (id: string, params: IFDataTenantsApi) => requester.put(`${URL_API.UPDATE_TENANTS}/${id}`, params, config),
  deleteTenantApi: (id: string) => requester.delete(`${URL_API.DELETE_TENANTS}/${id}`, {}, config)
}

export default tenantApi
