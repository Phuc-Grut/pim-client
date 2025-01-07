import {  IFDataTableProductPackage } from "./IProdcuctPackage"
import {  IFDataTableProductInventory } from "./IProductInventory"

export interface IFDataProduct {
    id?: string
    name?: string | null
    code?: string
    sourceLink?: string
    sku?: string
    price?: number | undefined
    stockQuantity?: number | undefined
    productTypeId?: string | undefined
    status?: number | undefined,
    haveSpecificationCode?: boolean
}

export interface IFModelProduct extends IFDataProduct {
    parentGroupedProductId?: number | undefined
    forBuy?: boolean | undefined
    forSale?: boolean | undefined
    forProduction?: boolean | undefined
    condition?: number | undefined
    image?: string
    shortDescription?: string
    fullDescription?: string
    adminComment?: string
    manufacturerPartNumber?: string
    gtin?: string
    categoryRoot?: string
    isShipEnabled?: boolean | undefined
    canReturn?: boolean | undefined
    isFreeShipping?: boolean | undefined
    additionalShippingCharge?: number | undefined
    packages?: number | undefined
    isTaxExempt?: boolean | undefined
    multiPacking?: boolean | undefined
    isEsd?: boolean | undefined
    taxCategoryId?: string
    orderMinimumQuantity?: number | undefined
    orderMaximumQuantity?: number | undefined
    quantityStep?: number | undefined
    quantiyControlType?: number | undefined
    currency?: string
    productCost?: number | undefined
    hasTierPrices?: boolean | undefined
    weight?: number | undefined
    length?: number | undefined
    width?: number | undefined
    height?: number | undefined
    deleted?: boolean | undefined
    createdOnUtc?: Date | undefined
    updatedOnUtc?: Date | undefined
    deliveryTimeId?: string
    unitType?: string
    unitCode?: string
    unitId?: string
    productTag?: string[]
    originId?: string
    brandId?: string
    createdBy?: string | undefined
    createdDate?: Date | undefined
    updatedBy?: string | undefined
    updatedDate?: Date | undefined
    isChangeAvata?: boolean,
    isAuto?: number | undefined,
    manageInventoryMethodId?: number,
    moduleCode?: string | undefined
    organizationId?: string
    productType?: string
    categoryRootId?: string
    listInventory?: IFDataTableProductInventory[]
    listPackage?: IFDataTableProductPackage[],
    attributesJson?: string
    variantCount?: number
    isVariant?: boolean
    parentId?: string
    attr?: any,
    type?:number,
    selectedIndex?: number,
    specificationCode?: any[]
    sourceCode?: string 
}

export interface IFResponseListProductApi {
    items: IFDataProduct[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingProductApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string
    $brandId?: string | undefined
    $originId?: string | undefined
    $taxCategoryId?: string | undefined
    $productTypeId?: string | undefined
    $unitId?: string | undefined
    $status?: number | undefined
    $startDate?: Date | undefined
    $endDate?: Date | undefined
}
export interface IFListboxProductApi {
    $keyword?: string
    $status?: number | undefined
    $brandId?: string | undefined
    $originId?: string | undefined
    $taxCategoryId?: string | undefined
    $productTypeId?: string | undefined
    $unitId?: string | undefined
}
export interface IFDuplicateProductApi {
    id?: string
    name?: string
    code?: string | null
    status?: number | undefined
    isAuto?: number | undefined
    moduleCode?: string | undefined
}
export interface IFProductVariant {
    id?:string
    code?:string
    name: string
    status: number
    attributesJson?: string
    sku?: string,
    manufacturerNumber?: string,
    gtin?: string,
    price?: number,
    currency?: string,
    deliveryTimeId?: string,
    unitId?: string,
    unitType?: string,
    unitCode?: string,
    manageInventoryMethodId?: string,
    multiPacking?: string
    packages?: number,
    weight?: number,
    length?: number,
    width?: number,
    height?: number,
    parentId?: string,
    ListMedia: {
        name: string
        path: string
        mediaType?: string
        displayOrder?: number
        productId?: string
        id?: string
    }[]
    ListInventory: {
        warehouseid?:string
        stockquantity?:number
        reservedquantity?:number
        plannedquantity?:number
        productId?: string
        id?: string,
        displayOrder?: number
    }[],
    ListPackage: {
        name?:string
        weight?:number
        height?:number
        width?:number
        length?:number
        productid?: string
        id?: string
        displayOrder?: number
    }[]
}