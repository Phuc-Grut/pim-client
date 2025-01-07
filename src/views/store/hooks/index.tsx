import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as storeStore from '../store'

import {
  IFListboxStoreApi,
  IFDataStore,
  IFPagingStoreApi
} from '@src/domain/models/IStore'
import { IFSort } from '@src/domain/interfaces/ISort'

export const useStore = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.store)

  const getStorePagingApi = (params: IFPagingStoreApi) => {
    return dispatch(storeStore.getPagingApi(params))
  }

  // const getStoreByIdApi = (id: string) => {
  //   return dispatch(storeStore.getByIdApi(id))
  // }

  const getListStoreApi = (params: IFListboxStoreApi) => {
    return dispatch(storeStore.getListBoxApi(params))
  }

  const addStoreApi = (params: IFDataStore) => {
    return dispatch(storeStore.addApi(params))
  }

  const editStoreApi = (params: IFDataStore) => {
    return dispatch(storeStore.editApi(params))
  }
  
  const sortStoreApi = (params: IFSort) => {
    return dispatch(storeStore.sortApi(params))
  }

  const deleteStoreApi = (id: string) => {
    return dispatch(storeStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getStorePagingApi,
    // getStoreByIdApi,
    getListStoreApi,
    addStoreApi,
    editStoreApi,
    sortStoreApi,
    deleteStoreApi
  }
}
