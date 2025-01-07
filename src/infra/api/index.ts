import userApi from './user'
import rolesPermissionsApi from './roles-permissions'
import menuApi from './menu'
import categoryApi from './category'
import currencyApi from './currency'
import exchangeRateApi from './exchange-rate'
import groupCategoryApi from './group-category'
import manufacturerApi from './manufacturer'
import productBrandApi from './product-brand'
import productOriginApi from './product-origin'
import warehouseApi from './warehouse'
import tenantApi from './tenans'
import locationApi from './location'
import deliveryTimeApi from './delivery-time'
import groupUnitApi from './group-unit'
import unitApi from './unit'
import productTagApi from './product-tag'
import storeApi from './store'
import fileApi from './file'
import productApi from './product'
import productAttributeApi from './product-attribute'
import specificationAttributeApi from './specification-attribute'
import taxCategoryApi from './tax-category'
import serviceAddApi from './service-add'
import codeSyntaxApi from './code-syntax'
import productTypeApi from './product-type'
import productCategoryApi from './product-category'
import dashboardApi from './dashboard'
import productTopicPageApi from './product-topic-page'
import productTopicApi from './product-topic'
import productTopicQueryApi from './product-topic-query'

import systemUserApi from './system-user'
import permissionApi from './permission'
import groupUser from './group-user'
import configApi from './config'

const api = {
  ...userApi,
  ...locationApi,
  ...rolesPermissionsApi,
  ...menuApi,
  ...categoryApi,
  ...currencyApi,
  ...exchangeRateApi,
  ...groupCategoryApi,
  ...manufacturerApi,
  ...productBrandApi,
  ...productOriginApi,
  ...warehouseApi,
  ...deliveryTimeApi,
  ...groupUnitApi,
  ...unitApi,
  ...productTagApi,
  ...storeApi,
  ...taxCategoryApi,
  ...productApi,
  ...productAttributeApi,
  ...specificationAttributeApi,
  ...fileApi,
  ...tenantApi,
  ...serviceAddApi,
  ...codeSyntaxApi,
  ...productTypeApi,
  ...dashboardApi,
  ...productCategoryApi,
  ...systemUserApi,
  ...permissionApi,
  ...groupUser,
  ...productTopicPageApi,
  ...productTopicApi,
  ...productTopicQueryApi,
  ...configApi
}

export default api
