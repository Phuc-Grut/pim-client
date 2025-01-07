import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { DASHBOARD } from "@src/domain/constants"
import api from "@src/infra/api"

interface State {
  items: []
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: any
}

const initialState: State = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getCountProduct = createAsyncThunk<any>(
  DASHBOARD.ACTION_TYPES.GET_COUNT_PRODUCT,
  async (params, thunkAPI) => {
    try {
      return await api.dashboardApi.getCountProduct()
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)

export const getCountProductByType = createAsyncThunk<any>(
  DASHBOARD.ACTION_TYPES.GET_COUNT_PRODUCT_BY_TYPE,
  async (params, thunkAPI) => {
    try {
      return await api.dashboardApi.getCountProductByType()
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)

export const getTopCategory = createAsyncThunk<any>(
  DASHBOARD.ACTION_TYPES.GET_TOP_PRODUCTS_INVENTORY,
  async (params, thunkAPI) => {
    try {
      return await api.dashboardApi.getTopCategory()
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)

export const getTopNewProduct = createAsyncThunk<any>(
  DASHBOARD.ACTION_TYPES.GET_TOP_NEW_PRODUCT,
  async (params, thunkAPI) => {
    try {
      return await api.dashboardApi.getTopNewProduct()
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)

export const getTopBrand = createAsyncThunk<any>(
  DASHBOARD.ACTION_TYPES.GET_TOP_PRODUCT_BRAND,
  async (params, thunkAPI) => {
    try {
      return await api.dashboardApi.getTopBrand()
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)

export const getTopManufacturer = createAsyncThunk<any>(
  DASHBOARD.ACTION_TYPES.GET_TOP_MANUFACTURER,
  async (params, thunkAPI) => {
    try {
      return await api.dashboardApi.getTopManufacturer()
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)

export const getTopProductInventory = createAsyncThunk<any>(
  DASHBOARD.ACTION_TYPES.GET_TOP_PRODUCTS_INVENTORY,
  async (params, thunkAPI) => {
    try {
      return await api.dashboardApi.getTopProductInventory()
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateDashboard: (state, action: PayloadAction<State>) => {
      state.selected = action.payload
    }
  },
  extraReducers: () => {
  }
})
export const { updateDashboard } = dashboardSlice.actions