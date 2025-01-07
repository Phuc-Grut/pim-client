import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { UPLOADFILE } from "@src/domain/constants"
import api from "@src/infra/api"

interface IFFileState {
  dataUploadFile: any
  status: any
}

const initialState: IFFileState = {
  dataUploadFile: [],
  status: false
}

export const uploadFileApi = createAsyncThunk<any, FormData>(UPLOADFILE.ACTION_TYPES.UPLOAD_FILE, async (params, thunkAPI) => {
  try {
    return await api.fileApi.uploadFile(params, () => {})
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const uploadImageApi = createAsyncThunk<any, FormData>(UPLOADFILE.ACTION_TYPES.UPLOAD_IMAGE, async (params, thunkAPI) => {
  try {
    return await api.fileApi.uploadImage(params, (e: any) => {
      console.log(Math.round((100 * e.loaded) / e.total))
    })
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const uploadFileMultiApi = createAsyncThunk<any, FormData>(UPLOADFILE.ACTION_TYPES.UPLOAD_FILE_MULTI, async (params, thunkAPI) => {
  try {
    return await api.fileApi.uploadFileMulti(params, () => {})
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const uploadImageMultiApi = createAsyncThunk<any, FormData>(UPLOADFILE.ACTION_TYPES.UPLOAD_IMAGE_MULTI, async (params, thunkAPI) => {
  try {
    return await api.fileApi.uploadImageMulti(params, (e: any) => {
      console.log(Math.round((100 * e.loaded) / e.total))
    })
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const uploadFileSlice = createSlice({
  name: 'uploadFile',
  initialState,
  reducers: {
    handleAddUploadFile: (state, action) => {
      state.dataUploadFile.push(action.payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(uploadImageApi.pending, (state) => {
      console.log(state)
    })
  }
})

export const { handleAddUploadFile } = uploadFileSlice.actions
