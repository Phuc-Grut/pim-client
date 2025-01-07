import { Dispatch, Fragment, SetStateAction, useContext, useEffect, useState } from 'react'
import { useProduct } from "../hooks"
import { ProductContext } from "../useContext"
import { useWarehouse } from "@src/views/warehouse/hooks"
import { UseFormGetValues, UseFormSetValue, useForm } from 'react-hook-form'
import { IFDataProductInventory } from '@src/domain/models/IProductInventory'
import { BeEditTable, IBeColumnTable, ICellChangeProps, IToolbarItem, IWrapSettings } from 'be-table-template'
import { useTranslation } from 'react-i18next'
import { notificationError } from '@components/notifications'
import { useUnit } from '@src/views/catalog/unit/hooks'
import { useGroupUnit } from '@src/views/catalog/group-unit/hooks'

export interface IFPropsDetail {
  data: IFDataProductInventory[]
  setData: Dispatch<SetStateAction<IFDataProductInventory[]>>,
  setValue: UseFormSetValue<IFDataProductInventory>,
  getValues: UseFormGetValues<IFDataProductInventory>
  setTypeSubModal: Dispatch<SetStateAction<string>> 
  setProductId: Dispatch<SetStateAction<string>> 
}

const TableMultiWarehouse = (props: IFPropsDetail) => {
  const { getPagingProductInventoryApi } = useProduct()
  const { openModal, dataItem, typeModal } = useContext(ProductContext)
  const { getListWarehouseApi } = useWarehouse()
  const { getListUnitApi } = useUnit()
  const {getListGroupUnitApi} = useGroupUnit()
  const [optionWarehouseDef] = useState([])
  const [optionProduct, setOptionProduct] = useState<any[]>([])
  const [listUnit, setListUnit] = useState<any[]>([])
  const [setCommandDataExpense] = useState<any>({})
  const [columnSpec, setColumnSpec] = useState<any[]>([])
  //const [columnSpec, setColumnSpec] = useState<any[]>([])
  const wrapSettings: IWrapSettings = {wrapMode: 'Header'}
  const {
    data,
    setData,
    setValue
  } = props
  const defaultValues: IFDataProductInventory = {
  }
  useContext(ProductContext)
  const {
  } = useForm<any>({
    mode: 'onChange'
  })
  const { t } = useTranslation()
  const loadWarehouse = (a: any, callback: any) => {
    // if (openModal && typeModal === 'Edit') {
    getListWarehouseApi({}).unwrap()
      .then((rs) => {
        setTimeout(() => {
          const nrs = rs.map((a: any) => ({ ...a, productId: dataItem?.id, warehouseId: a.value, code: a.key, name: a.label, id: a.value, stockQuantity: null, reservedQuantity: null, plannedQuantity: null }))
          //setOptionWarehouse(nrs)
          callback(nrs)
        }, 100)
      })
      .catch((ex) => {
        console.log(ex)
      })
    // }
  }
  const loadUnit = () => {
    getListGroupUnitApi({ $status: 1 }).unwrap()
      .then((rs) => {
        const groupId = rs.find((x: { key: any }) => x.key === dataItem.unitType)
        getListUnitApi({ $status: 1, $groupUnitId: groupId.value }).unwrap()
          .then((rs) => {
            setTimeout(() => {
              setListUnit(rs)
            }, 100)
          })
          .catch((ex) => {
            console.log(ex)
          })  
      })
      .catch((ex) => {
        console.log(ex)
      })
  }
  useEffect(() => {
    if (openModal && typeModal === 'Edit') {
      loadUnit()
      getListWarehouseApi({}).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setOptionProduct(rs)
          }, 100)
        })
        .catch((ex) => {
          console.log(ex)
        })   
    }
  }, [openModal])
  const headerColumns: IBeColumnTable[] = [
    {
      field: 'warehouseId',
      headerText: 'warehouseId',
      editType: 'asyncSelect',
      editEnable: true,
      loadOptions: loadWarehouse,
      options: optionProduct,
      callbackAPI: (val: any, index: number) => {
        const item: IFDataProductInventory = data[index]
        if (item) {
          item.warehouseCode = val?.key
          item.warehouseName = val?.label
          item.warehouseId = val?.value
        }
      },
      template: (props: any) => {
        // console.log(`warehouseName${props.rowData}`)
        return <>{props.rowData.warehouseName ? `${props.rowData.warehouseName ?? ''}` : null}</>
      },
      defaultValue: (row: IFDataProductInventory) => {
        // console.log(`warehouseName_222${row}`)
        return row.warehouseName ? { label: `${row.warehouseName}`, value: row.warehouseId } : undefined
      },
      width: 250,
      minWidth: 200,
      maxWidth: 300
    },
    {
      field: 'unitId',
      headerText: 'Unit',
      editType: 'asyncSelect',
      editEnable: true,
      loadOptions: loadUnit,
      options: listUnit,
      callbackAPI: (val: any, index: number) => {
        const item: IFDataProductInventory = data[index]
        if (item) {
          item.unitCode = val?.key
          item.unitName = val?.label
          item.unitId = val?.value
        }
      },
      template: (props: any) => {
        return <>{props.rowData.unitName ? `${props.rowData.unitName ?? ''}` : null}</>
      },
      defaultValue: (row: IFDataProductInventory) => {
        return row.unitName ? { label: `[${row.unitCode}] - ${row.unitName}`, value: row.unitId } : undefined
      },
      width: 250,
      minWidth: 200,
      maxWidth: 300
    },
    {
      field: 'specification',
      headerText: 'Specification code product',
      width: 300,
      headerTextAlign: 'center',
      template: (props: any) => {
        if (props.rowData) {
          return (
            <>
              {props.rowData.specificationCode1 ? `${props.rowData.specificationCode1 ?? ''}` : null}
              {props.rowData.specificationCode2 ? `-${props.rowData.specificationCode2 ?? ''}` : null}
              {props.rowData.specificationCode3 ? `-${props.rowData.specificationCode3 ?? ''}` : null}
              {props.rowData.specificationCode4 ? `-${props.rowData.specificationCode4 ?? ''}` : null}
              {props.rowData.specificationCode5 ? `-${props.rowData.specificationCode5 ?? ''}` : null}
              {props.rowData.specificationCode6 ? `-${props.rowData.specificationCode6 ?? ''}` : null}
              {props.rowData.specificationCode7 ? `-${props.rowData.specificationCode7 ?? ''}` : null}
              {props.rowData.specificationCode8 ? `-${props.rowData.specificationCode8 ?? ''}` : null}
              {props.rowData.specificationCode9 ? `-${props.rowData.specificationCode9 ?? ''}` : null}
              {props.rowData.specificationCode10 ? `-${props.rowData.specificationCode10 ?? ''}` : null}
            </>
          )
        } else {
          return <></>
        }
      },
      editEnable: true,
      editType: 'form',
      placeholder: 'Enter specifications',
      callbackAPI: (val: any, index: number) => {
        const item: IFDataProductInventory = data[index]
        if (item) {
          item.specificationCode1 = val?.specificationCode1
          item.specificationCode2 = val?.specificationCode2
        }
      },
      editFromSettings: {
        fieldKey: 'specificationCode1',
        items: columnSpec,
        formatLabel: (val: any) => {
          return `${val.specificationCode1 === undefined ? '' : val.specificationCode1}${
            val.specificationCode2 === undefined ? '' : `-${val.specificationCode2}`
          }${val.specificationCode3 === undefined ? '' : `-${val.specificationCode3}`}${
            val.specificationCode4 === undefined ? '' : `-${val.specificationCode4}`
          }${val.specificationCode5 === undefined ? '' : val.specificationCode5}${
            val.specificationCode6 === undefined ? '' : `-${val.specificationCode6}`
          }${val.specificationCode7 === undefined ? '' : `-${val.specificationCode7}`}${
            val.specificationCode8 === undefined ? '' : `-${val.specificationCode8}`
          }${val.specificationCode9 === undefined ? '' : `-${val.specificationCode9}`}${
            val.specificationCode10 === undefined ? '' : `-${val.specificationCode10}`
          }`
        },
        formOpen: () => {},
        formClose: () => {}
      }
    },
    {
      field: 'stockQuantity',
      headerText: 'stockQuantity',
      editEnable: true,
      width: 100,
      minWidth: 200,
      maxWidth: 300,
      textAlign: 'right',
      editType: 'numeric',
      type: 'number'
    },
    {
      field: 'reservedQuantity',
      headerText: 'Reserved Quantity',
      editEnable: true,
      width: 100,
      minWidth: 200,
      maxWidth: 300,
      textAlign: 'right',
      editType: 'numeric',
      type: 'number'
    },
    {
      field: 'plannedQuantity',
      headerText: 'Plans quantity',
      editEnable: true,
      width: 100,
      minWidth: 200,
      maxWidth: 300,
      textAlign: 'right',
      editType: 'numeric',
      type: 'number'
    },
    {
      field: 'id',
      visible: false,
      headerText: 'id',
      width: 100,
      minWidth: 200,
      maxWidth: 300,
      textAlign: 'right'
    }
  ]

  useEffect(() => {
    if (openModal) {
      getPagingProductInventoryApi({
        $skip: 0,
        $top: 100,
        $productId: dataItem?.id
      }).unwrap()
        .then((rs) => {
          if (rs?.items) {
            setTimeout(() => {
              setData(rs.items)
            }, 100)
          }
        })
    }
  }, [openModal, optionWarehouseDef])
  const dataSourceChange = (props:any) => {
    setData(props.newData)
  }
  const onCellChange = (props: ICellChangeProps, handleCallback: any) => {
    const {rowData, value, indexRow, field, rowsData} = props
    const item = rowData
    if (field === 'productId') {
      item.productId = value?.id
      item.productName = value?.name
      item.productCode = value?.code
      item.origin = value?.origin
      item.unitType = value?.unitType
      item.unitCode = value?.unitCode
      item.unitName = value?.unitName
      item.isSpec = value?.isSpec
      handleCallback(item, indexRow)
    }
    if (field === "warehouseId") {
      item.warehouseId = value?.value
      item.warehouseCode = value?.key
      item.warehouseName = value?.label
      handleCallback(item, indexRow)
    }
    if (field === "unitId") {
      item.unitId = value?.value
      item.unitCode = value?.key
      item.unitName = value?.label
      handleCallback(item, indexRow)
    }
    console.log(rowsData)
    
    handleCallback(item, indexRow)
  }
  const leftToolbarBottomTemplate = () => {
    return (
      ""
    )
  }
  const { getPagingProductSpecificationCodeApi } = useProduct()
  const toolbarBottomItems: IToolbarItem[] = [
    {id: 'ADD', title: 'Add item'},
    {id: 'INSERT_BEFORE', title: 'Insert item before'},
    {id: 'INSERT_AFTER', title: 'Insert item after'},
    {id: 'DUPLICATE', title: 'Duplicate'},
    {id: 'DELETE', title: 'Xóa hết hàng'},
    {id: 'BONUS', title: 'Bonus', template: leftToolbarBottomTemplate()}
  ]
  const onCellClick = (props: any) => {
    if (props.field === "specification") {
      getPagingProductSpecificationCodeApi({
        $skip: 0,
        $top: 100,
        $productId: dataItem.id
      }).unwrap()
        .then((rs) => {
          setValue('specificationCode1', props.rowData.specificationCode1) 
          setValue('specificationCode2', props.rowData.specificationCode2) 
          setValue('specificationCode3', props.rowData.specificationCode3) 
          setValue('specificationCode4', props.rowData.specificationCode4) 
          setValue('specificationCode5', props.rowData.specificationCode5) 
          setValue('specificationCode6', props.rowData.specificationCode6) 
          setValue('specificationCode7', props.rowData.specificationCode7) 
          setValue('specificationCode8', props.rowData.specificationCode8) 
          setValue('specificationCode9', props.rowData.specificationCode9) 
          setValue('specificationCode10', props.rowData.specificationCode10) 
          setColumnSpec(rs?.items)          
        }).catch(() => notificationError(t('GetFail')))
    }
  }
  const toolbarItems: IToolbarItem[] = [
    {
      id: 'ADD',
      title: 'ADD',
      position: 'Top',
      align: 'left',
      getItemProps: (record: any) => ({
        disabled: record.age === 10, // item configuration not to click
        visible: record.age === 10, // item configuration not to show
        key: record.age
      })},
    {id: 'DELETE', title: 'Delete', position: 'Bottom', align: 'left'},
    ...toolbarBottomItems
  ]
  const onSearch = (val: any) => {
    console.log('val', val)
  }
  return (
    <Fragment>
      <BeEditTable
        key={'tableMultiWarehouse'}
        dataSource={data}
        haveSum={true}
        showBottomToolbar={true}
        dataSourceChange={dataSourceChange}
        defaultValue={defaultValues}
        onCellChange={onCellChange}
        columns={headerColumns}
        allowResizing={true}
        wrapSettings={wrapSettings}
        commandClick={setCommandDataExpense}
        toolbarBottomItems={toolbarBottomItems}
        onCellClick={onCellClick}
        addDisable={false}
        gridLines={'Both'}
        //allowFiltering={true}
        allowTextWrap={false}
        showColumnsChoose={true}
        t={t}
        // format={{
        //   decimalSeparator: configNumber.decimalSeparator,
        //   thousandSeparator: configNumber.thousandSeparator
        // }}
        toolbarSettings={{
          showColumnsChoose:true,
          showBottomToolbar:true,
          showTopToolbar: true,
          toolbarItems,
          onSearch: (val: any) => {
            onSearch(val)
          },

          toolbarClick:(val: any) => {
            console.log(val)
          }
        }}
      />
    </Fragment >
  )
}
export default TableMultiWarehouse
