// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataServiceAdd,
  IFResponseListServiceAddApi,
  IFPagingServiceAddApi,
  IFListboxServiceAddApi
} from '@src/domain/models/IServiceAdd'


// ** Imports constants
import { SERVICEADD, SERVICEADDPRICESYNTAX} from '@src/domain/constants'
import { IFSort } from '@src/domain/interfaces/ISort'

interface IFServiceAddState {
  items: IFDataServiceAdd[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataServiceAdd | null
}

const initialState: IFServiceAddState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingServiceAddApi>(SERVICEADD.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListServiceAddApi = await api.serviceAddApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getListBoxApi = createAsyncThunk<any, IFListboxServiceAddApi>(SERVICEADD.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.serviceAddApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getListBoxPriceSyntaxApi = createAsyncThunk<any, undefined>(SERVICEADDPRICESYNTAX.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.serviceAddApi.getListBoxPriceSyntaxApi()
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataServiceAdd>(SERVICEADD.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.serviceAddApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataServiceAdd>(SERVICEADD.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try { 
    return await api.serviceAddApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(SERVICEADD.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try {
    return await api.serviceAddApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(SERVICEADD.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.serviceAddApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const serviceAddSlice = createSlice({
  name: 'serviceAdds',
  initialState,
  reducers: {
    updateserviceAddPlans: (state, action: PayloadAction<IFDataServiceAdd>) => {
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

export const { updateserviceAddPlans } = serviceAddSlice.actions
