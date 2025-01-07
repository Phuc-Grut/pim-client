import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as taxCategoryStore from '../store'

import {
  IFListboxTaxCategoryApi,
  IFDataTaxCategory
} from '@src/domain/models/ITaxCategory'
import { IFSort } from '@src/domain/interfaces/ISort'
import { IFPagingApiParams } from '@src/domain/models/IPaging'

export const useTaxCategory = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.taxCategory)

  const getTaxCategoryPagingApi = (params: IFPagingApiParams) => {
    return dispatch(taxCategoryStore.getPagingApi(params))
  }

  // const getTaxCategoryByIdApi = (id: string) => {
  //   return dispatch(taxCategoryStore.getByIdApi(id))
  // }

  const getListTaxCategoryApi = (params: IFListboxTaxCategoryApi) => {
    return dispatch(taxCategoryStore.getListBoxApi(params))
  }

  const addTaxCategoryApi = (params: IFDataTaxCategory) => {
    return dispatch(taxCategoryStore.addApi(params))
  }

  const editTaxCategoryApi = (params: IFDataTaxCategory) => {
    return dispatch(taxCategoryStore.editApi(params))
  }

  const sortTaxCategoryApi = (params: IFSort) => {
    return dispatch(taxCategoryStore.sortApi(params))
  }

  const deleteTaxCategoryApi = (id: string) => {
    return dispatch(taxCategoryStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getTaxCategoryPagingApi,
    // getTaxCategoryByIdApi,
    getListTaxCategoryApi,
    addTaxCategoryApi,
    editTaxCategoryApi,
    sortTaxCategoryApi,
    deleteTaxCategoryApi
  }
}
