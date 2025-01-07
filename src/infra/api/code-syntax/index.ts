import requester from '../requester'
import { CODESYNTAX } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import {  IFGetCodeSyntaxApi } from '@src/domain/models/ICodeSyntax'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const codeSyntaxApi = {
  getCodeSyntaxApi: (params: IFGetCodeSyntaxApi) => requester.get(CODESYNTAX.URL_API.GETCODE_API, params, config)
}

export default { codeSyntaxApi }
