import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as serviceAddStore from '../store'

import {
  IFListboxServiceAddApi,
  IFDataServiceAdd,
  IFPagingServiceAddApi
} from '@src/domain/models/IServiceAdd'
import { IFSort } from '@src/domain/interfaces/ISort'

export const useServiceAdd = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.serviceAdd)

  const getServiceAddPagingApi = (params: IFPagingServiceAddApi) => {
    return dispatch(serviceAddStore.getPagingApi(params))
  }

  const getListServiceAddApi = (params: IFListboxServiceAddApi) => {
    return dispatch(serviceAddStore.getListBoxApi(params))
  }

  const getListBoxServiceAddPriceSyntaxApi = () => {
    return dispatch(serviceAddStore.getListBoxPriceSyntaxApi())
  }

  const addServiceAddApi = (params: IFDataServiceAdd) => {
    return dispatch(serviceAddStore.addApi(params))
  }

  const editServiceAddApi = (params: IFDataServiceAdd) => {
    return dispatch(serviceAddStore.editApi(params))
  }
  
  const sortServiceAddApi = (params: IFSort) => {
    return dispatch(serviceAddStore.sortApi(params))
  }

  const deleteServiceAddApi = (id: string) => {
    return dispatch(serviceAddStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getListBoxServiceAddPriceSyntaxApi,
    getServiceAddPagingApi,
    getListServiceAddApi,
    addServiceAddApi,
    editServiceAddApi,
    sortServiceAddApi,
    deleteServiceAddApi
  }
}
