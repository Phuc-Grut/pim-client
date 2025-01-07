import requester from '../requester'
import { DISTRICTS, COUNTRYS, STATEPROVINCES, WARDS } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFCbxCountryApi, IFDataCountry, IFPagingApi } from '@src/domain/models/ICountry'
import { IFCbxDistrictApi, IFDataDistrict } from '@src/domain/models/IDistrict'
import { IFCbxStateProvinceApi, IFDataStateProvince } from '@src/domain/models/IStateProvince'
import { IFCbxWardApi, IFDataWard } from '@src/domain/models/IWard'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const countryApi = {
  getPagingApi: (params: IFPagingApi) => requester.get(COUNTRYS.URL_API.GET_PAGING_API, params, config),
  getByIdApi: (id: string) => requester.get(`${COUNTRYS.URL_API.GET_BY_ID_API}/${id}`, {}, config),
  getlistApi: (params: IFCbxCountryApi) => requester.get(COUNTRYS.URL_API.GET_LIST_API, params, config),
  addApi: (params: IFDataCountry) => requester.post(COUNTRYS.URL_API.ADD_API, params, config),
  editApi: (params: IFDataCountry) => requester.put(COUNTRYS.URL_API.UPDATE_API, params, config),
  deleteApi: (id: string) => requester.delete(`${COUNTRYS.URL_API.DELETE_API}/${id}`, {}, config)
}

const districtApi = {
  getPagingApi: (params: IFPagingApi) => requester.get(DISTRICTS.URL_API.GET_PAGING_API, params, config),
  getByIdApi: (id: string) => requester.get(`${DISTRICTS.URL_API.GET_BY_ID_API}/${id}`, {}, config),
  getlistApi: (params: IFCbxDistrictApi) => requester.get(DISTRICTS.URL_API.GET_LIST_API, params, config),
  addApi: (params: IFDataDistrict) => requester.post(DISTRICTS.URL_API.ADD_API, params, config),
  editApi: (params: IFDataDistrict) => requester.put(DISTRICTS.URL_API.UPDATE_API, params, config),
  deleteApi: (id: string) => requester.delete(`${DISTRICTS.URL_API.DELETE_API}/${id}`, {}, config)
}

const stateProvinceApi = {
  getPagingApi: (params: IFPagingApi) => requester.get(STATEPROVINCES.URL_API.GET_PAGING_API, params, config),
  getByIdApi: (id: string) => requester.get(`${STATEPROVINCES.URL_API.GET_BY_ID_API}/${id}`, {}, config),
  getlistApi: (params: IFCbxStateProvinceApi) => requester.get(STATEPROVINCES.URL_API.GET_LIST_API, params, config),
  addApi: (params: IFDataStateProvince) => requester.post(STATEPROVINCES.URL_API.ADD_API, params, config),
  editApi: (params: IFDataStateProvince) => requester.put(STATEPROVINCES.URL_API.UPDATE_API, params, config),
  deleteApi: (id: string) => requester.delete(`${STATEPROVINCES.URL_API.DELETE_API}/${id}`, {}, config)
}

const wardApi = {
  getPagingApi: (params: IFPagingApi) => requester.get(WARDS.URL_API.GET_PAGING_API, params, config),
  getByIdApi: (id: string) => requester.get(`${WARDS.URL_API.GET_BY_ID_API}/${id}`, {}, config),
  getlistApi: (params: IFCbxWardApi) => requester.get(WARDS.URL_API.GET_LIST_API, params, config),
  addApi: (params: IFDataWard) => requester.post(WARDS.URL_API.ADD_API, params, config),
  editApi: (params: IFDataWard) => requester.put(WARDS.URL_API.UPDATE_API, params, config),
  deleteApi: (id: string) => requester.delete(`${WARDS.URL_API.DELETE_API}/${id}`, {}, config)
}

export default {
  countryApi,
  districtApi,
  stateProvinceApi,
  wardApi
}
