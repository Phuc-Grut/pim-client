// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataDeliveryTime,
  IFResponseListDeliveryTimeApi,
  IFPagingDeliveryTimeApi
} from '@src/domain/models/IDeliveryTime'


// ** Imports constants
import { DELIVERYTIME } from '@src/domain/constants'
import { IFSort } from '@src/domain/interfaces/ISort'

interface IFDeliveryTimeState {
  items: IFDataDeliveryTime[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataDeliveryTime | null
}

const initialState: IFDeliveryTimeState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingDeliveryTimeApi>(DELIVERYTIME.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListDeliveryTimeApi = await api.deliveryTimeApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

// export const getByIdApi = createAsyncThunk<any, string>(DELIVERYTIME.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
//   try {
//     return await api.deliveryTimeApi.getByIdApi(id)
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue({ error: error.data })
//   }
// })

export const getListBoxApi = createAsyncThunk(DELIVERYTIME.ACTION_TYPES.GET_LISTBOX, async (_: void, thunkAPI) => {
  try {
    return await api.deliveryTimeApi.getListBoxApi()
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataDeliveryTime>(DELIVERYTIME.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.deliveryTimeApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataDeliveryTime>(DELIVERYTIME.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try {
    return await api.deliveryTimeApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(DELIVERYTIME.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try {
    return await api.deliveryTimeApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(DELIVERYTIME.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.deliveryTimeApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const deliveryTimeSlice = createSlice({
  name: 'deliveryTime',
  initialState,
  reducers: {
    updatedeliveryTimePlans: (state, action: PayloadAction<IFDataDeliveryTime>) => {
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

export const { updatedeliveryTimePlans } = deliveryTimeSlice.actions
