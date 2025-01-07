import {
  ColumnDirective,
  ColumnsDirective,
  CommandColumn,
  Page,
  PageSettingsModel,
  PagerComponent,
  Pager,
  PagerDropDown,
  GridComponent,
  Toolbar,
  ColumnChooser,
  VirtualScroll,
  Freeze,
  EditSettingsModel,
  Inject
} from "@syncfusion/ej2-react-grids"

Pager.Inject(PagerDropDown)
import './gridTable.scss'
import { Fragment, useEffect, memo } from "react"
// import initialAbility from "@configs/acl/initialAbility"
// ** Reactstrap Imports
// ** Styles
// import 'gridTable.scss'

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

export interface ITableModal {
  resource: string
  idTable: string
  columns: any,
  rowHeight?: any
  allowGrouping?: any
  setContextMenuClick?: any
  dataTable: any
  showToolbar?: boolean
  allowFilter?: boolean
  allowSort?: boolean
  showPagination?: boolean
  pageSize?: number
  totalItem?: number
  setCurrentPage?: any
  setPageSize?: any
  setCommandData?: any,
  setToolbarAction?: any
  showContextMenu: boolean
  contextMenuItems?: any[],
  contextMenuOpen?: any,
  listContextHide?: any,
  listContextShow?: any,
  recordDoubleClick?: any,
  setRowInfo?: any,
  allowExcelExport?: any,
  groupBy?: any,
  setSelections?: any
  selections?: any
  exports?: any,
  showSetting?: boolean
}

