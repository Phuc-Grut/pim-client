// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataProductOrigin,
  IFResponseListProductOriginApi,
  IFPagingProductOriginApi,
  IFListboxProductOriginApi
} from '@src/domain/models/IProductOrigin'


// ** Imports constants
import { PRODUCTORIGIN } from '@src/domain/constants'
import { IFSort } from '@src/domain/interfaces/ISort'

interface IFProductOriginState {
  items: IFDataProductOrigin[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataProductOrigin | null
}

const initialState: IFProductOriginState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingProductOriginApi>(PRODUCTORIGIN.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductOriginApi = await api.productOriginApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

// export const getByIdApi = createAsyncThunk<any, string>(PRODUCTORIGIN.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
//   try {
//     return await api.productOriginApi.getByIdApi(id)
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue({ error: error.data })
//   }
// })

export const getListBoxApi = createAsyncThunk<any, IFListboxProductOriginApi>(PRODUCTORIGIN.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.productOriginApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataProductOrigin>(PRODUCTORIGIN.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.productOriginApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataProductOrigin>(PRODUCTORIGIN.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try {
    return await api.productOriginApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(PRODUCTORIGIN.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try {
    return await api.productOriginApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(PRODUCTORIGIN.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productOriginApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const productOriginSlice = createSlice({
  name: 'productOrigin',
  initialState,
  reducers: {
    updateproductOriginPlans: (state, action: PayloadAction<IFDataProductOrigin>) => {
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

export const { updateproductOriginPlans } = productOriginSlice.actions
