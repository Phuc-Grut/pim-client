// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataStore,
  IFResponseListStoreApi,
  IFPagingStoreApi,
  IFListboxStoreApi
} from '@src/domain/models/IStore'


// ** Imports constants
import { STORE} from '@src/domain/constants'
import { IFSort } from '@src/domain/interfaces/ISort'

interface IFStoreState {
  items: IFDataStore[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataStore | null
}

const initialState: IFStoreState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingStoreApi>(STORE.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListStoreApi = await api.storeApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getListBoxApi = createAsyncThunk<any, IFListboxStoreApi>(STORE.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.storeApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataStore>(STORE.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.storeApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataStore>(STORE.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try { 
    return await api.storeApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(STORE.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try {
    return await api.storeApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(STORE.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.storeApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    updatestorePlans: (state, action: PayloadAction<IFDataStore>) => {
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

export const { updatestorePlans } = storeSlice.actions
