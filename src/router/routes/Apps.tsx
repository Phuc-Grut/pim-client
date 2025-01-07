// ** React Imports
// import { lazy } from 'react'

// import { Navigate } from 'react-router-dom'
import * as IFRoutes from '../../domain/models/IRouteObject'
import { lazy } from "react"

const ProductPage = lazy(() => import('../../views/product'))
const CountryPage = lazy(() => import('../../views/catalog/countries'))
const DistrictPage = lazy(() => import('../../views/catalog/district'))
const StateProvincePage = lazy(() => import('../../views/catalog/state-province'))
const WardPage = lazy(() => import('../../views/catalog/ward'))
const DeliveryTimePage = lazy(() => import('../../views/catalog/delivery-time'))
const GroupUnitPage = lazy(() => import('../../views/catalog/group-unit'))
const UnitPage = lazy(() => import('../../views/catalog/unit'))
const ProductTagPage = lazy(() => import('../../views/catalog/product-tag'))
const StorePage = lazy(() => import('../../views/store'))
const TaxCategoryPage = lazy(() => import('../../views/catalog/tax-category'))
const ProductBrandPage = lazy(() => import('../../views/product-brand'))
const ProductOriginPage = lazy(() => import('../../views/product-origin'))
const ManufacturerPage = lazy(() => import('../../views/manufacturer'))
const GroupCategoryPage = lazy(() => import('../../views/catalog/group-category'))
const CategoryPage = lazy(() => import('../../views/channel-list'))
const WarehousePage = lazy(() => import('../../views/warehouse'))
const CurrencyQuantityPage = lazy(() => import('../../views/catalog/currency'))
const ExchangeRatePage = lazy(() => import('../../views/catalog/exchange-rate'))
const ProductAttributePage = lazy(() => import('../../views/attribute/product-attribute'))
const SpecificationAttributePage = lazy(() => import('../../views/attribute/specification-attribute'))
const ServiceAddPage = lazy(() => import('../../views/service-add'))
const ProductTypePage = lazy(() => import('../../views/product-type'))
const InformationCategoryPage = lazy(() => import('../../views/catalog/information-category'))
const Catalog = lazy(() => import('../../views/catalog'))
const ProductTopic = lazy(() => import('../../views/topic/product-topic'))
const ProductTopicDetailPage = lazy(() => import('../../views/topic/product-topic-detail'))
const ProductTopicPage = lazy(() => import('../../views/topic/product-topic-page'))

const AppRoutes: IFRoutes.RouteObject[] = [
  {
    path: '/product',
    element: <ProductPage />
  },
  {
    path: '/catalog/unit',
    element: <UnitPage />
  },
  {
    path: '/catalog/group-unit',
    element: <GroupUnitPage />
  },
  {
    path: '/location/countries',
    element: <CountryPage />
  },
  {
    path: '/location/state-province',
    element: <StateProvincePage />
  },
  {
    path: '/location/districts',
    element: <DistrictPage />
  },
  {
    path: '/location/ward',
    element: <WardPage />
  },
  {
    path: '/catalog/delivery-time',
    element: <DeliveryTimePage />
  },
  {
    path: '/catalog/product-tag',
    element: <ProductTagPage />
  },
  {
    path: '/store',
    element: <StorePage />
  },
  {
    path: '/catalog/tax-category',
    element: <TaxCategoryPage />
  },
  {
    path: '/product-brand',
    element: <ProductBrandPage />
  },
  {
    path: '/product-origin',
    element: <ProductOriginPage />
  },
  {
    path: '/manufacturer',
    element: <ManufacturerPage />
  },
  {
    path: '/catalog/group-category',
    element: <GroupCategoryPage />
  },
  {
    path: '/catalog/channel-list',
    element: <CategoryPage />
  },
  {
    path: '/warehouse',
    element: <WarehousePage />
  },
  {
    path: '/catalog/exchange-rate',
    element: <ExchangeRatePage />
  },
  {
    path: '/catalog/currency',
    element: <CurrencyQuantityPage />
  },
  {
    path: '/product-attribute',
    element: <ProductAttributePage />
  },
  {
    path: '/specification-attribute',
    element: <SpecificationAttributePage />
  },
  {
    path: '/service-add',
    element: <ServiceAddPage />
  },
  {
    path: '/catalog/product-type',
    element: <ProductTypePage />
  },
  {
    path: '/catalog/category',
    element: <InformationCategoryPage />
  },
  {
    path: '/catalog',
    element: <Catalog />
  },
  {
    path: '/topic/product-topic',
    element: <ProductTopic />
  },
  {
    path: '/topic/product-topic-detail',
    element: <ProductTopicDetailPage />
  },
  {
    path: '/topic/product-topic-page',
    element: <ProductTopicPage />
  }
]

export default AppRoutes
