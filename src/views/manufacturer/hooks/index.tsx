import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as manufacturerStore from '../store'

import {
  IFListboxManufacturerApi,
  IFDataManufacturer,
  IFPagingManufacturerApi
} from '@src/domain/models/IManufacturer'
import { IFSort } from '@src/domain/interfaces/ISort'

export const useManufacturer = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.manufacturer)

  const getManufacturerPagingApi = (params: IFPagingManufacturerApi) => {
    return dispatch(manufacturerStore.getPagingApi(params))
  }

  // const getManufacturerByIdApi = (id: string) => {
  //   return dispatch(manufacturerStore.getByIdApi(id))
  // }

  const getListManufacturerApi = (params: IFListboxManufacturerApi) => {
    return dispatch(manufacturerStore.getListBoxApi(params))
  }

  const addManufacturerApi = (params: IFDataManufacturer) => {
    return dispatch(manufacturerStore.addApi(params))
  }

  const editManufacturerApi = (params: IFDataManufacturer) => {
    return dispatch(manufacturerStore.editApi(params))
  }

  const sortManufacturerApi = (params: IFSort) => {
    return dispatch(manufacturerStore.sortApi(params))
  }

  const deleteManufacturerApi = (id: string) => {
    return dispatch(manufacturerStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getManufacturerPagingApi,
    // getManufacturerByIdApi,
    getListManufacturerApi,
    addManufacturerApi,
    editManufacturerApi,
    sortManufacturerApi,
    deleteManufacturerApi
  }
}
