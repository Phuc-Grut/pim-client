import { IFSort } from '@src/domain/interfaces/ISort'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CATEGORY } from "@src/domain/constants"
import { IFListboxCategoryApi, IFDataCategory, IFResponseListCategoryApi, IFPagingCategoryApi } from "@src/domain/models/ICategory"
import api from "@src/infra/api"

interface IFCategoryState {
  items: IFDataCategory[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataCategory | null
}

const initialState: IFCategoryState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const get = createAsyncThunk<any, string>(
  CATEGORY.ACTION_TYPES.GET_CATEGORY,
  async (params, thunkAPI) => {
    try {
      return await api.categoryApi.getApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)
export const getParent = createAsyncThunk<any, string>(
  CATEGORY.ACTION_TYPES.GET_PARENT,
  async (params, thunkAPI) => {
    try {
      return await api.categoryApi.getParentApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)
export const getPagingApi = createAsyncThunk<any, IFPagingCategoryApi>(CATEGORY.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListCategoryApi = await api.categoryApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const sortApi = createAsyncThunk<any, IFSort>(CATEGORY.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try {
    return await api.categoryApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const getListBoxApi = createAsyncThunk<any, IFListboxCategoryApi>(CATEGORY.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.categoryApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const getCbxApi = createAsyncThunk<any, IFListboxCategoryApi>(CATEGORY.ACTION_TYPES.GET_CBX, async (params, thunkAPI) => {
  try {
    return await api.categoryApi.getCbxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataCategory>(CATEGORY.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.categoryApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataCategory>(CATEGORY.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try { 
    return await api.categoryApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(CATEGORY.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.categoryApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const categorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {},
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