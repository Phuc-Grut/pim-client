// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataProduct,
  IFResponseListProductApi,
  IFModelProduct,
  IFPagingProductApi,
  IFListboxProductApi,
  IFDuplicateProductApi,
  IFProductVariant
} from '@src/domain/models/IProduct'


// ** Imports constants
import { PRODUCT, PRODUCTATTRIBUTEMAPPING, PRODUCTCATEGORYMAPPING, PRODUCTINVENTORY, PRODUCTMANUFACTURERMAPPING, PRODUCTMEIDA, PRODUCTPACKAGE, PRODUCTSERVICEADD, PRODUCTSPECIFICATIONATTRIBUTEMAPPING, PRODUCTSPECIFICATIONCODE, PRODUCTVARIANTATTRIBUTECOMBINATION, PRODUCTVARIANTATTRIBUTEVALUE, RELATEDPRODUCT, TIERPRICE } from '@src/domain/constants'
import { IFDataProductAttributeMapping, IFPagingProductAttributeMappingApi } from '@src/domain/models/IProductAttributeMapping'
import { IFDataTierPrice, IFPagingTierPriceApi } from '@src/domain/models/ITierPrice'
import { IFDataAddProductMedia, IFDataProductMedia, IFDataProductMediaMulti, IFPagingProductMediaApi } from '@src/domain/models/IProductMedia'
import { IFDataProductManufacturerMapping, IFPagingProductManufacturerMappingApi } from '@src/domain/models/IProductManufacturerMapping'
import { IFDataProductInventory, IFDataProductInventoryMulti, IFPagingProductInventoryApi } from '@src/domain/models/IProductInventory'
import { IFDataProductCategoryMapping, IFPagingProductCategoryMappingApi } from '@src/domain/models/IProductCategoryMapping'
import { IFDataProductSpecificationAttributeMapping, IFPagingProductSpecificationAttributeMappingApi } from '@src/domain/models/IProductSpecificationAttributeMapping'
import { IFListboxProductVariantAttributeCombinationApi, IFDataProductVariantAttributeCombination, IFResponseListProductVariantAttributeCombinationApi } from '@src/domain/models/IProductVariantAttributeCombination'
import { IFListboxProductVariantAttributeValueApi, IFDataProductVariantAttributeValue, IFResponseListProductVariantAttributeValueApi } from '@src/domain/models/IProductVariantAttributeValue'
import { IFGetInventoryByListIdApi, IFPagingApiParams, IFResponseInventory } from '@src/domain/models/IPaging'
import { IFDataProductServiceAdd, IFPagingProdcuctServiceAddApi, IFResponseListProdcuctServiceAddApi } from '@src/domain/models/IProdcuctServiceAdd'
import { IFDataProductPackage, IFPagingProdcuctPackageApi, IFResponseListProdcuctPackageApi } from '@src/domain/models/IProdcuctPackage'
import { IFDataRelatedProduct, IFPagingRelatedProductApi } from '@src/domain/models/IRelatedProduct'
import { IFPagingProductSpecificationCodeApi } from '@src/domain/models/IProductSpecificationCode'

interface IFProductState {
  items: IFDataProduct[]
  checkInit: boolean
  checkProductAttributeMappingInit: boolean
  checkProductSpecificationAttributeMappingInit: boolean
  checkProductVariantAttributeCombinationInit: boolean
  checkProductVariantAttributeValueInit: boolean
  checkProductCategoryMappingInit: boolean
  checkProductInventoryInit: boolean
  checkProductManufacturerMappingInit: boolean
  checkProductMediaInit: boolean
  checkTierPriceInit: boolean
  checkProductServiceAddInit: boolean
  checkProductPackageInit: boolean
  checkRelatedProductInit: boolean
  checkProductVariantInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataProduct | null
}

