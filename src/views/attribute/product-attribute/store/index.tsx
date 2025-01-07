// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataProductAttribute,
  IFResponseListProductAttributeApi
} from '@src/domain/models/IProductAttribute'
import { PRODUCTATTRIBUTE, PRODUCTATTRIBUTEOPTION, PRODUCTATTRIBUTEOPTIONSET } from '@src/domain/constants'
import { IFListboxProductAttributeOptionApi, IFDataProductAttributeOption, IFPagingProductAttributeOptionApi, IFResponseListProductAttributeOptionApi } from '@src/domain/models/IProductAttributeOption'
import { IFListboxProductAttributeOptionSetApi, IFDataProductAttributeOptionSet, IFPagingProductAttributeOptionSetApi, IFResponseListProductAttributeOptionSetApi } from '@src/domain/models/IProductAttributeOptionSet'
import { IFSort } from '@src/domain/interfaces/ISort'
import { IFPagingApiParams } from '@src/domain/models/IPaging'
import { IListBoxApiParams } from '@src/domain/models/IListBox'

interface IFProductAttributeState {
  items: IFDataProductAttribute[]
  checkInit: boolean
  checkInitOption: boolean
  checkInitOptionSet: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataProductAttribute | null
}

const initialState: IFProductAttributeState = {
  items: [],
  checkInit: false,
  checkInitOption: false,
  checkInitOptionSet: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingProductAttributeApi = createAsyncThunk<any, IFPagingApiParams>(PRODUCTATTRIBUTE.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductAttributeApi = await api.productAttributeApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getlistProductAttributeApi = createAsyncThunk<any, IListBoxApiParams>(PRODUCTATTRIBUTE.ACTION_TYPES.GET_LISTBOX_API, async (params, thunkAPI) => {
  try {
    return await api.productAttributeApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getByIdApi = createAsyncThunk<any, string>(PRODUCTATTRIBUTE.ACTION_TYPES.GET_BY_ID_API, async (id, thunkAPI) => {
  try {
    return await api.productAttributeApi.getByIdApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.response.data })
  }
})

export const addProductAttributeApi = createAsyncThunk<any, IFDataProductAttribute>(PRODUCTATTRIBUTE.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.productAttributeApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editProductAttributeApi = createAsyncThunk<any, IFDataProductAttribute>(PRODUCTATTRIBUTE.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.productAttributeApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortProductAttributeApi = createAsyncThunk<any, IFSort>(PRODUCTATTRIBUTE.ACTION_TYPES.SORT_API, async (params, thunkAPI) => {
  try {
    return await api.productAttributeApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteProductAttributeApi = createAsyncThunk<any, string>(PRODUCTATTRIBUTE.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productAttributeApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingProductAttributeOptionApi = createAsyncThunk<any, IFPagingProductAttributeOptionApi>(PRODUCTATTRIBUTEOPTION.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductAttributeOptionApi = await api.productAttributeOptionApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getlistProductAttributeOptionApi = createAsyncThunk<any, IFListboxProductAttributeOptionApi>(PRODUCTATTRIBUTEOPTION.ACTION_TYPES.GET_LISTBOX_API, async (params, thunkAPI) => {
  try {
    return await api.productAttributeOptionApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addProductAttributeOptionApi = createAsyncThunk<any, IFDataProductAttributeOption>(PRODUCTATTRIBUTEOPTION.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.productAttributeOptionApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editProductAttributeOptionApi = createAsyncThunk<any, IFDataProductAttributeOption>(PRODUCTATTRIBUTEOPTION.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.productAttributeOptionApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteProductAttributeOptionApi = createAsyncThunk<any, string>(PRODUCTATTRIBUTEOPTION.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productAttributeOptionApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const getPagingProductAttributeOptionSetApi = createAsyncThunk<any, IFPagingProductAttributeOptionSetApi>(PRODUCTATTRIBUTEOPTIONSET.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductAttributeOptionSetApi = await api.productAttributeOptionSetApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getlistProductAttributeOptionSetApi = createAsyncThunk<any, IFListboxProductAttributeOptionSetApi>(PRODUCTATTRIBUTEOPTIONSET.ACTION_TYPES.GET_LISTBOX_API, async (params, thunkAPI) => {
  try {
    return await api.productAttributeOptionSetApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addProductAttributeOptionSetApi = createAsyncThunk<any, IFDataProductAttributeOptionSet>(PRODUCTATTRIBUTEOPTIONSET.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.productAttributeOptionSetApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editProductAttributeOptionSetApi = createAsyncThunk<any, IFDataProductAttributeOptionSet>(PRODUCTATTRIBUTEOPTIONSET.ACTION_TYPES.EDIT_API, async (params, thunkAPI) => {
  try {
    return await api.productAttributeOptionSetApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteProductAttributeOptionSetApi = createAsyncThunk<any, string>(PRODUCTATTRIBUTEOPTIONSET.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.productAttributeOptionSetApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const productAttributeSlice = createSlice({
  name: 'productAttribute',
  initialState,
  reducers: {
    updateproductAttributePlans: (state, action: PayloadAction<IFDataProductAttribute>) => {
      state.selected = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(addProductAttributeApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(deleteProductAttributeApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(editProductAttributeApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(sortProductAttributeApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(addProductAttributeOptionApi.fulfilled, (state) => {
      state.checkInitOption = !state.checkInitOption
    })
    builder.addCase(deleteProductAttributeOptionApi.fulfilled, (state) => {
      state.checkInitOption = !state.checkInitOption
    })
    builder.addCase(editProductAttributeOptionApi.fulfilled, (state) => {
      state.checkInitOption = !state.checkInitOption
    })
    builder.addCase(addProductAttributeOptionSetApi.fulfilled, (state) => {
      state.checkInitOptionSet = !state.checkInitOptionSet
    })
    builder.addCase(deleteProductAttributeOptionSetApi.fulfilled, (state) => {
      state.checkInitOptionSet = !state.checkInitOptionSet
    })
    builder.addCase(editProductAttributeOptionSetApi.fulfilled, (state) => {
      state.checkInitOptionSet = !state.checkInitOptionSet
    })
  }
})

export const { updateproductAttributePlans } = productAttributeSlice.actions
