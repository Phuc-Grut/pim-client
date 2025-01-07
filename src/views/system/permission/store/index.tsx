// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'


// ** Imports constants
import { PERMISSION } from '@src/domain/constants'
import { IFDataGetPagingIdentityToAddApi, IFDataGetPermissionGroupUserApi, IFDataGetPermissionInfoApi, IFDataGetPermissionUserApi, IFDataPermissionGroupUserApi, IFDataPermissionUserApi } from '@src/domain/models/IPermissions'

interface IFProductState {
  checkInit: boolean
}

const initialState: IFProductState = {
  checkInit: true
}

export const getTreePermission = createAsyncThunk<any>(PERMISSION.ACTION_TYPES.GET_TREE_PERMISSION, async (_: void, thunkAPI) => {
  try {
    return await api.permissionApi.getTreePermissionApi()
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getTreeResourcePermissionApi = createAsyncThunk<any, IFDataGetPermissionInfoApi>(PERMISSION.ACTION_TYPES.GET_TREE_RESOURCE_PERMISSION, async (params, thunkAPI) => {
  try {
    return await api.permissionApi.getTreeResourcePermissionApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPermissionGroupUserApi = createAsyncThunk<any, IFDataGetPermissionGroupUserApi>(PERMISSION.ACTION_TYPES.GET_PERMISSION_GROUP_USER, async (params, thunkAPI) => {
  try {
    return await api.permissionApi.getPermissionGroupUserApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPermissionFunctionApi = createAsyncThunk<any, string>(PERMISSION.ACTION_TYPES.GET_PERMISSION_GROUP_USER, async (resourceId, thunkAPI) => {
  try {
    return await api.permissionApi.getPermissionFunctionApi(resourceId)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingGroupUserByResourceApi = createAsyncThunk<any, IFDataGetPagingIdentityToAddApi>(PERMISSION.ACTION_TYPES.GET_PERMISSION_GROUP_USER, async (params, thunkAPI) => {
  try {
    return await api.permissionApi.getPagingGroupUserByResourceApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingUserByResourceApi = createAsyncThunk<any, IFDataGetPagingIdentityToAddApi>(PERMISSION.ACTION_TYPES.GET_PERMISSION_GROUP_USER, async (params, thunkAPI) => {
  try {
    return await api.permissionApi.getPagingUserByResourceApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPermissionUserApi = createAsyncThunk<any, IFDataGetPermissionUserApi>(PERMISSION.ACTION_TYPES.GET_PERMISSION_USER, async (params, thunkAPI) => {
  try {
    return await api.permissionApi.getPermissionUserApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addPermissonGroupUserApi = createAsyncThunk<any, IFDataPermissionGroupUserApi>(PERMISSION.ACTION_TYPES.ADD_PERMISSION_GROUP_USER, async (params, thunkAPI) => {
  try {
    return await api.permissionApi.addPermissonGroupUserApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deletePermissonGroupUserApi = createAsyncThunk<any, string>(PERMISSION.ACTION_TYPES.DELETE_PERMISSION_GROUP_USER, async (id, thunkAPI) => {
  try {
    return await api.permissionApi.deletePermissonGroupUserApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addPermissonUserApi = createAsyncThunk<any, IFDataPermissionUserApi>(PERMISSION.ACTION_TYPES.ADD_PERMISSION_USER, async (params, thunkAPI) => {
  try {
    return await api.permissionApi.addPermissonUserApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deletePermissonUserApi = createAsyncThunk<any, string>(PERMISSION.ACTION_TYPES.DELETE_PERMISSION_USER, async (id, thunkAPI) => {
  try {
    return await api.permissionApi.deletePermissonUserApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const permissionAdminSlice = createSlice({
  name: 'permissionAdmin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addPermissonGroupUserApi.fulfilled, (state) => {
      state.checkInit = true
    })
    builder.addCase(addPermissonGroupUserApi.rejected, (state) => {
      state.checkInit = true
    })
    builder.addCase(addPermissonGroupUserApi.pending, (state) => {
      state.checkInit = false
    })
    builder.addCase(deletePermissonGroupUserApi.fulfilled, (state) => {
      state.checkInit = true
    })
    builder.addCase(deletePermissonGroupUserApi.rejected, (state) => {
      state.checkInit = true
    })
    builder.addCase(deletePermissonGroupUserApi.pending, (state) => {
      state.checkInit = false
    })
    builder.addCase(addPermissonUserApi.fulfilled, (state) => {
      state.checkInit = true
    })
    builder.addCase(addPermissonUserApi.rejected, (state) => {
      state.checkInit = true
    })
    builder.addCase(addPermissonUserApi.pending, (state) => {
      state.checkInit = false
    })
    builder.addCase(deletePermissonUserApi.fulfilled, (state) => {
      state.checkInit = true
    })
    builder.addCase(deletePermissonUserApi.rejected, (state) => {
      state.checkInit = true
    })
    builder.addCase(deletePermissonUserApi.pending, (state) => {
      state.checkInit = false
    })
  }
})
