// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataSpecificationAttribute,
  IFResponseListSpecificationAttributeApi
} from '@src/domain/models/ISpecificationAttribute'
import { SPECIFICATIONATTRIBUTE, SPECIFICATIONATTRIBUTEOPTION } from '@src/domain/constants'
import { IFListboxSpecificationAttributeOptionApi, IFDataSpecificationAttributeOption, IFPagingSpecificationAttributeOptionApi, IFResponseListSpecificationAttributeOptionApi } from '@src/domain/models/ISpecificationAttributeOption'
import { IFSort } from '@src/domain/interfaces/ISort'
import { IFPagingApiParams } from '@src/domain/models/IPaging'
import { IListBoxApiParams } from '@src/domain/models/IListBox'

interface IFSpecificationAttributeState {
  items: IFDataSpecificationAttribute[]
  checkInit: boolean
  checkInitOption: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataSpecificationAttribute | null
}

const initialState: IFSpecificationAttributeState = {
  items: [],
  checkInit: false,
  checkInitOption: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingSpecificationAttributeApi = createAsyncThunk<any, IFPagingApiParams>(SPECIFICATIONATTRIBUTE.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListSpecificationAttributeApi = await api.specificationAttributeApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getlistSpecificationAttributeApi = createAsyncThunk<any, IListBoxApiParams>(SPECIFICATIONATTRIBUTE.ACTION_TYPES.GET_LISTBOX_API, async (params, thunkAPI) => {
  try {
    return await api.specificationAttributeApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getByIdApi = createAsyncThunk<any, string>(SPECIFICATIONATTRIBUTE.ACTION_TYPES.GET_BY_ID_API, async (id, thunkAPI) => {
  try {
    return await api.specificationAttributeApi.getByIdApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.response.data })
  }
})

export const addSpecificationAttributeApi = createAsyncThunk<any, IFDataSpecificationAttribute>(SPECIFICATIONATTRIBUTE.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.specificationAttributeApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editSpecificationAttributeApi = createAsyncThunk<any, IFDataSpecificationAttribute>(SPECIFICATIONATTRIBUTE.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.specificationAttributeApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortSpecificationAttributeApi = createAsyncThunk<any, IFSort>(SPECIFICATIONATTRIBUTE.ACTION_TYPES.SORT_API, async (params, thunkAPI) => {
  try {
    return await api.specificationAttributeApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteSpecificationAttributeApi = createAsyncThunk<any, string>(SPECIFICATIONATTRIBUTE.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.specificationAttributeApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getAllSpecificationAttributeOptionApi = createAsyncThunk(SPECIFICATIONATTRIBUTEOPTION.ACTION_TYPES.GET_LIST_API, async (_, thunkAPI) => {
  try {
    const response = await api.specificationAttributeOptionApi.getAllApi()
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingSpecificationAttributeOptionApi = createAsyncThunk<any, IFPagingSpecificationAttributeOptionApi>(SPECIFICATIONATTRIBUTEOPTION.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListSpecificationAttributeOptionApi = await api.specificationAttributeOptionApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getlistSpecificationAttributeOptionApi = createAsyncThunk<any, IFListboxSpecificationAttributeOptionApi>(SPECIFICATIONATTRIBUTEOPTION.ACTION_TYPES.GET_LISTBOX_API, async (params, thunkAPI) => {
  try {
    return await api.specificationAttributeOptionApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addSpecificationAttributeOptionApi = createAsyncThunk<any, IFDataSpecificationAttributeOption>(SPECIFICATIONATTRIBUTEOPTION.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.specificationAttributeOptionApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editSpecificationAttributeOptionApi = createAsyncThunk<any, IFDataSpecificationAttributeOption>(SPECIFICATIONATTRIBUTEOPTION.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.specificationAttributeOptionApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteSpecificationAttributeOptionApi = createAsyncThunk<any, string>(SPECIFICATIONATTRIBUTEOPTION.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.specificationAttributeOptionApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const specificationAttributeSlice = createSlice({
  name: 'specificationAttribute',
  initialState,
  reducers: {
    updatespecificationAttributePlans: (state, action: PayloadAction<IFDataSpecificationAttribute>) => {
      state.selected = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(addSpecificationAttributeApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(deleteSpecificationAttributeApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(editSpecificationAttributeApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(sortSpecificationAttributeApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(addSpecificationAttributeOptionApi.fulfilled, (state) => {
      state.checkInitOption = !state.checkInitOption
    })
    builder.addCase(deleteSpecificationAttributeOptionApi.fulfilled, (state) => {
      state.checkInitOption = !state.checkInitOption
    })
    builder.addCase(editSpecificationAttributeOptionApi.fulfilled, (state) => {
      state.checkInitOption = !state.checkInitOption
    })
  }
})

export const { updatespecificationAttributePlans } = specificationAttributeSlice.actions
