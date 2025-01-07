import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as systemGroupUserStore from '../store'

import {
  IFListBoxGroupUserApi,
  IFDataGroupUser,
  IFPagingUserGroupUserApi,
  IFAddUserGroupUserApi
} from '@src/domain/models/IGroupUser'

export const useSystemGroupUser = () => {
  const dispatch = useAppDispatch()
  const {
    checkInit,
    checkInitGroupUserUser
  } = useAppSelector((state: RootState) => state.systemGroupUser)

  const getListGroupUserApi = (params: IFListBoxGroupUserApi) => {
    return dispatch(systemGroupUserStore.getListBoxApi(params))
  }
  
  const getPagingUsersApi = (params: IFPagingUserGroupUserApi) => {
    return dispatch(systemGroupUserStore.getPagingUsersApi(params))
  }

  const addGroupUserApi = (params: IFDataGroupUser) => {
    return dispatch(systemGroupUserStore.addApi(params))
  }

  const editGroupUserApi = (params: IFDataGroupUser) => {
    return dispatch(systemGroupUserStore.editApi(params))
  }

  const deleteGroupUserApi = (id: string) => {
    return dispatch(systemGroupUserStore.deleteApi(id))
  }

  const getPagingUsersGroupUserApi = (params: IFPagingUserGroupUserApi) => {
    return dispatch(systemGroupUserStore.getPagingUsersGroupUserApi(params))
  }

  const addUserGroupUserApi = (params: IFAddUserGroupUserApi) => {
    return dispatch(systemGroupUserStore.addUserGroupUserApi(params))
  }

  const removeUserGroupUserApi = (id: string) => {
    return dispatch(systemGroupUserStore.removeUserGroupUserApi(id))
  }

  return {
    checkInit,
    checkInitGroupUserUser,
    getListGroupUserApi,
    addGroupUserApi,
    editGroupUserApi,
    deleteGroupUserApi,
    getPagingUsersApi,
    removeUserGroupUserApi,
    getPagingUsersGroupUserApi,
    addUserGroupUserApi
  }
}
