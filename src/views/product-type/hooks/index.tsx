import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as productTypeStore from '../store'

import {
  IFListboxProductTypeApi,
  IFDataProductType
} from '@src/domain/models/IProductType'
import { IFSort } from '@src/domain/interfaces/ISort'
import { IFPagingApiParams } from '@src/domain/models/IPaging'

export const useProductType = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.productType)

  const getProductTypePagingApi = (params: IFPagingApiParams) => {
    return dispatch(productTypeStore.getPagingApi(params))
  }

  const getListProductTypeApi = (params: IFListboxProductTypeApi) => {
    return dispatch(productTypeStore.getListBoxApi(params))
  }

  const addProductTypeApi = (params: IFDataProductType) => {
    return dispatch(productTypeStore.addApi(params))
  }

  const editProductTypeApi = (params: IFDataProductType) => {
    return dispatch(productTypeStore.editApi(params))
  }

  const sortProductTypeApi = (params: IFSort) => {
    return dispatch(productTypeStore.sortApi(params))
  }

  const deleteProductTypeApi = (id: string) => {
    return dispatch(productTypeStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getProductTypePagingApi,
    // getProductTypeByIdApi,
    getListProductTypeApi,
    addProductTypeApi,
    editProductTypeApi,
    sortProductTypeApi,
    deleteProductTypeApi
  }
}
