import requester from '../requester'
import { USER } from '@src/domain/constants'
import {
  IFDataUserApi,
  IFDeleteApi,
  IFGetPagingApiParams
} from '@src/domain/models/IUsers'
import { AxiosRequestConfig } from 'axios'

const { URL_API } = USER

export const getToken = () => {
  let accessToken = localStorage.getItem('access_token')

  if (!accessToken) {
    const userData:string | null = localStorage.getItem('userData')

    if (userData && userData.length) {
      accessToken = JSON.parse(<string>userData).id_token
    }
  }

  return accessToken
}


const config:AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const userApi = {
  getDataUserApi: (params: IFGetPagingApiParams) => requester.get(URL_API.GET_DATA_API, params, config),
  getUserByIdApi: (id: string) => requester.get(`${URL_API.GET_USER_ID_API}/${id}`, { }, config),
  addUserApi: (params: IFDataUserApi) => requester.post(URL_API.ADD_USER_API, params, config),
  editUserApi: (params: IFDataUserApi) => requester.put(URL_API.EDIT_USER_API, params, config),
  deleteUserApi: (params: IFDeleteApi) => requester.delete(URL_API.DELETE_USER_API, params, config)
}

export default userApi
