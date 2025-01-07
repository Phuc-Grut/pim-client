export type IFColumnType = 'string' | 'date' | 'number' |'boolean' | 'checkbox'
export type IFTextAlign = 'center' | 'left' | 'right'
export type IFClipMode = 'Clip' | 'Ellipsis' | 'EllipsisWithTooltip'

export interface IGridColumns {
  isPrimaryKey?: boolean
  field: string
  headerText: string
  headerTextAlign?: IFTextAlign
  headerDescription?: string
  textAlign?: IFTextAlign
  headerTemplate?: any
  visible?: any
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  type?: IFColumnType
  filter?: Object
  editType?: string
  typeFilter?: string
  filterBarTemplate?: any
  filterTemplate?: any
  allowFiltering?: boolean
  allowGrouping?: boolean
  allowResizing?: boolean
  allowSearching?: boolean
  allowSorting?: boolean
  autoFit?: boolean
  source?: any
  edit?: any
  format?: any
  formatter?: any
  commands?: any
  freeze?: any,
  showColumnMenu?: boolean
  template?: any
  hideOperator?: boolean
  clipMode?: IFClipMode
}