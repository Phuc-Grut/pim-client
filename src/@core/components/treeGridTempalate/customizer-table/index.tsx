import * as React from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import {Check, X} from 'becoxy-icons'
import { Scrollbars } from 'react-custom-scrollbars'
// ** Reactstrap Imports
import {Input, Label} from 'reactstrap'
// ** Styles

import {selectThemeColors} from '@utils/Utils'
import initialAbility from '@src/configs/acl/initialAbility'
// console.log(initialAbility.can('READ', 'Dashboard'))
const listToolbarOptions: any = [
  {value: 'Add', label: 'Add', align: 'Left', order: 1},
  {value: 'Edit', label: 'Edit', align: 'Left', order: 2},
  {value: 'Delete', label: 'Delete', align: 'Left', order: 3},
  {value: 'Update', label: 'Update', align: 'Left', order: 4},
  {value: 'Cancel', label: 'Cancel', align: 'Left', order: 5},
  {value: 'Search', label: 'Search', align: 'Right', order: 6},
  {value: 'Print', label: 'Print', align: 'Left', order: 7},
  {value: 'ExcelExport', label: 'ExcelExport', align: 'Left', order: 8},
  {value: 'PdfExport', label: 'PdfExport', align: 'Left', order: 9},
  {value: 'WordExport', label: 'WordExport', align: 'Left', order: 10},
  {value: 'ColumnChooser', label: 'Columns',  align: 'Right', order: 11}
]
const listToolbarItem: any = []

listToolbarOptions.map((item: any) => {
  if (initialAbility.can(item.value.toUpperCase(), 'Dashboard')) {
    listToolbarItem.push(item)
  }
})

