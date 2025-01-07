import requester from '../requester'
import { MENU } from '@src/domain/constants'

import { AxiosRequestConfig } from 'axios'

const { URL_API } = MENU


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

const menuApi = {
  getListMenuApi: (product_code: string) => requester.get(`${URL_API.GET_MENU_API}/${product_code}`, { }, config),
  getMenuTreeApi: (product_code: string) => requester.get(`${URL_API.GET_MENU_TREE_API}/${product_code}`, { }, config)
}

export default menuApi
