// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataCountry,
  IFResponseListCountryApi,
  IFPagingApi,
  IFCbxCountryApi
} from '@src/domain/models/ICountry'


// ** Imports constants
import { COUNTRYS } from '@src/domain/constants'

interface IFCountryState {
  items: IFDataCountry[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataCountry | null
}

const initialState: IFCountryState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingApi>(COUNTRYS.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListCountryApi = await api.countryApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getByIdApi = createAsyncThunk<any, string>(COUNTRYS.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
  try {
    return await api.countryApi.getByIdApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getlistApi = createAsyncThunk<any, IFCbxCountryApi>(COUNTRYS.ACTION_TYPES.GET_LIST, async (params, thunkAPI) => {
  try {
    const response: IFDataCountry = await api.countryApi.getlistApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataCountry>(COUNTRYS.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.countryApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataCountry>(COUNTRYS.ACTION_TYPES.UPDATE, async (params, thunkAPI) => {
  try {
    return await api.countryApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(COUNTRYS.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.countryApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    updatecountryPlans: (state, action: PayloadAction<IFDataCountry>) => {
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

export const { updatecountryPlans } = countrySlice.actions
