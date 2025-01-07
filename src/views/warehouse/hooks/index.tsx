import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as warehouseStore from '../store'

import {
  IFListboxWarehouseApi,
  IFDataWarehouse,
  IFPagingWarehouseApi
} from '@src/domain/models/IWarehouse'
import { IFSort } from '@src/domain/interfaces/ISort'

export const useWarehouse = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.warehouse)

  const getWarehousePagingApi = (params: IFPagingWarehouseApi) => {
    return dispatch(warehouseStore.getPagingApi(params))
  }

  // const getWarehouseByIdApi = (id: string) => {
  //   return dispatch(warehouseStore.getByIdApi(id))
  // }

  const getListWarehouseApi = (params: IFListboxWarehouseApi) => {
    return dispatch(warehouseStore.getListBoxApi(params))
  }

  const addWarehouseApi = (params: IFDataWarehouse) => {
    return dispatch(warehouseStore.addApi(params))
  }

  const editWarehouseApi = (params: IFDataWarehouse) => {
    return dispatch(warehouseStore.editApi(params))
  }

  const sortWarehouseApi = (params: IFSort) => {
    return dispatch(warehouseStore.sortApi(params))
  }

  const deleteWarehouseApi = (id: string) => {
    return dispatch(warehouseStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getWarehousePagingApi,
    // getWarehouseByIdApi,
    getListWarehouseApi,
    addWarehouseApi,
    editWarehouseApi,
    sortWarehouseApi,
    deleteWarehouseApi
  }
}
