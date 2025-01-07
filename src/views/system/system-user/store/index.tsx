import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '@src/infra/api'
import { IFDataProductUser, IFPagingProductUserApi } from '@src/domain/models/IProductUser'
import {SYSTEM_USER} from '@src/domain/constants'

interface IFUserAdminState {
  checkInit: boolean
}

const initialState: IFUserAdminState = {
  checkInit: true
}

export const getPagingProductUserApi = createAsyncThunk<any, IFPagingProductUserApi>(SYSTEM_USER.ACTION_TYPES.GET_PAGING_BY_PRODUCT_ID, async (params, thunkAPI) => {
  try {
    return await api.systemUserApi.getPagingApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingUserApi = createAsyncThunk<any, IFPagingProductUserApi>(SYSTEM_USER.ACTION_TYPES.GET_USERS_BY_PRODUCT_ID, async (params, thunkAPI) => {
  try {
    return await api.systemUserApi.getPagingUserApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addProductUserApi = createAsyncThunk<any, IFDataProductUser>(SYSTEM_USER.ACTION_TYPES.ADD_BY_PRODUCT_ID, async (params, thunkAPI) => {
  try {
    return await api.systemUserApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editProductUserApi = createAsyncThunk<any, IFDataProductUser>(SYSTEM_USER.ACTION_TYPES.UPDATE, async (params, thunkAPI) => {
  try {
    return await api.systemUserApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteProductUserApi = createAsyncThunk<any, string>(SYSTEM_USER.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.systemUserApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const systemUserSlice = createSlice({
  name: 'systemUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addProductUserApi.fulfilled, (state) => {
      state.checkInit = true
    })
    builder.addCase(deleteProductUserApi.fulfilled, (state) => {
      state.checkInit = true
    })
    builder.addCase(editProductUserApi.fulfilled, (state) => {
      state.checkInit = true
    })
    builder.addCase(addProductUserApi.rejected, (state) => {
      state.checkInit = true
    })
    builder.addCase(deleteProductUserApi.rejected, (state) => {
      state.checkInit = true
    })
    builder.addCase(editProductUserApi.rejected, (state) => {
      state.checkInit = true
    })
    builder.addCase(addProductUserApi.pending, (state) => {
      state.checkInit = false
    })
    builder.addCase(deleteProductUserApi.pending, (state) => {
      state.checkInit = false
    })
    builder.addCase(editProductUserApi.pending, (state) => {
      state.checkInit = false
    })
  }
})
