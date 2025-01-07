// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataStateProvince,
  IFResponseListStateProvinceApi,
  IFPagingApi
} from '@src/domain/models/IStateProvince'


// ** Imports constants
import { STATEPROVINCES} from '@src/domain/constants'
import { IFCbxCountryApi } from '@src/domain/models/ICountry'

interface IFStateProvinceState {
  items: IFDataStateProvince[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataStateProvince | null
}

const initialState: IFStateProvinceState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingApi>(STATEPROVINCES.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListStateProvinceApi = await api.stateProvinceApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getByIdApi = createAsyncThunk<any, string>(STATEPROVINCES.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
  try {
    return await api.stateProvinceApi.getByIdApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getlistApi = createAsyncThunk<any, IFCbxCountryApi>(STATEPROVINCES.ACTION_TYPES.GET_LIST, async (params, thunkAPI) => {
  try {
    const response: IFDataStateProvince = await api.stateProvinceApi.getlistApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataStateProvince>(STATEPROVINCES.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.stateProvinceApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataStateProvince>(STATEPROVINCES.ACTION_TYPES.UPDATE, async (params, thunkAPI) => {
  try { 
    return await api.stateProvinceApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(STATEPROVINCES.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.stateProvinceApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const stateProvinceSlice = createSlice({
  name: 'stateProvince',
  initialState,
  reducers: {
    updatestateProvincePlans: (state, action: PayloadAction<IFDataStateProvince>) => {
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

export const { updatestateProvincePlans } = stateProvinceSlice.actions
