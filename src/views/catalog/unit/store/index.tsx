// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataUnit,
  IFResponseListUnitApi,
  IFPagingUnitApi,
  IFListboxUnitApi
} from '@src/domain/models/IUnit'


// ** Imports constants
import { UNIT } from '@src/domain/constants'
import { IFSort } from '@src/domain/interfaces/ISort'

interface IFUnitState {
  items: IFDataUnit[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataUnit | null
}

const initialState: IFUnitState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingUnitApi>(UNIT.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListUnitApi = await api.unitApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

// export const getByIdApi = createAsyncThunk<any, string>(UNIT.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
//   try {
//     return await api.unitApi.getByIdApi(id)
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue({ error: error.data })
//   }
// })

export const getListBoxApi = createAsyncThunk<any, IFListboxUnitApi>(UNIT.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.unitApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataUnit>(UNIT.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.unitApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataUnit>(UNIT.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try {
    return await api.unitApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(UNIT.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try {
    return await api.unitApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(UNIT.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.unitApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    updateunitPlans: (state, action: PayloadAction<IFDataUnit>) => {
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

export const { updateunitPlans } = unitSlice.actions
