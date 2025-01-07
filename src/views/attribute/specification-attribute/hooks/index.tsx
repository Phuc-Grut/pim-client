import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as specificationAttributeStore from '../store'

import {
  IFDataSpecificationAttribute
} from '@src/domain/models/ISpecificationAttribute'
import { IFListboxSpecificationAttributeOptionApi, IFDataSpecificationAttributeOption, IFPagingSpecificationAttributeOptionApi } from '@src/domain/models/ISpecificationAttributeOption'
import { IFSort } from '@src/domain/interfaces/ISort'
import { IFPagingApiParams } from '@src/domain/models/IPaging'
import { IListBoxApiParams } from '@src/domain/models/IListBox'

export const useSpecificationAttribute = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    checkInitOption,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.specificationAttribute)

  const getSpecificationAttributePagingApi = (params: IFPagingApiParams) => {
    return dispatch(specificationAttributeStore.getPagingSpecificationAttributeApi(params))
  }

  const getListSpecificationAttributeApi = (params: IListBoxApiParams) => {
    return dispatch(specificationAttributeStore.getlistSpecificationAttributeApi(params))
  }

  const getByIdApi = (params: string) => {
    return dispatch(specificationAttributeStore.getByIdApi(params))
  }

  const addSpecificationAttributeApi = (params: IFDataSpecificationAttribute) => {
    return dispatch(specificationAttributeStore.addSpecificationAttributeApi(params))
  }

  const editSpecificationAttributeApi = (params: IFDataSpecificationAttribute) => {
    return dispatch(specificationAttributeStore.editSpecificationAttributeApi(params))
  }

  const sortSpecificationAttributeApi = (params: IFSort) => {
    return dispatch(specificationAttributeStore.sortSpecificationAttributeApi(params))
  }

  const deleteSpecificationAttributeApi = (id: string) => {
    return dispatch(specificationAttributeStore.deleteSpecificationAttributeApi(id))
  }

  const getAllSpecificationAttributeOptionApi = () => {
    return dispatch(specificationAttributeStore.getAllSpecificationAttributeOptionApi())
  }

  const getSpecificationAttributeOptionPagingApi = (params: IFPagingSpecificationAttributeOptionApi) => {
    return dispatch(specificationAttributeStore.getPagingSpecificationAttributeOptionApi(params))
  }

  const getListSpecificationAttributeOptionApi = (params: IFListboxSpecificationAttributeOptionApi) => {
    return dispatch(specificationAttributeStore.getlistSpecificationAttributeOptionApi(params))
  }

  const addSpecificationAttributeOptionApi = (params: IFDataSpecificationAttributeOption) => {
    return dispatch(specificationAttributeStore.addSpecificationAttributeOptionApi(params))
  }

  const editSpecificationAttributeOptionApi = (params: IFDataSpecificationAttributeOption) => {
    return dispatch(specificationAttributeStore.editSpecificationAttributeOptionApi(params))
  }

  const deleteSpecificationAttributeOptionApi = (id: string) => {
    return dispatch(specificationAttributeStore.deleteSpecificationAttributeOptionApi(id))
  }

  return {
    successfully,
    checkInit,
    checkInitOption,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getSpecificationAttributePagingApi,
    getListSpecificationAttributeApi,
    getByIdApi,
    addSpecificationAttributeApi,
    editSpecificationAttributeApi,
    sortSpecificationAttributeApi,
    deleteSpecificationAttributeApi,
    getSpecificationAttributeOptionPagingApi,
    getListSpecificationAttributeOptionApi,
    addSpecificationAttributeOptionApi,
    editSpecificationAttributeOptionApi,
    deleteSpecificationAttributeOptionApi,
    getAllSpecificationAttributeOptionApi
  }
}
