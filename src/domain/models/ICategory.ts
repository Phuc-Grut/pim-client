import { IFPagingApiParams } from "./IPaging"

export interface IFDataCategory {
    id: string 
    name?: string | undefined
    fullName?: string | undefined
    code?: string | undefined
    parentCategoryId?: string | undefined
    parentCategoryName?: string | undefined
    groupCategoryId?: string | undefined
    groupCategoryCode?: string | undefined
    groupCategoryName?: string | undefined
    description?: string | undefined
    image?: string | undefined
    web?: string | undefined
    url?: string | undefined
    status?: number | undefined
    displayOrder?: number | undefined
    createdBy: string | undefined
    createdByName: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedByName: string | undefined
    updatedDate: Date | undefined
    jsonData: {
        name: string;
        value: string;
      }[]
      keywords?: string | undefined
}

export interface IFResponseListCategoryApi {
    items: IFDataCategory[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingCategoryApi extends IFPagingApiParams {
    // $filter?: string
    // $skip?: number | undefined
    // $top?: number | undefined
    // $keyword?: string | undefined
    GroupCategoryId?: string
    ParentCategoryId?: string
    Status?: number
}
export interface IFListboxCategoryApi {
    $status?: number | undefined
    $keyword?: string | undefined
    $groupCategoryId?: string | undefined
    $parentCategoryId?: string | undefined
}