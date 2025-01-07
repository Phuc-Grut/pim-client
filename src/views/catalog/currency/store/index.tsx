// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataCurrency,
  IFResponseListCurrencyApi,
  IFPagingCurrencyApi,
  IFCbxCurrencyApi
} from '@src/domain/models/ICurrency'


// ** Imports constants
import { CURRENCY} from '@src/domain/constants'

interface IFCurrencyState {
  items: IFDataCurrency[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataCurrency | null
}

const initialState: IFCurrencyState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingCurrencyApi>(CURRENCY.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListCurrencyApi = await api.currencyApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

// export const getByIdApi = createAsyncThunk<any, string>(CURRENCY.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
//   try {
//     return await api.currencyApi.getByIdApi(id)
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue({ error: error.data })
//   }
// })

export const getlistApi = createAsyncThunk<any, IFCbxCurrencyApi>(CURRENCY.ACTION_TYPES.GET_LIST_CBX, async (params, thunkAPI) => {
  try {
    const response: IFDataCurrency = await api.currencyApi.getlistApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataCurrency>(CURRENCY.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.currencyApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataCurrency>(CURRENCY.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try { 
    return await api.currencyApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(CURRENCY.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.currencyApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updatecurrencyPlans: (state, action: PayloadAction<IFDataCurrency>) => {
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

export const { updatecurrencyPlans } = currencySlice.actions
