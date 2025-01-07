import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as deliveryTimeStore from '../store'

import { IFPagingDeliveryTimeApi, IFDataDeliveryTime } from '@src/domain/models/IDeliveryTime'
import { IFSort } from '@src/domain/interfaces/ISort'

export const useDeliveryTime = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.deliveryTime)

  const getDeliveryTimePagingApi = (params: IFPagingDeliveryTimeApi) => {
    return dispatch(deliveryTimeStore.getPagingApi(params))
  }

  // const getDeliveryTimeByIdApi = (id: string) => {
  //   return dispatch(deliveryTimeStore.getByIdApi(id))
  // }

  const getListDeliveryTimeApi = () => {
    return dispatch(deliveryTimeStore.getListBoxApi())
  }

  const addDeliveryTimeApi = (params: IFDataDeliveryTime) => {
    return dispatch(deliveryTimeStore.addApi(params))
  }

  const editDeliveryTimeApi = (params: IFDataDeliveryTime) => {
    return dispatch(deliveryTimeStore.editApi(params))
  }

  const sortDeliveryTimeApi = (params: IFSort) => {
    return dispatch(deliveryTimeStore.sortApi(params))
  }

  const deleteDeliveryTimeApi = (id: string) => {
    return dispatch(deliveryTimeStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getDeliveryTimePagingApi,
    // getDeliveryTimeByIdApi,
    getListDeliveryTimeApi,
    addDeliveryTimeApi,
    editDeliveryTimeApi,
    sortDeliveryTimeApi,
    deleteDeliveryTimeApi
  }
}
