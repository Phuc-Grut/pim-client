// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataProductBrand,
  IFResponseListProductBrandApi,
  IFPagingProductBrandApi,
  IFListboxProductBrandApi
} from '@src/domain/models/IProductBrand'


// ** Imports constants
import { PRODUCTBRAND } from '@src/domain/constants'
import { IFSort } from '@src/domain/interfaces/ISort'

interface IFProductBrandState {
  items: IFDataProductBrand[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataProductBrand | null
}

const initialState: IFProductBrandState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingProductBrandApi>(PRODUCTBRAND.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductBrandApi = await api.productBrandApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

// export const getByIdApi = createAsyncThunk<any, string>(PRODUCTBRAND.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
//   try {
//     return await api.productBrandApi.getByIdApi(id)
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue({ error: error.data })
//   }
// })

export const getListBoxApi = createAsyncThunk<any, IFListboxProductBrandApi>(PRODUCTBRAND.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.productBrandApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataProductBrand>(PRODUCTBRAND.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.productBrandApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataProductBrand>(PRODUCTBRAND.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try {
    return await api.productBrandApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(PRODUCTBRAND.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try {
    return await api.productBrandApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(PRODUCTBRAND.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productBrandApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const productBrandSlice = createSlice({
  name: 'productBrand',
  initialState,
  reducers: {
    updateproductBrandPlans: (state, action: PayloadAction<IFDataProductBrand>) => {
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

export const { updateproductBrandPlans } = productBrandSlice.actions
