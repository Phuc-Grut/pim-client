import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '@src/infra/api'
import {
  IFAddUserGroupUserApi,
  IFDataGroupUser,
  IFListBoxGroupUserApi,
  IFPagingGroupUserApi,
  IFPagingUserGroupUserApi
} from '@src/domain/models/IGroupUser'
import { GROUP_USER} from '@src/domain/constants'

interface IFGroupUserState {
  checkInit: boolean
  checkInitGroupUserUser: boolean
}

const initialState: IFGroupUserState = {
  checkInit: true,
  checkInitGroupUserUser: true
}

export const getPagingApi = createAsyncThunk<any, IFPagingGroupUserApi>(GROUP_USER.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    return await api.groupUserApi.getPagingApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getListBoxApi = createAsyncThunk<any, IFListBoxGroupUserApi>(GROUP_USER.ACTION_TYPES.GET_LIST_BOX, async (params, thunkAPI) => {
  try {
    return await api.groupUserApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataGroupUser>(GROUP_USER.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.groupUserApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataGroupUser>(GROUP_USER.ACTION_TYPES.UPDATE, async (params, thunkAPI) => {
  try { 
    return await api.groupUserApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(GROUP_USER.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.groupUserApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getPagingUsersApi = createAsyncThunk<any, IFPagingUserGroupUserApi>(GROUP_USER.ACTION_TYPES.GET_PAGING_USERS, async (params, thunkAPI) => {
  try {
    return await api.groupUserApi.getPagingUsersApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const getPagingUsersGroupUserApi = createAsyncThunk<any, IFPagingUserGroupUserApi>(GROUP_USER.ACTION_TYPES.GET_PAGING_USERS_GROUP_USER, async (params, thunkAPI) => {
  try {
    return await api.groupUserApi.getPagingUsersGroupUserApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const addUserGroupUserApi = createAsyncThunk<any, IFAddUserGroupUserApi>(GROUP_USER.ACTION_TYPES.ADD_USER_GROUP_USER, async (params, thunkAPI) => {
  try { 
    return await api.groupUserApi.addUsersGroupUserApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const removeUserGroupUserApi = createAsyncThunk<any, string>(GROUP_USER.ACTION_TYPES.REMOVE_USER_GROUP_USER, async (id, thunkAPI) => {
  try { 
    return await api.groupUserApi.removeUsersGroupUserApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const systemGroupUserSlice = createSlice({
  name: 'systemGroupUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addApi.fulfilled, (state) => {
      state.checkInit = true
    })
    builder.addCase(deleteApi.fulfilled, (state) => {
      state.checkInit = true
    })
    builder.addCase(editApi.fulfilled, (state) => {
      state.checkInit = true
    })
    builder.addCase(addApi.rejected, (state) => {
      state.checkInit = true
    })
    builder.addCase(deleteApi.rejected, (state) => {
      state.checkInit = true
    })
    builder.addCase(editApi.rejected, (state) => {
      state.checkInit = true
    })
    builder.addCase(addApi.pending, (state) => {
      state.checkInit = false
    })
    builder.addCase(deleteApi.pending, (state) => {
      state.checkInit = false
    })
    builder.addCase(editApi.pending, (state) => {
      state.checkInit = false
    })
    builder.addCase(addUserGroupUserApi.fulfilled, (state) => {
      state.checkInitGroupUserUser = true
    })
    builder.addCase(removeUserGroupUserApi.fulfilled, (state) => {
      state.checkInitGroupUserUser = true
    })
    builder.addCase(addUserGroupUserApi.rejected, (state) => {
      state.checkInitGroupUserUser = true
    })
    builder.addCase(removeUserGroupUserApi.rejected, (state) => {
      state.checkInitGroupUserUser = true
    })
    builder.addCase(addUserGroupUserApi.pending, (state) => {
      state.checkInitGroupUserUser = false
    })
    builder.addCase(removeUserGroupUserApi.pending, (state) => {
      state.checkInitGroupUserUser = false
    })
  }
})
