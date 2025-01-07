import { IFSort } from '@src/domain/interfaces/ISort'
import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as categoryStore from '../store'

import {
  IFListboxCategoryApi,
  IFDataCategory,
  IFPagingCategoryApi
} from '@src/domain/models/ICategory'

export const useCategory = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.category)

  const getCategoryPagingApi = (params: IFPagingCategoryApi) => {
    return dispatch(categoryStore.getPagingApi(params))
  }

  const getListCategoryApi = (params: IFListboxCategoryApi) => {
    return dispatch(categoryStore.getListBoxApi(params))
  }

  const getCbxCategoryApi = (params: IFListboxCategoryApi) => {
    return dispatch(categoryStore.getCbxApi(params))
  }

  const addCategoryApi = (params: IFDataCategory) => {
    return dispatch(categoryStore.addApi(params))
  }

  const editCategoryApi = (params: IFDataCategory) => {
    return dispatch(categoryStore.editApi(params))
  }

  const deleteCategoryApi = (id: string) => {
    return dispatch(categoryStore.deleteApi(id))
  }
  const getByIdApi = (params: string) => {
    return dispatch(categoryStore.get(params))
  }
  const getParentByIdApi = (params: string) => {
    return dispatch(categoryStore.getParent(params))
  }
  const sortApi = (params: IFSort) => {
    return dispatch(categoryStore.sortApi(params))
  }

  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getCategoryPagingApi,
    getCbxCategoryApi,
    getListCategoryApi,
    addCategoryApi,
    editCategoryApi,
    deleteCategoryApi,
    getByIdApi,
    sortApi, 
    getParentByIdApi
  }
}
