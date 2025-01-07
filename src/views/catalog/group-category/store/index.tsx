// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataGroupCategory,
  IFResponseListGroupCategoryApi,
  IFListboxGroupCategoryApi,
  GroupCategorySort
} from '@src/domain/models/IGroupCategory'


// ** Imports constants
import { GROUPCATEGORY } from '@src/domain/constants'
import { IFPagingApiParams } from '@src/domain/models/IPaging'

interface IFGroupCategoryState {
  items: IFDataGroupCategory[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataGroupCategory | null
}

const initialState: IFGroupCategoryState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingApiParams>(GROUPCATEGORY.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListGroupCategoryApi = await api.groupCategoryApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

// export const getByIdApi = createAsyncThunk<any, string>(GROUPCATEGORY.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
//   try {
//     return await api.groupCategoryApi.getByIdApi(id)
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue({ error: error.data })
//   }
// })

export const getListBoxApi = createAsyncThunk<any, IFListboxGroupCategoryApi>(GROUPCATEGORY.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.groupCategoryApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const get_all = createAsyncThunk<any>(GROUPCATEGORY.ACTION_TYPES.GET_ALL_GROUPCATEGORY, async (params, thunkAPI) => {
  try {
    return await api.groupCategoryApi.getGroupCategoryAllApi()
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.response.data })
  }
})
export const addApi = createAsyncThunk<any, IFDataGroupCategory>(GROUPCATEGORY.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.groupCategoryApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataGroupCategory>(GROUPCATEGORY.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try {
    return await api.groupCategoryApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(GROUPCATEGORY.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.groupCategoryApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const update_sort = createAsyncThunk<any, GroupCategorySort>(GROUPCATEGORY.ACTION_TYPES.EDIT_GROUPCATEGORY_SORT, async (params, thunkAPI) => {
  try {
    return await api.groupCategoryApi.editGroupCategorySortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.response.data })
  }
})
export const groupCategorySlice = createSlice({
  name: 'groupCategory',
  initialState,
  reducers: {
    updategroupCategoryPlans: (state, action: PayloadAction<IFDataGroupCategory>) => {
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
    builder.addCase(update_sort.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
  }
})

export const { updategroupCategoryPlans } = groupCategorySlice.actions
