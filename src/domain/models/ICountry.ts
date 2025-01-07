
export interface IFDataCountry {
    id: string
    name?: string | undefined,
    code?: string | undefined,
    shortName?: string | undefined,
    localName?: string | undefined,
    note?: string | undefined,
    status?: number | undefined,
    displayOrder?: number | undefined,
    createdBy: string | undefined,
    createdDate: Date | undefined,
    updatedBy: string | undefined,
    updatedDate: Date | undefined
}
export interface IFResponseListCountryApi {
    items: IFDataCountry[]
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
    $category?: string | undefined,
    $status?: number | undefined
}

export interface IFCbxCountryApi {
    $globalZone?: string | undefined,
    $status?: number | undefined,
}