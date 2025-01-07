import requester from '../requester'
import { PRODUCT, PRODUCTATTRIBUTEMAPPING, PRODUCTCATEGORYMAPPING, PRODUCTINVENTORY, PRODUCTMANUFACTURERMAPPING, PRODUCTMEIDA, PRODUCTPACKAGE, PRODUCTSERVICEADD, PRODUCTSPECIFICATIONATTRIBUTEMAPPING, PRODUCTSPECIFICATIONCODE, PRODUCTVARIANTATTRIBUTECOMBINATION, PRODUCTVARIANTATTRIBUTEVALUE, RELATEDPRODUCT, TIERPRICE } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxProductApi, IFDataProduct, IFDuplicateProductApi, IFProductVariant } from '@src/domain/models/IProduct'
import { IFDataProductAttributeMapping, IFPagingProductAttributeMappingApi } from '@src/domain/models/IProductAttributeMapping'
import { IFDataProductCategoryMapping, IFPagingProductCategoryMappingApi } from '@src/domain/models/IProductCategoryMapping'
import { IFDataProductInventory, IFDataProductInventoryMulti, IFPagingProductInventoryApi } from '@src/domain/models/IProductInventory'
import { IFDataProductManufacturerMapping, IFPagingProductManufacturerMappingApi } from '@src/domain/models/IProductManufacturerMapping'
import { IFDataProductMedia, IFDataProductMediaMulti, IFPagingProductMediaApi} from '@src/domain/models/IProductMedia'
import { IFDataTierPrice, IFPagingTierPriceApi } from '@src/domain/models/ITierPrice'
import { IFDataProductSpecificationAttributeMapping, IFPagingProductSpecificationAttributeMappingApi } from '@src/domain/models/IProductSpecificationAttributeMapping'
import { IFListboxProductVariantAttributeCombinationApi, IFDataProductVariantAttributeCombination, IFPagingProductVariantAttributeCombinationApi } from '@src/domain/models/IProductVariantAttributeCombination'
import { IFListboxProductVariantAttributeValueApi, IFDataProductVariantAttributeValue, IFPagingProductVariantAttributeValueApi } from '@src/domain/models/IProductVariantAttributeValue'
import { IFGetInventoryByListIdApi, IFPagingApiParams } from '@src/domain/models/IPaging'
import { IFDataProductServiceAdd, IFPagingProdcuctServiceAddApi } from '@src/domain/models/IProdcuctServiceAdd'
import { IFDataProductPackage, IFPagingProdcuctPackageApi } from '@src/domain/models/IProdcuctPackage'
import { IFDataRelatedProduct, IFPagingRelatedProductApi } from '@src/domain/models/IRelatedProduct'
import { IFPagingProductSpecificationCodeApi } from '@src/domain/models/IProductSpecificationCode'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const productApi = {
  getPagingApi: (params: IFPagingApiParams) => requester.get(PRODUCT.URL_API.GET_PAGING, params, config),
  getByIdApi: (id: string) => requester.get(`${PRODUCT.URL_API.GET_BY_ID_API}/${id}`, { }, config),
  createAllVariantApi: (id: string) => requester.get(`${PRODUCT.URL_API.CREATE_ALL_VARIANT_API}/${id}`, { }, config),
  getListBoxApi: (params: IFListboxProductApi) => requester.get(PRODUCT.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataProduct) => requester.post(PRODUCT.URL_API.ADD_API, params, config),
  addVariantApi: (params: IFProductVariant) => requester.post(PRODUCT.URL_API.ADD_VARIANT_API, params, config),
  editApi: (params: IFDataProduct) => requester.put(PRODUCT.URL_API.EDIT_API, params, config),
  getInventoryByListApi: (params: IFGetInventoryByListIdApi) => requester.get(PRODUCT.URL_API.GET_INVENTORY_BY_LIST_ID, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCT.URL_API.DELETE_API}/${id}`, {}, config),
  duplicateApi: (params: IFDuplicateProductApi) => requester.post(PRODUCT.URL_API.DUPLICATE_API, params, config)
}

const productVariantAttributeCombinationApi = {
  getPagingApi: (params: IFPagingProductVariantAttributeCombinationApi) => requester.get(PRODUCTVARIANTATTRIBUTECOMBINATION.URL_API.GET_PAGING, params, config),
  getListBoxApi: (params: IFListboxProductVariantAttributeCombinationApi) => requester.get(PRODUCTVARIANTATTRIBUTECOMBINATION.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataProductVariantAttributeCombination) => requester.post(PRODUCTVARIANTATTRIBUTECOMBINATION.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductVariantAttributeCombination) => requester.put(PRODUCTVARIANTATTRIBUTECOMBINATION.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTVARIANTATTRIBUTECOMBINATION.URL_API.DELETE_API}/${id}`, {}, config)
}

