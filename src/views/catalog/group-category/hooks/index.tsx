import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as groupCategoryStore from '../store'

import {
  IFListboxGroupCategoryApi,
  IFDataGroupCategory,
  GroupCategorySort
} from '@src/domain/models/IGroupCategory'
import { IFPagingApiParams } from '@src/domain/models/IPaging'

export const useGroupCategory = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.groupCategory)

  const getGroupCategoryPagingApi = (params: IFPagingApiParams) => {
    return dispatch(groupCategoryStore.getPagingApi(params))
  }

  // const getGroupCategoryByIdApi = (id: string) => {
  //   return dispatch(groupCategoryStore.getByIdApi(id))
  // }

  const getListGroupCategoryApi = (params: IFListboxGroupCategoryApi) => {
    return dispatch(groupCategoryStore.getListBoxApi(params))
  }

  const addGroupCategoryApi = (params: IFDataGroupCategory) => {
    return dispatch(groupCategoryStore.addApi(params))
  }

  const editGroupCategoryApi = (params: IFDataGroupCategory) => {
    return dispatch(groupCategoryStore.editApi(params))
  }

  const deleteGroupCategoryApi = (id: string) => {
    return dispatch(groupCategoryStore.deleteApi(id))
  }
  const updateDataSortApi = (params: GroupCategorySort) => {
    return dispatch(groupCategoryStore.update_sort(params))
  }
  const getAllApi = () => {
    return dispatch(groupCategoryStore.get_all())
  }
  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getGroupCategoryPagingApi,
    getAllApi,
    getListGroupCategoryApi,
    addGroupCategoryApi,
    editGroupCategoryApi,
    deleteGroupCategoryApi,
    updateDataSortApi
  }
}
