
export interface IFDataProductPackage {
    id?: string
    productId?: string
    name?: string
    weight?: number
    length?: number
    width?: number
    height?: number
    createdBy?: string
    createdDate?: Date
    createByName?: string
}
export interface IFDataTableProductPackage {
    id?: string
    productid?: string
    name?: string
    weight?: number
    length?: number
    width?: number
    height?: number
    createdby?: string
    createddate?: Date
    createbyname?: string
}

export interface IFResponseListProdcuctPackageApi {
    items: IFDataProductPackage[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProdcuctPackageApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string| undefined
    $productId?: string| undefined
}