import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as productStore from '../store'

import {
  IFDuplicateProductApi,
  IFListboxProductApi,
  IFModelProduct,
  IFProductVariant
} from '@src/domain/models/IProduct'
import { IFDataProductAttributeMapping, IFPagingProductAttributeMappingApi } from '@src/domain/models/IProductAttributeMapping'
import { IFDataProductCategoryMapping, IFPagingProductCategoryMappingApi } from '@src/domain/models/IProductCategoryMapping'
import { IFDataProductInventory, IFDataProductInventoryMulti, IFPagingProductInventoryApi } from '@src/domain/models/IProductInventory'
import { IFDataProductManufacturerMapping, IFPagingProductManufacturerMappingApi } from '@src/domain/models/IProductManufacturerMapping'
import { IFDataAddProductMedia, IFDataProductMedia, IFPagingProductMediaApi, IFDataProductMediaMulti } from '@src/domain/models/IProductMedia'
import { IFDataTierPrice, IFPagingTierPriceApi } from '@src/domain/models/ITierPrice'
import { IFDataProductSpecificationAttributeMapping, IFPagingProductSpecificationAttributeMappingApi } from '@src/domain/models/IProductSpecificationAttributeMapping'
import { IFListboxProductVariantAttributeCombinationApi, IFDataProductVariantAttributeCombination, IFPagingProductVariantAttributeCombinationApi } from '@src/domain/models/IProductVariantAttributeCombination'
import { IFListboxProductVariantAttributeValueApi, IFDataProductVariantAttributeValue, IFPagingProductVariantAttributeValueApi } from '@src/domain/models/IProductVariantAttributeValue'
import { IFGetInventoryByListIdApi, IFPagingApiParams } from '@src/domain/models/IPaging'
import { IFDataProductServiceAdd, IFPagingProdcuctServiceAddApi } from '@src/domain/models/IProdcuctServiceAdd'
import { IFDataProductPackage, IFPagingProdcuctPackageApi } from '@src/domain/models/IProdcuctPackage'
import { IFDataRelatedProduct, IFPagingRelatedProductApi } from '@src/domain/models/IRelatedProduct'
import { IFPagingProductSpecificationCodeApi } from '@src/domain/models/IProductSpecificationCode'

