import { ForwardedRef, Fragment, KeyboardEvent, LegacyRef, ReactNode, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Button, DropdownMenu, DropdownToggle, Input, UncontrolledDropdown } from "reactstrap"
import classnames from "classnames"
import { useTranslation } from "react-i18next"
import Select from "react-select"
import { PagerComponent } from "@syncfusion/ej2-react-grids"
import AsyncSelect from "react-select/async"
import { AlertCircle, Info, Settings } from "becoxy-icons"
import ReactInput from "./utility/react-input"
import { messageBoxConfirmDelete, notificationSuccess } from "./utility/notifications"
import { isNullOrUndefined, useOnClickOutside } from "./utility/utils"
import IconCustom from "./utility/icon"
import './index.scss'
import moment from "moment"

type ITextAlign = 'center' | 'left' | 'right'
type IEditType = 'text' | 'numeric' | 'asyncSelect' | 'datetime' | 'selectMulti' | 'date' | 'select' | 'checkbox' | 'color'

export interface ICommandItem {
  id: string
  title: string
  color?: string
  tooltip?: string
  icon?: string
  commandTemplate?: ReactNode
}

export interface IColumnTable {
  field: string,
  headerText?: string,
  isClearable?: boolean,
  isMulti?: boolean,
  isPrimarykey?: boolean,
  isUnikey?: boolean,
  haveSum?: boolean,
  fixedType?: 'left' | 'right' | undefined,
  validate?: any,
  validateOption?: any
  disabledCondition?: any
  loadOptions?: any,
  callback?: any,
  defaultValue?: any,
  width?: string | number,
  fractionDigits?: number,
  fieldValue?: string,
  minWidth?: string | number,
  maxWidth?: string | number,
  min?: number,
  max?: number,
  editEnable?: boolean
  disable?: boolean
  visible?: boolean
  invisibleDisable?: boolean
  textAlign?: ITextAlign
  editType?: IEditType,
  template?: any
  headerTemplate?: any
  options?: any[]
  command?: any
  classElement?: string
  commandItems?: ICommandItem[]
  columns?: IColumnTable[]
  editTypeCondition?: any
  iconGroup?: string
  handIconGroupClick?: any
}

type Props = {
  dataSource: any[],
  haveSum?: boolean,
  selectEnable?: boolean,
  showTopToolbar?: boolean,
  showBottomToolbar?: boolean,
  defaultValue?: any,
  toolbarOptions?: any[],
  toolbarBottomOptions?: any[],
  columns: IColumnTable[],
  setDataSource: any,
  commandClick?: any,
  rowChange?: any
  dataSourceChange?: any,
  allowPaging?: boolean,
  pageSize?: number
  totalItem?: number
  height?: number
  maxHeight?: number
  minHeight?: number
  currentPage?: number
  setCurrentPage?: any
  setPageSize?: any,
  searchTerm?: string
  idTable?: string
  setSearchTerm?: any
  selectedItem?: any
  setSelectedItem?: any
  searchEnable?: boolean,
  editDisable?: boolean,
  addDisable?: boolean,
  deleteAllDisable?: boolean,
  insertAfterDisable?: boolean,
  insertBeforeDisable?: boolean,
  duplicateDisable?: boolean,
  isMulti?: boolean
}

interface IFPageSize {
  pageSize: number
  name: string
}

interface IFCurrentPage {
  currentPage: number
}

interface IFCurrentPageConfig {
  currentPage: number
  newProp: IFCurrentPage
  oldProp: IFCurrentPage
  cancel: boolean
  name: string
}

interface IFRef {
  refeshFocusRow: any
}

