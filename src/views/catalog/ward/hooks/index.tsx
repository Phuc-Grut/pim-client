import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as wardStore from '../store'

import {
  IFCbxWardApi,
  IFDataWard,
  IFPagingApi
} from '@src/domain/models/IWard'

export const useWard = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.wards)

  const getWardPagingApi = (params: IFPagingApi) => {
    return dispatch(wardStore.getPagingApi(params))
  }

  const getWardByIdApi = (id: string) => {
    return dispatch(wardStore.getByIdApi(id))
  }

  const getListWardApi = (params: IFCbxWardApi) => {
    return dispatch(wardStore.getlistApi(params))
  }

  const addWardApi = (params: IFDataWard) => {
    return dispatch(wardStore.addApi(params))
  }

  const editWardApi = (params: IFDataWard) => {
    return dispatch(wardStore.editApi(params))
  }

  const deleteWardApi = (id: string) => {
    return dispatch(wardStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getWardPagingApi,
    getWardByIdApi,
    getListWardApi,
    addWardApi,
    editWardApi,
    deleteWardApi
  }
}