const positionOptions = [
  { value: 'Left', label: 'Left' },
  { value: 'Right', label: 'Right' },
  { value: 'Center', label: 'Center' }
]
const CustomLabel = ({ htmlFor }: any) => {
  return (
    <Label className='form-check-label' htmlFor={htmlFor}>
      <span className='switch-icon-left'>
        <Check fontSize={14} />
      </span>
      <span className='switch-icon-right'>
        <X fontSize={14} />
      </span>
    </Label>
  )
}
interface ITableCustomizer {
  // resource: string,
  idTable: string,
  openCustomizer?: boolean,
  handleOpenCustomize?: any,
  listItemToolbar: any[],
  setListItemToolbar?: any,
  pagination?: string,
  setPagination?: any,
  sorting?: boolean,
  setSorting?: any,
  filtering?: boolean,
  setFiltering?: any,
  // autoFitCol,
  // setAutoFitCol,
  // allowResizing,
  // setAllowResizing,
  columns: any[],
  setPositionCol?: any,
  setSelectedCol?: any,
  positionCol?: any,
  selectedCol?: any
}
const CustomizerTableTemplate = (props: ITableCustomizer) => {
  // ** Props
  const {
    idTable,
    openCustomizer,
    handleOpenCustomize,
    listItemToolbar,
    setListItemToolbar,
    pagination,
    setPagination,
    sorting,
    setSorting,
    filtering,
    setFiltering,
    // autoFitCol,
    // setAutoFitCol,
    // allowResizing,
    // setAllowResizing,
    columns,
    setPositionCol,
    setSelectedCol,
    positionCol,
    selectedCol
    // reOderColumn,
    // setReOderColumn
  } = props

  // ** State

  const renderPaginationRadio = () => {
    const skinsArr = [
      {
        name: 'show',
        label: 'Show',
        checked: pagination === 'show'
      },
      {
        name: 'hide',
        label: 'Hide',
        checked: pagination === 'hide'
      }
    ]

    return skinsArr.map((radio, index) => {
      const marginCondition = index !== skinsArr.length - 1
      return (
        <div key={index} className={classnames('form-check', { 'mb-2 me-1': marginCondition })}>
          <Input type='radio' id={radio.name} checked={radio.checked} onChange={() => setPagination(radio.name)} />
          <Label className='form-check-label' for={radio.name}>
            {radio.label}
          </Label>
        </div>
      )
    })
  }

  // ** Toggles Customizer
  const handleToggle = (e: any) => {
    e.preventDefault()
    handleOpenCustomize()
  }

  const onChangeToolbarItem = (item: any) => {
    setListItemToolbar(item !== null ? [...item] : [])
    const prevToolbar: object[] = []
    item.map((val: any) => {
      prevToolbar.push({text: val.value, align: val.align, order: val.order})
      return item
    })
    prevToolbar.sort((a: any, b: any) => ((a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)))
    window.localStorage.setItem(`toolbar${idTable}`, JSON.stringify(prevToolbar))
  }

  const onChangeSorting = (val: any) => {
    setSorting(val.target.checked)
  }

  const onChangeFiltering = (val: any) => {
    setFiltering(val.target.checked)
  }

  // const onChangeAutoFitColumns = (val: any) => {
  //   setAutoFitCol(val.target.checked)
  // }
  //
  // const onChangeResizing = (val: any) => {
  //   setAllowResizing(val.target.checked)
  // }
  //
  const onChangeSelectedCol = (val: any) => {
    setSelectedCol(val)
  }

  const onChangePosition = (val: any) => {
    setPositionCol(val)
  }

  // const onChangeReOderCol = (val: any) => {
  //   setReOderColumn(val.target.checked)
  // }

  return (
    <div
      className={classnames('customizer d-none d-md-block', {
        open: openCustomizer
      })}
    >
      {/*<a href='/' className='customizer-toggle d-flex align-items-center justify-content-center' onClick={handleToggle}>*/}
      {/*  <Settings fontSize={14} className='spinner' />*/}
      {/*</a>*/}
      <Scrollbars autoHide className='customizer-content'>
        <div className='customizer-header px-2 pt-1 pb-0 position-relative'>
          <h4 className='mb-0'>Table Customizer</h4>
          <p className='m-0'>Customize & Preview in Real Time</p>
          <a href='/' className='customizer-close' onClick={handleToggle}>
            <X />
          </a>
        </div>

        <hr />
        <div className='modal-body flex-grow-1 pb-sm-0 pb-3'>
          <div className='mb-1'>
            <p className='fw-bold'>Toolbar Option</p>
            <Select
              isMulti
              id='toolbar-item'
              theme={selectThemeColors}
              // className='react-select-2'
              classNamePrefix='select'
              isClearable={false}
              options={listToolbarItem}
              value={listItemToolbar}
              onChange={onChangeToolbarItem}
            />
          </div>

          <div className='bb-1'>
            <p className='fw-bold'>Pagination Option</p>
            <div className='d-flex'>{renderPaginationRadio()}</div>
          </div>

          <div className='mb-1'>
            <p className='fw-bold'>Sorting & Filtering</p>
            <div className='d-flex'>
              <div className='d-flex flex-column me-3'>
                <Label for='sorting' className='form-check-label mb-50'>
                  Sorting
                </Label>
                <div className='form-switch form-check-primary'>
                  <Input type='switch' checked={sorting} onChange={onChangeSorting} id='sorting' name='sorting' />
                  <CustomLabel htmlFor='sorting' />
                </div>
              </div>
              <div className='d-flex flex-column'>
                <Label for='filtering' className='form-check-label mb-50'>
                  Filtering
                </Label>
                <div className='form-switch form-check-primary'>
                  <Input type='switch' checked={filtering} onChange={onChangeFiltering} id='filtering' name='filtering' />
                  <CustomLabel htmlFor='filtering' />
                </div>
              </div>
            </div>

          </div>

          {/*<div className='mb-1'>*/}
          {/*  <p className='fw-bold'>Autofit Columns</p>*/}
          {/*  <div className='d-flex'>*/}
          {/*    <div className='d-flex flex-column me-3'>*/}
          {/*      <Label for='autofit' className='form-check-label mb-50'>*/}
          {/*        Autofit*/}
          {/*      </Label>*/}
          {/*      <div className='form-switch form-check-primary'>*/}
          {/*        <Input type='switch' checked={autoFitCol} onChange={onChangeAutoFitColumns} id='autoFit' name='autoFit' />*/}
          {/*        <CustomLabel htmlFor='autoFit' />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className='d-flex flex-column me-3'>*/}
          {/*      <Label for='autofit' className='form-check-label mb-50'>*/}
          {/*        Allow Resizing*/}
          {/*      </Label>*/}
          {/*      <div className='form-switch form-check-primary'>*/}
          {/*        <Input type='switch' checked={allowResizing} onChange={onChangeResizing} id='resizing' name='resizing' />*/}
          {/*        <CustomLabel htmlFor='resizing' />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}

          {/*</div>*/}

          <div className='mb-1'>
            <p className='fw-bold'>Frozen Columns</p>
            <div className='d-flex'>
              <div className='d-flex flex-column w-50 me-1'>
                <Label for='autofit' className='form-check-label mb-50'>
                  Column
                </Label>
                <div className=''>
                  <Select
                    id='column-item'
                    theme={selectThemeColors}
                    classNamePrefix='select'
                    isClearable={false}
                    options={columns}
                    value={selectedCol}
                    onChange={onChangeSelectedCol}
                  />
                </div>
              </div>
              <div className='d-flex flex-column w-50'>
                <Label for='column-position' className='form-check-label mb-50'>
                  Freeze Direction
                </Label>
                <div className=''>
                  <Select
                    id='column-position'
                    theme={selectThemeColors}
                    classNamePrefix='select'
                    isClearable={false}
                    options={positionOptions}
                    value={positionCol}
                    onChange={onChangePosition}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*<div className='mb-1'>*/}
          {/*  <p className='fw-bold'>Reodering Columns</p>*/}
          {/*  <div className='d-flex'>*/}
          {/*    <div className='d-flex flex-column me-3'>*/}
          {/*      <Label for='autofit' className='form-check-label mb-50'>*/}
          {/*        Reodering*/}
          {/*      </Label>*/}
          {/*      <div className='form-switch form-check-primary'>*/}
          {/*        <Input type='switch' checked={reOderColumn} onChange={onChangeReOderCol} id='reOder' name='reOder' />*/}
          {/*        <CustomLabel htmlFor='reOder' />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}

          {/*</div>*/}

        </div>
      </Scrollbars>
    </div>
  )
}

export default CustomizerTableTemplate
