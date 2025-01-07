// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IProductTopicPage
} from '@src/domain/models/IProductTopicPage'


// ** Imports constants
import { IFSort } from '@src/domain/interfaces/ISort'
import { PRODUCTTOPICPAGE } from '@src/domain/constants'
import { IFPagingApiParams } from '@src/domain/models/IPaging'
import { IParamsListbox } from '@src/domain/models/IParamsListbox'

interface IFProductTopicPageState {
  items: IProductTopicPage[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IProductTopicPage | null
}

const initialState: IFProductTopicPageState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingApiParams>(PRODUCTTOPICPAGE.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: any = await api.productTopicPageApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getListBoxApi = createAsyncThunk<any, IParamsListbox>(PRODUCTTOPICPAGE.ACTION_TYPES.GET_LIST_BOX, async (params, thunkAPI) => {
  try {
    return await api.productTopicPageApi.getListboxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IProductTopicPage>(PRODUCTTOPICPAGE.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.productTopicPageApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IProductTopicPage>(PRODUCTTOPICPAGE.ACTION_TYPES.UPDATE, async (params, thunkAPI) => {
  try { 
    return await api.productTopicPageApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(PRODUCTTOPICPAGE.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try { 
    return await api.productTopicPageApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(PRODUCTTOPICPAGE.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.productTopicPageApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const productTopicPageSlice = createSlice({
  name: 'productTopicPageApi',
  initialState,
  reducers: {
    updateProductTopicPagePlans: (state, action: PayloadAction<IProductTopicPage>) => {
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

export const { updateProductTopicPagePlans } = productTopicPageSlice.actions
