
export interface IFDataDistrict {
    id: string 
    name?: string | undefined,
    code?: string | undefined,
    shortName?: string | undefined,
    stateProvinceId?: number | undefined,
    stateProvinceName?: string | undefined,
    note?: string | undefined,
    status?: number | undefined,
    createdBy: string | undefined,
    createdDate: Date | undefined,
    updatedBy: string | undefined,
    updatedDate: Date | undefined
}
export interface IFResponseListDistrictApi {
    items: IFDataDistrict[]
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
export interface IFCbxDistrictApi {
    $stateProvince?: string | undefined,
    $status?: number | undefined,
}