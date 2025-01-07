import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as productTagStore from '../store'

import {
  IFListboxProductTagApi,
  IFDataProductTag
} from '@src/domain/models/IProductTag'
import { IFPagingApiParams } from '@src/domain/models/IPaging'

export const useProductTag = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.productTag)

  const getProductTagPagingApi = (params: IFPagingApiParams) => {
    return dispatch(productTagStore.getPagingApi(params))
  }

  // const getProductTagByIdApi = (id: string) => {
  //   return dispatch(productTagStore.getByIdApi(id))
  // }

  const getListProductTagApi = (params: IFListboxProductTagApi) => {
    return dispatch(productTagStore.getListBoxApi(params))
  }

  const addProductTagApi = (params: IFDataProductTag) => {
    return dispatch(productTagStore.addApi(params))
  }

  const editProductTagApi = (params: IFDataProductTag) => {
    return dispatch(productTagStore.editApi(params))
  }

  const deleteProductTagApi = (id: string) => {
    return dispatch(productTagStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getProductTagPagingApi,
    // getProductTagByIdApi,
    getListProductTagApi,
    addProductTagApi,
    editProductTagApi,
    deleteProductTagApi
  }
}
