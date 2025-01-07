import { IFDataProduct } from "./IProduct"

export interface IFDataProductInventory {
    id?: string
    productId?: string
    warehouseId?: string
    warehouseCode?: string
    unitId?: undefined | undefined,
    unitCode?: string,
    unitName?: string, 
    warehouseName?: string
    stockQuantity?: number | undefined
    reservedQuantity?: number | undefined
    plannedQuantity?: number | undefined
    createdBy?: string
    createdDate?: Date
    createByName?: string,
    product?: IFDataProduct,
    specificationCode1?: string,
    specificationCode2?: string,
    specificationCode3?: string,
    specificationCode4?: string,
    specificationCode5?: string,
    specificationCode6?: string,
    specificationCode7?: string,
    specificationCode8?: string,
    specificationCode9?: string,
    specificationCode10?: string
}
export interface IFDataTableProductInventory {
    id: string
    productid: string
    warehouseid: string
    stockquantity?: number | undefined
    reservedquantity?: number | undefined
    plannedquantity?: number | undefined
    createdBy?: string
    createdDate?: Date
    createByName?: string
}
export interface IFDataProductInventoryMulti {
    productId: string
    listInventory: IFDataProductInventory[]
}

export interface IFResponseListProductInventoryApi {
    items: IFDataProductInventory[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductInventoryApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string
    $productId?: string
    $warehouseId?: string
}