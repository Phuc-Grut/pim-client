// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataWarehouse,
  IFResponseListWarehouseApi,
  IFPagingWarehouseApi,
  IFListboxWarehouseApi
} from '@src/domain/models/IWarehouse'


// ** Imports constants
import { WAREHOUSE} from '@src/domain/constants'
import { IFSort } from '@src/domain/interfaces/ISort'

interface IFWarehouseState {
  items: IFDataWarehouse[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataWarehouse | null
}

const initialState: IFWarehouseState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingWarehouseApi>(WAREHOUSE.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListWarehouseApi = await api.warehouseApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

// export const getByIdApi = createAsyncThunk<any, string>(WAREHOUSE.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
//   try {
//     return await api.warehouseApi.getByIdApi(id)
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue({ error: error.data })
//   }
// })

export const getListBoxApi = createAsyncThunk<any, IFListboxWarehouseApi>(WAREHOUSE.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.warehouseApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataWarehouse>(WAREHOUSE.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.warehouseApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataWarehouse>(WAREHOUSE.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try { 
    return await api.warehouseApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(WAREHOUSE.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try { 
    return await api.warehouseApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(WAREHOUSE.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.warehouseApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    updatewarehousePlans: (state, action: PayloadAction<IFDataWarehouse>) => {
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

export const { updatewarehousePlans } = warehouseSlice.actions
