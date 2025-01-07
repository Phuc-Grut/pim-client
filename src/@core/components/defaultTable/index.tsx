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
  Freeze,
  ContextMenu,
  Edit,
  EditSettingsModel,
  Inject
} from "@syncfusion/ej2-react-grids"

Pager.Inject(PagerDropDown)
import {Fragment, memo, useEffect, useRef, useState} from "react"
import themeConfig from "@configs/themeConfig"
import {L10n, loadCldr} from "@syncfusion/ej2-base"
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


const DefaultTable = memo((props: any) => {
  const {t} = useTranslation()
  const dataGrid: any = useRef()
  const lag = window.localStorage.getItem('i18nextLng')
  const lang = lag ? lag : 'vi'
  const {
    idTable,
    pageSize,
    currentPage,
    totalItem,
    setPageSize,
    columns,
    dataTable,
    setDataTable,
    allowPaging,
    rowHeight, height,
    recordDoubleClick,
    toolbarOptions,
    setCurrentPage,
    inlineEdit, allowSort,
    setListDelete,
    // frozenColumns,
    setIsClick,
    setDataSelected,
    dataSelected,
    selectionSettings
  } = props

  const pageOptions: PageSettingsModel = {
    currentPage: currentPage ? currentPage : 1,
    pageSize,
    pageSizes: true
  }

  loadCldr()
  L10n.load(require(`@public/assets/data/locales/${lang}.json`)) // load corresponding culture text
  useEffect(() => {
    loadCldr(
      require(`@src/assets/cldr-data/main/${lang}/ca-gregorian.json`),
      require(`@src/assets/cldr-data/main/${lang}/numbers.json`),
      require(`@src/assets/cldr-data/main/${lang}/timeZoneNames.json`),
      require("@src/assets/supplemental/numberingSystems.json")
    )
    dataGrid.locale = lang ? lang : 'vi' // need to change the locale dynamically for grid
    // setCulture(lang) // Change the Grid culture
    // setCurrencyCode('VND')// Change the currency code
  }, [lang])

  const editOptions: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    showDeleteConfirmDialog: false,
    allowEditOnDblClick: false
  }

  const [ind, setInd] = useState<number>()
  const recordClick = (e:any) => {
    setInd(e.rowIndex)
  }
  const commandClick = (e:any) => {
    setTimeout(() => {
      const instance = dataGrid.current
      if (dataGrid && e.commandColumn.type === "Edit") {
        instance?.selectRow(ind)
        instance?.startEdit()
        setIsClick(true)
      }
    }, 300)
    
  }

  useEffect(() => {
    if (dataGrid && dataSelected?.length === 0) {
      dataGrid.current?.clearSelection()
    }
    if (dataGrid && dataSelected?.length === 1) {
      dataGrid.current?.selectRow(parseInt(dataSelected[0].index))
    }
  }, [dataSelected])

  const actionComplete = (args: any) => {
    if ((args.action === 'add' && args.requestType === 'save') ||  args.requestType === 'delete') {
      const rs: any = []
      args.rows.map((item: any) => {
        rs.push(item.data)
      })
      setDataTable(rs)
    } if (args.action === 'edit') {
      // const newState = [...dataTable]
      // newState[args.rowIndex][rowData.]
      // setDataTable(newState)
    } else {
      args.cancel = true
    }
  }
  const mapObject = (dataEdit: any, list: any, index: any) => {
    for (const [k, v] of Object.entries(dataEdit)) {
      list[index][k] = v
    }
    return list
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
          setDataTable(data)
        }
      }
  
    } else {
      args.cancel = false
    }
  }

  const recordDoubleClickEvent = (arg: any) => {
    recordDoubleClick(arg)
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

  const rowSelected = () => {
    if (dataGrid && setDataSelected) {
      const selectedRecords = dataGrid.current?.getSelectedRecords()
      setDataSelected(selectedRecords)
    }
  }

  const rowDeselected = () => {
    if (dataGrid && setDataSelected) {
      const selectedRecords = dataGrid.current?.getSelectedRecords()
      setDataSelected(selectedRecords)
    }
  }

  const rowSelecting = () => {
    if (dataGrid && selectionSettings?.type === 'Single') {
      dataGrid.current?.clearSelection()
    }
  }

  return (
    <Fragment>
      <div className="grid-table-component">
        <GridComponent
          ref={dataGrid}
          id={idTable}
          height={height}
          actionBegin={actionBegin}
          allowPaging={allowPaging}
          rowHeight={rowHeight ? rowHeight : null}
          dataSource={dataTable}
          toolbar={toolbarOptions}
          pageSettings={pageOptions}
          editSettings={editOptions}
          commandClick={commandClick}
          actionComplete={actionComplete}
          // frozenColumns={frozenColumns}
          allowFiltering={false}
          allowSorting={allowSort}
          enableHover={false}
          recordClick={recordClick}
          recordDoubleClick={recordDoubleClick ? recordDoubleClickEvent : undefined}
          selectionSettings={selectionSettings}
          rowSelected={rowSelected}
          rowDeselected={rowDeselected}
          rowSelecting={rowSelecting}
        >
          <Inject services={[Page, Filter, Sort, Edit, CommandColumn, Freeze, ContextMenu, Toolbar]}/>

          <ColumnsDirective>
            {columns.map((col: any, index: number) => (
              <ColumnDirective
                key={index} {...col}
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

export default DefaultTable
