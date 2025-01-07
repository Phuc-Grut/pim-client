import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import api from '@src/infra/api'

import {
  IFDataProductType,
  IFResponseListProductTypeApi,
  IFListboxProductTypeApi
} from '@src/domain/models/IProductType'

import { PRODUCTTYPE } from '@src/domain/constants'
import { IFSort } from '@src/domain/interfaces/ISort'
import { IFPagingApiParams } from '@src/domain/models/IPaging'

interface IFProductTypeState {
  items: IFDataProductType[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataProductType | null
}

const initialState: IFProductTypeState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingApiParams>(PRODUCTTYPE.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductTypeApi = await api.productTypeApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const getListBoxApi = createAsyncThunk<any, IFListboxProductTypeApi>(PRODUCTTYPE.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.productTypeApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataProductType>(PRODUCTTYPE.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.productTypeApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataProductType>(PRODUCTTYPE.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try {
    return await api.productTypeApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(PRODUCTTYPE.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try {
    return await api.productTypeApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(PRODUCTTYPE.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productTypeApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const productTypeSlice = createSlice({
  name: 'productType',
  initialState,
  reducers: {
    updateproductTypePlans: (state, action: PayloadAction<IFDataProductType>) => {
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

export const { updateproductTypePlans } = productTypeSlice.actions
