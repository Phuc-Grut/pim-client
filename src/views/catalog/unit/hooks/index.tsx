import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as unitStore from '../store'

import {
  IFListboxUnitApi,
  IFDataUnit,
  IFPagingUnitApi
} from '@src/domain/models/IUnit'
import { IFSort } from '@src/domain/interfaces/ISort'

export const useUnit = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.unit)

  const getUnitPagingApi = (params: IFPagingUnitApi) => {
    return dispatch(unitStore.getPagingApi(params))
  }

  // const getUnitByIdApi = (id: string) => {
  //   return dispatch(unitStore.getByIdApi(id))
  // }

  const getListUnitApi = (params: IFListboxUnitApi) => {
    return dispatch(unitStore.getListBoxApi(params))
  }

  const addUnitApi = (params: IFDataUnit) => {
    return dispatch(unitStore.addApi(params))
  }

  const editUnitApi = (params: IFDataUnit) => {
    return dispatch(unitStore.editApi(params))
  }

  const sortUnitApi = (params: IFSort) => {
    return dispatch(unitStore.sortApi(params))
  }

  const deleteUnitApi = (id: string) => {
    return dispatch(unitStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getUnitPagingApi,
    // getUnitByIdApi,
    getListUnitApi,
    addUnitApi,
    editUnitApi,
    sortUnitApi,
    deleteUnitApi
  }
}
