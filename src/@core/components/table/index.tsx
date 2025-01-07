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
  Toolbar,
  ColumnChooser,
  VirtualScroll,
  Freeze,
  ContextMenu,
  Edit,
  Group,
  EditSettingsModel,
  Inject,
  ExcelExport,
  Search,
  Resize
} from "@syncfusion/ej2-react-grids"
Pager.Inject(PagerDropDown)
import * as React from "react"
import { Fragment, useEffect, memo, useRef } from "react"
import { useTranslation } from "react-i18next"
import { MultiSelect, CheckBoxSelection } from "@syncfusion/ej2-react-dropdowns"
import { L10n, loadCldr, setCulture, setCurrencyCode } from '@syncfusion/ej2-base'
import themeConfig from "@configs/themeConfig"
import {ITableTemplate} from "@src/domain/models/ITableGrid"


MultiSelect.Inject(CheckBoxSelection)

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

const TableTemplate = memo((props: ITableTemplate) => {

  const { t } = useTranslation()

  const dataGrid: any = useRef()

  const lag = window.localStorage.getItem('i18nextLng')
  const lang = lag ? lag : 'vi'

  const {
    idTable,
    columns,
    dataTable,
    setDataTable,
    allowPaging,
    pageSize,
    totalItem,
    setCurrentPage,
    setPageSize,
    showContextMenu,
    setContextMenuClick,
    contextMenuItems,
    contextMenuOpen,
    listContextShow,
    listContextHide,
    recordDoubleClick,
    allowExcelExport,
    setDataSelected,
    selectionSettings,
    allowResizing,
    setDoubleClickData,
    currentPage,
    height,
    inlineEdit,
    setCommandClick,
    allowEditOnDblClick,
    allowDeleting,
    allowEditing,
    allowAdding
  } = props

  loadCldr()
  L10n.load(require(`@public/assets/data/locales/${lang}.json`))
  useEffect(() => {
    loadCldr(
      require(`@src/assets/cldr-data/main/${lang}/ca-gregorian.json`),
      require(`@src/assets/cldr-data/main/${lang}/numbers.json`),
      require(`@src/assets/cldr-data/main/${lang}/timeZoneNames.json`),
      require("@src/assets/supplemental/numberingSystems.json")
    )
    dataGrid.locale = lang ? lang : 'vi'
    setCulture(lang)
    setCurrencyCode('VND')
  }, [lang])

  useEffect(() => {
    if (dataGrid) {
      if (listContextShow?.type === 'SHOW') {
        dataGrid?.current.contextMenuModule.contextMenu.showItems(listContextShow.list, true)
      }
      if (listContextHide?.type === 'HIDE') {
        dataGrid?.current.contextMenuModule.contextMenu.hideItems(listContextHide.list, true)
      }
    }
  }, [listContextShow, listContextHide])

  const pageOptions: PageSettingsModel = {
    currentPage: currentPage ? currentPage : 1,
    pageSize,
    pageSizes: true
  }


  const editOptions: EditSettingsModel = {
    allowAdding: allowAdding !== false,
    allowEditing: allowEditing !== false,
    allowDeleting: allowDeleting !== false,
    showDeleteConfirmDialog: false,
    allowEditOnDblClick: allowEditOnDblClick !== false
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

  const contextMenuClick = (args: any) => {
    setContextMenuClick(args)
  }

  const cellEdit = (args: any) => {
    console.log(args)
    // if (args.type === "add") {
    //   if (args.columnName === "Commands") {
    //     args.cancel = true
    //   }
    // }
  }

  const rowSelected = (args: any) => {
    if (dataGrid && setDataSelected) {
      setDataSelected(args)
    }
    //close by sontd
    // if (dataGrid && setDataSelected) {
    //   /** Get the selected row indexes */
    //   // const selectedrowindex = dataGrid.getSelectedRowIndexes()
    //   /** Get the selected records. */
    //   const selectedRecords = dataGrid.current?.getSelectedRecords()
    //   setDataSelected(selectedRecords)
    // }
  }

  const rowDeselected = () => {
    if (dataGrid && setDataSelected) {
      /** Get the selected row indexes */
      // const selectedrowindex = dataGrid.getSelectedRowIndexes()
      /** Get the selected records. */
      const selectedRecords = dataGrid.current?.getSelectedRecords()
      setDataSelected(selectedRecords)
    }
  }

  const recordDoubleClickEvent = (arg: any) => {
    setDoubleClickData(arg)
  }

  const commandClick = (args: any) => {
    setCommandClick(args)
  }

  const actionComplete = (args: any) => {
    if (inlineEdit) {
      if ((args.action === 'add' && args.requestType === 'save') || args.requestType === 'delete') {
        const rs: any = []
        args.rows.map((item: any) => {
          rs.push(item.data)
        })
        setDataTable(rs)
      } else {
        args.cancel = true
      }
    } else {
      args.cancel = false
    }
  }

  const actionBegin = () => {

  }


  return (
    <Fragment>
      <div className="grid-table-component">
        <GridComponent
          ref={dataGrid}
          id={idTable}
          height={height}
          locale={lang}
          dataSource={dataTable}
          pageSettings={pageOptions}
          commandClick={commandClick}
          editSettings={editOptions}
          actionComplete={actionComplete}
          actionBegin={actionBegin}
          allowFiltering={false}
          allowSorting={false}
          cellEdit={cellEdit}
          enableHover={false}
          allowResizing={allowResizing}
          allowExcelExport={allowExcelExport}

          recordDoubleClick={recordDoubleClick ? recordDoubleClickEvent : undefined}
          contextMenuOpen={contextMenuOpen}
          contextMenuItems={showContextMenu ? contextMenuItems?.map((x: any) => ({ ...x, text: t(x.text) })) : undefined}
          contextMenuClick={showContextMenu ? contextMenuClick : undefined}
          selectionSettings={selectionSettings}
          rowSelected={rowSelected}
          rowDeselected={rowDeselected}
          allowPaging={false}
        >
          <Inject services={[VirtualScroll, Page, Search, Filter, Sort, Edit, CommandColumn, Freeze, ContextMenu, Toolbar, ColumnChooser, Group, ExcelExport, Resize]}
          />

          <ColumnsDirective>
            {columns.map((col: any, index: number) => (
              <ColumnDirective
                key={index}
                {...col}
                headerText={t(col.headerText)}
              />
            ))}
          </ColumnsDirective>
        </GridComponent>

        {allowPaging ? <PagerComponent
          locale={lang}
          click={onChangePage}
          pageSize={pageSize}
          currentPage={currentPage}
          pageSizes={themeConfig.system.pageSizes}
          totalRecordsCount={totalItem ? totalItem : undefined}
          pageCount={5}
          dropDownChanged={onChangePageSize}
        /> : ''}

      </div>

    </Fragment>
  )
})

export default TableTemplate
