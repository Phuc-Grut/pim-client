import { IFSort } from '@src/domain/interfaces/ISort'
import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as productCategoryStore from '../store'

import {
  IFListboxProductCategoryApi,
  IFDataProductCategory,
  IFPagingProductCategoryApi
} from '@src/domain/models/IProductCategory'

export const useProductCategory = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.productCategory)

  const getProductCategoryPagingApi = (params: IFPagingProductCategoryApi) => {
    return dispatch(productCategoryStore.getPagingApi(params))
  }

  const getListProductCategoryApi = (params: IFListboxProductCategoryApi) => {
    return dispatch(productCategoryStore.getListBoxApi(params))
  }
  const getListComboboxProCateApi = () => {
    return dispatch(productCategoryStore.getListComboboxApi())
  }

  const addProductCategoryApi = (params: IFDataProductCategory) => {
    return dispatch(productCategoryStore.addApi(params))
  }

  const editProductCategoryApi = (params: IFDataProductCategory) => {
    return dispatch(productCategoryStore.editApi(params))
  }

  const deleteProductCategoryApi = (id: string) => {
    return dispatch(productCategoryStore.deleteApi(id))
  }
  const getByIdApi = (params: string) => {
    return dispatch(productCategoryStore.get(params))
  }
  const getParentByIdApi = (params: string) => {
    return dispatch(productCategoryStore.getParent(params))
  }
  const sortApi = (params: IFSort) => {
    return dispatch(productCategoryStore.sortApi(params))
  }

  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getProductCategoryPagingApi,
    getListProductCategoryApi,
    addProductCategoryApi,
    getListComboboxProCateApi,
    editProductCategoryApi,
    deleteProductCategoryApi,
    getByIdApi,
    sortApi, 
    getParentByIdApi
  }
}
