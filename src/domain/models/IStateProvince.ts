
export interface IFDataStateProvince {
    id: string 
    name?: string | undefined,
    code?: string | undefined,
    shortName?: string | undefined,
    countryName?: string | undefined,
    countryId?: string | undefined,
    note?: string | undefined,
    status?: number | undefined,
    createdBy: string | undefined,
    createdDate: Date | undefined,
    updatedBy: string | undefined,
    updatedDate: Date | undefined
}

export interface IFResponseListStateProvinceApi {
    items: IFDataStateProvince[]
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

export interface IFCbxStateProvinceApi {
    $country?: string | undefined,
    $status?: number | undefined,
}