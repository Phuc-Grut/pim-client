export interface IFPagingGroupUserApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string | undefined
    $productCode?: number | undefined
    $workspaceCode?: number | undefined
    $status?: string | undefined
}
export interface IFDataGroupUser {
    id?: string
    name?: string
    description?: string | undefined
    productCode?: string | undefined
    status?: number | undefined
    createdBy: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedDate: Date | undefined
}

export interface IFListBoxGroupUserApi {
    $keyword?: string | undefined
    $status?: number | undefined
    $productCode?: string 
    $workspaceCode?: string | undefined
}

export interface IFListBoxWorkspaceApi {
    $keyword?: string | undefined
    $productCode?: string 
}

export interface IFPagingUserGroupUserApi {
    $skip?: number | undefined
    $top?: number | undefined
    $roleId: string 
    $keyword?: string | undefined
}

export interface IFDataGroupUserUser {
    id: string
    listUserId: string[]
    roleId: string
}


export interface IFAddUserGroupUserApi {
    listUserId?: string[]
    id: string
}

export interface IFRemoveUserGroupUserApi {
    roleId: string
    userId: string
}