// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFPagingProductTopicApi, IProductTopic, IProductTopicParamsListbox
} from '@src/domain/models/IProductTopic'


// ** Imports constants
import { PRODUCTTOPIC} from '@src/domain/constants'
import { IFSort } from '@src/domain/interfaces/ISort'

interface IFProductTopicState {
  items: IProductTopic[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IProductTopic | null
}

const initialState: IFProductTopicState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingProductTopicApi>(PRODUCTTOPIC.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: any = await api.productTopicApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getListBoxApi = createAsyncThunk<any, IProductTopicParamsListbox>(PRODUCTTOPIC.ACTION_TYPES.GET_LIST_BOX, async (params, thunkAPI) => {
  try {
    return await api.productTopicApi.getListboxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IProductTopic>(PRODUCTTOPIC.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.productTopicApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IProductTopic>(PRODUCTTOPIC.ACTION_TYPES.UPDATE, async (params, thunkAPI) => {
  try { 
    return await api.productTopicApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(PRODUCTTOPIC.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try { 
    return await api.productTopicApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(PRODUCTTOPIC.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.productTopicApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const productTopicSlice = createSlice({
  name: 'productTopicApi',
  initialState,
  reducers: {
    updateProductTopicPlans: (state, action: PayloadAction<IProductTopic>) => {
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

export const { updateProductTopicPlans } = productTopicSlice.actions
