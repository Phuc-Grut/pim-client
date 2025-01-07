import { ColumnDirective, ColumnsDirective, CommandColumn, Filter, Page, PageSettingsModel,
  Pager, PagerDropDown, Sort, GridComponent, Toolbar,
  Freeze, ContextMenu, Edit, EditSettingsModel, Inject, Scroll, Selection
} from "@syncfusion/ej2-react-grids"
Pager.Inject(PagerDropDown)
import React, { Fragment, useState, memo, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
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

interface IFProps {
    idTable:string,
    columns:any,
    dataTable:any,
    setDataTable?:any,
    allowPaging?:any,
    rowHeight?:any,
    recordDoubleClick?:any,
    toolbarOptions?:any,
    inlineEdit?:boolean,
    setToolbarClick?:any,
    listDelete?:any,
    setListDelete?:any,
    showContextMenu?: any,
    contextMenuItems?: any,
    contextMenuOpen?: any,
    listContextShow?: any,
    listContextHide?: any,
    setRowInfo?: any,
    resource?:any,
    totalItem?:any,
    showToolbar?:any,
    allowFilter?:boolean,
    allowSort?:boolean,
    showPagination?:any,
    width?:any,
    frozenColumns?:number,
    enableInfiniteScrolling?:any,
    pageSize?:any,
    setPageSize?:any,
    typeModal?:any,
    allowSelection?:boolean,
    selectionSettings?:any,
    allowGrouping?:boolean,
    groupSettings?:any,
    setDataSelected?:any,
    selectionSingle?:boolean,
    allowAdding?:boolean,
    allowDelete?:boolean,
    onEdit?:any
}

const DefaultTable = memo(({
  idTable, columns, dataTable, setDataTable, allowPaging, rowHeight, recordDoubleClick, toolbarOptions, inlineEdit,
  setToolbarClick, setListDelete, showContextMenu, contextMenuItems, contextMenuOpen, listContextShow, listContextHide,
  width, frozenColumns, setRowInfo, typeModal, allowGrouping, selectionSettings, allowSelection, groupSettings,
  setDataSelected, selectionSingle, allowAdding, allowDelete, onEdit
}: IFProps) => {

  const dataGrid:any = useRef<GridComponent>(null)
  const pageOptions: PageSettingsModel = {
    currentPage: 1,
    pageSize: 5,
    pageSizes: true
  }
  const [openCustomizer, setOpenCustomizer] = useState(false)
  const editOptions: EditSettingsModel = (inlineEdit === true || inlineEdit === undefined) ? { allowEditing: true, allowAdding: allowAdding === true || allowAdding === undefined, allowDeleting: allowDelete === true || allowDelete === undefined, mode: 'Normal', newRowPosition: 'Bottom' } :  { allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Normal', newRowPosition: 'Bottom' }

  const handleOpenCustomize = () => {
    setOpenCustomizer(!openCustomizer)
  }
  useEffect(() => {
    const instance = dataGrid.current
    const gridElement = instance?.element

    if (gridElement) {
      if (typeModal === 'Add') {
        //add a row when init
        setTimeout(() => {
          instance?.addRecord()
          // instance?.element.querySelector('input')?.blur()
        }, 500)
      }
      
      //listener event press hot key
      gridElement.addEventListener('keydown', function (e: any) {
        if (gridElement && e.keyCode === 13) {
          //enter key
          if (e.target.classList.contains("e-rowcell") || e.target.classList.contains("e-toolbar") || e.target.classList.contains("e-headercell")) {
            if (instance?.isEdit) {
              return
            } 
            instance?.addRecord()
          }
        }
        if (gridElement && e.keyCode === 27) {
          //esc key
          if (e.target.classList.contains("e-rowcell")) {
            if (instance?.isEdit) {
              instance?.endEdit()
            } 
          }
        }
        if (e.ctrlKey && e.keyCode === 89) {
          //ctrl + y to edit
          if (e.target.classList.contains("e-rowcell")) {
            if (instance?.isEdit) {
              instance?.endEdit()
            } else {
              const index: number = parseInt(e.target.getAttribute("Index"))
              instance?.selectRow(index)
              instance?.startEdit()
            }
          }
        }
      })
      
    }
  }, [])

  const mapObject = (dataEdit: any, list: any, index: any) => {
    for (const [k, v] of Object.entries(dataEdit)) {
      list[index][k] = v
    }
    return list
  }

  const actionComplete = () => {
    
  }

  const actionBegin = (args: any) => {
    if (inlineEdit) {
      
      if (args.requestType === "delete") {
        if (args.data[0].id !== null && args.data[0].id !== undefined) {
          setListDelete((x: any) => [...x, {id: args.data[0].id}])
          const data = dataTable.filter((x: any) => x.id !== args.data[0].id)
          setDataTable(data)
        } else {
          const data = dataTable.filter((x: any) => x.orderKey !== args.data[0].orderKey)
          setDataTable(data)
        }
      }
  
      if (args.requestType === "save") {
        if (args.action === 'add') {
          const data = [...dataTable, args.data]
          setDataTable(data.map((x, i) => ({...x, orderKey: i})))
          const instance = dataGrid.current
          setTimeout(() => {
            //add a emty row after adding
            instance?.addRecord()
          }, 100)
        }
  
        if (args.action === 'edit') {
          const data = mapObject(args.data,  [...dataTable], args.rowIndex)
          if (onEdit) {
            onEdit()
          }
          setDataTable(data)
        }
      }
  
    } else {
      args.cancel = false
    }
  }

  const clickHandler = (args: any) => {
    // console.log(args)
    if (inlineEdit) {
      if (args.item.id === "Setting") {
        handleOpenCustomize()
      }
    } else {
      args.cancel = true
      setToolbarClick(args)
    }

  }


  const cellEdit = (args: any) => {
    console.log(args)
  }

  const commandClick = (args: any) => {
    console.log(args)
    // args.cancel = true
  }

  const recordDoubleClickEvent = (arg: any) => {
    recordDoubleClick(arg)
  }

  const dataBound = () => {

    // dataGrid.current.allowPaging = dataGrid.current.getRows().length > 5

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

  const filterOptions: any = { type: "Menu" }

  const contextMenuClick = (args: any) => {
    // setContextMenuClick(args)
    setRowInfo({
      type: args.item.id,
      data: args.rowInfo.rowData
    })
  }

  const groupSettingsDefault = { showDropArea: true, showToggleButton: false, showGroupedColumn: false, showUngroupButton: true, columns: [] }

  const rowSelected = () => {
    if (setDataSelected) {

      setDataSelected({data: dataGrid.current?.getSelectedRecords()})
    }
  }

  const rowDeselected = () => {
    if (setDataSelected) {
      setDataSelected({data: dataGrid.current?.getSelectedRecords()})
    }
  }
  const rowSelecting = () => { 
    if (selectionSingle && selectionSingle === true && dataGrid.current?.getSelectedRecords().length) {  
      dataGrid.current?.clearSelection()
    } 
  } 

  const {t} = useTranslation()
  return (
    <Fragment>
      <GridComponent
        ref={dataGrid}
        id={idTable}
        frozenColumns={frozenColumns}
        width={width}
        allowPaging={allowPaging}
        rowHeight={rowHeight ? rowHeight : null}
        dataSource={dataTable}
        toolbar={toolbarOptions}
        pageSettings={pageOptions}
        commandClick={commandClick}
        editSettings={editOptions}
        actionComplete={actionComplete}
        actionBegin={actionBegin}
        allowFiltering={false}
        allowSorting={false}
        toolbarClick={clickHandler}
        cellEdit={cellEdit}
        enableHover={false}
        dataBound={dataBound}
        allowGrouping={allowGrouping ? allowGrouping : false}
        groupSettings={groupSettings ? groupSettings : groupSettingsDefault}
        allowSelection={allowSelection ? allowSelection : false}
        selectionSettings={selectionSettings ? selectionSettings : groupSettingsDefault}
        rowSelected={rowSelected}
        rowDeselected={rowDeselected}
        rowSelecting={rowSelecting}
        recordDoubleClick={recordDoubleClick ? recordDoubleClickEvent : undefined}
        filterSettings={filterOptions}
        contextMenuOpen={contextMenuOpen}
        contextMenuItems={showContextMenu ? contextMenuItems?.map((x: any) => ({...x, text: t(x.text)})) : undefined}
        contextMenuClick={showContextMenu ? contextMenuClick : undefined}
      >
        <ColumnsDirective>
          {columns.map((col: any, index: number) => (
            <ColumnDirective key={index} {...col}/>
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Filter, Sort, Edit, CommandColumn, Freeze, ContextMenu, Toolbar, Scroll, Selection]}/>
      </GridComponent>
    </Fragment>
  )
})

export default DefaultTable