const productVariantAttributeValueApi = {
  getPagingApi: (params: IFPagingProductVariantAttributeValueApi) => requester.get(PRODUCTVARIANTATTRIBUTEVALUE.URL_API.GET_PAGING, params, config),
  getListBoxApi: (params: IFListboxProductVariantAttributeValueApi) => requester.get(PRODUCTVARIANTATTRIBUTEVALUE.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataProductVariantAttributeValue) => requester.post(PRODUCTVARIANTATTRIBUTEVALUE.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductVariantAttributeValue) => requester.put(PRODUCTVARIANTATTRIBUTEVALUE.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTVARIANTATTRIBUTEVALUE.URL_API.DELETE_API}/${id}`, {}, config)
}

const productAttributeMappingApi = {
  getPagingApi: (params: IFPagingProductAttributeMappingApi) => requester.get(PRODUCTATTRIBUTEMAPPING.URL_API.GET_PAGING, params, config),
  addApi: (params: IFDataProductAttributeMapping) => requester.post(PRODUCTATTRIBUTEMAPPING.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductAttributeMapping) => requester.put(PRODUCTATTRIBUTEMAPPING.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTATTRIBUTEMAPPING.URL_API.DELETE_API}/${id}`, {}, config)
}
const productSpecificationAttributeAttributeMappingApi = {
  getPagingApi: (params: IFPagingProductSpecificationAttributeMappingApi) => requester.get(PRODUCTSPECIFICATIONATTRIBUTEMAPPING.URL_API.GET_PAGING, params, config),
  addApi: (params: IFDataProductSpecificationAttributeMapping) => requester.post(PRODUCTSPECIFICATIONATTRIBUTEMAPPING.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductSpecificationAttributeMapping) => requester.put(PRODUCTSPECIFICATIONATTRIBUTEMAPPING.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTSPECIFICATIONATTRIBUTEMAPPING.URL_API.DELETE_API}/${id}`, {}, config)
}

const productCategoryMappingApi = {
  getPagingApi: (params: IFPagingProductCategoryMappingApi) => requester.get(PRODUCTCATEGORYMAPPING.URL_API.GET_PAGING, params, config),
  addApi: (params: IFDataProductCategoryMapping) => requester.post(PRODUCTCATEGORYMAPPING.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductCategoryMapping) => requester.put(PRODUCTCATEGORYMAPPING.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTCATEGORYMAPPING.URL_API.DELETE_API}/${id}`, {}, config)
}

const productInventoryApi = {
  getPagingApi: (params: IFPagingProductInventoryApi) => requester.get(PRODUCTINVENTORY.URL_API.GET_PAGING, params, config),
  addApi: (params: IFDataProductInventory) => requester.post(PRODUCTINVENTORY.URL_API.ADD_API, params, config),
  addMultiApi: (params: IFDataProductInventoryMulti) => requester.post(PRODUCTINVENTORY.URL_API.ADD_MULTI_API, params, config),
  editApi: (params: IFDataProductInventory) => requester.put(PRODUCTINVENTORY.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTINVENTORY.URL_API.DELETE_API}/${id}`, {}, config)
}

const productManufacturerMappingApi = {
  getPagingApi: (params: IFPagingProductManufacturerMappingApi) => requester.get(PRODUCTMANUFACTURERMAPPING.URL_API.GET_PAGING, params, config),
  addApi: (params: IFDataProductManufacturerMapping) => requester.post(PRODUCTMANUFACTURERMAPPING.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductManufacturerMapping) => requester.put(PRODUCTMANUFACTURERMAPPING.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTMANUFACTURERMAPPING.URL_API.DELETE_API}/${id}`, {}, config)
}

