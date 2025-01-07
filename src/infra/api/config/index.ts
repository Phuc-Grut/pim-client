
import { AxiosRequestConfig } from "axios"
import { CONFIG } from "@src/domain/constants"
import { getToken } from "@src/infra/api/auth"
import requester from "../requester"

const { URL_API } = CONFIG

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

export type IParamsConfigByCode = {
  code: string
  group?: string
}


const configApi = {
  getConfigByCodeApi: (params: IParamsConfigByCode) => requester.get(URL_API.GET_BY_CODE_API, params, config)

}

export default { configApi }