const initialState: IFProductState = {
  items: [],
  checkInit: false,
  checkProductVariantAttributeCombinationInit: false,
  checkProductVariantAttributeValueInit: false,
  checkProductSpecificationAttributeMappingInit: false,
  checkProductAttributeMappingInit: false,
  checkProductCategoryMappingInit: false,
  checkProductInventoryInit: false,
  checkProductManufacturerMappingInit: false,
  checkProductMediaInit: false,
  checkTierPriceInit: false,
  checkProductServiceAddInit: false,
  checkProductPackageInit: false,
  checkRelatedProductInit: false,
  checkProductVariantInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingApiParams>(PRODUCT.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductApi = await api.productApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getByIdApi = createAsyncThunk<any, string>(PRODUCT.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
  try {
    return await api.productApi.getByIdApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const createAllVariantApi = createAsyncThunk<any, string>(PRODUCT.ACTION_TYPES.CREATE_ALL_VARIANT, async (id, thunkAPI) => {
  try {
    return await api.productApi.createAllVariantApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getListBoxApi = createAsyncThunk<any, IFListboxProductApi>(PRODUCT.ACTION_TYPES.GET_LISTBOX_API, async (params, thunkAPI) => {
  try {
    return await api.productApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFModelProduct>(PRODUCT.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.productApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addVariantApi = createAsyncThunk<any, IFProductVariant>(PRODUCT.ACTION_TYPES.ADD_VARIANT, async (params, thunkAPI) => {
  try {
    return await api.productApi.addVariantApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFModelProduct>(PRODUCT.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.productApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const duplicateApi = createAsyncThunk<any, IFDuplicateProductApi >(PRODUCT.ACTION_TYPES.DUPLICATE,
  async (params, thunkAPI) => {
    try {
      return await api.productApi.duplicateApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)


export const deleteApi = createAsyncThunk<any, string>(PRODUCT.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const getPagingProductVariantAttributeCombinationApi = createAsyncThunk<any, IFPagingProductApi>(PRODUCTVARIANTATTRIBUTECOMBINATION.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductVariantAttributeCombinationApi = await api.productVariantAttributeCombinationApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getlistProductVariantAttributeCombinationApi = createAsyncThunk<any, IFListboxProductVariantAttributeCombinationApi>(PRODUCTVARIANTATTRIBUTECOMBINATION.ACTION_TYPES.GET_LISTBOX_API, async (params, thunkAPI) => {
  try {
    return await api.productVariantAttributeCombinationApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addProductVariantAttributeCombinationApi = createAsyncThunk<any, IFDataProductVariantAttributeCombination>(PRODUCTVARIANTATTRIBUTECOMBINATION.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.productVariantAttributeCombinationApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editProductVariantAttributeCombinationApi = createAsyncThunk<any, IFDataProductVariantAttributeCombination>(PRODUCTVARIANTATTRIBUTECOMBINATION.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.productVariantAttributeCombinationApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteProductVariantAttributeCombinationApi = createAsyncThunk<any, string>(PRODUCTVARIANTATTRIBUTECOMBINATION.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productVariantAttributeCombinationApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingProductVariantAttributeValueApi = createAsyncThunk<any, IFPagingProductApi>(PRODUCTVARIANTATTRIBUTEVALUE.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductVariantAttributeValueApi = await api.productVariantAttributeValueApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getlistProductVariantAttributeValueApi = createAsyncThunk<any, IFListboxProductVariantAttributeValueApi>(PRODUCTVARIANTATTRIBUTEVALUE.ACTION_TYPES.GET_LISTBOX_API, async (params, thunkAPI) => {
  try {
    return await api.productVariantAttributeValueApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addProductVariantAttributeValueApi = createAsyncThunk<any, IFDataProductVariantAttributeValue>(PRODUCTVARIANTATTRIBUTEVALUE.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.productVariantAttributeValueApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editProductVariantAttributeValueApi = createAsyncThunk<any, IFDataProductVariantAttributeValue>(PRODUCTVARIANTATTRIBUTEVALUE.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.productVariantAttributeValueApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteProductVariantAttributeValueApi = createAsyncThunk<any, string>(PRODUCTVARIANTATTRIBUTEVALUE.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productVariantAttributeValueApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingProductAttributeMappingApi = createAsyncThunk<any, IFPagingProductAttributeMappingApi>(PRODUCTATTRIBUTEMAPPING.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductApi = await api.productAttributeMappingApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const addProductAttributeMappingApi = createAsyncThunk<any, IFDataProductAttributeMapping>(PRODUCTATTRIBUTEMAPPING.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.productAttributeMappingApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const editProductAttributeMappingApi = createAsyncThunk<any, IFDataProductAttributeMapping>(PRODUCTATTRIBUTEMAPPING.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.productAttributeMappingApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const deleteProductAttributeMappingApi = createAsyncThunk<any, string>(PRODUCTATTRIBUTEMAPPING.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productAttributeMappingApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const getPagingProductSpecificationAttributeMappingApi = createAsyncThunk<any, IFPagingProductSpecificationAttributeMappingApi>(PRODUCTSPECIFICATIONATTRIBUTEMAPPING.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductApi = await api.productSpecificationAttributeAttributeMappingApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const addProductSpecificationAttributeMappingApi = createAsyncThunk<any, IFDataProductSpecificationAttributeMapping>(PRODUCTSPECIFICATIONATTRIBUTEMAPPING.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.productSpecificationAttributeAttributeMappingApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const editProductSpecificationAttributeMappingApi = createAsyncThunk<any, IFDataProductSpecificationAttributeMapping>(PRODUCTSPECIFICATIONATTRIBUTEMAPPING.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.productSpecificationAttributeAttributeMappingApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const deleteProductSpecificationAttributeMappingApi = createAsyncThunk<any, string>(PRODUCTSPECIFICATIONATTRIBUTEMAPPING.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productSpecificationAttributeAttributeMappingApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingProductSpecificationCodeApi = createAsyncThunk<any, IFPagingProductSpecificationCodeApi>(PRODUCTSPECIFICATIONCODE.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductApi = await api.productSpecificationCodeApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const getPagingProductCategoryMappingApi = createAsyncThunk<any, IFPagingProductCategoryMappingApi>(PRODUCTCATEGORYMAPPING.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductApi = await api.productCategoryMappingApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const addProductCategoryMappingApi = createAsyncThunk<any, IFDataProductCategoryMapping>(PRODUCTCATEGORYMAPPING.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.productCategoryMappingApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const editProductCategoryMappingApi = createAsyncThunk<any, IFDataProductCategoryMapping>(PRODUCTCATEGORYMAPPING.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.productCategoryMappingApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const deleteProductCategoryMappingApi = createAsyncThunk<any, string>(PRODUCTCATEGORYMAPPING.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productCategoryMappingApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingProductInventoryApi = createAsyncThunk<any, IFPagingProductInventoryApi>(PRODUCTINVENTORY.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductApi = await api.productInventoryApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const addProductInventoryApi = createAsyncThunk<any, IFDataProductInventory>(PRODUCTINVENTORY.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.productInventoryApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const addMultiProductInventoryApi = createAsyncThunk<any, IFDataProductInventoryMulti>(PRODUCTINVENTORY.ACTION_TYPES.ADD_MULTI, async (params, thunkAPI) => {
  try {
    return await api.productInventoryApi.addMultiApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editProductInventoryApi = createAsyncThunk<any, IFDataProductInventory>(PRODUCTINVENTORY.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.productInventoryApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const deleteProductInventoryApi = createAsyncThunk<any, string>(PRODUCTINVENTORY.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productInventoryApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingProductManufacturerMappingApi = createAsyncThunk<any, IFPagingProductManufacturerMappingApi>(PRODUCTMANUFACTURERMAPPING.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductApi = await api.productManufacturerMappingApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const addProductManufacturerMappingApi = createAsyncThunk<any, IFDataProductManufacturerMapping>(PRODUCTMANUFACTURERMAPPING.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.productManufacturerMappingApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const editProductManufacturerMappingApi = createAsyncThunk<any, IFDataProductManufacturerMapping>(PRODUCTMANUFACTURERMAPPING.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.productManufacturerMappingApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const deleteProductManufacturerMappingApi = createAsyncThunk<any, string>(PRODUCTMANUFACTURERMAPPING.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productManufacturerMappingApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingProductMediaApi = createAsyncThunk<any, IFPagingProductMediaApi>(PRODUCTMEIDA.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductApi = await api.productMediaApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addProductMediaApi = createAsyncThunk<any, IFDataAddProductMedia>(PRODUCTMEIDA.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    const rs: any = await api.fileApi.uploadImage(params.data, params.onUploadProcess)
    if ((!rs?.errors || rs?.errors?.length === 0) && (!rs?.detailErrors || rs?.detailErrors?.length === 0)) {
      const data: IFDataProductMedia = {
        id: "",
        name: rs.name,
        path: rs.path,
        mediaType: rs.type,
        productId: params.productId,
        displayOrder: 0
      }
      return await api.productMediaApi.addApi(data)
    } else {
      return thunkAPI.rejectWithValue({ error: rs?.detailErrors ? rs?.detailErrors : rs?.errors })
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ errors: error })
  }
})

export const addMultiProductMediaApi = createAsyncThunk<any, IFDataProductMediaMulti>(PRODUCTMEIDA.ACTION_TYPES.ADD_MULTI, async (params, thunkAPI) => {
  try {
    return await api.productMediaApi.addMultiApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ errors: error })
  }
})

export const editProductMediaApi = createAsyncThunk<any, IFDataProductMedia>(PRODUCTMEIDA.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.productMediaApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const deleteProductMediaApi = createAsyncThunk<any, string>(PRODUCTMEIDA.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productMediaApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingTierPriceApi = createAsyncThunk<any, IFPagingTierPriceApi>(TIERPRICE.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductApi = await api.tierPriceApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const addTierPriceApi = createAsyncThunk<any, IFDataTierPrice>(TIERPRICE.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.tierPriceApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const editTierPriceApi = createAsyncThunk<any, IFDataTierPrice>(TIERPRICE.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.tierPriceApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const deleteTierPriceApi = createAsyncThunk<any, string>(TIERPRICE.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.tierPriceApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingProductServiceAddApi = createAsyncThunk<any, IFPagingProdcuctServiceAddApi>(PRODUCTSERVICEADD.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProdcuctServiceAddApi = await api.prodcuctServiceAddApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const addProductServiceAddApi = createAsyncThunk<any, IFDataProductServiceAdd>(PRODUCTSERVICEADD.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.prodcuctServiceAddApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const editProductServiceAddApi = createAsyncThunk<any, IFDataProductServiceAdd>(PRODUCTSERVICEADD.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.prodcuctServiceAddApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const deleteProductServiceAddApi = createAsyncThunk<any, string>(PRODUCTSERVICEADD.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.prodcuctServiceAddApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingProductPackageApi = createAsyncThunk<any, IFPagingProdcuctPackageApi>(PRODUCTPACKAGE.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProdcuctPackageApi = await api.prodcuctPackageApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const addProductPackageApi = createAsyncThunk<any, IFDataProductPackage>(PRODUCTPACKAGE.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.prodcuctPackageApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const editProductPackageApi = createAsyncThunk<any, IFDataProductPackage>(PRODUCTPACKAGE.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.prodcuctPackageApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const deleteProductPackageApi = createAsyncThunk<any, string>(PRODUCTPACKAGE.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.prodcuctPackageApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingRelatedProductApi = createAsyncThunk<any, IFPagingRelatedProductApi>(RELATEDPRODUCT.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProdcuctPackageApi = await api.relatedProductApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const addRelatedProductApi = createAsyncThunk<any, IFDataRelatedProduct>(RELATEDPRODUCT.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.relatedProductApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const editRelatedProductApi = createAsyncThunk<any, IFDataRelatedProduct>(RELATEDPRODUCT.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.relatedProductApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const deleteRelatedProductApi = createAsyncThunk<any, string>(RELATEDPRODUCT.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.relatedProductApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getInventoryByListIdApi = createAsyncThunk<any, IFGetInventoryByListIdApi>(PRODUCT.ACTION_TYPES.GET_INVENTORY_BY_LIST_ID, async (params, thunkAPI) => {
  try {
    const response: IFResponseInventory = await api.productApi.getInventoryByListApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateproductPlans: (state, action: PayloadAction<IFDataProduct>) => {
      state.selected = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(createAllVariantApi.fulfilled, (state) => { state.checkProductVariantInit = !state.checkProductVariantInit })
    builder.addCase(addVariantApi.fulfilled, (state) => { state.checkProductVariantInit = !state.checkProductVariantInit })
    builder.addCase(addApi.fulfilled, (state) => { state.checkInit = !state.checkInit })
    builder.addCase(deleteApi.fulfilled, (state) => { state.checkInit = !state.checkInit })
    builder.addCase(editApi.fulfilled, (state) => { state.checkInit = !state.checkInit })
    builder.addCase(duplicateApi.fulfilled, (state) => { state.checkInit = !state.checkInit })

    builder.addCase(addProductAttributeMappingApi.fulfilled, (state) => { state.checkProductAttributeMappingInit = !state.checkProductAttributeMappingInit })
    builder.addCase(addProductSpecificationAttributeMappingApi.fulfilled, (state) => { state.checkProductSpecificationAttributeMappingInit = !state.checkProductSpecificationAttributeMappingInit })
    builder.addCase(addProductVariantAttributeCombinationApi.fulfilled, (state) => { state.checkProductVariantAttributeCombinationInit = !state.checkProductVariantAttributeCombinationInit })
    builder.addCase(addProductVariantAttributeValueApi.fulfilled, (state) => { state.checkProductVariantAttributeValueInit = !state.checkProductVariantAttributeValueInit })
    builder.addCase(addProductCategoryMappingApi.fulfilled, (state) => { state.checkProductCategoryMappingInit = !state.checkProductCategoryMappingInit })
    builder.addCase(addProductInventoryApi.fulfilled, (state) => { state.checkProductInventoryInit = !state.checkProductInventoryInit })
    builder.addCase(addMultiProductInventoryApi.fulfilled, (state) => { state.checkProductInventoryInit = !state.checkProductInventoryInit })
    builder.addCase(addProductManufacturerMappingApi.fulfilled, (state) => { state.checkProductManufacturerMappingInit = !state.checkProductManufacturerMappingInit })
    builder.addCase(addProductMediaApi.fulfilled, (state) => { state.checkProductMediaInit = !state.checkProductMediaInit })
    builder.addCase(addMultiProductMediaApi.fulfilled, (state) => { state.checkProductMediaInit = !state.checkProductMediaInit })
    builder.addCase(addTierPriceApi.fulfilled, (state) => { state.checkTierPriceInit = !state.checkTierPriceInit })
    builder.addCase(addProductServiceAddApi.fulfilled, (state) => { state.checkProductServiceAddInit = !state.checkProductServiceAddInit })
    builder.addCase(addProductPackageApi.fulfilled, (state) => { state.checkProductPackageInit = !state.checkProductPackageInit })
    builder.addCase(addRelatedProductApi.fulfilled, (state) => { state.checkRelatedProductInit = !state.checkRelatedProductInit })

    builder.addCase(deleteProductAttributeMappingApi.fulfilled, (state) => { state.checkProductAttributeMappingInit = !state.checkProductAttributeMappingInit })
    builder.addCase(deleteProductSpecificationAttributeMappingApi.fulfilled, (state) => { state.checkProductSpecificationAttributeMappingInit = !state.checkProductSpecificationAttributeMappingInit })
    builder.addCase(deleteProductVariantAttributeCombinationApi.fulfilled, (state) => { state.checkProductVariantAttributeCombinationInit = !state.checkProductVariantAttributeCombinationInit })
    builder.addCase(deleteProductVariantAttributeValueApi.fulfilled, (state) => { state.checkProductVariantAttributeValueInit = !state.checkProductVariantAttributeValueInit })
    builder.addCase(deleteProductCategoryMappingApi.fulfilled, (state) => { state.checkProductCategoryMappingInit = !state.checkProductCategoryMappingInit })
    builder.addCase(deleteProductInventoryApi.fulfilled, (state) => { state.checkProductInventoryInit = !state.checkProductInventoryInit })
    builder.addCase(deleteProductManufacturerMappingApi.fulfilled, (state) => { state.checkProductManufacturerMappingInit = !state.checkProductManufacturerMappingInit })
    builder.addCase(deleteProductMediaApi.fulfilled, (state) => { state.checkProductMediaInit = !state.checkProductMediaInit })
    builder.addCase(deleteTierPriceApi.fulfilled, (state) => { state.checkTierPriceInit = !state.checkTierPriceInit })
    builder.addCase(deleteProductServiceAddApi.fulfilled, (state) => { state.checkProductServiceAddInit = !state.checkProductServiceAddInit })
    builder.addCase(deleteProductPackageApi.fulfilled, (state) => { state.checkProductPackageInit = !state.checkProductPackageInit })
    builder.addCase(deleteRelatedProductApi.fulfilled, (state) => { state.checkRelatedProductInit = !state.checkRelatedProductInit })

    builder.addCase(editProductAttributeMappingApi.fulfilled, (state) => { state.checkProductAttributeMappingInit = !state.checkProductAttributeMappingInit })
    builder.addCase(editProductSpecificationAttributeMappingApi.fulfilled, (state) => { state.checkProductSpecificationAttributeMappingInit = !state.checkProductSpecificationAttributeMappingInit })
    builder.addCase(editProductVariantAttributeCombinationApi.fulfilled, (state) => { state.checkProductVariantAttributeCombinationInit = !state.checkProductVariantAttributeCombinationInit })
    builder.addCase(editProductVariantAttributeValueApi.fulfilled, (state) => { state.checkProductVariantAttributeValueInit = !state.checkProductVariantAttributeValueInit })
    builder.addCase(editProductCategoryMappingApi.fulfilled, (state) => { state.checkProductCategoryMappingInit = !state.checkProductCategoryMappingInit })
    builder.addCase(editProductInventoryApi.fulfilled, (state) => { state.checkProductInventoryInit = !state.checkProductInventoryInit })
    builder.addCase(editProductManufacturerMappingApi.fulfilled, (state) => { state.checkProductManufacturerMappingInit = !state.checkProductManufacturerMappingInit })
    builder.addCase(editProductMediaApi.fulfilled, (state) => { state.checkProductMediaInit = !state.checkProductMediaInit })
    builder.addCase(editTierPriceApi.fulfilled, (state) => { state.checkTierPriceInit = !state.checkTierPriceInit })
    builder.addCase(editProductServiceAddApi.fulfilled, (state) => { state.checkProductServiceAddInit = !state.checkProductServiceAddInit })
    builder.addCase(editProductPackageApi.fulfilled, (state) => { state.checkProductPackageInit = !state.checkProductPackageInit })
    builder.addCase(editRelatedProductApi.fulfilled, (state) => { state.checkRelatedProductInit = !state.checkRelatedProductInit })
  }
})

export const { updateproductPlans } = productSlice.actions
