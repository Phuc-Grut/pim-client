export interface IFDataProductSpecificationCode {
    id?: string
    name: string
    status: number
    dataTypes: number
    duplicateAllowed: boolean
    displayOrder?: number
  }
export interface IFPagingProductSpecificationCodeApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string
    $productId?: string
}