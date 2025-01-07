import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'
  
import * as ProductTopicQueryStore from '../store'
  
import {
  IProductTopicQuery, IProductTopicQueryParamsListbox
} from '@src/domain/models/IProductTopicQuery'
import { IFPagingApiParams } from '@src/domain/models/IPaging'
import { IFSort } from '@src/domain/interfaces/ISort'
  
export const useProductTopicQuery = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInitQuery,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.productTopicQuery)
  
  const getProductTopicQueryPagingApi = (params: IFPagingApiParams) => {
    return dispatch(ProductTopicQueryStore.getPagingApi(params))
  }
  
  // const getProductTopicQueryByIdApi = (id: string) => {
  //   return dispatch(ProductTopicQueryStore.getByIdApi(id))
  // }
  
  const getListProductTopicQueryApi = (params: IProductTopicQueryParamsListbox) => {
    return dispatch(ProductTopicQueryStore.getListBoxApi(params))
  }
  
  const addProductTopicQueryApi = (params: IProductTopicQuery) => {
    return dispatch(ProductTopicQueryStore.addApi(params))
  }
  
  const editProductTopicQueryApi = (params: IProductTopicQuery) => {
    return dispatch(ProductTopicQueryStore.editApi(params))
  }
  
  const sortProductTopicQueryApi = (params: IFSort) => {
    return dispatch(ProductTopicQueryStore.sortApi(params))
  }
  
  const deleteProductTopicQueryApi = (id: string) => {
    return dispatch(ProductTopicQueryStore.deleteApi(id))
  }
  
  
  return {
    successfully,
    checkInitQuery,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getProductTopicQueryPagingApi,
    // getProductTopicQueryByIdApi,
    getListProductTopicQueryApi,
    addProductTopicQueryApi,
    editProductTopicQueryApi,
    sortProductTopicQueryApi,
    deleteProductTopicQueryApi
  }
}
