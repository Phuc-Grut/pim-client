import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as groupUnitStore from '../store'

import {
  IFListboxGroupUnitApi,
  IFDataGroupUnit,
  IFPagingGroupUnitApi
} from '@src/domain/models/IGroupUnit'
import { IFSort } from '@src/domain/interfaces/ISort'

export const useGroupUnit = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.groupUnit)

  const getGroupUnitPagingApi = (params: IFPagingGroupUnitApi) => {
    return dispatch(groupUnitStore.getPagingApi(params))
  }

  // const getGroupUnitByIdApi = (id: string) => {
  //   return dispatch(groupUnitStore.getByIdApi(id))
  // }

  const getListGroupUnitApi = (params: IFListboxGroupUnitApi) => {
    return dispatch(groupUnitStore.getListBoxApi(params))
  }

  const addGroupUnitApi = (params: IFDataGroupUnit) => {
    return dispatch(groupUnitStore.addApi(params))
  }

  const editGroupUnitApi = (params: IFDataGroupUnit) => {
    return dispatch(groupUnitStore.editApi(params))
  }

  const sortGroupUnitApi = (params: IFSort) => {
    return dispatch(groupUnitStore.sortApi(params))
  }

  const deleteGroupUnitApi = (id: string) => {
    return dispatch(groupUnitStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getGroupUnitPagingApi,
    // getGroupUnitByIdApi,
    getListGroupUnitApi,
    addGroupUnitApi,
    editGroupUnitApi,
    sortGroupUnitApi,
    deleteGroupUnitApi
  }
}
