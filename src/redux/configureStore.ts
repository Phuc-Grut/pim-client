import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'

import { menuSlice } from '@src/layouts/store'
import { productBrandSlice } from '../views/product-brand/store'
import { groupCategorySlice } from '../views/catalog/group-category/store'
import { exchangeRateSlice } from '../views/catalog/exchange-rate/store'
import { currencySlice } from '../views/catalog/currency/store'
import { categorySlice } from '../views/channel-list/store'
import { warehouseSlice } from '../views/warehouse/store'
import { countrySlice } from '../views/catalog/countries/store'
import { districtSlice } from '../views/catalog/district/store'
import { stateProvinceSlice } from '../views/catalog/state-province/store'
import { wardSlice } from '../views/catalog/ward/store'
import { manufacturerSlice } from '../views/manufacturer/store'
import { productOriginSlice } from '../views/product-origin/store'
import { deliveryTimeSlice } from '../views/catalog/delivery-time/store'
import { groupUnitSlice } from '../views/catalog/group-unit/store'
import { unitSlice } from '../views/catalog/unit/store'
import { productTagSlice } from '../views/catalog/product-tag/store'
import { storeSlice } from '../views/store/store'
import { productSlice } from '../views/product/store'
import { taxCategorySlice } from '../views/catalog/tax-category/store'
import { uploadFileSlice } from '../utility/stores/uploadFile'
import { productAttributeSlice } from '../views/attribute/product-attribute/store'
import { specificationAttributeSlice } from '../views/attribute/specification-attribute/store'
import { serviceAddSlice } from '../views/service-add/store'
import { codeSyntaxSlice } from "@src/redux/system/codesyntax/store"
import { productTypeSlice } from "../views/product-type/store"
import { productCategorySlice } from "../views/catalog/information-category/store"
import { dashboardSlice } from "../views/dashboard/store"
import { systemGroupUserSlice } from '@src/views/system/group-user/store'
import { systemUserSlice } from "@src/views/system/system-user/store"
import { permissionAdminSlice } from "@src/views/system/permission/store"
import { productTopicSlice } from '@src/views/topic/product-topic/store'
import { productTopicQuerySlice } from '@src/views/topic/product-topic/product-topic-query/store'
import { productTopicPageSlice } from '@src/views/topic/product-topic-page/store'
export const store = configureStore({
  reducer: {
    navbar,
    layout,
    menu: menuSlice.reducer,
    countries: countrySlice.reducer,
    districts: districtSlice.reducer,
    stateProvinces: stateProvinceSlice.reducer,
    wards: wardSlice.reducer,
    productBrand: productBrandSlice.reducer,
    warehouse: warehouseSlice.reducer,
    manufacturer: manufacturerSlice.reducer,
    currency: currencySlice.reducer,
    category: categorySlice.reducer,
    exchangeRate: exchangeRateSlice.reducer,
    groupCategory: groupCategorySlice.reducer,
    deliveryTime: deliveryTimeSlice.reducer,
    groupUnit: groupUnitSlice.reducer,
    unit: unitSlice.reducer,
    productTag: productTagSlice.reducer,
    store: storeSlice.reducer,
    product: productSlice.reducer,
    taxCategory: taxCategorySlice.reducer,
    productAttribute: productAttributeSlice.reducer,
    specificationAttribute: specificationAttributeSlice.reducer,
    uploadFile: uploadFileSlice.reducer,
    productOrigin: productOriginSlice.reducer,
    serviceAdd: serviceAddSlice.reducer,
    codeSyntax: codeSyntaxSlice.reducer,
    productType: productTypeSlice.reducer,
    dashboard: dashboardSlice.reducer,
    productCategory: productCategorySlice.reducer,
    systemGroupUser: systemGroupUserSlice.reducer,
    permissionAdmins: permissionAdminSlice.reducer,
    systemUser: systemUserSlice.reducer,
    productTopic: productTopicSlice.reducer,
    productTopicQuery: productTopicQuerySlice.reducer,
    productTopicPage: productTopicPageSlice.reducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
