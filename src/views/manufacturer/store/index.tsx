// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataManufacturer,
  IFResponseListManufacturerApi,
  IFPagingManufacturerApi,
  IFListboxManufacturerApi
} from '@src/domain/models/IManufacturer'


// ** Imports constants
import { MANUFACTURER } from '@src/domain/constants'
import { IFSort } from '@src/domain/interfaces/ISort'

interface IFManufacturerState {
  items: IFDataManufacturer[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataManufacturer | null
}

const initialState: IFManufacturerState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingManufacturerApi>(MANUFACTURER.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListManufacturerApi = await api.manufacturerApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

// export const getByIdApi = createAsyncThunk<any, string>(MANUFACTURER.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
//   try {
//     return await api.manufacturerApi.getByIdApi(id)
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue({ error: error.data })
//   }
// })

export const getListBoxApi = createAsyncThunk<any, IFListboxManufacturerApi>(MANUFACTURER.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.manufacturerApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataManufacturer>(MANUFACTURER.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.manufacturerApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataManufacturer>(MANUFACTURER.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try {
    return await api.manufacturerApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(MANUFACTURER.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try {
    return await api.manufacturerApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(MANUFACTURER.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.manufacturerApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const manufacturerSlice = createSlice({
  name: 'manufacturer',
  initialState,
  reducers: {
    updatemanufacturerPlans: (state, action: PayloadAction<IFDataManufacturer>) => {
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
    builder.addCase(sortApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
  }
})

export const { updatemanufacturerPlans } = manufacturerSlice.actions
