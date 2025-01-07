import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as ProductTopicPageStore from '../store'

import { IProductTopicPage
} from '@src/domain/models/IProductTopicPage'
import { IFSort } from '@src/domain/interfaces/ISort'
import { IFPagingApiParams } from '@src/domain/models/IPaging'
import { IParamsListbox } from '@src/domain/models/IParamsListbox'

export const useProductTopicPage = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.productTopicPage)

  const getProductTopicPagePagingApi = (params: IFPagingApiParams) => {
    return dispatch(ProductTopicPageStore.getPagingApi(params))
  }

  // const getProductTopicPageByIdApi = (id: string) => {
  //   return dispatch(ProductTopicPageStore.getByIdApi(id))
  // }

  const getListProductTopicPageApi = (params: IParamsListbox) => {
    return dispatch(ProductTopicPageStore.getListBoxApi(params))
  }

  const addProductTopicPageApi = (params: IProductTopicPage) => {
    return dispatch(ProductTopicPageStore.addApi(params))
  }

  const editProductTopicPageApi = (params: IProductTopicPage) => {
    return dispatch(ProductTopicPageStore.editApi(params))
  }

  const sortProductTopicPageApi = (params: IFSort) => {
    return dispatch(ProductTopicPageStore.sortApi(params))
  }

  const deleteProductTopicPageApi = (id: string) => {
    return dispatch(ProductTopicPageStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getProductTopicPagePagingApi,
    // getProductTopicPageByIdApi,
    getListProductTopicPageApi,
    addProductTopicPageApi,
    editProductTopicPageApi,
    sortProductTopicPageApi,
    deleteProductTopicPageApi
  }
}