const GridTableModalTemplate = memo((props: ITableModal) => {

  let dataGrid: GridComponent | null

  const {
    idTable,
    columns,
    dataTable,
    showToolbar,
    allowSort,
    showPagination,
    pageSize,
    totalItem,
    setCurrentPage,
    setPageSize,
    setToolbarAction,
    showContextMenu,
    contextMenuItems,
    rowHeight,
    contextMenuOpen,
    listContextShow,
    listContextHide,
    setSelections,
    selections,
    recordDoubleClick,
    setRowInfo,
    groupBy
    // showSetting
  } = props

  // console.log(resource)

  const pageOptions: PageSettingsModel = {
    currentPage: 1,
    pageSize,
    pageSizes: true
  }

  const filterOptions: any = { type: "Menu" }

  const captionTemplates = (props: any) => {
    return props.items[0][groupBy ? groupBy : ""]
  }

  const groupOptions: Object = {
    showGroupedColumn: false,
    columns: [groupBy ? groupBy : ""],
    showDropArea: false,
    captionTemplate: captionTemplates
  }

  useEffect(() => {
    if (dataGrid) {
      if (listContextShow?.type === 'SHOW') {
        dataGrid.contextMenuModule.contextMenu.showItems(listContextShow.list, true)
      }
      if (listContextHide?.type === 'HIDE') {
        dataGrid.contextMenuModule.contextMenu.hideItems(listContextHide.list, true)
      }
    }
  }, [listContextShow, listContextHide])

  const editOptions: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    showDeleteConfirmDialog: true,
    allowEditOnDblClick: false
  }

  const actionComplete = (args: any) => {
    if (args.requestType === "beginEdit") {
      // focus cell the column without freeze
      // args.form.elements[dataGrid.element.getAttribute('id') + fieldName].focus()
      // focus cell the column with freeze
      // if (fieldName !== undefined) {
      //   args.movableForm[dataGrid.element.getAttribute('id') + fieldName].focus()
      // }
    }
    if (args.requestType === "beginEdit" || args.requestType === "add") {
      //hide the command buttons when frozen left
      if (
        args.movableForm &&
        args.movableForm.querySelector(".e-unboundcell")
      ) {
        args.movableForm
          .querySelector(".e-unboundcell")
          .querySelector("button[title='Detail']").ej2_instances[0].disabled =
          true
        args.movableForm
          .querySelector(".e-unboundcell")
          .querySelector("button[title='Detail']").ej2_instances[0].cssClass =
          "e-hide e-flat"
      }
      //hide the command buttons when don't frozen
      if (args.form && args.form.querySelector(".e-unboundcell")) {
        args.form
          .querySelector(".e-unboundcell")
          .querySelector("button[title='Detail']").ej2_instances[0].disabled =
          true
        args.form
          .querySelector(".e-unboundcell")
          .querySelector("button[title='Detail']").ej2_instances[0].cssClass =
          "e-hide e-flat"
      }
      //hide the command buttons when frozen right
      if (
        args.frozenRightForm &&
        args.frozenRightForm.querySelector(".e-unboundcell")
      ) {
        args.frozenRightForm
          .querySelector(".e-unboundcell")
          .querySelector("button[title='Detail']").ej2_instances[0].disabled =
          true
        args.frozenRightForm
          .querySelector(".e-unboundcell")
          .querySelector("button[title='Detail']").ej2_instances[0].cssClass =
          "e-hide e-flat"
      }
    }
    if (args.action === "edit" || (args.action === "add" && args.isFrozen)) {
      setToolbarAction(args)
    }
  }

  const actionBegin = (args: any) => {
    // if (!initialAbility.can('EDIT', resource)) {
    //   if (args.requestType === 'beginEdit') {
    //     args.cancel = true
    //   }
    // }
    if (args.requestType === "beginEdit") {
      args.cancel = true
    }
  }

  const dataBound = () => { }

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

  const cellEdit = (args: any) => {
    if (args.type === "add") {
      if (args.columnName === "Commands") {
        args.cancel = true
      }
    }
  }

  const commandClick = (args: any) => {
    if (
      dataGrid &&
      (args.commandColumn.type === "Edit" ||
        args.commandColumn.type === "Delete" ||
        args.commandColumn.type === "Detail")
    ) {
      args.cancel = true
      setRowInfo({
        type: args.commandColumn.type,
        data: args.rowData
      })
    }
  }

  const recordDoubleClickEvent = (arg: any) => {
    recordDoubleClick(arg)
  }

  const rowDeselected = (arg: any) => {
    if (setSelections) {
      if (arg.data && arg.isInteracted) {
        if (arg.isHeaderCheckboxClicked) {
          setSelections(selections.filter((e: any) => !(arg?.data?.includes(e))))
        } else {
          setSelections(selections.filter((e: any) => e?.id !== arg?.data?.id))
        }
      }
    }
  }

  const rowSelected = (arg: any) => {
    if (setSelections) {
      if (arg.data && arg.isInteracted) {
        if (arg.isHeaderCheckboxClicked) {
          const ls = Array.of(...selections)
          arg.data.forEach((element: any) => {
            if (selections.findIndex((ele: any) => ele.id === element.id) === -1) {
              ls.push(element)
            }
          })
          setSelections(ls)
        } else {
          if (Object.keys(arg.data)?.length > 0) {
            const ls = Array.of(...selections)
            if (selections.findIndex((ele: any) => ele.id === arg.data.id) === -1) {
              ls.push(arg.data)
            }
            setSelections(ls)
          }
        }
      }
    }
  }


  useEffect(() => {
    if (setSelections) {
      if (selections?.length > 0 && dataGrid && dataTable?.length > 0) {
        const listId: number[] = []
        selections?.forEach((ele: any) => {
          const index = dataTable.findIndex((x: any) => x.id === ele.id)
          if (index !== -1) {
            listId.push(index)
          }
        })
        dataGrid?.selectRows(listId)
      } else {
        const arr: any = dataGrid?.getSelectedRows()
        if (arr?.length > 0) {
          dataGrid?.selectRows([])
        }
      }
    }
  }, [dataTable, selections])

  const contextMenuClick = (args: any) => {
    setRowInfo({
      type: args.item.id,
      data: args.rowInfo.rowData
    })
  }


  return (
    <Fragment>
      <div className="grid-table-component">
        <GridComponent
          ref={g => {
            dataGrid = g
          }}
          id={idTable}
          rowHeight={rowHeight ? rowHeight : null}
          dataSource={dataTable}
          pageSettings={pageOptions}
          groupSettings={groupOptions}
          commandClick={commandClick}
          editSettings={editOptions}
          actionComplete={actionComplete}
          actionBegin={actionBegin}
          allowSorting={allowSort}
          showColumnChooser={showToolbar}
          cellEdit={cellEdit}
          enableHover={false}
          dataBound={dataBound}
          rowSelected={rowSelected}
          rowDeselected={rowDeselected}
          filterSettings={filterOptions}
          recordDoubleClick={recordDoubleClick ? recordDoubleClickEvent : undefined}
          contextMenuOpen={contextMenuOpen}
          contextMenuItems={showContextMenu ? contextMenuItems : undefined}
          contextMenuClick={showContextMenu ? contextMenuClick : undefined}
        >
          {showToolbar ? (
            <Inject services={[VirtualScroll, Page, CommandColumn, Freeze, Toolbar, ColumnChooser]}
            />
          ) : (
            <Inject services={[VirtualScroll, Page, CommandColumn, Freeze]}
            />
          )}
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

export default GridTableModalTemplate
