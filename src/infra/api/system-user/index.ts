import requester from '../requester'
import { SYSTEM_USER } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFDataProductUser, IFPagingProductUserApi } from '@src/domain/models/IProductUser'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const systemUserApi = {
  getPagingApi: (params: IFPagingProductUserApi) => requester.get(SYSTEM_USER.URL_API.GET_PAGING_API, params, config),
  getPagingUserApi: (params: IFPagingProductUserApi) => requester.get(SYSTEM_USER.URL_API.GET_USERS_API, params, config),
  addApi: (params: IFDataProductUser) => requester.post(SYSTEM_USER.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductUser) => requester.put(SYSTEM_USER.URL_API.UPDATE_API, params, config),
  deleteApi: (id: string) => requester.delete(`${SYSTEM_USER.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { systemUserApi }
