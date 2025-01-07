import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as ProductTopicStore from '../store'

import {
  IFPagingProductTopicApi, IProductTopic, IProductTopicParamsListbox
} from '@src/domain/models/IProductTopic'
import { IFSort } from '@src/domain/interfaces/ISort'

export const useProductTopic = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.productTopic)

  const getProductTopicPagingApi = (params: IFPagingProductTopicApi) => {
    return dispatch(ProductTopicStore.getPagingApi(params))
  }

  // const getProductTopicByIdApi = (id: string) => {
  //   return dispatch(ProductTopicStore.getByIdApi(id))
  // }

  const getListProductTopicApi = (params: IProductTopicParamsListbox) => {
    return dispatch(ProductTopicStore.getListBoxApi(params))
  }

  const addProductTopicApi = (params: IProductTopic) => {
    return dispatch(ProductTopicStore.addApi(params))
  }

  const editProductTopicApi = (params: IProductTopic) => {
    return dispatch(ProductTopicStore.editApi(params))
  }

  const sortProductTopicApi = (params: IFSort) => {
    return dispatch(ProductTopicStore.sortApi(params))
  }

  const deleteProductTopicApi = (id: string) => {
    return dispatch(ProductTopicStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getProductTopicPagingApi,
    // getProductTopicByIdApi,
    getListProductTopicApi,
    addProductTopicApi,
    editProductTopicApi,
    sortProductTopicApi,
    deleteProductTopicApi
  }
}
