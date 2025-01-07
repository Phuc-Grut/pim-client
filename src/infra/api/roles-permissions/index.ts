import requester from '../requester'
import { ROLES } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFGetPagingApiParams, IFDeleteApi } from '@src/domain/models/IUsers'
import { IFDataRoleApi } from '@src/domain/models/IRolesPermissions'

const { URL_API } = ROLES

const config:AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const rolesPermissionsApi = {
  getDataRoleApi: (params: IFGetPagingApiParams) => requester.get(URL_API.GET_DATA_ROLE_API, params, config),
  addRoleApi: (params: IFDataRoleApi) => requester.post(URL_API.ADD_ROLE_API, params, config),
  editRoleApi: (params: IFDataRoleApi) => requester.put(URL_API.EDIT_ROLE_API, params, config),
  deleteRoleApi: (params: IFDeleteApi) => requester.delete(URL_API.DELETE_ROLE_API, params, config)
}

export default rolesPermissionsApi
