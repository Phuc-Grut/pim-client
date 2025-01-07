
export interface IFDataWard {
    id: string 
    name?: string | undefined,
    code?: string | undefined,
    shortName?: string | undefined,
    districtName?: string | undefined,
    districtId?: number | undefined,
    note?: string | undefined,
    status?: number | undefined,
    createdBy: string | undefined,
    createdDate: Date | undefined,
    updatedBy: string | undefined,
    updatedDate: Date | undefined
}
export interface IFResponseListWardApi {
    items: IFDataWard[]
    total: number,
    pageSize: number,
    pageIndex: number,
    status: boolean,
    detailErrors: any
}
export interface IFPagingApi {
    $skip?: number | undefined,
    $top?: number | undefined,
    $keyword?: string | undefined,
    $parentId?: string | undefined,
    $status?: number | undefined
}

export interface IFCbxWardApi {
    $district?: string | undefined,
    $status?: number | undefined,
}