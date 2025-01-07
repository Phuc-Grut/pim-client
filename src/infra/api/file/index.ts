import requester from '../requester'
import { UPLOADFILE } from '@src/domain/constants'
import { getToken } from '@src/infra/api/user'

const fileApi = {
  uploadFile: (params: FormData, progressEvent: any) => requester.post(UPLOADFILE.URL_API.UPLOAD_FILE_API, params, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    onUploadProgress: progressEvent
  }),
  uploadImage: (params: FormData, progressEvent: any) => requester.post(UPLOADFILE.URL_API.UPLOAD_IMAGE_API, params, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    onUploadProgress: progressEvent
  }),
  uploadFileMulti: (params: FormData, progressEvent: any) => requester.post(UPLOADFILE.URL_API.UPLOAD_FILE_MULTI_API, params, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    onUploadProgress: progressEvent
  }),
  uploadImageMulti: (params: FormData, progressEvent: any) => requester.post(UPLOADFILE.URL_API.UPLOAD_IMAGE_MULTI_API, params, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    onUploadProgress: progressEvent
  })
}

export default { fileApi }
