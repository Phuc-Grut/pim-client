// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataTaxCategory,
  IFResponseListTaxCategoryApi,
  IFListboxTaxCategoryApi
} from '@src/domain/models/ITaxCategory'


// ** Imports constants
import { TAXCATEGORY } from '@src/domain/constants'
import { IFSort } from '@src/domain/interfaces/ISort'
import { IFPagingApiParams } from '@src/domain/models/IPaging'

interface IFTaxCategoryState {
  items: IFDataTaxCategory[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataTaxCategory | null
}

const initialState: IFTaxCategoryState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingApiParams>(TAXCATEGORY.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListTaxCategoryApi = await api.taxCategoryApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

// export const getByIdApi = createAsyncThunk<any, string>(TAXCATEGORY.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
//   try {
//     return await api.taxCategoryApi.getByIdApi(id)
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue({ error: error.data })
//   }
// })

export const getListBoxApi = createAsyncThunk<any, IFListboxTaxCategoryApi>(TAXCATEGORY.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.taxCategoryApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataTaxCategory>(TAXCATEGORY.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.taxCategoryApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataTaxCategory>(TAXCATEGORY.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try {
    return await api.taxCategoryApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(TAXCATEGORY.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try {
    return await api.taxCategoryApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(TAXCATEGORY.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.taxCategoryApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const taxCategorySlice = createSlice({
  name: 'taxCategory',
  initialState,
  reducers: {
    updatetaxCategoryPlans: (state, action: PayloadAction<IFDataTaxCategory>) => {
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

export const { updatetaxCategoryPlans } = taxCategorySlice.actions
