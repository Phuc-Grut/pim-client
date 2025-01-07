import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as countryStore from '../store'

import {
  IFCbxCountryApi,
  IFDataCountry,
  IFPagingApi
} from '@src/domain/models/ICountry'

export const useCountry = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.countries)

  const getCountryPagingApi = (params: IFPagingApi) => {
    return dispatch(countryStore.getPagingApi(params))
  }

  const getCountryByIdApi = (id: string) => {
    return dispatch(countryStore.getByIdApi(id))
  }

  const getListCountryApi = (params: IFCbxCountryApi) => {
    return dispatch(countryStore.getlistApi(params))
  }

  const addCountryApi = (params: IFDataCountry) => {
    return dispatch(countryStore.addApi(params))
  }

  const editCountryApi = (params: IFDataCountry) => {
    return dispatch(countryStore.editApi(params))
  }

  const deleteCountryApi = (id: string) => {
    return dispatch(countryStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getCountryPagingApi,
    getCountryByIdApi,
    getListCountryApi,
    addCountryApi,
    editCountryApi,
    deleteCountryApi
  }
}
