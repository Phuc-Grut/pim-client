// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

// ** Imports constants
import {  CODESYNTAX} from '@src/domain/constants'
import { IFGetCodeSyntaxApi } from '@src/domain/models/ICodeSyntax'

interface IFProductState {
  checkInit: boolean
}

const initialState: IFProductState = {
  checkInit: false
}

export const getCodeSyntaxApi = createAsyncThunk<any, IFGetCodeSyntaxApi>(CODESYNTAX.ACTION_TYPES.GETCODE, async (params, thunkAPI) => {
  try {
    return await api.codeSyntaxApi.getCodeSyntaxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const codeSyntaxSlice = createSlice({
  name: 'codeSyntax',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCodeSyntaxApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
  }
})
