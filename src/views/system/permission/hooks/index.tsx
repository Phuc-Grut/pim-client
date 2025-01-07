import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as permissionAdminStore from '../store'

import { IFDataGetPagingIdentityToAddApi, IFDataGetPermissionGroupUserApi, IFDataGetPermissionInfoApi, IFDataGetPermissionUserApi, IFDataPermissionGroupUserApi, IFDataPermissionUserApi } from '@src/domain/models/IPermissions'

export const usePermissionAdmin = () => {
  const dispatch = useAppDispatch()
  const {
    checkInit
  } = useAppSelector((state: RootState) => state.permissionAdmins)

  const getTreePermissionApi = () => {
    return dispatch(permissionAdminStore.getTreePermission())
  }

  const getTreeResourcePermissionApi = (params: IFDataGetPermissionInfoApi) => {
    return dispatch(permissionAdminStore.getTreeResourcePermissionApi(params))
  }

  const getPermissionFunctionApi = (params: string) => {
    return dispatch(permissionAdminStore.getPermissionFunctionApi(params))
  }

  const getPagingGroupUserByResourceApi = (params: IFDataGetPagingIdentityToAddApi) => {
    return dispatch(permissionAdminStore.getPagingGroupUserByResourceApi(params))
  }

  const getPagingUserByResourceApi = (params: IFDataGetPagingIdentityToAddApi) => {
    return dispatch(permissionAdminStore.getPagingUserByResourceApi(params))
  }

  const getPermissionUserApi = (params: IFDataGetPermissionUserApi) => {
    return dispatch(permissionAdminStore.getPermissionUserApi(params))
  }

  const getPermissionGroupUserApi = (params: IFDataGetPermissionGroupUserApi) => {
    return dispatch(permissionAdminStore.getPermissionGroupUserApi(params))
  }
  const addPermissonGroupUserApi = (params: IFDataPermissionGroupUserApi) => {
    return dispatch(permissionAdminStore.addPermissonGroupUserApi(params))
  }
  const deletePermissonGroupUserApi = (params: string) => {
    return dispatch(permissionAdminStore.deletePermissonGroupUserApi(params))
  }
  const addPermissonUserApi = (params: IFDataPermissionUserApi) => {
    return dispatch(permissionAdminStore.addPermissonUserApi(params))
  }
  const deletePermissonUserApi = (params: string) => {
    return dispatch(permissionAdminStore.deletePermissonUserApi(params))
  }


  return {
    checkInit,
    getTreePermissionApi,
    getTreeResourcePermissionApi,
    getPermissionFunctionApi,
    getPagingUserByResourceApi,
    getPagingGroupUserByResourceApi,
    getPermissionUserApi,
    getPermissionGroupUserApi,
    addPermissonGroupUserApi,
    deletePermissonGroupUserApi,
    addPermissonUserApi,
    deletePermissonUserApi
  }
}
