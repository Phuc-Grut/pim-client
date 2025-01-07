export interface IFPagingProductUserApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string | undefined
    $userId?: string | undefined
    $status?: number | undefined
}
export interface IFDataProductUser {
    id: string
    listUserId: string[]
    userId?: string
    productId: string
    status: number
}

export interface IFListBoxProductUserApi {
    $keyword?: string | undefined
    $userId?: string | undefined
    $status?: string | undefined
  }