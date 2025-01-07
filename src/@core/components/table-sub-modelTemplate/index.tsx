import {
  ColumnDirective,
  ColumnsDirective,
  CommandColumn,
  Filter,
  Page,
  PageSettingsModel,
  PagerComponent,
  Pager,
  PagerDropDown,
  Sort,
  GridComponent,
  VirtualScroll,
  Freeze,
  ContextMenu,
  Edit,
  Group,
  EditSettingsModel,
  Inject,
  ExcelExport
} from "@syncfusion/ej2-react-grids"
Pager.Inject(PagerDropDown)
import * as React from "react"
import { Fragment, memo } from "react"
import { useTranslation } from "react-i18next"
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

export interface ISubTable {
  idTable: string,
  columns: any,
  dataTable: any,
  showPagination?: boolean,
  pageSize?: number,
  totalItem?: number,
  setCurrentPage?: any,
  setPageSize?: any,
  setCommandData?: any,
  showContextMenu?:any,
  allowGrouping?:boolean,
  recordDoubleClick?:any,
  setDoubleClickData?:any,
  groupSettings?:any,
  contextMenuItems?:any,
  setRowInfo?:any
  gridLines?: 'Both' | 'Default'
}

const GridTableTemplate = memo((props: ISubTable) => {
  const {t} = useTranslation()
  let dataGrid: GridComponent | null

  const {
    idTable, showContextMenu, setRowInfo, contextMenuItems,
    columns, allowGrouping, groupSettings, recordDoubleClick, setDoubleClickData,
    dataTable,
    showPagination,
    pageSize,
    totalItem,
    setCurrentPage,
    setPageSize,
    setCommandData,
    gridLines
  } = props


  // console.log(resource)

  const pageOptions: PageSettingsModel = {
    currentPage: 1,
    pageSize,
    pageSizes: true
  }

  const editOptions: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    showDeleteConfirmDialog: true,
    allowEditOnDblClick: false
  }

  const recordDoubleClickEvent = (arg: any) => {
    if (setDoubleClickData) {
      setDoubleClickData(arg)
    }
  }

  const onChangePage = (args: IFCurrentPageConfig) => {
    if (args.newProp.currentPage === args.oldProp.currentPage) {
      return
    }
    setCurrentPage(args.currentPage)
  }

  const onChangePageSize = (args: IFPageSize) => {
    if (showPagination) {
      if (pageSize !== args.pageSize) {
        setPageSize(args.pageSize)
        setCurrentPage(1)
      }
    }
  }

  const commandClick = (args: any) => {
    if (
      dataGrid &&
      (args.commandColumn.type === "Edit" ||
        args.commandColumn.type === "Delete" ||
        args.commandColumn.type === "Detail" || args.commandColumn.type === "Edit111"
      )
    ) {
      args.cancel = true
      setCommandData({
        type: args.commandColumn.type,
        data: args.rowData
      })
    }
  }

  const contextMenuClick = (args: any) => {
    // setContextMenuClick(args)
    if (setRowInfo) {
      setRowInfo({
        type: args.item.id,
        data: args.rowInfo?.rowData
      })
    }
    
  }

  return (
    <Fragment>
      <div className="grid-table-component">
        <GridComponent
          ref={g => {
            dataGrid = g
          }}
          id={idTable}
          dataSource={dataTable}
          pageSettings={pageOptions}
          commandClick={commandClick}
          editSettings={editOptions}
          contextMenuItems={showContextMenu ? contextMenuItems?.map((x: any) => ({...x, text: t(x.text)})) : undefined}
          contextMenuClick={showContextMenu ? contextMenuClick : undefined}
          allowGrouping={allowGrouping}
          groupSettings={groupSettings}
          recordDoubleClick={recordDoubleClick ? recordDoubleClickEvent : undefined}
          allowResizing={false}
          gridLines={gridLines ? gridLines :  'Both'}
        >
          <Inject services={[VirtualScroll, Page, Filter, Sort, Edit, CommandColumn, Freeze, ContextMenu, Group, ExcelExport, ContextMenu]}/>
          <ColumnsDirective>
            {columns.map((col: any, index: number) => (
              <ColumnDirective key={index} {...col} />
            ))}
          </ColumnsDirective>
        </GridComponent>
        <div>
          {showPagination ? (
            <PagerComponent
              click={onChangePage}
              pageSize={pageSize}
              pageSizes={[20, 30, 50, 100]}
              totalRecordsCount={totalItem}
              pageCount={5}
              dropDownChanged={onChangePageSize}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </Fragment>
  )
})

export default GridTableTemplate
