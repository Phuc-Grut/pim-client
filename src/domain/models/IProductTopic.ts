import { IFPagingApiParams } from "./IPaging"
import { IParamsListbox } from "./IParamsListbox"

export interface IProductTopic {
    id?: string
    productTopicPageIds?: string[]
    productTopicPageCodes?: string[]
    code: string
    name: string
    title: string
    description: string
    slug: string
    keywords: string
    image: string
    icon: string
    icon2: string
    tags: string
    status: number
    displayOrder: number
}

export interface IProductTopicParamsListbox extends IParamsListbox {
    $productTopicPageId?: string
}

export interface IFPagingProductTopicApi extends IFPagingApiParams {
    ProductTopicPageId?: string
}