export interface IFDataProductMedia {
    id: string,
    productId: string,
    name: string,
    mediaType?: string,
    path?: string,
    displayOrder?: number | undefined
}
export interface IFDataProductMediaMulti {
    ListAtt?: IFDataProductMedia[]
}
export interface IFDataAddProductMedia {
    data: FormData,
    productId: string,
    onUploadProcess: any
}

export interface IFResponseListProductMediaApi {
    items: IFDataProductMedia[]
    total: number,
    pageSize: number,
    pageIndex: number,
    status: boolean,
    detailErrors: any
}
export interface IFPagingProductMediaApi {
    $skip?: number | undefined,
    $top?: number | undefined,
    $keyword?: string,
    $productId?: string
}