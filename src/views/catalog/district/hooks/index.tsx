import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as districtStore from '../store'

import {
  IFCbxDistrictApi,
  IFDataDistrict,
  IFPagingApi
} from '@src/domain/models/IDistrict'

export const useDistrict = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.districts)

  const getDistrictPagingApi = (params: IFPagingApi) => {
    return dispatch(districtStore.getPagingApi(params))
  }

  const getDistrictByIdApi = (id: string) => {
    return dispatch(districtStore.getByIdApi(id))
  }

  const getListDistrictApi = (params: IFCbxDistrictApi) => {
    return dispatch(districtStore.getlistApi(params))
  }

  const addDistrictApi = (params: IFDataDistrict) => {
    return dispatch(districtStore.addApi(params))
  }

  const editDistrictApi = (params: IFDataDistrict) => {
    return dispatch(districtStore.editApi(params))
  }

  const deleteDistrictApi = (id: string) => {
    return dispatch(districtStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getDistrictPagingApi,
    getDistrictByIdApi,
    getListDistrictApi,
    addDistrictApi,
    editDistrictApi,
    deleteDistrictApi
  }
}
