import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as stateProvinceStore from '../store'

import {
  IFCbxStateProvinceApi,
  IFDataStateProvince,
  IFPagingApi
} from '@src/domain/models/IStateProvince'

export const useStateProvince = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.stateProvinces)

  const getStateProvincePagingApi = (params: IFPagingApi) => {
    return dispatch(stateProvinceStore.getPagingApi(params))
  }

  const getStateProvinceByIdApi = (id: string) => {
    return dispatch(stateProvinceStore.getByIdApi(id))
  }

  const getListStateProvinceApi = (params: IFCbxStateProvinceApi) => {
    return dispatch(stateProvinceStore.getlistApi(params))
  }

  const addStateProvinceApi = (params: IFDataStateProvince) => {
    return dispatch(stateProvinceStore.addApi(params))
  }

  const editStateProvinceApi = (params: IFDataStateProvince) => {
    return dispatch(stateProvinceStore.editApi(params))
  }

  const deleteStateProvinceApi = (id: string) => {
    return dispatch(stateProvinceStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getStateProvincePagingApi,
    getStateProvinceByIdApi,
    getListStateProvinceApi,
    addStateProvinceApi,
    editStateProvinceApi,
    deleteStateProvinceApi
  }
}
