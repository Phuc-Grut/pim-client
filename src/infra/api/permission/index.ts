import requester from '../requester'
import { PERMISSION } from '@src/domain/constants'

import { AxiosRequestConfig } from 'axios'
import { IFDataGetPagingIdentityToAddApi, IFDataGetPermissionGroupUserApi, IFDataGetPermissionInfoApi, IFDataGetPermissionUserApi, IFDataPermissionGroupUserApi, IFDataPermissionUserApi } from '@src/domain/models/IPermissions'

const { URL_API } = PERMISSION


export const getToken = () => {
  let accessToken = localStorage.getItem('access_token')

  if (!accessToken) {
    const userData: string | null = localStorage.getItem('userData')

    if (userData && userData.length) {
      accessToken = JSON.parse(<string>userData).id_token
    }
  }

  return accessToken
}

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const permissionApi = {
  getTreePermissionApi: () => requester.get(`${URL_API.GET_TREE_PERMISSION_API}`, {}, config),
  getTreePermissionByProductApi: (product_code: string) => requester.get(`${URL_API.GET_TREE_PERMISSION_API}/${product_code}`, {}, config),
  getTreeResourcePermissionByProductApi: (params: IFDataGetPermissionInfoApi) => requester.get(`${URL_API.GET_TREE_RESOURCE_PERMISSION_API}/${params.productCode}/${params.type}`, {}, config),
  getTreeResourcePermissionApi: (params: IFDataGetPermissionInfoApi) => requester.get(`${URL_API.GET_TREE_RESOURCE_PERMISSION_API}/${params.type}`, {}, config),
  getPermissionGroupUserApi: (params: IFDataGetPermissionGroupUserApi) => requester.get(`${URL_API.GET_PERMISSION_GROUP_USER_API}`, params, config),
  getPermissionGroupUserByProductApi: (params: IFDataGetPermissionGroupUserApi) => requester.get(`${URL_API.GET_PERMISSION_GROUP_USER_BY_PRODUCT_API}`, params, config),
  getPagingGroupUserByResourceApi: (params: IFDataGetPagingIdentityToAddApi) => requester.get(`${URL_API.GET_PAGING_GROUP_USERS_FOR_ADD_API}`, params, config),
  getPagingGroupUserByProductApi: (params: IFDataGetPagingIdentityToAddApi) => requester.get(`${URL_API.GET_PAGING_GROUP_USERS_FOR_ADD_BY_PRODUCT_API}`, params, config),
  getPagingUserByResourceApi: (params: IFDataGetPagingIdentityToAddApi) => requester.get(`${URL_API.GET_PAGING_USERS_FOR_ADD_API}`, params, config),
  getPagingUserByProductApi: (params: IFDataGetPagingIdentityToAddApi) => requester.get(`${URL_API.GET_PAGING_USERS_FOR_ADD_BY_PRODUCT_API}`, params, config),
  getPermissionFunctionApi: (functionId: string) => requester.get(`${URL_API.GET_PERMISSION_FUNCTION_API}/${functionId}`, {}, config),
  getPermissionUserApi: (params: IFDataGetPermissionUserApi) => requester.get(`${URL_API.GET_PERMISSION_USER_API}`, params, config),
  getPermissionUserByProductApi: (params: IFDataGetPermissionUserApi) => requester.get(`${URL_API.GET_PERMISSION_USER_BY_PRODUCT_API}`, params, config),
  addPermissonGroupUserApi: (params: IFDataPermissionGroupUserApi) => requester.post(URL_API.ADD_PERMISSION_GROUP_USER_API, params, config),
  deletePermissonGroupUserApi: (id: string) => requester.delete(`${URL_API.DELETE_PERMISSION_GROUP_USER_API}/${id}`, {}, config),
  addPermissonUserApi: (params: IFDataPermissionUserApi) => requester.post(URL_API.ADD_PERMISSION_USER_API, params, config),
  deletePermissonUserApi: (id: string) => requester.delete(`${URL_API.DELETE_PERMISSION_USER_API}/${id}`, {}, config)
}
export default { permissionApi }
