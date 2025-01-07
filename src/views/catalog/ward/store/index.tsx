// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataWard,
  IFResponseListWardApi,
  IFPagingApi
} from '@src/domain/models/IWard'


// ** Imports constants
import { WARDS} from '@src/domain/constants'
import { IFCbxCountryApi } from '@src/domain/models/ICountry'

interface IFWardState {
  items: IFDataWard[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataWard | null
}

const initialState: IFWardState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingApi>(WARDS.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListWardApi = await api.wardApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getByIdApi = createAsyncThunk<any, string>(WARDS.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
  try {
    return await api.wardApi.getByIdApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getlistApi = createAsyncThunk<any, IFCbxCountryApi>(WARDS.ACTION_TYPES.GET_LIST, async (params, thunkAPI) => {
  try {
    const response: IFDataWard = await api.wardApi.getlistApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataWard>(WARDS.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.wardApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataWard>(WARDS.ACTION_TYPES.UPDATE, async (params, thunkAPI) => {
  try { 
    return await api.wardApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(WARDS.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.wardApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const wardSlice = createSlice({
  name: 'ward',
  initialState,
  reducers: {
    updatewardPlans: (state, action: PayloadAction<IFDataWard>) => {
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

export const { updatewardPlans } = wardSlice.actions
