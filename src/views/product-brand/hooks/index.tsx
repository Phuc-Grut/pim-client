import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as productBrandStore from '../store'

import {
  IFListboxProductBrandApi,
  IFDataProductBrand,
  IFPagingProductBrandApi
} from '@src/domain/models/IProductBrand'
import { IFSort } from '@src/domain/interfaces/ISort'

export const useProductBrand = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.productBrand)

  const getProductBrandPagingApi = (params: IFPagingProductBrandApi) => {
    return dispatch(productBrandStore.getPagingApi(params))
  }

  // const getProductBrandByIdApi = (id: string) => {
  //   return dispatch(productBrandStore.getByIdApi(id))
  // }

  const getListProductBrandApi = (params: IFListboxProductBrandApi) => {
    return dispatch(productBrandStore.getListBoxApi(params))
  }

  const addProductBrandApi = (params: IFDataProductBrand) => {
    return dispatch(productBrandStore.addApi(params))
  }

  const editProductBrandApi = (params: IFDataProductBrand) => {
    return dispatch(productBrandStore.editApi(params))
  }

  const sortProductBrandApi = (params: IFSort) => {
    return dispatch(productBrandStore.sortApi(params))
  }

  const deleteProductBrandApi = (id: string) => {
    return dispatch(productBrandStore.deleteApi(id))
  }

  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getProductBrandPagingApi,
    // getProductBrandByIdApi,
    getListProductBrandApi,
    addProductBrandApi,
    editProductBrandApi,
    sortProductBrandApi,
    deleteProductBrandApi
  }
}
