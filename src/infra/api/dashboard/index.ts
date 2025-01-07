import requester from '../requester'
import { DASHBOARD } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const dashboardApi = {
  getCountProduct: () => requester.get(DASHBOARD.URL_API.GET_COUNT_PRODUCT_API, {}, config),
  getCountProductByType: () => requester.get(DASHBOARD.URL_API.GET_COUNT_PRODUCT_BY_TYPE_API, {}, config),
  getTopCategory: () => requester.get(DASHBOARD.URL_API.GET_TOP_CATEGORY_API, {}, config),
  getTopManufacturer: () => requester.get(DASHBOARD.URL_API.GET_TOP_MANUFACTURER_API, {}, config),
  getTopBrand: () => requester.get(DASHBOARD.URL_API.GET_TOP_PRODUCT_BRAND_API, {}, config),
  getTopNewProduct: () => requester.get(DASHBOARD.URL_API.GET_TOP_NEW_PRODUCT_API, {}, config),
  getTopProductInventory: () => requester.get(DASHBOARD.URL_API.GET_TOP_PRODUCTS_INVENTORY_API, {}, config)
}

export default { dashboardApi }
