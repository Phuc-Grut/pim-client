import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as systemUserStore from '../store'
import { IFDataProductUser, IFPagingProductUserApi } from '@src/domain/models/IProductUser'

export const useSystemUser = () => {
  const dispatch = useAppDispatch()
  const {
    checkInit
  } = useAppSelector((state: RootState) => state.systemUser)

  const getProductUserPagingApi = (params: IFPagingProductUserApi) => {
    return dispatch(systemUserStore.getPagingProductUserApi(params))
  }

  const getPagingUserApi = (params: IFPagingProductUserApi) => {
    return dispatch(systemUserStore.getPagingUserApi(params))
  }

  const addProductUserApi = (params: IFDataProductUser) => {
    return dispatch(systemUserStore.addProductUserApi(params))
  }

  const editProductUserApi = (params: IFDataProductUser) => {
    return dispatch(systemUserStore.editProductUserApi(params))
  }

  const deleteProductUserApi = (id: string) => {
    return dispatch(systemUserStore.deleteProductUserApi(id))
  }

  return {
    checkInit,
    getProductUserPagingApi,
    getPagingUserApi,
    addProductUserApi,
    editProductUserApi,
    deleteProductUserApi
  }
}
