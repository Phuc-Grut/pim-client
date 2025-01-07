import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as bankStore from '../store'

import {
  IFCbxCurrencyApi,
  IFDataCurrency,
  IFPagingCurrencyApi
} from '@src/domain/models/ICurrency'

export const useCurrency = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.currency)

  const getCurrencyPagingApi = (params: IFPagingCurrencyApi) => {
    return dispatch(bankStore.getPagingApi(params))
  }

  // const getCurrencyByIdApi = (id: string) => {
  //   return dispatch(bankStore.getByIdApi(id))
  // }

  const getListCurrencyApi = (params: IFCbxCurrencyApi) => {
    return dispatch(bankStore.getlistApi(params))
  }

  const addCurrencyApi = (params: IFDataCurrency) => {
    return dispatch(bankStore.addApi(params))
  }

  const editCurrencyApi = (params: IFDataCurrency) => {
    return dispatch(bankStore.editApi(params))
  }

  const deleteCurrencyApi = (id: string) => {
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
    getCurrencyPagingApi,
    // getCurrencyByIdApi,
    getListCurrencyApi,
    addCurrencyApi,
    editCurrencyApi,
    deleteCurrencyApi
  }
}
