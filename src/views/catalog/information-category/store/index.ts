import { IFSort } from '@src/domain/interfaces/ISort'
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PRODUCTCATEGORY } from "@src/domain/constants"
import { IFListboxProductCategoryApi, IFDataProductCategory, IFPagingProductCategoryApi, IFResponseListProductCategoryApi } from "@src/domain/models/IProductCategory"
import api from "@src/infra/api"

interface IFProductCategoryState {
  items: IFDataProductCategory[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataProductCategory | null
}

const initialState: IFProductCategoryState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const get = createAsyncThunk<any, string>(
  PRODUCTCATEGORY.ACTION_TYPES.GET_PRODUCTCATEGORY,
  async (params, thunkAPI) => {
    try {
      return await api.productCategoryApi.getApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)
export const getParent = createAsyncThunk<any, string>(
  PRODUCTCATEGORY.ACTION_TYPES.GET_PARENT,
  async (params, thunkAPI) => {
    try {
      return await api.productCategoryApi.getParentApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)
export const getPagingApi = createAsyncThunk<any, IFPagingProductCategoryApi>(PRODUCTCATEGORY.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListProductCategoryApi = await api.productCategoryApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const sortApi = createAsyncThunk<any, IFSort>(PRODUCTCATEGORY.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try {
    return await api.productCategoryApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const getListBoxApi = createAsyncThunk<any, IFListboxProductCategoryApi>(PRODUCTCATEGORY.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.productCategoryApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getListComboboxApi = createAsyncThunk(PRODUCTCATEGORY.ACTION_TYPES.GET_LIST_CBX, async (_: void, thunkAPI) => {
  try {
    return await api.productCategoryApi.getListComboBoxApi()
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.response.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataProductCategory>(PRODUCTCATEGORY.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.productCategoryApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataProductCategory>(PRODUCTCATEGORY.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try { 
    return await api.productCategoryApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(PRODUCTCATEGORY.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.productCategoryApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const productCategorySlice = createSlice({
  name: 'productCategory',
  initialState,
  reducers: {
    updateproductCategoryPlans: (state, action: PayloadAction<IFDataProductCategory>) => {
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
export const { updateproductCategoryPlans } = productCategorySlice.actions
