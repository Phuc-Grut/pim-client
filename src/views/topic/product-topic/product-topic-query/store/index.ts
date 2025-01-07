// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import { IProductTopic
} from '@src/domain/models/IProductTopic'


// ** Imports constants
import { PRODUCTTOPICQUERY} from '@src/domain/constants'
import { IFPagingApiParams } from '@src/domain/models/IPaging'
import { IProductTopicQuery, IProductTopicQueryParamsListbox } from '@src/domain/models/IProductTopicQuery'
import { IFSort } from '@src/domain/interfaces/ISort'

interface IFProductTopicQueryState {
  items: IProductTopic[]
  checkInitQuery: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IProductTopicQuery | null
}

const initialState: IFProductTopicQueryState = {
  items: [],
  checkInitQuery: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingApiParams>(PRODUCTTOPICQUERY.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: any = await api.productTopicQueryApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getListBoxApi = createAsyncThunk<any, IProductTopicQueryParamsListbox>(PRODUCTTOPICQUERY.ACTION_TYPES.GET_LIST_BOX, async (params, thunkAPI) => {
  try {
    return await api.productTopicQueryApi.getListboxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IProductTopicQuery>(PRODUCTTOPICQUERY.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.productTopicQueryApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IProductTopicQuery>(PRODUCTTOPICQUERY.ACTION_TYPES.UPDATE, async (params, thunkAPI) => {
  try { 
    return await api.productTopicQueryApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(PRODUCTTOPICQUERY.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try { 
    return await api.productTopicQueryApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(PRODUCTTOPICQUERY.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.productTopicQueryApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const productTopicQuerySlice = createSlice({
  name: 'productTopicQueryApi',
  initialState,
  reducers: {
    updateProductTopicPlans: (state, action: PayloadAction<IProductTopic>) => {
      state.selected = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(addApi.fulfilled, (state) => {
      state.checkInitQuery = !state.checkInitQuery
    })
    builder.addCase(deleteApi.fulfilled, (state) => {
      state.checkInitQuery = !state.checkInitQuery
    })
    builder.addCase(editApi.fulfilled, (state) => {
      state.checkInitQuery = !state.checkInitQuery
    })
    builder.addCase(sortApi.fulfilled, (state) => {
      state.checkInitQuery = !state.checkInitQuery
    })
  }
})

export const { updateProductTopicPlans } = productTopicQuerySlice.actions