export const useProduct = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    checkProductAttributeMappingInit,
    checkProductSpecificationAttributeMappingInit,
    checkProductVariantAttributeCombinationInit,
    checkProductVariantAttributeValueInit,
    checkProductCategoryMappingInit,
    checkProductInventoryInit,
    checkProductManufacturerMappingInit,
    checkProductMediaInit,
    checkTierPriceInit,
    checkProductServiceAddInit,
    checkProductPackageInit,
    checkRelatedProductInit,
    checkProductVariantInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.product)

  const getProductPagingApi = (params: IFPagingApiParams) => { return dispatch(productStore.getPagingApi(params)) }
  const getPagingProductAttributeMappingApi = (params: IFPagingProductAttributeMappingApi) => { return dispatch(productStore.getPagingProductAttributeMappingApi(params)) }
  const getPagingProductSpecificationAttributeMappingApi = (params: IFPagingProductSpecificationAttributeMappingApi) => { return dispatch(productStore.getPagingProductSpecificationAttributeMappingApi(params)) }
  const getPagingProductSpecificationCodeApi = (params: IFPagingProductSpecificationCodeApi) => { return dispatch(productStore.getPagingProductSpecificationCodeApi(params)) }
  const getPagingProductVariantAttributeCombinationApi = (params: IFPagingProductVariantAttributeCombinationApi) => { return dispatch(productStore.getPagingProductVariantAttributeCombinationApi(params)) }
  const getPagingProductVariantAttributeValueApi = (params: IFPagingProductVariantAttributeValueApi) => { return dispatch(productStore.getPagingProductVariantAttributeValueApi(params)) }
  const getPagingProductCategoryMappingApi = (params: IFPagingProductCategoryMappingApi) => { return dispatch(productStore.getPagingProductCategoryMappingApi(params)) }
  const getPagingProductInventoryApi = (params: IFPagingProductInventoryApi) => { return dispatch(productStore.getPagingProductInventoryApi(params)) }
  const getPagingProductManufacturerMappingApi = (params: IFPagingProductManufacturerMappingApi) => { return dispatch(productStore.getPagingProductManufacturerMappingApi(params)) }
  const getPagingProductMediaApi = (params: IFPagingProductMediaApi) => { return dispatch(productStore.getPagingProductMediaApi(params)) }
  const getPagingTierPriceApi = (params: IFPagingTierPriceApi) => { return dispatch(productStore.getPagingTierPriceApi(params)) }
  const getPagingProductServiceAddApi = (params: IFPagingProdcuctServiceAddApi) => { return dispatch(productStore.getPagingProductServiceAddApi(params)) }
  const getPagingProductPackageApi = (params: IFPagingProdcuctPackageApi) => { return dispatch(productStore.getPagingProductPackageApi(params)) }
  const getPagingRelatedProductApi = (params: IFPagingRelatedProductApi) => { return dispatch(productStore.getPagingRelatedProductApi(params)) }
  const getInventoryByListIdApi = (params: IFGetInventoryByListIdApi) => { return dispatch(productStore.getInventoryByListIdApi(params)) }

  const getProductByIdApi = (id: string) => { return dispatch(productStore.getByIdApi(id)) }
  const createAllVariant = (id: string) => { return dispatch(productStore.createAllVariantApi(id)) }

  const getListProductApi = (params: IFListboxProductApi) => { return dispatch(productStore.getListBoxApi(params)) }
  const getListProductVariantAttributeCombinationApi = (params: IFListboxProductVariantAttributeCombinationApi) => { return dispatch(productStore.getlistProductVariantAttributeCombinationApi(params)) }
  const getListProductVariantAttributeValueApi = (params: IFListboxProductVariantAttributeValueApi) => { return dispatch(productStore.getlistProductVariantAttributeValueApi(params)) }

  const duplicateProductApi = (params: IFDuplicateProductApi) => { return dispatch(productStore.duplicateApi(params)) }

  const addVariantApi = (params: IFProductVariant) => { return dispatch(productStore.addVariantApi(params)) }
  const addProductApi = (params: IFModelProduct) => { return dispatch(productStore.addApi(params)) }
  const addProductAttributeMappingApi = (params: IFDataProductAttributeMapping) => { return dispatch(productStore.addProductAttributeMappingApi(params)) }
  const addProductSpecificationAttributeMappingApi = (params: IFDataProductSpecificationAttributeMapping) => { return dispatch(productStore.addProductSpecificationAttributeMappingApi(params)) }
  const addProductVariantAttributeCombinationApi = (params: IFDataProductVariantAttributeCombination) => { return dispatch(productStore.addProductVariantAttributeCombinationApi(params)) }
  const addProductVariantAttributeValueApi = (params: IFDataProductVariantAttributeValue) => { return dispatch(productStore.addProductVariantAttributeValueApi(params)) }
  const addProductCategoryMappingApi = (params: IFDataProductCategoryMapping) => { return dispatch(productStore.addProductCategoryMappingApi(params)) }
  const addProductInventoryApi = (params: IFDataProductInventory) => { return dispatch(productStore.addProductInventoryApi(params)) }
  const addMultiProductInventoryApi = (params: IFDataProductInventoryMulti) => { return dispatch(productStore.addMultiProductInventoryApi(params)) }
  const addProductManufacturerMappingApi = (params: IFDataProductManufacturerMapping) => { return dispatch(productStore.addProductManufacturerMappingApi(params)) }
  const addProductMediaApi = (params: IFDataAddProductMedia) => { return dispatch(productStore.addProductMediaApi(params)) }
  const addMultiProductMediaApi = (params: IFDataProductMediaMulti) => { return dispatch(productStore.addMultiProductMediaApi(params)) }
  const addTierPriceApi = (params: IFDataTierPrice) => { return dispatch(productStore.addTierPriceApi(params)) }
  const addProductServiceAddApi = (params: IFDataProductServiceAdd) => { return dispatch(productStore.addProductServiceAddApi(params)) }
  const addProductPackageApi = (params: IFDataProductPackage) => { return dispatch(productStore.addProductPackageApi(params)) }
  const addRelatedProductApi = (params: IFDataRelatedProduct) => { return dispatch(productStore.addRelatedProductApi(params)) }

  const editProductApi = (params: IFModelProduct) => { return dispatch(productStore.editApi(params)) }
  const editProductAttributeMappingApi = (params: IFDataProductAttributeMapping) => { return dispatch(productStore.editProductAttributeMappingApi(params)) }
  const editProductSpecificationAttributeMappingApi = (params: IFDataProductSpecificationAttributeMapping) => { return dispatch(productStore.editProductSpecificationAttributeMappingApi(params)) }
  const editProductVariantAttributeCombinationApi = (params: IFDataProductVariantAttributeCombination) => { return dispatch(productStore.editProductVariantAttributeCombinationApi(params)) }
  const editProductVariantAttributeValueApi = (params: IFDataProductVariantAttributeValue) => { return dispatch(productStore.editProductVariantAttributeValueApi(params)) }
  const editProductCategoryMappingApi = (params: IFDataProductCategoryMapping) => { return dispatch(productStore.editProductCategoryMappingApi(params)) }
  const editProductInventoryApi = (params: IFDataProductInventory) => { return dispatch(productStore.editProductInventoryApi(params)) }
  const editProductManufacturerMappingApi = (params: IFDataProductManufacturerMapping) => { return dispatch(productStore.editProductManufacturerMappingApi(params)) }
  const editProductMediaApi = (params: IFDataProductMedia) => { return dispatch(productStore.editProductMediaApi(params)) }
  const editTierPriceApi = (params: IFDataTierPrice) => { return dispatch(productStore.editTierPriceApi(params)) }
  const editProductServiceAddApi = (params: IFDataProductServiceAdd) => { return dispatch(productStore.editProductServiceAddApi(params)) }
  const editProductPackageApi = (params: IFDataProductPackage) => { return dispatch(productStore.editProductPackageApi(params)) }
  const editRelatedProductApi = (params: IFDataRelatedProduct) => { return dispatch(productStore.editRelatedProductApi(params)) }

  const deleteProductApi = (id: string) => { return dispatch(productStore.deleteApi(id)) }
  const deleteProductAttributeMappingApi = (id: string) => { return dispatch(productStore.deleteProductAttributeMappingApi(id)) }
  const deleteProductSpecificationAttributeMappingApi = (id: string) => { return dispatch(productStore.deleteProductSpecificationAttributeMappingApi(id)) }
  const deleteProductVariantAttributeCombinationApi = (id: string) => { return dispatch(productStore.deleteProductVariantAttributeCombinationApi(id)) }
  const deleteProductVariantAttributeValueApi = (id: string) => { return dispatch(productStore.deleteProductVariantAttributeValueApi(id)) }
  const deleteProductCategoryMappingApi = (id: string) => { return dispatch(productStore.deleteProductCategoryMappingApi(id)) }
  const deleteProductInventoryApi = (id: string) => { return dispatch(productStore.deleteProductInventoryApi(id)) }
  const deleteProductManufacturerMappingApi = (id: string) => { return dispatch(productStore.deleteProductManufacturerMappingApi(id)) }
  const deleteProductMediaApi = (id: string) => { return dispatch(productStore.deleteProductMediaApi(id)) }
  const deleteTierPriceApi = (id: string) => { return dispatch(productStore.deleteTierPriceApi(id)) }
  const deleteProductServiceAddApi = (id: string) => { return dispatch(productStore.deleteProductServiceAddApi(id)) }
  const deleteProductPackageApi = (id: string) => { return dispatch(productStore.deleteProductPackageApi(id)) }
  const deleteRelatedProductApi = (id: string) => { return dispatch(productStore.deleteRelatedProductApi(id)) }
  return {
    successfully,
    checkInit,
    checkProductVariantInit,
    checkProductAttributeMappingInit,
    checkProductSpecificationAttributeMappingInit,
    checkProductVariantAttributeCombinationInit,
    checkProductVariantAttributeValueInit,
    checkProductCategoryMappingInit,
    checkProductInventoryInit,
    checkProductManufacturerMappingInit,
    checkProductMediaInit,
    checkTierPriceInit,
    checkProductServiceAddInit,
    checkProductPackageInit,
    checkRelatedProductInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getProductPagingApi,
    getInventoryByListIdApi,
    getPagingProductAttributeMappingApi,
    getPagingProductSpecificationAttributeMappingApi,
    getPagingProductSpecificationCodeApi,
    getPagingProductVariantAttributeCombinationApi,
    getPagingProductVariantAttributeValueApi,
    getPagingProductCategoryMappingApi,
    getPagingProductInventoryApi,
    getPagingProductManufacturerMappingApi,
    getPagingProductMediaApi,
    getPagingTierPriceApi,
    getPagingProductServiceAddApi,
    getPagingProductPackageApi,
    getPagingRelatedProductApi,
    getProductByIdApi,
    getListProductApi,
    getListProductVariantAttributeValueApi,
    getListProductVariantAttributeCombinationApi,
    createAllVariant,
    addVariantApi,
    addProductApi,
    addProductAttributeMappingApi,
    addProductSpecificationAttributeMappingApi,
    addProductVariantAttributeCombinationApi,
    addProductVariantAttributeValueApi,
    addProductCategoryMappingApi,
    addProductInventoryApi,
    addMultiProductInventoryApi,
    addProductManufacturerMappingApi,
    addProductMediaApi,
    addMultiProductMediaApi,
    addTierPriceApi,
    addProductServiceAddApi,
    addProductPackageApi,
    addRelatedProductApi,
    editProductApi,
    editProductAttributeMappingApi,
    editProductSpecificationAttributeMappingApi,
    editProductVariantAttributeCombinationApi,
    editProductVariantAttributeValueApi,
    editProductCategoryMappingApi,
    editProductInventoryApi,
    editProductManufacturerMappingApi,
    editProductMediaApi,
    editTierPriceApi,
    editProductServiceAddApi,
    editProductPackageApi,
    editRelatedProductApi,
    deleteProductApi,
    deleteProductAttributeMappingApi,
    deleteProductSpecificationAttributeMappingApi,
    deleteProductVariantAttributeCombinationApi,
    deleteProductVariantAttributeValueApi,
    deleteProductCategoryMappingApi,
    deleteProductInventoryApi,
    deleteProductManufacturerMappingApi,
    deleteProductMediaApi,
    deleteTierPriceApi,
    deleteProductPackageApi,
    deleteRelatedProductApi,
    deleteProductServiceAddApi,
    duplicateProductApi
  }
}
