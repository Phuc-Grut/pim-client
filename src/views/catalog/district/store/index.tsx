// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataDistrict,
  IFResponseListDistrictApi,
  IFPagingApi
} from '@src/domain/models/IDistrict'


// ** Imports constants
import { DISTRICTS } from '@src/domain/constants'
import { IFCbxCountryApi } from '@src/domain/models/ICountry'

interface IFDistrictState {
  items: IFDataDistrict[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataDistrict | null
}

const initialState: IFDistrictState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingApi>(DISTRICTS.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListDistrictApi = await api.districtApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getByIdApi = createAsyncThunk<any, string>(DISTRICTS.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
  try {
    return await api.districtApi.getByIdApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getlistApi = createAsyncThunk<any, IFCbxCountryApi>(DISTRICTS.ACTION_TYPES.GET_LIST, async (params, thunkAPI) => {
  try {
    const response: IFDataDistrict = await api.districtApi.getlistApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataDistrict>(DISTRICTS.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.districtApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataDistrict>(DISTRICTS.ACTION_TYPES.UPDATE, async (params, thunkAPI) => {
  try {
    return await api.districtApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(DISTRICTS.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.districtApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const districtSlice = createSlice({
  name: 'district',
  initialState,
  reducers: {
    updatedistrictPlans: (state, action: PayloadAction<IFDataDistrict>) => {
      state.selected = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(addApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(deleteApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(editApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
  }
})

export const { updatedistrictPlans } = districtSlice.actions
