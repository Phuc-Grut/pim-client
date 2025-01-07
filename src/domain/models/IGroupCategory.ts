
export interface IFDataGroupCategory {
    id: string 
    name?: string | undefined
    code?: string | undefined
    title?: string | undefined
    displayOrder?: number | undefined
    description?: string | undefined
    image?: string | undefined
    logo?: string | undefined
    logo2?: string | undefined
    favicon?: string | undefined
    url?: string | undefined
    tag?: string | undefined
    email?: string | undefined
    phone?: string | undefined
    address?: string | undefined
    facebook?: string | undefined
    youtube?: string | undefined
    zalo?: string | undefined
    status?: number | undefined
    createdBy: string | undefined
    createdByName: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedByName: string | undefined
    updatedDate: Date | undefined
}
export interface IFResponseListGroupCategoryApi {
    items: IFDataGroupCategory[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingGroupCategoryApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string | undefined
    $status?: number | undefined
}
export interface IFListboxGroupCategoryApi {
    $status?: number | undefined
    $keyword?: string | undefined
}
export interface IGroupCategorySort  {
    id: string
    sortOrder: number
  }
  
export interface GroupCategorySort {
    listGui: IGroupCategorySort[]
  }