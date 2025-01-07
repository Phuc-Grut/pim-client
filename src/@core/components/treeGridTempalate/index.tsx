import themeConfig from "@src/configs/themeConfig"
import { operator } from "@src/domain/constants/constantOperator"
import { ITable } from "@src/domain/models/ITableGrid"
import { DatePicker, DateRangePicker } from "@syncfusion/ej2-react-calendars"
import { CheckBoxSelection, DropDownList, DropDownTree, MultiSelect } from "@syncfusion/ej2-react-dropdowns"
import { Pager, PagerComponent, PagerDropDown } from "@syncfusion/ej2-react-grids"
import { ColumnDirective, ColumnsDirective, Inject, PageSettingsModel, TreeGridComponent} from "@syncfusion/ej2-react-treegrid"
import moment from "moment"
import { memo, useEffect, useRef, useState } from "react"
import {DataManager} from "@syncfusion/ej2-data"
import { useTranslation } from "react-i18next"
import {MaskedTextBox, TextBox} from "@syncfusion/ej2-inputs"
import { isObjEmpty } from "@src/utility/Utils"
import {createElement, L10n, loadCldr, setCulture, setCurrencyCode} from '@syncfusion/ej2-base'
Pager.Inject(PagerDropDown)
MultiSelect.Inject(CheckBoxSelection)
interface IlistContext {
  list: string[],
  status?: boolean,
  type?: string
}

interface IFCurrentPage {
  currentPage: number
}
interface IFPageSize {
  pageSize: number
  name: string
}
interface IFCurrentPageConfig {
  currentPage: number
  newProp: IFCurrentPage
  oldProp: IFCurrentPage
  cancel: boolean
  name: string
}

