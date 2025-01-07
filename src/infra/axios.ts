import axios, { AxiosError } from 'axios'
import qs from 'qs'


const instance = axios.create({
    timeout: 30000,
    withCredentials: true
})

instance.interceptors.response.use(
    response => {
        return response
    },
    (error: AxiosError) => {
        // if (error?.code === "ECONNABORTED") {
        //   return error;
        // }

        if (error?.code === 'ERR_BAD_REQUEST') {
            if (error.response?.data) {
                return Promise.reject(error.response?.data)
            }
        }
        if (error?.request?.responseURL) {
            console.log(error.request.responseURL)
        } else {
            if (error?.request?.host) {
                console.log(`${error.request.protocol}//${error.request.host}${error.request.path}`)
            }
        }

        return Promise.reject(error.message)
    }
)

instance.interceptors.request.use(config => {
    config.paramsSerializer = (params) => {
        return qs.stringify(params, { indices: false })
    }
    return config
})

export default instance
