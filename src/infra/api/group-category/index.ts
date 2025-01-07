import requester from '../requester'
import { GROUPCATEGORY } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/user'
import { IFListboxGroupCategoryApi, IFDataGroupCategory, GroupCategorySort } from '@src/domain/models/IGroupCategory'
import { IFPagingApiParams } from '@src/domain/models/IPaging'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const groupCategoryApi = {
  getPagingApi: (params: IFPagingApiParams) => requester.get(GROUPCATEGORY.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxGroupCategoryApi) => requester.get(GROUPCATEGORY.URL_API.GET_LISTBOX_API, params, config),
  getGroupCategoryAllApi: () => requester.get(`${GROUPCATEGORY.URL_API.GET_ALL_GROUPCATEGORY}`, {}, config),
  addApi: (params: IFDataGroupCategory) => requester.post(GROUPCATEGORY.URL_API.ADD_API, params, config),
  editApi: (params: IFDataGroupCategory) => requester.put(GROUPCATEGORY.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${GROUPCATEGORY.URL_API.DELETE_API}/${id}`, {}, config),
  editGroupCategorySortApi: (params: GroupCategorySort) => requester.put(`${GROUPCATEGORY.URL_API.UPDATE_GROUPCATEGORY_SORT}`, params, config)
}

export default { groupCategoryApi }
