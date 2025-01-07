// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {recurseList, nestArray, flattenArray} from '@utils/Utils'
// Api Imports
import api from '@src/infra/api'

// ** Imports IF User

// ** Imports constants
import { MENU } from '@src/domain/constants'
import initAbility from '@src/configs/acl/initialAbility'
import {Ability, AbilityBuilder} from "@casl/ability"
const initialState = {
  dataTreeMenu: [],
  dataListMenu: [],
  dataResource: [],
  dataMenuByModule: {}
}

const updateAbility = (ability: any, permission: any) =>  {
  const { can, cannot, rules } = new AbilityBuilder(Ability)

  can('read', 'Menu')
  permission.map((item: any) => {
    for (const property in item.privileges) {
      item.privileges[property] ? can(property, item.code) : cannot(property, item.code)
    }
  })

  ability.update(rules)
}

export const getTreeMenuApi = createAsyncThunk<any>(MENU.ACTION_TYPES.GET_DATA_TREE_MENU, async (params, thunkAPI) => {
  try {
    const response = await api.getMenuTreeApi(`${params}`)
    const rs = recurseList(response)
    const permission = flattenArray(rs)
    localStorage.setItem('resources', JSON.stringify(permission))
    updateAbility(initAbility, permission)
    return rs
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getListMenuApi = createAsyncThunk<any>(MENU.ACTION_TYPES.GET_DATA_LIST_MENU, async (params, thunkAPI) => {
  try {
    const response = await api.getListMenuApi(`${params}`)
    const rs = recurseList(nestArray(response))
    return rs
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getMenuByModule = createAsyncThunk<any>('GET_MENU_BY_MODULE', async (params: any, thunkAPI) => {
  try {
    const menu = params.allMenu.find((item: any) => item.id === params.code)
    const rs = menu
    return rs
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const menuSlice = createSlice({
  name: 'appUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTreeMenuApi.fulfilled, (state, action) => {
      state.dataTreeMenu = action.payload
      state.dataResource = flattenArray(action.payload)
    })
    builder.addCase(getListMenuApi.fulfilled, (state, action) => {
      state.dataListMenu = action.payload
    })
    builder.addCase(getMenuByModule.fulfilled, (state, action) => {
      state.dataMenuByModule = action.payload
    })
  }
})

export default menuSlice.actions
