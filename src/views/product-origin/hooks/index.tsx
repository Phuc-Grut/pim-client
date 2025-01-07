import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as productOriginStore from '../store'

import {
  IFListboxProductOriginApi,
  IFDataProductOrigin,
  IFPagingProductOriginApi
} from '@src/domain/models/IProductOrigin'
import { IFSort } from '@src/domain/interfaces/ISort'

export const useProductOrigin = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.productOrigin)

  const getProductOriginPagingApi = (params: IFPagingProductOriginApi) => {
    return dispatch(productOriginStore.getPagingApi(params))
  }

  // const getProductOriginByIdApi = (id: string) => {
  //   return dispatch(productOriginStore.getByIdApi(id))
  // }

  const getListProductOriginApi = (params: IFListboxProductOriginApi) => {
    return dispatch(productOriginStore.getListBoxApi(params))
  }

  const addProductOriginApi = (params: IFDataProductOrigin) => {
    return dispatch(productOriginStore.addApi(params))
  }

  const editProductOriginApi = (params: IFDataProductOrigin) => {
    return dispatch(productOriginStore.editApi(params))
  }

  const sortProductOriginApi = (params: IFSort) => {
    return dispatch(productOriginStore.sortApi(params))
  }

  const deleteProductOriginApi = (id: string) => {
    return dispatch(productOriginStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getProductOriginPagingApi,
    // getProductOriginByIdApi,
    getListProductOriginApi,
    addProductOriginApi,
    editProductOriginApi,
    sortProductOriginApi,
    deleteProductOriginApi
  }
}
