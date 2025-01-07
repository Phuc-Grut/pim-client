// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataProductTag,
  IFResponseListProductTagApi,
  IFListboxProductTagApi
} from '@src/domain/models/IProductTag'


// ** Imports constants
import { GROUPUNIT} from '@src/domain/constants'
import { IFPagingApiParams } from '@src/domain/models/IPaging'

interface IFProductTagState {
  items: IFDataProductTag[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataProductTag | null
}

const initialState: IFProductTagState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingApiParams>(GROUPUNIT.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductTagApi = await api.productTagApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

// export const getByIdApi = createAsyncThunk<any, string>(GROUPUNIT.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
//   try {
//     return await api.productTagApi.getByIdApi(id)
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue({ error: error.data })
//   }
// })

export const getListBoxApi = createAsyncThunk<any, IFListboxProductTagApi>(GROUPUNIT.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.productTagApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataProductTag>(GROUPUNIT.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.productTagApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataProductTag>(GROUPUNIT.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try { 
    return await api.productTagApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(GROUPUNIT.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.productTagApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const productTagSlice = createSlice({
  name: 'productTag',
  initialState,
  reducers: {
    updateproductTagPlans: (state, action: PayloadAction<IFDataProductTag>) => {
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

export const { updateproductTagPlans } = productTagSlice.actions