const TableEdit = forwardRef((props: Props, ref: ForwardedRef<IFRef>) => {
  const { t } = useTranslation()
  const {
    idTable,
    dataSource,
    columns,
    commandClick,
    dataSourceChange,
    rowChange,
    allowPaging,
    pageSize,
    totalItem,
    currentPage,
    setCurrentPage,
    setPageSize,
    setDataSource,
    height,
    maxHeight,
    minHeight,
    defaultValue,
    haveSum,
    toolbarOptions,
    toolbarBottomOptions,
    showTopToolbar,
    showBottomToolbar,
    searchTerm,
    setSearchTerm,
    searchEnable,
    setSelectedItem,
    selectedItem,
    selectEnable,
    editDisable,
    addDisable,
    deleteAllDisable,
    insertAfterDisable,
    insertBeforeDisable,
    duplicateDisable,
    isMulti
  } = props

  useImperativeHandle(ref, () => {
    return {
      refeshFocusRow: handleRefeshRow
    }
  })

  const [refreshRow, setRefreshRow] = useState<boolean>(false)
  const [indexFocus, setIndexFocus] = useState<number>()
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [tableColumns, setTableColumns] = useState<IColumnTable[]>([...columns])
  const [columnFistEdit, setColumnFistEdit] = useState<number>(0)
  const [columnLastEdit, setColumnlastEdit] = useState<number>(0)
  const [letfWidthFix, setLetfWidthFix] = useState<any>({})

  const tableElement: LegacyRef<HTMLDivElement> | undefined = useRef<HTMLDivElement>(null)
  const gridRef: any = useRef()
  const lag = window.localStorage.getItem('i18nextLng')
  const lang = lag ? lag : 'vi'

  const fieldKey = columns.find((item: IColumnTable) => item.isPrimarykey === true)?.field ?? 'id'
  const fieldUniKey = columns.filter((item: IColumnTable) => item.isUnikey === true)?.map((item: IColumnTable) => item.field)

  useEffect(() => {
    let indexFirst = -1
    let indexlast = -1
    let letfWidthFix = 0
    const objWidthFix: any = {}
    tableColumns.forEach((item, index) => {
      if (item.fixedType === 'left' && item.visible !== false) {
        objWidthFix[index] = letfWidthFix
        letfWidthFix += Number(item.minWidth ? item.minWidth : (item.field === '#' ? 40 : (item.width ? item.width : 0)))
      }
      if (item.editEnable && (item.visible !== false) && (!item.disabledCondition)) {
        if (indexFirst === -1) {
          indexFirst = index
        }
        indexlast = index
      }
    })
    setLetfWidthFix(objWidthFix)
    setColumnFistEdit(indexFirst + 1)
    setColumnlastEdit(indexlast + 1)
  }, [tableColumns])

  useEffect(() => {
    setTableColumns(columns.map((item: IColumnTable, index) => {
      return { ...item, visible: (item.invisibleDisable ? item.visible : (tableColumns[index]?.visible ?? item.visible)) }
    }))
  }, [columns])

  const handleRefeshRow = () => {
    setRefreshRow(true)
    setTimeout(() => {
      setRefreshRow(false)
    }, 5)
  }

  const handleDataChange = async (row: any, col: IColumnTable, indexRow: number, indexCol: number) => {
    if (dataSourceChange) {
      dataSourceChange(dataSource)
    }
    if (rowChange) {
      const flag = await rowChange(row, indexRow, col.field)

      for (let index = 0; index <= tableColumns.length; index++) {
        if (!editDisable && indexFocus === indexRow && (!col.disabledCondition || !col.disabledCondition(row)) && tableColumns[index] && tableColumns[index].editEnable) {
          const element: any = document.getElementById(`${idTable}-col${index + 1}-row${indexRow + 1}`)
          if (element) {
            if (element.className.includes('react-select')) {
              if (flag) {
                setRefreshRow(true)
                setTimeout(() => {
                  setRefreshRow(false)
                  setTimeout(() => {
                    const elementFs: any = document.getElementById(`${idTable}-col${indexCol + 1}-row${indexRow + 1}`)
                    if (elementFs) {
                      if (elementFs.className.includes('react-select')) {
                        elementFs.getElementsByTagName('input')[0]?.focus()
                      } else {
                        elementFs.focus()
                      }
                    }
                  }, 50)
                }, 5)
              }
            } else if (element.className.includes('input-element')) {
              element.value = row[tableColumns[index].field] ?? ''
            } else if (element.className.includes('input-checkbox')) {
              if (flag) { handleRefeshRow() }
            } else if (element.className.includes('input-numeric')) {
              element.value = row[tableColumns[index].field] ? new Intl.NumberFormat("vi-VN", { maximumFractionDigits: col.fractionDigits ?? 2 }).format(row[tableColumns[index].field]) : 0
            }
          }
        }
      }
    }
  }

  const handleKeyPress = (e: any) => {
    if ((e.code === 'Enter' || e.code === 'NumpadEnter')) {
      setSearchTerm(e.target.value)
    }
  }
  const searchTemplate = (): JSX.Element => {
    return (
      <Fragment>
        <div className="me-50">
          <ReactInput
            style={{ width: '230px' }}
            value={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder={t('Search')}
            onKeyPress={handleKeyPress}
          />
        </div>
      </Fragment >
    )
  }
  const defaultToolbarOption: any[] = searchEnable === true ? [{ template: searchTemplate, align: 'left' }] : []
  let toolbarTopOption: any[] = []
  if (toolbarOptions) {
    toolbarTopOption = [...defaultToolbarOption, ...toolbarOptions]
  } else {
    toolbarTopOption = [...defaultToolbarOption]
  }

  const formartCurrency = (str: string) => {
    const arr = str.split(",", 2)
    const flag = str.includes(',')

    if (arr[0].length < 3) {
      return str
    } else {
      let count = 0
      for (let i = arr[0].length - 2; i >= 0; i--) {
        if ((arr[0].length - i - count) % 3 === 0 && i > 0) {
          arr[0] = `${arr[0].substring(0, i)}.${arr[0].substring(i, arr[0].length)}`
          count++
        }
      }
      if (arr[0].lastIndexOf('.') === arr[0].length - 1) {
        arr[0] = arr[0].slice(0, arr[0].length - 1)
      }
      return flag ? `${arr[0]},${arr[1] ?? ''}` : arr[0]
    }
  }

  const renderEdit = (row: any, col: IColumnTable, indexRow: number, indexCol: number) => {
    /*eslint-disable */

    switch (col?.editTypeCondition ? col?.editTypeCondition(row) : col.editType) {
      case 'date':
        return (
          <Input
            id={`${idTable}-col${indexCol + 1}-row${indexRow + 1}`}
            style={{ textAlign: col.textAlign, height: 29 }}
            defaultValue={row[col.field] ? moment(row[col.field]).format('yyyy-MM-DD') : row[col.field]}
            disabled={(col.disable ?? false)}
            onChange={(val: any) => {
              if (col.callback) {
                col.callback(val.target.value, indexRow)
              }
              row[col.field] = val.target.value
              handleDataChange(row, col, indexRow, indexCol)
            }
            }
            className={classnames('border-0 rounded-0', { 'is-invalid': col.validate && col.validate(row[col.field], row) })}
            type="date"
            max="9999-12-31"
            onKeyDown={(e) => {
              if (checkKeyDown(e, row, col, indexRow + 1, indexCol + 1)) {

              }
            }}
          />
        )
      case 'datetime':
        return (
          <Input
            id={`${idTable}-col${indexCol + 1}-row${indexRow + 1}`}
            style={{ textAlign: col.textAlign, height: 29 }}
            defaultValue={row[col.field] ? moment(row[col.field]).format('yyyy-MM-DD HH:MM') : row[col.field]}
            disabled={(col.disable ?? false)}
            onChange={(val: any) => {
              if (col.callback) {
                col.callback(val.target.value, indexRow)
              }
              row[col.field] = val.target.value
              handleDataChange(row, col, indexRow, indexCol)
            }}
            className={classnames('border-0 rounded-0', { 'is-invalid': col.validate && col.validate(row[col.field], row) })}
            type="datetime-local"
            max="9999-12-31T23:59"
            onKeyDown={(e) => {
              if (checkKeyDown(e, row, col, indexRow + 1, indexCol + 1)) {

              }
            }}
          />
        )
      case 'asyncSelect':
        let valueAsyncSelect: any = (!isNullOrUndefined(row[col.field]) && row[col.field] !== '') ? col.options?.find((val: any) => val[col.fieldValue ?? 'value'] === row[col.field]) : undefined
        if (!valueAsyncSelect && col.defaultValue) {
          valueAsyncSelect = col.defaultValue(row)
        }
        return (
          <div className={classnames('d-flex select-group', { 'is-invalid': col.validate && col.validate(row[col.field], row) })}>
            <AsyncSelect
              menuPosition='fixed'
              value={valueAsyncSelect}
              defaultOptions={col.options ? col.options : []}
              onChange={(val) => {
                if (col.callback) {
                  col.callback(val, indexRow)
                }
                row[col.field] = val ? val[col.fieldValue ?? 'value'] : undefined
                handleDataChange(row, col, indexRow, indexCol)
              }}
              menuPortalTarget={document.body}
              isDisabled={(col.disable ?? false)}
              isClearable={(col.isClearable ?? false)}
              classNamePrefix={col.classElement ?? 'select'}
              placeholder={t('Select')}
              id={`${idTable}-col${indexCol + 1}-row${indexRow + 1}`}
              loadOptions={col.loadOptions}
              className={classnames('react-select')}
              onKeyDown={(e) => {
                if (checkKeyDown(e, row, col, indexRow + 1, indexCol + 1)) {

                }
              }
              }
            />
            <span
              onClick={() => {
                if (col.handIconGroupClick) {
                  col.handIconGroupClick('right')
                }
              }}
              className={classnames('input-group-text', { 'd-none': !col.iconGroup })}
            >
              <IconCustom iconName={col.iconGroup ?? ''} size={16} />
            </span>
          </div>
        )
      case 'select':
        let valueSelect
        if (col.isMulti) {
          valueSelect = (!isNullOrUndefined(row[col.field]) && row[col.field]?.length > 0) ? col.options?.filter((val: any) => row[col.field]?.includes(val[col.fieldValue ?? 'value'])) : []
        } else {
          valueSelect = (!isNullOrUndefined(row[col.field]) && row[col.field] !== '') ? col.options?.find((val: any) => val[col.fieldValue ?? 'value'] === row[col.field]) : ''
        }

        return (
          <Select
            menuPosition='fixed'
            id={`${idTable}-col${indexCol + 1}-row${indexRow + 1}`}
            defaultValue={valueSelect}
            options={col.options ? (col.validateOption ? col.options.filter((item) => col.validateOption(item, row)) : col.options) : []}
            onChange={(val) => {
              if (col.callback) {
                col.callback(val, indexRow)
              }
              row[col.field] = col.isMulti ? (val?.map((item: any) => item[col.fieldValue ?? 'value']) ?? []) : (val ? val[col.fieldValue ?? 'value'] : undefined)
              handleDataChange(row, col, indexRow, indexCol)
            }}
            menuPortalTarget={document.body}
            isMulti={col.isMulti ?? false}
            isDisabled={(col.disable ?? false)}
            isClearable={(col.isClearable ?? false)}
            classNamePrefix={col.classElement ?? 'select'}
            placeholder={t('Select')}
            className={classnames('react-select', { 'is-invalid': col.validate && col.validate(row[col.field], row) })}
            onKeyDown={(e) => {
              if (checkKeyDown(e, row, col, indexRow + 1, indexCol + 1)) {

              }
            }}
          />
        )
      case 'checkbox':
        return (
          <Input
            checked={row[col.field]}
            id={`${idTable}-col${indexCol + 1}-row${indexRow + 1}`}
            type="checkbox"
            className="input-checkbox"
            style={{ textAlign: col.textAlign ?? 'left', marginTop: 6 }}
            onChange={(val) => {
              if (col.callback) {
                col.callback(val.target.value, indexRow)
              }
              row[col.field] = val.currentTarget.checked
              handleDataChange(row, col, indexRow, indexCol)
            }}
            disabled={(col.disable ?? false)}
            onKeyDown={(e) => {
              if (checkKeyDown(e, row, col, indexRow + 1, indexCol + 1)) {

              }
            }}
          />
        )
      case 'numeric':
        let valueCurrency = row[col.field]
        return (
          <Input
            id={`${idTable}-col${indexCol + 1}-row${indexRow + 1}`}
            style={{ textAlign: col.textAlign, height: 29 }}
            defaultValue={!isNullOrUndefined(valueCurrency) && valueCurrency !== '' ? new Intl.NumberFormat("vi-VN", { maximumFractionDigits: col.fractionDigits ?? 2 }).format(valueCurrency) : ''}
            className={classnames('border-0 rounded-0 input-numeric', { 'is-invalid': col.validate && col.validate(row[col.field], row) })}
            disabled={(col.disable ?? false)}
            onChange={(val) => {
              let newVal = ''
              if (val.target?.value.endsWith(",")) {
                if ((val.target?.value.match(/,/g) || []).length > 1) {
                  newVal = val.target?.value.slice(0, -1).replaceAll('.', '')
                } else {
                  newVal = val.target?.value
                }
              } else {
                newVal = val.target.value.replaceAll(/[^\d,]/g, '')
              }
              val.target.value = formartCurrency(newVal)
            }}
            onFocus={(e) => {
              e.target.setSelectionRange(0, e.target.innerText.length - 1)
            }}
            onBlur={(val) => {
              let newVal = ''
              if (val.target?.value.endsWith(",")) {
                newVal = val.target?.value.slice(0, -1).replaceAll(/[^\d,]/g, '').replaceAll(/,/g, '.')
              } else {
                newVal = val.target.value.replaceAll(/[^\d,]/g, '').replaceAll(/,/g, '.')
              }

              if (newVal != row[col.field]) {
                row[col.field] = Number(newVal)
                handleDataChange(row, col, indexRow, indexCol)
              }
            }}
            onKeyDown={(e: any) => {
              if (e.key === 'ArrowDown' || e.key === 'NumpadEnter' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === 'Tab') {
                let newVal = ''
                if (e.target?.value.endsWith(",")) {
                  newVal = e.target?.value.slice(0, -1).replaceAll(/[^\d,]/g, '').replaceAll(/,/g, '.')
                } else {
                  newVal = e.target.value.replaceAll(/[^\d,]/g, '').replaceAll(/,/g, '.')
                }
                if (newVal != row[col.field]) {
                  row[col.field] = Number(newVal)
                  handleDataChange(row, col, indexRow, indexCol)
                }
              }
              checkKeyDown(e, row, col, indexRow + 1, indexCol + 1)
            }}
            onPaste={(e) => {
              if (showBottomToolbar && !editDisable && !addDisable) {
                pasteDataFromExcel(indexRow, indexCol)
                e.preventDefault()
              }
            }}
          />
        )
        case 'color': 
        return (
          <div style={{padding: '4px 8px'}}>
            <Input
              key={`col-${indexRow}-${indexCol}`}
              type="color" 
              value={row[col.field]}
              style={{ textAlign: col.textAlign ?? 'center', padding:0, height: 23, border: "none"}}
              disabled={editDisable}
              onChange={(val) => {
                if (col.callback) {
                  col.callback(val.target.value, indexRow)
                }
                if (row[col.field] != val.target?.value) {
                  row[col.field] = val.target?.value
                  handleDataChange(row, col, indexRow, indexCol)
                }
              }}
              onKeyDown={(val: any) => {
                checkKeyDown(val, row, col, indexRow + 1, indexCol + 1)
              }}
          />  
          </div>
        )
      default:
        return (
          <Input
            id={`${idTable}-col${indexCol + 1}-row${indexRow + 1}`}
            style={{ textAlign: col.textAlign, height: 29 }}
            defaultValue={isNullOrUndefined(row[col.field]) ? '' : row[col.field]}
            disabled={(col.disable ?? false)}
            className={classnames('border-0 rounded-0 input-element', { 'is-invalid': col.validate && col.validate(row[col.field], row) })}
            onBlur={(val: any) => {
              if (col.callback) {
                col.callback(val.target.value, indexRow)
              }
              if (row[col.field] != val.target?.value) {
                row[col.field] = val.target?.value
                handleDataChange(row, col, indexRow, indexCol)
              }
            }}
            onKeyDown={(e: any) => {
              if (e.key === 'ArrowDown' || e.key === 'NumpadEnter' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === 'Tab') {
                if (col.callback) {
                  col.callback(e.target.value, indexRow)
                }
                if (row[col.field] != e.target?.value) {
                  row[col.field] = e.target?.value
                  handleDataChange(row, col, indexRow, indexCol)
                }
              }
              checkKeyDown(e, row, col, indexRow + 1, indexCol + 1)
            }}
            onPaste={(e) => {
              if (showBottomToolbar && !editDisable && !addDisable) {
                pasteDataFromExcel(indexRow, indexCol)
                e.preventDefault()
              }
            }}
          />
        )
    }
    /*eslint-disable */
  }

  const handleCommandClick = (id: string, rowData: any, index: number) => {
    if (commandClick) {
      commandClick({ id, rowData, index })
    }
  }

  const renderCommand = (commandItems: any, rowData: any, i: any) => {
    return (
      <Fragment>
        <div className='d-flex align-items-center' style={{ columnGap: 10 }}>
          {commandItems.map((item: ICommandItem, index: number) => {
            return (
              <Button
                key={`command-${index}`}
                tabIndex={-1}
                style={{ padding: '5px', minWidth: 45, height: '100%' }}
                className={classnames('command-item', {
                  'btn-icon': item.title === ''
                })}
                title={item.title}
                color={item.color ? item.color : '#000'}
                onClick={(e) => {
                  handleCommandClick(item.id, rowData, i)
                  if (i === indexFocus) {
                    setIndexFocus(undefined)
                  }
                  e.preventDefault()
                }}
              >
                {item.icon && <IconCustom iconName={item.icon} size={16} />}
              </Button>
            )
          })}
        </div>

      </Fragment>
    )
  }

  const checkKeyDown = (e: KeyboardEvent<any>, row: any, col: IColumnTable, indexRow: number, indexCol: number) => {
    if (e.code === 'ArrowRight') {
      let newIndexCol = -1
      for (let i = indexCol; i < tableColumns.length; i++) {
        if (tableColumns[i].editEnable && (tableColumns[i].visible !== false) && (!tableColumns[i].disabledCondition || !tableColumns[i].disabledCondition(row))) {
          newIndexCol = i + 1
          break;
        }
      }
      if (newIndexCol > -1) {
        const element: HTMLElement | null = document.getElementById(`${idTable}-col${newIndexCol}-row${indexRow}`)
        if (element) {
          if (element.className.includes('react-select')) {
            element.getElementsByTagName('input')[0]?.focus()
          } else {
            element.focus()
          }
        }
        e.preventDefault()
        return e.code
      }
    }
    if (e.code === 'ArrowLeft') {
      let newIndexCol = -1
      for (let i = indexCol - 2; i >= 0; i--) {
        if (tableColumns[i].editEnable && (tableColumns[i].visible !== false) && (!tableColumns[i].disabledCondition || !tableColumns[i].disabledCondition(row))) {
          newIndexCol = i + 1
          break;
        }
      }
      if (newIndexCol > -1) {
        const element: HTMLElement | null = document.getElementById(`${idTable}-col${newIndexCol}-row${indexRow}`)
        if (element) {
          if (element.className.includes('react-select')) {
            element.getElementsByTagName('input')[0]?.focus()
          } else {
            element.focus()
          }
        }
        e.preventDefault()
        return e.code
      }
    }
    if (e.code === 'ArrowUp') {
      const element: HTMLElement | null = document.getElementById(`${idTable}-col${indexCol}-row${indexRow}`)
      if (element && !(element.getElementsByClassName('select__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-100__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-200__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-300__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-400__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-500__control--menu-is-open').length > 0)) {
        if (indexRow > 1) {
          setIndexFocus(indexRow - 2)
          setTimeout(() => {
            const element: HTMLElement | null = document.getElementById(`${idTable}-col${indexCol}-row${indexRow - 1}`)
            if (element) {
              if (element.className.includes('react-select')) {
                element.getElementsByTagName('input')[0]?.focus()
              } else {
                element.focus()
              }
            }
          }, 100)
          e.preventDefault()
          return e.code
        }
      }
    }
    if (e.code === 'ArrowDown') {
      const element: HTMLElement | null = document.getElementById(`${idTable}-col${indexCol}-row${indexRow}`)
      if (element && !(element.getElementsByClassName('select__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-100__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-200__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-300__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-400__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-500__control--menu-is-open').length > 0)) {
        if (indexRow < dataSource?.length) {
          setIndexFocus(indexRow)
          setTimeout(() => {
            const element: HTMLElement | null = document.getElementById(`${idTable}-col${indexCol}-row${indexRow + 1}`)
            if (element) {
              if (element.className.includes('react-select')) {
                element.getElementsByTagName('input')[0]?.focus()
              } else {
                element.focus()
              }
            }
          }, 100)
          e.preventDefault()
          return e.code
        }
      }
    }
    if (e.code === 'Tab' && indexCol === columnLastEdit) {
      if (indexRow === dataSource?.length) {
        setDataSource([...dataSource, (defaultValue ? { ...defaultValue } : {})])
        if (tableElement) {
          setTimeout(() => {
            tableElement.current?.scrollTo(0, tableElement.current.scrollHeight)
          }, 100)
        }
        if (!(!editDisable && !addDisable)) {
          return false
        }
      }
      setIndexFocus(indexRow)
      setTimeout(() => {
        const element: HTMLElement | null = document.getElementById(`${idTable}-col${columnFistEdit}-row${indexRow + 1}`)
        if (element) {
          if (element.className.includes('react-select')) {
            element.getElementsByTagName('input')[0]?.focus()
          } else {
            element.focus()
          }
        }
      }, 100)
      e.preventDefault()
    }
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && (!editDisable && !addDisable)) {
      const element: HTMLElement | null = document.getElementById(`${idTable}-col${indexCol}-row${indexRow}`)
      if (element && !(element.getElementsByClassName('select__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-100__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-200__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-300__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-400__control--menu-is-open').length > 0 ||
        element.getElementsByClassName('width-popup-500__control--menu-is-open').length > 0)) {
        handleAdd()
        e.preventDefault()
        return e.code
      }
    }
    if (e.code === 'KeyD' && e.ctrlKey == true && (!editDisable && !addDisable)) {
      handleDuplicate(dataSource[indexFocus ?? -1], indexRow)
      e.preventDefault()
      return e.code
    }
    return ''
  }

  const onChangePage = (args: IFCurrentPageConfig) => {
    if (args.newProp.currentPage === args.oldProp.currentPage) {
      return
    }
    setCurrentPage(args.currentPage)
  }

  const onChangePageSize = (args: IFPageSize) => {
    if (allowPaging) {
      if (pageSize !== args.pageSize) {
        setPageSize(args.pageSize)
        setCurrentPage(1)
      }
    }
  }

  useOnClickOutside(gridRef, () => {
    setTimeout(() => {
      setIndexFocus(-1)
    }, 50)
  })

  const handleAdd = () => {
    setDataSource([...dataSource, (defaultValue ? { ...defaultValue, id: undefined } : {})])
    if (tableElement) {
      setIndexFocus(dataSource?.length)
      setTimeout(() => {
        tableElement.current?.scrollTo(0, tableElement.current.scrollHeight)
        const element: HTMLElement | null = document.getElementById(`${idTable}-col${columnFistEdit}-row${dataSource?.length + 1}`)

        if (element && !(element.getElementsByClassName('select__control--menu-is-open').length > 0 ||
          element.getElementsByClassName('width-popup-100__control--menu-is-open').length > 0 ||
          element.getElementsByClassName('width-popup-200__control--menu-is-open').length > 0 ||
          element.getElementsByClassName('width-popup-300__control--menu-is-open').length > 0 ||
          element.getElementsByClassName('width-popup-400__control--menu-is-open').length > 0 ||
          element.getElementsByClassName('width-popup-500__control--menu-is-open').length > 0)) {
          if (element.className.includes('react-select')) {
            element.getElementsByTagName('input')[0]?.focus()
          } else {
            element.focus()
          }
        }
      }, 100)
    }
  }

  const deleteAll = () => {
    if (!editDisable && !addDisable) {
      setIndexFocus(-1)
      setDataSource([])
    }
  }

  const handleDuplicate = (data: any, index: number) => {
    if (showBottomToolbar && !editDisable && !addDisable) {
      if (fieldKey) {
        const newdata = { ...data }
        fieldUniKey.forEach((item: string) => {
          newdata[item] = defaultValue[item]
        })
        newdata[fieldKey] = defaultValue[fieldKey]
        dataSource?.splice(index, 0, newdata)
      } else {
        dataSource?.splice(index, 0, { ...data })
      }
      setDataSource([...dataSource])
      if (tableElement && index === dataSource?.length) {
        setTimeout(() => {
          tableElement.current?.scrollTo(0, tableElement.current.scrollHeight)
        }, 100)
      }
    }
  }

  const handleInsertAfter = () => {
    if (showBottomToolbar && !editDisable && !addDisable) {
      dataSource?.splice((indexFocus ?? -1) + 1, 0, { ...defaultValue })
      setDataSource([...dataSource])
      if (tableElement && indexFocus === dataSource?.length) {
        setTimeout(() => {
          tableElement.current?.scrollTo(0, tableElement.current.scrollHeight)
        }, 100)
      }
    }
  }

  const handleInsertBefore = () => {
    if (showBottomToolbar && !editDisable && !addDisable) {
      dataSource?.splice(indexFocus ?? -1, 0, { ...defaultValue })
      setDataSource([...dataSource])
    }
  }

  const handleDeleteAll = () => {
    if (showBottomToolbar && !editDisable && !addDisable) {
      messageBoxConfirmDelete(t, deleteAll, '')
    }
  }

  const pasteDataFromExcel = async (row: number, col: number) => {
    const clipboard = await navigator.clipboard.readText()
    const arrayRow = clipboard.trimEnd().split('\n')
    arrayRow.forEach((item, indexRow) => {
      const arrayCol = item.trimEnd().split('\t')
      let dataRow = dataSource[row + indexRow]
      if (!dataRow) {
        dataRow = { ...defaultValue }
        dataSource?.push(dataRow)
      }
      arrayCol.forEach((element, index) => {
        const column = tableColumns[col + index]
        if (!column.disable && (!column.disabledCondition || !column.disabledCondition(row)) && column.editEnable) {
          dataRow[column.field] = element
        }
      })
      rowChange(dataRow, row + indexRow, '')
    })
    handleRefeshRow()
    setDataSource([...dataSource])
  }

  useEffect(() => {
    if (setSelectedItem) {
      if (isMulti) {
        if (dataSource && selectedRows && selectedRows?.length !== selectedItem?.length) {
          setSelectedItem([...selectedRows])
        }
      } else {
        if (dataSource && selectedRows?.length > 0) {
          if ((!selectedItem || (selectedItem[fieldKey] !== selectedRows[0][fieldKey]))) {
            setSelectedItem({ ...selectedRows[0] })
          }
        } else {
          setSelectedItem(undefined)
        }
      }
    }

  }, [selectedRows])

  useEffect(() => {
    if (!isMulti) {
      if (dataSource && selectedItem && selectedItem[fieldKey]) {
        if (selectedRows?.length === 0 || selectedItem[fieldKey] !== selectedRows[0][fieldKey]) {
          setSelectedRows([selectedItem])
        }
      } else {
        setSelectedRows([])
      }
    } else {
      if (dataSource && selectedItem && selectedRows?.length !== selectedItem.length) {
        setSelectedRows(selectedItem ? [...selectedItem] : [])
      }
    }
  }, [selectedItem])

  const renderContentCol = (col: IColumnTable, row: any, indexRow: number, indexCol: number, isSelected: any) => {
    if (col.field === 'command') {
      return (
        <td
          className={classnames(`e-rowcell p-0 fix-${col.fixedType}`, { 'cell-fixed': col.fixedType }, { 'e-active': indexFocus === indexRow })}
          key={`col-${indexRow}-${indexCol}`}
          style={{
            width: col.width,
            minWidth: col.minWidth,
            maxWidth: col.maxWidth,
            left: col.fixedType === 'left' ? letfWidthFix[indexCol] : undefined,
            right: col.fixedType === 'right' ? -1 : undefined,
            textAlign: col.textAlign ? col.textAlign : 'left',
          }}
        >
          <div className="e-rowcell-div " >
            {renderCommand(col.commandItems, row, indexRow)}
          </div>
        </td>
      )
    } else if (col.field === '#') {
      return (
        <td
          className={classnames(`e-rowcell p-0 cursor-pointer fix-${col.fixedType}`, { 'cell-fixed': col.fixedType }, { 'e-active': indexFocus === indexRow })}
          key={`col-${indexRow}-${indexCol}`}
          tabIndex={Number(`${indexRow}${indexCol}`)}
          style={{
            width: 40,
            minWidth: 40,
            maxWidth: 40,
            left: col.fixedType === 'left' ? letfWidthFix[indexCol] : undefined,
            right: col.fixedType === 'right' ? -1 : undefined,
            textAlign: 'center',
          }}
          onCopy={(e: any) => {
            if (!editDisable && (e.target.nodeName === 'DIV' || e.target.nodeName === 'TD')) {
              navigator.clipboard.writeText(JSON.stringify(row))
              notificationSuccess(t('CopySuccessful'))
              e.stopPropagation()
            }
          }}
          onPaste={(e: any) => {
            if (!editDisable && (e.target.nodeName === 'DIV' || e.target.nodeName === 'TD')) {
              navigator.clipboard.readText().then((rs: any) => {
                dataSource[indexRow] = JSON.parse(rs)
                if (fieldKey) {
                  dataSource[indexRow][fieldKey] = defaultValue[fieldKey]
                }
                setDataSource([...dataSource])
                notificationSuccess(t('PasteSuccessful'))
              }).catch((ex) => { alert(ex) })
              e.stopPropagation()
            }
          }}
          onClick={
            (e: any) => {
              if (e.target.nodeName === 'DIV' || e.target.nodeName === 'TD') {
                if (!editDisable && indexRow != indexFocus) {
                  setIndexFocus(indexRow)
                }
                e.stopPropagation()
              }
            }}
          onKeyDown={(e: any) => {
            if (e.code === 'KeyD' && e.ctrlKey == true && (!editDisable && !addDisable) && (e.target.nodeName === 'DIV' || e.target.nodeName === 'TD')) {
              handleDuplicate(row, indexRow)
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        >
          <div className="e-rowcell-div pt-50" >
            {indexRow + 1}
          </div>
        </td>
      )
    } else if (col.field === 'checkbox') {
      return (
        <td
          className={classnames(`e-rowcell p-0 fix-${col.fixedType}`, { 'cell-fixed': col.fixedType }, { 'e-active': indexFocus === indexRow })}
          key={`col-${indexRow}-${indexCol}`}
          style={{
            width: col.width,
            minWidth: col.minWidth,
            maxWidth: col.maxWidth,
            left: col.fixedType === 'left' ? letfWidthFix[indexCol] : undefined,
            right: col.fixedType === 'right' ? -1 : undefined,
            textAlign: col.textAlign ? col.textAlign : 'center',
          }
          }
        >
          <div className="e-rowcell-div cursor-pointer"
            onClick={(e) => {
              if (selectEnable) {
                const index = selectedRows?.findIndex((x: any) => x[fieldKey] === row[fieldKey])
                if (index > -1) {
                  if (isMulti) {
                    selectedRows?.splice(index, 1)
                    setSelectedRows([...selectedRows])
                  } else {
                    setSelectedRows([])
                  }
                } else {
                  if (isMulti) {
                    setSelectedRows([...selectedRows, row])
                  } else {
                    setSelectedRows([row])
                  }
                }
                e.stopPropagation()
              }
            }}>
            <Input
              checked={isSelected}
              type="checkbox"
              className="cursor-pointer"
              onChange={() => { }}
              style={{ textAlign: col.textAlign ?? 'center', marginTop: 6 }}
            />
          </div>
        </td >
      )
    } else {
      let value = row[col.field]
      if (col.editType === 'numeric') {
        value = !isNullOrUndefined(row[col.field]) ? (typeof (row[col.field]) !== 'number' && row[col.field].endsWith(",") ? row[col.field] : new Intl.NumberFormat("vi-VN", { maximumFractionDigits: col.fractionDigits ?? 2 }).format(typeof (row[col.field]) !== 'number' ? Number(row[col.field].replaceAll(/,/g, '.')) : row[col.field])) : 0
      } else if (col.editType === 'date') {
        value = value ? moment(value).format('DD/MM/yyyy') : ''
      } else if (col.editType === 'datetime') {
        value = value ? moment(value).format('DD/MM/yyyy HH:mm') : ''
      }
      const typeDis = !editDisable && indexFocus === indexRow && (!col.disabledCondition || !col.disabledCondition(row)) ? (col.editEnable ? 1 : (col.template ? 2 : 3)) : (col.template ? 2 : 3)
      const errorMessage = typeDis === 1 || col.field === '' || !col.validate ? '' : col.validate(row[col.field], row)
      return (
        <Fragment key={indexCol}>
          {col.visible !== false && <td
            key={`col-${indexRow}-${indexCol}`}
            className={classnames(`e-rowcell fix-${col.fixedType}`, { 'cell-fixed': col.fixedType }, { 'e-active': indexFocus === indexRow })}
            style={{
              left: col.fixedType === 'left' ? letfWidthFix[indexCol] : undefined,
              right: col.fixedType === 'right' ? -1 : undefined,
              padding: 0,
              textAlign: col.textAlign ? col.textAlign : 'left'
            }}
            onFocus={(e: any) => {
              if (!editDisable && indexRow != indexFocus) {
                setIndexFocus(indexRow)
              }
              e.stopPropagation()
            }}
            onClick={
              (e: any) => {
                if (e.target.nodeName === 'DIV' || e.target.nodeName === 'TD') {
                  if (!editDisable && indexRow != indexFocus) {
                    setIndexFocus(indexRow)
                  }
                  if (selectEnable && editDisable) {
                    const index = selectedRows?.findIndex((x: any) => x[fieldKey] === row[fieldKey])
                    if (index > -1) {
                      if (isMulti) {
                        selectedRows?.splice(index, 1)
                        setSelectedRows([...selectedRows])
                      } else {
                        setSelectedRows([])
                      }
                    } else {
                      if (isMulti) {
                        setSelectedRows([...selectedRows, row])
                      } else {
                        setSelectedRows([row])
                      }
                    }
                  }
                  e.stopPropagation()
                }
              }}
            title={`${value ?? ''}`}
          >
            <div
              id={indexFocus === indexRow && typeDis !== 1 ? `${idTable}-col${indexCol + 1}-row${indexRow + 1}` : ''}
              className={classnames('e-rowcell-div', { 'is-invalid': errorMessage })}
              style={{ padding: typeDis !== 1 ? errorMessage ? '2px 10px' : '6px 10px' : 2 }}
            >
              {typeDis === 1 && !refreshRow ? renderEdit(row, col, indexRow, indexCol) : (typeDis === 2 ? col.template(row, indexRow) : value)}
              <AlertCircle className={classnames('cursor-pointer text-primary icon-table', { 'd-none': !errorMessage })} fontSize={17} title={errorMessage}></AlertCircle>
            </div>
          </td>}
        </Fragment >
      )
    }
  }

  const renderHeaderCol = (col: IColumnTable, indexCol: number) => {
    if (col.field === 'checkbox') {
      return (
        <Fragment key={`header-${indexCol}`}>
          {col.visible !== false && <th
            className={classnames(`e-headercell fix-${col.fixedType}`, { 'cell-fixed': col.fixedType })}
            style={{
              width: col.width,
              padding: 0,
              minWidth: col.minWidth,
              left: col.fixedType === 'left' ? letfWidthFix[indexCol] : undefined,
              right: col.fixedType === 'right' ? -1 : undefined,
              maxWidth: col.maxWidth
            }}>
            <div
              style={{ textAlign: 'center', justifyContent: col.textAlign ?? 'center' }}
              className={classnames('e-headercell-div')}
            >
              <Input
                checked={selectedRows?.length >= dataSource?.length && dataSource?.length > 0}
                type="checkbox"
                className={classnames('cursor-pointer', { 'd-none': !isMulti })}
                style={{ textAlign: col.textAlign ?? 'center', marginTop: 6 }}
                onChange={(e) => {
                  if (selectEnable) {
                    if (e.target.checked) {
                      const arr = dataSource?.map((item: any) => {
                        return item
                      })
                      setSelectedRows(arr)
                    } else {
                      setSelectedRows([])
                    }
                  }
                }}
              />
            </div>
          </th>}
        </Fragment>
      )
    } else if (col.field === '#') {
      return (
        <Fragment
          key={`header-${indexCol}`}>
          {col.visible !== false && <th
            className={classnames(`e-headercell fix-${col.fixedType}`, { 'cell-fixed': col.fixedType })}
            style={{
              padding: 0,
              width: 40,
              minWidth: 40,
              maxWidth: 40,
              left: col.fixedType === 'left' ? letfWidthFix[indexCol] : undefined,
              right: col.fixedType === 'right' ? -1 : undefined
            }}>
            <div
              title={t(col.headerText ?? '')}
              style={{ textAlign: 'center', justifyContent: col.textAlign ?? 'center' }}
              className="e-headercell-div"
            >
              {t(col.headerText ?? '')}
            </div>
          </th>}
        </Fragment>
      )
    } else {
      return (
        <Fragment
          key={`header-${indexCol}`}>
          {col.visible !== false && <th
            className={classnames(`e-headercell fix-${col.fixedType}`, { 'cell-fixed': col.fixedType })}
            style={{
              width: col.width,
              padding: 0,
              minWidth: col.minWidth,
              left: col.fixedType === 'left' ? letfWidthFix[indexCol] : undefined,
              right: col.fixedType === 'right' ? -1 : undefined,
              maxWidth: col.maxWidth
            }}>
            <div
              title={t(col.headerText ?? '')}
              style={{ textAlign: 'center', justifyContent: col.textAlign ?? 'left' }}
              className="e-headercell-div"
            >
              {t(col.headerText ?? '')}
            </div>
          </th>}
        </Fragment>
      )
    }
  }

  const renderFooterCol = (col: IColumnTable, indexCol: number) => {
    return (
      <Fragment key={`summarycell-${indexCol}`}>
        {(col.visible !== false) && <td
          className={classnames(`e-summarycell p-0 px-50 fix-${col.fixedType}`, { 'cell-fixed': col.fixedType })}
          style={{
            height: 30,
            fontSize: 14,
            fontWeight: 600,
            left: col.fixedType === 'left' ? letfWidthFix[indexCol] : undefined,
            right: col.fixedType === 'right' ? -1 : undefined,
            width: col.width,
            minWidth: col.minWidth,
            maxWidth: col.maxWidth,
            whiteSpace: 'nowrap',
            textAlign: col.textAlign ? col.textAlign : 'left'
          }}>
          {col.haveSum === true && col.editType === "numeric" ? new Intl.NumberFormat("vi-VN", { maximumFractionDigits: col.fractionDigits ?? 2 }).format(dataSource?.reduce(function (accumulator: any, currentValue: any) { return (Number(accumulator ?? 0) + Number(currentValue[col.field] ?? 0)) }, 0)) : ''}
        </td>}
      </Fragment>
    )
  }

  const renderToolbarTop = () => {
    return (
      <div id="table_custom_top_toolbar" className="e-control e-toolbar" aria-orientation="horizontal" >
        <div className="e-toolbar-items e-tbar-pos">
          <div className="e-toolbar-left">
            {toolbarTopOption?.map((item: any, index: number) => {
              return ((item.align === 'left') ?
                <div className="e-toolbar-item e-template" key={`toolbar-top-left-${index}`} aria-disabled="false">
                  {item.template()}
                </div> : '')
            })}
          </div>
          <div className="e-toolbar-center">
            {toolbarTopOption?.map((item: any, index: number) => {
              return ((item.align === 'center') ?
                <div className="e-toolbar-item e-template" key={`toolbar-top-center-${index}`} aria-disabled="false">
                  {item.template()}
                </div> : '')
            })}
          </div>
          <div className="e-toolbar-right">
            {toolbarTopOption?.map((item: any, index: number) => {
              return ((item.align === 'right') ?
                <div className="e-toolbar-item e-template" key={`toolbar-top-right-${index}`} aria-disabled="false">
                  {item.template()}
                </div> : '')
            })}
          </div>
        </div>
      </div>
    )
  }

  const renderToolbarBottom = () => {
    return (
      <div id="table_custom_bottom_toolbar" className="e-control e-toolbar e-lib e-keyboard " role="toolbar" aria-disabled="false" aria-haspopup="false" aria-orientation="horizontal" >
        <div className="e-toolbar-items e-tbar-pos">
          <div className="e-toolbar-left">
            <div className={classnames('e-toolbar-item e-template', { 'd-none': editDisable || addDisable })} aria-disabled="false">
              <Button color='success' outline onClick={handleAdd} className='d-flex'>
                {t('Add item')}
              </Button>
            </div>
            {(indexFocus ?? -1) > -1 ? <>
              <div className={classnames('e-toolbar-item e-template', { 'd-none': editDisable || addDisable || duplicateDisable })} aria-disabled="false">
                <Button color='success' outline onClick={() => { handleDuplicate(dataSource[indexFocus ?? -1], indexFocus ?? -1) }} className='d-flex'>
                  {t('Duplicate')}
                </Button>
              </div>
              <div className={classnames('e-toolbar-item e-template', { 'd-none': editDisable || addDisable || insertBeforeDisable })} aria-disabled="false">
                <Button color='success' outline onClick={handleInsertBefore} className='d-flex'>
                  {t('Insert item before')}
                </Button>
              </div>
              <div className={classnames('e-toolbar-item e-template', { 'd-none': editDisable || addDisable || insertAfterDisable })} aria-disabled="false">
                <Button color='success' outline onClick={handleInsertAfter} className='d-flex'>
                  {t('Insert item after')}
                </Button>
              </div>
            </> : <> </>}
            <div className={classnames('e-toolbar-item e-template', { 'd-none': editDisable || addDisable || deleteAllDisable })} aria-disabled="false">
              <Button color='primary' outline onClick={handleDeleteAll} className='d-flex'>
                {t('Delete all item')}
              </Button>
            </div>
            {toolbarBottomOptions?.map((item: any, index: number) => {
              return ((item.align === 'left') ?
                <div className="e-toolbar-item e-template" key={`toolbar-bottom-left-${index}`} aria-disabled="false">
                  {item.template()}
                </div> : '')
            })}
          </div>
          <div className="e-toolbar-center">
            {toolbarBottomOptions?.map((item: any, index: number) => {
              return ((item.align === 'center') ?
                <div className="e-toolbar-item e-template" key={`toolbar-bottom-center-${index}`} aria-disabled="false">
                  {item.template()}
                </div> : '')
            })}
          </div>
          <div className="e-toolbar-right">
            {toolbarBottomOptions?.map((item: any, index: number) => {
              return ((item.align === 'right') ?
                <div className="e-toolbar-item e-template" key={`toolbar-bottom-right-${index}`} aria-disabled="false">
                  {item.template()}
                </div> : '')
            })}
            <div className={classnames('e-toolbar-item e-template me-25')} aria-disabled="false">
              <UncontrolledDropdown className='dropdown-user nav-item'>
                <DropdownToggle href='/' tag='a' color="info" onClick={e => e.preventDefault()}>
                  <Settings className="cursor-pointer" ></Settings>
                </DropdownToggle>
                <DropdownMenu>
                  <div
                    className="e-grid border-0"
                    style={{ overflowX: 'auto', maxHeight: 300 }}
                  >
                    <table className="mx-50">
                      <thead className="e-gridheader">
                        <tr style={{ cursor: 'default' }}>
                          <th className="border p-0 e-headercell">
                            <div className="e-headercell-div">
                              {t('Column name')}
                            </div>
                          </th>
                          <th className="border p-0 e-headercell">
                            <div className="e-headercell-div">
                              {t('Display')}
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableColumns.filter((item) => !item.invisibleDisable).map((item, index: number) => {
                          return (<tr key={index} style={{ cursor: 'default', fontSize: 13 }}>
                            <td className="border py-25 p-50">{t(item.headerText ?? '')}</td>
                            <td className="border py-25 px-2" style={{ height: 20 }}>
                              <Input
                                checked={item.visible ?? true}
                                type="checkbox"
                                className="h-100 cursor-pointer"
                                onChange={(val) => {
                                  item.visible = val.target.checked
                                  setTableColumns([...tableColumns])
                                }}
                              /></td>
                          </tr>)
                        })}
                      </tbody>
                    </table>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div className={classnames('e-toolbar-item e-template me-25', { 'd-none': editDisable || addDisable })} aria-disabled="false">
              <UncontrolledDropdown className='dropdown-user nav-item'>
                <DropdownToggle href='/' tag='a' color="info" onClick={e => e.preventDefault()}>
                  <Info className="cursor-pointer" ></Info>
                </DropdownToggle>
                <DropdownMenu>
                  <div className="d-flex flex-column p-50 py-25">
                    <div style={{ fontSize: 13 }}>Nhấn vào cột STT để chọn hàng và nhấn Ctrl + D để nhân bản</div>
                    <div style={{ fontSize: 13 }}>Chọn ô và Ctrl + V để dán thông tin từ excel</div>
                    <div style={{ fontSize: 13 }}>Nhấn vào cột STT để chọn hàng và nhấn Ctrl + C để sao chép hàng</div>
                    <div style={{ fontSize: 13 }}>Nhấn vào cột STT để chọn hàng và nhấn Ctrl + V để  dán hàng</div>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
        </div>
      </div >
    )
  }

  return (
    <Fragment>
      <div className="table-edit-custom">
        <div className='e-grid e-default e-bothlines'>
          {showTopToolbar ? <>
            {renderToolbarTop()}
          </> : <></>}
          <div ref={gridRef}>
            <div className="e-gridcontent" >
              <div ref={tableElement} className="e-content" style={{ height: `${height ? `${height}px` : 'auto'}`, minHeight: `${minHeight ? `${minHeight}px` : ''}`, maxHeight: `${maxHeight ? `${maxHeight}px` : '400px'}` }}>
                <table style={{ width: '100%' }}>
                  <thead className='e-gridheader' >
                    <tr className="e-row" role="row" >
                      {tableColumns.map((col: IColumnTable, index: number) => {
                        return (renderHeaderCol(col, index))
                      })}
                    </tr>
                  </thead>
                  <tbody className='rowgroup' style={{ overflowY: 'scroll' }}>
                    {dataSource?.map((row, indexRow) => {
                      const isSelected = selectedRows?.some((x: any) => x[fieldKey] === row[fieldKey])
                      return (
                        <tr
                          key={`row-${indexRow}`}
                          className='e-row'
                        >
                          {tableColumns.map((col, indexCol) => {
                            return (renderContentCol(col, row, indexRow, indexCol, isSelected))
                          })}
                        </tr>
                      )
                    })
                    }
                  </tbody>
                  <tfoot className="e-gridfoot">
                    {haveSum == true ? < tr className='e-row' >
                      {
                        tableColumns.map((col: IColumnTable, index: number) => {
                          return (renderFooterCol(col, index))
                        })}
                    </tr> : <></>}
                  </tfoot>
                </table>
              </div>
            </div>
            {showBottomToolbar ? <>
              {renderToolbarBottom()}
            </> : <></>}
          </div>
        </div>
        {
          allowPaging ? <PagerComponent
            locale={lang}
            click={onChangePage}
            pageSize={pageSize}
            currentPage={currentPage}
            pageSizes={[20, 30, 50, 100]}
            totalRecordsCount={totalItem ? totalItem : undefined}
            pageCount={5}
            dropDownChanged={onChangePageSize}
          /> : <></>
        }
      </div>
    </Fragment >
  )
})

export default TableEdit
