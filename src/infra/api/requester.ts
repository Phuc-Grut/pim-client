import axios, { AxiosResponse } from 'axios'
import qs from 'qs'

const responseBody = (response: AxiosResponse) => response.data
axios.defaults.withCredentials = true
axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, { indices: false }) // param=value1&param=value2
}
export const requester = {
  get: (url: string, params = {}, config = {}) => axios.get(url, { params, ...config }).then(responseBody),
  post: (url: string, data = {}, config = {}) => axios.post(url, data, config).then(responseBody),
  put: (url: string, data = {}, config = {}) => axios.put(url, data, config).then(responseBody),
  delete: (url: string, params = {}, config = {}) => axios.delete(url, { params, ...config }).then(responseBody),
  postForm: (url: string, data = {}, config = {}) => axios.postForm(url, data, {
    headers: { 'Content-type': 'multipart/form-data' }, ...config
  }).then(responseBody)
}

export default requester
