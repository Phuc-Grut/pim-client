import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as bankStore from '../store'

import {
  IFCbxExchangeRateApi,
  IFDataExchangeRate,
  IFPagingExchangeRateApi
} from '@src/domain/models/IExchangeRate'

export const useExchangeRate = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.exchangeRate)

  const getExchangeRatePagingApi = (params: IFPagingExchangeRateApi) => {
    return dispatch(bankStore.getPagingApi(params))
  }

  // const getExchangeRateByIdApi = (id: string) => {
  //   return dispatch(bankStore.getByIdApi(id))
  // }

  const getListExchangeRateApi = (params: IFCbxExchangeRateApi) => {
    return dispatch(bankStore.getlistApi(params))
  }

  const addExchangeRateApi = (params: IFDataExchangeRate) => {
    return dispatch(bankStore.addApi(params))
  }

  const editExchangeRateApi = (params: IFDataExchangeRate) => {
    return dispatch(bankStore.editApi(params))
  }

  const deleteExchangeRateApi = (id: string) => {
    return dispatch(bankStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getExchangeRatePagingApi,
    // getExchangeRateByIdApi,
    getListExchangeRateApi,
    addExchangeRateApi,
    editExchangeRateApi,
    deleteExchangeRateApi
  }
}
