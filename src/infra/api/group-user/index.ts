import requester from '../requester'
import { GROUP_USER } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFAddUserGroupUserApi, IFDataGroupUser, IFListBoxGroupUserApi, IFPagingUserGroupUserApi, IFPagingGroupUserApi } from '@src/domain/models/IGroupUser'


const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const groupUserApi = {
  getPagingApi: (params: IFPagingGroupUserApi) => requester.get(GROUP_USER.URL_API.GET_PAGING_BY_PRODUCT_CODE_API, params, config),
  getPagingByProductCodeApi: (params: IFPagingGroupUserApi) => requester.get(GROUP_USER.URL_API.GET_PAGING_BY_PRODUCT_CODE_API, params, config),
  getListBoxApi: (params: IFListBoxGroupUserApi) => requester.get(GROUP_USER.URL_API.GET_LISTBOX_API, params, config),
  getListBoxByProductCodeApi: (params: IFListBoxGroupUserApi) => requester.get(GROUP_USER.URL_API.GET_LISTBOX_BY_PRODUCT_CODE_API, params, config),
  getPagingUsersGroupUserApi: (params: IFPagingUserGroupUserApi) => requester.get(GROUP_USER.URL_API.GET_PAGING_USERS_GROUP_USER_API, params, config),
  getPagingUsersApi: (params: IFPagingUserGroupUserApi) => requester.get(GROUP_USER.URL_API.GET_PAGING_USERS_API, params, config),
  addUsersGroupUserApi: (params: IFAddUserGroupUserApi) => requester.post(GROUP_USER.URL_API.ADD_USERS_GROUP_USER_API, params, config),
  removeUsersGroupUserApi: (id: string) => requester.delete(`${GROUP_USER.URL_API.REMOVE_USER_GROUP_USER_API}/${id}`, {}, config),
  addApi: (params: IFDataGroupUser) => requester.post(GROUP_USER.URL_API.ADD_API, params, config),
  addByProductCodeApi: (params: IFDataGroupUser) => requester.post(GROUP_USER.URL_API.ADD_BY_PRODUCT_CODE_API, params, config),
  editApi: (params: IFDataGroupUser) => requester.put(GROUP_USER.URL_API.UPDATE_API, params, config),
  deleteApi: (id: string) => requester.delete(`${GROUP_USER.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { groupUserApi }
