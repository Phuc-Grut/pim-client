export interface IFPagingCodeSyntaxApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string | undefined
    $userId?: string | undefined
    $status?: number | undefined
}
export interface IFDataCodeSyntax {
    id: string
    listUserId: string[]
    userId?: string
    productId: string
    status: number
}
export interface IFGetCodeSyntaxApi {
    $status?: number | undefined
    $syntaxCode?: string | undefined
}
export interface IFListBoxCodeSyntaxApi {
    $keyword?: string | undefined
    $userId?: string | undefined
    $status?: string | undefined
  }