// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataExchangeRate,
  IFResponseListExchangeRateApi,
  IFCbxExchangeRateApi,
  IFPagingExchangeRateApi
} from '@src/domain/models/IExchangeRate'


// ** Imports constants
import { EXCHANGERATE} from '@src/domain/constants'

interface IFExchangeRateState {
  items: IFDataExchangeRate[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataExchangeRate | null
}

const initialState: IFExchangeRateState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingExchangeRateApi>(EXCHANGERATE.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListExchangeRateApi = await api.exchangeRateApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

// export const getByIdApi = createAsyncThunk<any, string>(EXCHANGERATE.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
//   try {
//     return await api.exchangeRateApi.getByIdApi(id)
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue({ error: error.data })
//   }
// })

export const getlistApi = createAsyncThunk<any, IFCbxExchangeRateApi>(EXCHANGERATE.ACTION_TYPES.GET_LIST_CBX, async (params, thunkAPI) => {
  try {
    const response: IFDataExchangeRate = await api.exchangeRateApi.getlistApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataExchangeRate>(EXCHANGERATE.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.exchangeRateApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataExchangeRate>(EXCHANGERATE.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try { 
    return await api.exchangeRateApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(EXCHANGERATE.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.exchangeRateApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const exchangeRateSlice = createSlice({
  name: 'exchangeRate',
  initialState,
  reducers: {
    updateexchangeRatePlans: (state, action: PayloadAction<IFDataExchangeRate>) => {
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

export const { updateexchangeRatePlans } = exchangeRateSlice.actions
