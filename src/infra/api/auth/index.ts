import { IUserInfoModel } from "@src/domain/interfaces/IUserModel"
import instance from "@src/infra/axios"
import { AxiosResponse } from "axios"
import { COMMON } from '@src/domain/constants'

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
export const getUserInfoApi = (): Promise<AxiosResponse<IUserInfoModel>> => {
  return instance.get(COMMON.URL_API.GET_USER_INFO)
}