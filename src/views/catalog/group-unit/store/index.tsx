// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataGroupUnit,
  IFResponseListGroupUnitApi,
  IFPagingGroupUnitApi,
  IFListboxGroupUnitApi
} from '@src/domain/models/IGroupUnit'


// ** Imports constants
import { GROUPUNIT} from '@src/domain/constants'
import { IFSort } from '@src/domain/interfaces/ISort'

interface IFGroupUnitState {
  items: IFDataGroupUnit[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataGroupUnit | null
}

const initialState: IFGroupUnitState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingGroupUnitApi>(GROUPUNIT.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListGroupUnitApi = await api.groupUnitApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getListBoxApi = createAsyncThunk<any, IFListboxGroupUnitApi>(GROUPUNIT.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.groupUnitApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataGroupUnit>(GROUPUNIT.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.groupUnitApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataGroupUnit>(GROUPUNIT.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try { 
    return await api.groupUnitApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(GROUPUNIT.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try { 
    return await api.groupUnitApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(GROUPUNIT.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.groupUnitApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const groupUnitSlice = createSlice({
  name: 'groupUnit',
  initialState,
  reducers: {
    updategroupUnitPlans: (state, action: PayloadAction<IFDataGroupUnit>) => {
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

export const { updategroupUnitPlans } = groupUnitSlice.actions
