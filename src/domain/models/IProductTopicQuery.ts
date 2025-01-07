import { IParamsListbox } from "./IParamsListbox"

export interface IProductTopicQuery {
    id?: string
    productTopicId?: string
    name?: string
    title?: string
    description?: string
    sourceCode?: string
    sourcePath?: string
    keyword?: string
    category?: string
    seller?: string
    brandId?: string
    status?: number
    displayOrder: number
    condition?: number
    productType?: number
    pageQuery?: number
    sortQuery?: number
}

export interface IProductTopicQueryParamsListbox extends IParamsListbox {
    $productTopicId?: string
}