const TreGridTableTemplate = memo((props: ITable) => {
  const dataGrid: any = useRef()
  const { t } = useTranslation()
  const [rangeMin, setRangeMin] = useState<any>({})
  const [rangeMax, setRangeMax] = useState<any>({})
  const toolbarOption: any = ['ColumnChooser', {text: 'Search', align: 'Left' }]
  const filterOptions: any = { type: "Menu"}

  const lag = window.localStorage.getItem('i18nextLng')
  const lang = lag ? lag : 'vi'
  const { 
    dataTable, 
    //pageSettings, 
    contextMenuItems,
    dataInjectServices,
    childMapping,
    columns,
    //setContextMenuClick,
    allowFilter,
    listContextShow,
    listContextHide,
    // contextMenuOpen,
    editOptions,
    handleClick,
    setPageSize,
    setCurrentPage,
    pageSize,
    totalItem,
    showPagination,
    listDate,
    queryFilter,
    setQueryFilter,
    setSearchTerm,
    searchTerm,
    dataSourceFilter,
    showToolbar
  } = props

  loadCldr(
    // require('cldr-data/supplemental/weekdata.json') // To load the culture based first day of week
  )
  L10n.load(require(`@public/assets/data/locales/${lang}.json`)) // load corresponding culture text
  useEffect(() => {
    loadCldr(
      require(`@src/assets/cldr-data/main/${lang}/ca-gregorian.json`),
      require(`@src/assets/cldr-data/main/${lang}/numbers.json`),
      require(`@src/assets/cldr-data/main/${lang}/timeZoneNames.json`),
      require("@src/assets/supplemental/numberingSystems.json")
      // require(`cldr-data/main/${lang}/currencies.json`),
    )
    // L10n.load(require(`@src/assets/data/locales/${lang}.json`)) // load corresponding culture text
    dataGrid.locale = lang ? lang : 'vi' // need to change the locale dynamically for grid
    // L10n.load(require('@syncfusion/ej2-locale/src/vi.json')) // load corresponding culture text
    setCulture(lang) // Change the Grid culture
    setCurrencyCode('VND')// Change the currency code
  }, [lang])
  
 
  useEffect(() => {
    if (dataGrid) {
      if (listContextShow?.type === 'SHOW') {
        dataGrid.grid.contextMenuModule.contextMenu.showItems(listContextShow.list, true)
      }
      if (listContextHide?.type === 'HIDE') {
        dataGrid.grid.contextMenuModule.contextMenu.hideItems(listContextHide.list, true)
      }
    }
    
  }, [listContextShow, listContextHide])


  const actionBegin = (args: any) => { 
    if (args.requestType === "filterbeforeopen" && listDate.includes(args.currentFilteringColumn)) {
      const grid = dataGrid.current

      const indexOfObject = args.columns.findIndex((object: any) => {
        return (object.field ===  args.currentFilteringColumn) && (object.operator ===  'lessthanorequal')
      })
      if (indexOfObject === 1) {
        args.columns.splice(indexOfObject, 1)
        args.columns.push({
          actualFilterValue: {},
          actualOperator: {},
          field: args.currentFilteringColumn,
          ignoreAccent: false,
          isForeignKey: false,
          matchCase: false,
          operator: "lessthanorequal",
          predicate: "and",
          uid: grid.getColumnByField(args.currentFilteringColumn).uid,
          // value: window[`${args.currentFilteringColumn}EndDate` as any]
          value: window[`${args.currentFilteringColumn}EndDate` as any]
        })
      } else {
        args.columns.push({
          actualFilterValue: {},
          actualOperator: {},
          field: args.currentFilteringColumn,
          ignoreAccent: false,
          isForeignKey: false,
          matchCase: false,
          operator: "lessthanorequal",
          predicate: "and",
          uid: grid.getColumnByField(args.currentFilteringColumn).uid,
          value: window[`${args.currentFilteringColumn}EndDate` as any]
        })
      }

    }
    if (args.requestType === "filterbeforeopen" && args.action === 'filter') {
      // args.cancel = true
      const colQuery = args.columns.map((item: any) => (
        {
          key: item.field,
          value: item.value,
          ope: operator[item.operator]
        }
      ))
      setQueryFilter(colQuery)
    }
    
    if (args.requestType === "filterbeforeopen" && args.action === 'clearFilter') {
      // args.cancel = false
      const rs = queryFilter.filter((object: any) => {
        return object.key !== args.currentFilterColumn.field
      })

      if (args.currentFilterColumn.field === rangeMin.key) {
        setRangeMin({})
        setRangeMax({})
      }

      setQueryFilter([...rs, rangeMin, rangeMax])

    }
    if (args.requestType === "searching") {
      // args.cancel = true
      setSearchTerm(args.searchString)
    }

    if (args.requestType === "refresh" && searchTerm !== '') {
      // args.cancel = true
    }

    if (args.requestType === "beginEdit") {
      args.cancel = true
    }
  }
  const customFilter = (props: any) => {

    let dropInstance: any
    let dropTreeInstance: any
    let inputMin: any
    let inputMax: any
    let DateRangInstance: any
    let DateInstance: any
    let TimeInstance: any
    let checkBoxInstance: any
    let NumberInstance: any

    const dropListFilter: any = {
      ui: {
        create: (args: any) => {
          const flValInput: any = createElement('input', { className: 'flm-input' })
          args.target.appendChild(flValInput)

          const dataSource = dataSourceFilter?.find((a: any) => a.key === args.column.field)

          dropInstance = new DropDownList({
            dataSource: new DataManager(dataSource.data),
            fields: { text: 'label', value: 'value' },
            placeholder: t('Select'),
            popupHeight: '200px'
          })
          dropInstance.appendTo(flValInput)
        },
        read: (args: any) => {
          args.fltrObj.filterByColumn(args.column.field, 'equal', dropInstance.value)
        },
        write: (args: any) => {
          dropInstance.value = args.filteredValue
        },
        destroy: () => {
          if (dropInstance) {
            dropInstance.destroy()
          }
        }
      }
    }

    const dropTreeFilter: any = {
      ui: {
        create: (args: any) => {
          const flValInput: any = createElement('input', { className: 'flm-input' })
          args.target.appendChild(flValInput)

          const dataSource = dataSourceFilter?.find((a: any) => a.key === args.column.field)

          dropTreeInstance = new DropDownTree({
            fields: { dataSource: dataSource.data, value: 'value', text: 'label', child: 'children' },
            placeholder: t('Select'),
            popupHeight: '300px',
            showClearButton: false,
            select(e) {
              window[`${args.column.field}Text` as any] = e.itemData.text
            }
          })
          dropTreeInstance.appendTo(flValInput)
        },
        destroy: () => {
          if (dropTreeInstance) {
            dropTreeInstance.destroy()
          }
        },
        read: (args: any) => {
          args.fltrObj.filterByColumn(args.column.field, 'equal', dropTreeInstance.value[0])
        },
        write: (args: any) => {
          if (args.filteredValue) {
            dropTreeInstance.value = args.filteredValue
            dropTreeInstance.text = window[`${args.column.field}Text` as any]
          } else {
            dropTreeInstance.text = ''
          }
        }
      }
    }

    const CheckboxFilter: any = {
      ui: {
        create: (args: any) => {
          const flValInput: any = createElement('input', { className: 'flm-input' })
          args.target.appendChild(flValInput)
          const dataSource = dataSourceFilter?.find((a: any) => a.key === args.column.field)

          console.log(dataGrid.current.filterSettings.columns)
          checkBoxInstance = new MultiSelect({
            dataSource: new DataManager(dataSource.data),
            fields: { text: 'label', value: 'value' },
            placeholder: t('Select'),
            popupHeight: '200px',
            allowFiltering: true,
            mode: 'CheckBox',
            change(e) {
              console.log(e)
              // window[`${args.column.field}StartDate` as any] = e.value[0]
            }
          })
          checkBoxInstance.appendTo(flValInput)
        },
        read: (args: any) => {
          dataGrid.current.removeFilteredColsByField(args.column.field)
          if (checkBoxInstance) {
            args.fltrObj.filterByColumn(args.column.field, 'contains', checkBoxInstance.value)
          }
        },
        write: (args: any) => {
          const filteredValue: any[] = []
          dataGrid.current.filterSettings.columns?.map((item: any) => {
            if (item.field === args.column.field && item.value) {
              filteredValue.push(item.value)
            }
          })
          if (filteredValue.length > 0) {
            checkBoxInstance.value = filteredValue
          }
          // checkBoxInstance.value = args.filteredValue
        },
        destroy: () => {
          if (checkBoxInstance) {
            checkBoxInstance.destroy()
          }
        }
      }
    }

    const NumberFilter: any = {
      operator: 'equal',
      ui: {
        create: (args: any) => {
          const flValInput = createElement('input', { className: 'flm-input' })
          args.target.appendChild(flValInput)

          NumberInstance = new TextBox({
            placeholder: t('EnterValue')
          })
          NumberInstance.appendTo(flValInput)
        },
        destroy: () => {
          if (NumberInstance) {
            NumberInstance.destroy()
          }
        },
        read: (args: any) => {
          args.fltrObj.filterByColumn(args.column.field, args.operator, parseInt(NumberInstance.value))
        },
        write: (args: any) => {
          if (args.filteredValue) {
            NumberInstance.value = parseInt(args.filteredValue)
          } else {
            NumberInstance.value = ''
          }
        }
      }
    }

    const DateFilter: any = {
      ui: {
        create: (args: any) => {
          const flValInput = createElement('input', { className: 'flm-input' })
          args.target.appendChild(flValInput)

          DateInstance = new DatePicker({
            format: themeConfig.system.dateFormat
          })
          DateInstance.appendTo(flValInput)
        },
        destroy: () => {
          if (DateInstance) {
            DateInstance.destroy()
          }
        },
        read: (args: any) => {
          args.fltrObj.filterByColumn(args.column.field, args.operator, DateInstance.value)
        },
        write: (args: any) => {
          if (args.filteredValue) {
            DateInstance.value = args.filteredValue
          } else {
            DateInstance.value = ''
          }
        }
      }
    }

    const TimeFilter: any = {
      ui: {
        _create: (args: any) => {
          const flValInput = createElement('input', { className: 'flm-input' })
          args.target.appendChild(flValInput)

          TimeInstance = new MaskedTextBox({
            mask: '00:00'
          })
          TimeInstance.appendTo(flValInput)
        },
        get create() {
          return this._create
        },
        set create(value) {
          this._create = value
        },
        destroy: () => {
          if (TimeInstance) {
            TimeInstance.destroy()
          }
        },
        read: (args: any) => {
          args.fltrObj.filterByColumn(args.column.field, args.operator, TimeInstance.preEleVal)
        },
        write: (args: any) => {
          if (args.filteredValue) {
            TimeInstance.value = args.filteredValue
          } else {
            TimeInstance.value = ''
          }
        }
      }
    }

    const DateRangeFilter: any = {
      ui: {
        create: (args: any) => {
          window[`${args.column.field}` as any] = args.column.field
          const flValInput = createElement("input", { className: "flm-input" })
          args.target.appendChild(flValInput)
          const fdate: any = []
          dataGrid.current.filterSettings.columns.forEach((col: any) => {
            // if (col.field === 'startDate) {
            if (col.field === args.column.field) {
              fdate.push(col.value)
            }
          })
          DateRangInstance = new DateRangePicker({
            locale: 'vi',
            format: themeConfig.system.dateFormat,
            change(e: any) {
              if (e !== undefined && e !== null && e.value) {
                const grid = dataGrid.current
                window[`${args.column.field}StartDate` as any] = e.value[0]
                // @ts-ignore
                window[`${args.column.field}EndDate` as any] = moment(e.value[1]).format('YYYY-MM-DDTHH:mm:ss').toString()
                grid.filterByColumn(args.column.field, "greaterthanorequal", moment(e.value[0]).format('YYYY-MM-DDTHH:mm:ss').toString())
              }
            }
          })
          if (fdate.length > 0) {
            DateRangInstance.startDate = fdate[0]
            DateRangInstance.endDate = fdate[1]
          }
          DateRangInstance.appendTo(flValInput)
        },
        read: (args: any) => {
          args.fltrObj.filterByColumn(args.column.field, 'greaterthanorequal', moment(DateRangInstance.startDate).format('YYYY-MM-DDTHH:mm:ss').toString()
          )
        },

        write: () => {}
      }
    }

    const RangeFilter: any = {
      ui: {
        create: (args: any) => {
          const InputMin = createElement('input', { className: 'flm-input' })
          const InputMax = createElement('input', { className: 'flm-input' })
          args.target.appendChild(InputMin)
          args.target.appendChild(InputMax)

          const fNumber: any = []
          dataGrid.current.filterSettings.columns.forEach((col: any) => {
            if (col.field === "premiumSalary") {
              fNumber.push(col.value)
            }
          })

          inputMin = new TextBox({
            placeholder: t('GreaterThanOrEqual'),
            change(e) {
              if (e !== undefined && e.value) {
                window["valueMin" as any] = e.value
                setRangeMin({
                  key : args.column.field,
                  value: e.value,
                  ope: operator['greaterthanorequal']
                })

              }
              if (e && e.value === '') {
                // @ts-ignore
                window["valueMin" as any] = undefined
                setRangeMin({
                  key : args.column.field,
                  value: e.value,
                  ope: operator['greaterthanorequal']
                })
              }
            }
          })
          inputMax = new TextBox({
            placeholder: t('LessThanOrEqual'),
            change(e) {
              if (e && e.value) {
                window["valueMax" as any] = e.value
                setRangeMax({
                  key : args.column.field,
                  value: e.value,
                  ope: operator['lessthanorequal']
                })
              }
              if (e && e.value === '') {
                // @ts-ignore
                window["valueMax" as any] = undefined
                setRangeMax({
                  key : args.column.field,
                  value: e.value,
                  ope: operator['lessthanorequal']
                })
              }
            }

          })

          if (fNumber.length > 0) {
            inputMin.value = fNumber[0]
            inputMax.value = fNumber[1]
          }
          inputMin.appendTo(InputMin)
          inputMax.appendTo(InputMax)
        },
        destroy: () => {
          if (inputMin) {
            inputMin.destroy()
          }

          if (inputMax) {
            inputMin.destroy()
          }
        },
        read: (args: any) => {

          if (isObjEmpty(rangeMin) || window["valueMin" as any] === undefined) {
            args.fltrObj.filterByColumn(args.column.field, 'lessthanorequal',  window["valueMax" as any], 'and')
            return
          }

          if (isObjEmpty(rangeMax) || window["valueMax" as any] === undefined) {

            args.fltrObj.filterByColumn(args.column.field, 'greaterthanorequal',  window["valueMin" as any], 'and')
            return
          }

          if (rangeMin.value ===  window["valueMin" as any] && !isObjEmpty(rangeMax)) {
            args.fltrObj.filterByColumn(args.column.field, 'lessthanorequal',  window["valueMax" as any], 'and')
          }

          // args.fltrObj.filterByColumn(args.column.field, 'greaterthanorequal',  window["valueMin" as any], 'and')

        },
        write: () => {
          inputMin.value = window["valueMin" as any] ? window["valueMin" as any] : ''
          inputMax.value = window["valueMax" as any] ? window["valueMax" as any] : ''
        }
      }
    }

    const defaultFilter: any = {
      operator: 'contains',
      ui: {
        create: (args: any) => {
          const flValInput = createElement('input', { className: 'flm-input' })
          args.target.appendChild(flValInput)

          dropInstance = new TextBox({
            placeholder: t('Select')
          })
          dropInstance.appendTo(flValInput)
        },
        destroy: () => {
          if (dropInstance) {
            dropInstance.destroy()
          }
        },
        read: (args: any) => {
          args.fltrObj.filterByColumn(args.column.field, args.operator, dropInstance.value)
        },
        write: (args: any) => {
          if (args.filteredValue) {
            dropInstance.value = args.filteredValue
          } else {
            dropInstance.value = ''
          }
        }
      }
    }

    if (props.typeFilter === 'Dropdown') {
      return dropListFilter
    } else if (props.typeFilter === 'Number') {
      return NumberFilter
    } else if (props.typeFilter === 'DropTree') {
      return dropTreeFilter
    } else if (props.typeFilter === 'Date') {
      return DateFilter
    } else if (props.typeFilter === 'Time') {
      return TimeFilter
    } else if (props.typeFilter === 'DateRange') {
      return DateRangeFilter
    } else if (props.typeFilter === 'Checkbox') {
      return CheckboxFilter
    } else if (props.typeFilter === 'Range') {
      return RangeFilter
    } else {
      return defaultFilter
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

  const pageOptions: PageSettingsModel = {
    currentPage: 1,
    pageSize,
    pageSizes: true
  }
  

  return (
    <>
      <TreeGridComponent
        locale='vi-VI'
        dataSource={dataTable}
        treeColumnIndex={0}
        toolbar={showToolbar ? toolbarOption : undefined }
        childMapping={childMapping}
        pageSettings={pageOptions}
        contextMenuItems={contextMenuItems ? contextMenuItems?.map((x: any) => ({...x, text: t(x.text)})) : undefined}
        contextMenuClick={(e: any) => handleClick(e)}
        // contextMenuOpen={contextMenuOpen}
        ref={dataGrid}
        editSettings={editOptions}
        selectionSettings={{ type: 'Single' }}
        actionBegin={actionBegin}
        showColumnChooser={showToolbar}
        allowFiltering={allowFilter}
        filterSettings={filterOptions}
      >
        <ColumnsDirective>
          {columns.map((col: any, index: number) => (
            <ColumnDirective 
              key={index} 
              {...col} 
              headerText={t(col.headerText)}
              filter={customFilter(col)}
            />
          ))}
        </ColumnsDirective>
        <Inject services={dataInjectServices} />
      </TreeGridComponent><div>
        <PagerComponent
          locale='vi-VI'
          click={onChangePage}
          pageSize={pageSize}
          pageSizes={[20, 30, 50, 100]}
          totalRecordsCount={totalItem ? totalItem : undefined}
          pageCount={5}
          dropDownChanged={onChangePageSize} />
      </div></>
  )
})

export default TreGridTableTemplate