const productMediaApi = {
  getPagingApi: (params: IFPagingProductMediaApi) => requester.get(PRODUCTMEIDA.URL_API.GET_PAGING, params, config),
  addApi: (params: IFDataProductMedia) => requester.post(PRODUCTMEIDA.URL_API.ADD_API, params, config),
  addMultiApi: (params: IFDataProductMediaMulti) => requester.post(PRODUCTMEIDA.URL_API.ADD_API_MULTI, params, config),
  editApi: (params: IFDataProductMedia) => requester.put(PRODUCTMEIDA.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTMEIDA.URL_API.DELETE_API}/${id}`, {}, config)
}

// const productReviewApi = {
//   getPagingApi: (params: IFPagingP) => requester.get(PRODUCTREVIEW.URL_API.GET_PAGING, params, config),
//   addApi: (params: IFDataProductMedia) => requester.post(PRODUCTREVIEW.URL_API.ADD_API, params, config),
//   editApi: (params: IFDataProductMedia) => requester.put(PRODUCTREVIEW.URL_API.EDIT_API, params, config),
//   deleteApi: (id: string) => requester.delete(`${PRODUCTREVIEW.URL_API.DELETE_API}/${id}`, {}, config)
// }

// const productReviewHelpfulnessApi = {
//   getPagingApi: (params: IFPagingProductMediaApi) => requester.get(PRODUCTMEIDA.URL_API.GET_PAGING, params, config),
//   addApi: (params: IFDataProductMedia) => requester.post(PRODUCTMEIDA.URL_API.ADD_API, params, config),
//   editApi: (params: IFDataProductMedia) => requester.put(PRODUCTMEIDA.URL_API.EDIT_API, params, config),
//   deleteApi: (id: string) => requester.delete(`${PRODUCTMEIDA.URL_API.DELETE_API}/${id}`, {}, config)
// }

const tierPriceApi = {
  getPagingApi: (params: IFPagingTierPriceApi) => requester.get(TIERPRICE.URL_API.GET_PAGING, params, config),
  addApi: (params: IFDataTierPrice) => requester.post(TIERPRICE.URL_API.ADD_API, params, config),
  editApi: (params: IFDataTierPrice) => requester.put(TIERPRICE.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${TIERPRICE.URL_API.DELETE_API}/${id}`, {}, config)
}

const prodcuctServiceAddApi = {
  getPagingApi: (params: IFPagingProdcuctServiceAddApi) => requester.get(PRODUCTSERVICEADD.URL_API.GET_PAGING, params, config),
  addApi: (params: IFDataProductServiceAdd) => requester.post(PRODUCTSERVICEADD.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductServiceAdd) => requester.put(PRODUCTSERVICEADD.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTSERVICEADD.URL_API.DELETE_API}/${id}`, {}, config)
}

const prodcuctPackageApi = {
  getPagingApi: (params: IFPagingProdcuctPackageApi) => requester.get(PRODUCTPACKAGE.URL_API.GET_PAGING, params, config),
  addApi: (params: IFDataProductPackage) => requester.post(PRODUCTPACKAGE.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductPackage) => requester.put(PRODUCTPACKAGE.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${PRODUCTPACKAGE.URL_API.DELETE_API}/${id}`, {}, config)
}

const relatedProductApi = {
  getPagingApi: (params: IFPagingRelatedProductApi) => requester.get(RELATEDPRODUCT.URL_API.GET_PAGING, params, config),
  addApi: (params: IFDataRelatedProduct) => requester.post(RELATEDPRODUCT.URL_API.ADD_API, params, config),
  editApi: (params: IFDataRelatedProduct) => requester.put(RELATEDPRODUCT.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${RELATEDPRODUCT.URL_API.DELETE_API}/${id}`, {}, config)
}

const productSpecificationCodeApi = {
  getPagingApi: (params: IFPagingProductSpecificationCodeApi) => requester.get(PRODUCTSPECIFICATIONCODE.URL_API.GET_PAGING, params, config)
  // addApi: (params: IFDataProductSpecificationAttributeMapping) => requester.post(PRODUCTSPECIFICATIONATTRIBUTEMAPPING.URL_API.ADD_API, params, config),
  // editApi: (params: IFDataProductSpecificationAttributeMapping) => requester.put(PRODUCTSPECIFICATIONATTRIBUTEMAPPING.URL_API.EDIT_API, params, config),
  // deleteApi: (id: string) => requester.delete(`${PRODUCTSPECIFICATIONATTRIBUTEMAPPING.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { 
  productApi,
  productSpecificationAttributeAttributeMappingApi,
  productVariantAttributeCombinationApi,
  productAttributeMappingApi,
  productCategoryMappingApi,
  productInventoryApi,
  productManufacturerMappingApi,
  productMediaApi,
  productVariantAttributeValueApi,
  tierPriceApi,
  prodcuctPackageApi,
  relatedProductApi,
  prodcuctServiceAddApi,
  productSpecificationCodeApi
}
