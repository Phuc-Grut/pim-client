import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as productAttributeStore from '../store'

import {
  IFDataProductAttribute
} from '@src/domain/models/IProductAttribute'
import { IFListboxProductAttributeOptionApi, IFDataProductAttributeOption, IFPagingProductAttributeOptionApi } from '@src/domain/models/IProductAttributeOption'
import { IFListboxProductAttributeOptionSetApi, IFDataProductAttributeOptionSet, IFPagingProductAttributeOptionSetApi } from '@src/domain/models/IProductAttributeOptionSet'
import { IFSort } from '@src/domain/interfaces/ISort'
import { IFPagingApiParams } from '@src/domain/models/IPaging'
import { IListBoxApiParams } from '@src/domain/models/IListBox'

export const useProductAttribute = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    checkInitOption,
    checkInitOptionSet,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.productAttribute)

  const getProductAttributePagingApi = (params: IFPagingApiParams) => {
    return dispatch(productAttributeStore.getPagingProductAttributeApi(params))
  }

  const getListProductAttributeApi = (params: IListBoxApiParams) => {
    return dispatch(productAttributeStore.getlistProductAttributeApi(params))
  }

  const getByIdApi = (params: string) => {
    return dispatch(productAttributeStore.getByIdApi(params))
  }

  const addProductAttributeApi = (params: IFDataProductAttribute) => {
    return dispatch(productAttributeStore.addProductAttributeApi(params))
  }

  const editProductAttributeApi = (params: IFDataProductAttribute) => {
    return dispatch(productAttributeStore.editProductAttributeApi(params))
  }

  const sortProductAttributeApi = (params: IFSort) => {
    return dispatch(productAttributeStore.sortProductAttributeApi(params))
  }

  const deleteProductAttributeApi = (id: string) => {
    return dispatch(productAttributeStore.deleteProductAttributeApi(id))
  }

  const getProductAttributeOptionPagingApi = (params: IFPagingProductAttributeOptionApi) => {
    return dispatch(productAttributeStore.getPagingProductAttributeOptionApi(params))
  }

  const getListProductAttributeOptionApi = (params: IFListboxProductAttributeOptionApi) => {
    return dispatch(productAttributeStore.getlistProductAttributeOptionApi(params))
  }

  const addProductAttributeOptionApi = (params: IFDataProductAttributeOption) => {
    return dispatch(productAttributeStore.addProductAttributeOptionApi(params))
  }

  const editProductAttributeOptionApi = (params: IFDataProductAttributeOption) => {
    return dispatch(productAttributeStore.editProductAttributeOptionApi(params))
  }

  const deleteProductAttributeOptionApi = (id: string) => {
    return dispatch(productAttributeStore.deleteProductAttributeOptionApi(id))
  }

  const getProductAttributeOptionSetPagingApi = (params: IFPagingProductAttributeOptionSetApi) => {
    return dispatch(productAttributeStore.getPagingProductAttributeOptionSetApi(params))
  }

  const getListProductAttributeOptionSetApi = (params: IFListboxProductAttributeOptionSetApi) => {
    return dispatch(productAttributeStore.getlistProductAttributeOptionSetApi(params))
  }

  const addProductAttributeOptionSetApi = (params: IFDataProductAttributeOptionSet) => {
    return dispatch(productAttributeStore.addProductAttributeOptionSetApi(params))
  }

  const editProductAttributeOptionSetApi = (params: IFDataProductAttributeOptionSet) => {
    return dispatch(productAttributeStore.editProductAttributeOptionSetApi(params))
  }

  const deleteProductAttributeOptionSetApi = (id: string) => {
    return dispatch(productAttributeStore.deleteProductAttributeOptionSetApi(id))
  }


  return {
    successfully,
    checkInit,
    checkInitOption,
    checkInitOptionSet,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getProductAttributePagingApi,
    getListProductAttributeApi,
    getByIdApi,
    addProductAttributeApi,
    editProductAttributeApi,
    sortProductAttributeApi,
    deleteProductAttributeApi,
    getProductAttributeOptionPagingApi,
    getListProductAttributeOptionApi,
    addProductAttributeOptionApi,
    editProductAttributeOptionApi,
    deleteProductAttributeOptionApi,
    getProductAttributeOptionSetPagingApi,
    getListProductAttributeOptionSetApi,
    addProductAttributeOptionSetApi,
    editProductAttributeOptionSetApi,
    deleteProductAttributeOptionSetApi
  }
}
