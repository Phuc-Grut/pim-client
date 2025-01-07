import { Input, Label } from "reactstrap"
import { Fragment, useContext, useEffect, useState } from 'react'
import * as Icon from 'becoxy-icons'
import { useTranslation } from "react-i18next"
import { useProduct } from "../hooks"
import { ProductContext } from "../useContext"
import { isNullOrUndefined } from "@src/utility/hooks/isNullOrUndefined"
import { useWarehouse } from "@src/views/warehouse/hooks"
import TableUseHookForm from "@src/assets/scss/theme/TableUseHookForm"
import { Controller, useFieldArray } from "react-hook-form"
import Select from "react-select"
import { replaceNumberNullOrUndefined } from "@src/utility/hooks/replaceNumberNullOrUndefined"
import { generateUUID } from "@src/utility/Utils"

const TableMultiWarehouseVariant = (props: any) => {
  const { control, errors, getValues } = props
  const { t } = useTranslation()
  const { getPagingProductInventoryApi } = useProduct()
  const { openModalVariant, dataItem, typeSidebar, dataSidebar } = useContext(ProductContext)
  const { getListWarehouseApi } = useWarehouse()
  const [dataSelected, setDataSelected] = useState<any>({})
  const [optionWarehouse, setOptionWarehouse] = useState([])
  const [optionWarehouseDef, setOptionWarehouseDef] = useState([])
  const { fields: fieldsWH, append: appendWH, remove: removeWH } = useFieldArray({
    control,
    name: "listInventory"
  })

  useEffect(() => {
    if (openModalVariant) {
      getListWarehouseApi({}).unwrap()
        .then((rs) => {
          setTimeout(() => {
            const nrs = rs.map((a: any) => ({ ...a, productId: dataItem?.id, warehouseId: a.value, code: a.key, name: a.label, id: a.value, stockQuantity: null, reservedQuantity: null, plannedQuantity: null }))
            setOptionWarehouse(nrs)
            setOptionWarehouseDef(nrs)
          }, 10)
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
    if (openModalVariant && typeSidebar.variant?.value === 'Add' && dataItem?.id) {
      getPagingProductInventoryApi({
        $skip: 0,
        $top: 100,
        $productId: dataItem?.id
      }).unwrap()
        .then((rs) => {
          if (rs?.items) {
            setTimeout(() => {
              rs?.items.map((a: any) => {
                appendWH({
                  fieldid: a.id,
                  rowid: a.id,
                  warehouseid: a.warehouseId,
                  productid: a.productId,
                  stockquantity: a.stockQuantity,
                  reservedquantity: a.reservedQuantity,
                  plannedquantity: a.plannedQuantity,
                  createdby: a.createdBy,
                  createddate: a.createdDate,
                  createdbyname: a.createdByName
                })
              })
            }, 100)
          }
        })
    }
    if (openModalVariant && typeSidebar.variant?.value === 'Edit' && dataSidebar.variant?.id) {
      getPagingProductInventoryApi({
        $skip: 0,
        $top: 100,
        $productId: dataSidebar.variant?.id
      }).unwrap()
        .then((rs) => {
          if (rs?.items) {
            setTimeout(() => {
              rs?.items.map((a: any) => {
                appendWH({
                  fieldid: a.id,
                  rowid: a.id,
                  warehouseid: a.warehouseId,
                  productid: a.productId,
                  stockquantity: a.stockQuantity,
                  reservedquantity: a.reservedQuantity,
                  plannedquantity: a.plannedQuantity,
                  createdby: a.createdBy,
                  createddate: a.createdDate,
                  createdbyname: a.createdByName
                })
              })
            }, 100)
          }
        })
    }
  }, [openModalVariant])

  return (
    <Fragment>
      <div className='table-custom' style={{ border: 'none' }}>
        <TableUseHookForm>
          <table className='table table-custom'>
            <thead className='table__row-header'>
              <tr>
                <td style={{ width: '30%' }} ><Label>{t('Warehouse')}</Label></td>
                <td style={{ width: '20%' }} ><Label>{t('stockQuantity')}</Label></td>
                <td style={{ width: '20%' }} ><Label>{t('Reserved Quantity')}</Label></td>
                <td style={{ width: '20%' }} ><Label>{t('Plans quantity')}</Label></td>
                <td style={{ width: '10%' }} ><Label></Label></td>
              </tr>
            </thead>
            {fieldsWH?.length > 0 && <tbody className='table__row-body' style={{ maxHeight: '221px' }}>
              {fieldsWH?.map((field: any, index: number) => {
                return (
                  <tr tabIndex={index} key={field.id}
                    style={{ backgroundColor: field?.rowid === dataSelected?.rowid ? '#e0e0e0' : 'unset' }}
                    onClick={() => {
                      setDataSelected(field)
                    }}
                  >
                    <td style={{ width: '30%' }}>
                      {<div>
                        <Controller
                          name={`listInventory.${index}.warehouseid`}
                          control={control}
                          render={({ field: { value, onChange } }) => {
                            return (<Select
                              {...field}
                              value={(!isNullOrUndefined(value) && value !== '') ? optionWarehouseDef.find((val: any) => val.value === value) : ''}
                              onChange={(val: any) => {
                                if (val?.value !== value) {
                                  onChange((!isNullOrUndefined(val) ? val.value : undefined))
                                } else {
                                  onChange(value)
                                }
                                setTimeout(() => {
                                  const wh = getValues('listInventory')
                                  const used = wh.map((a: any) => a.warehouseid).toString()
                                  setOptionWarehouse(optionWarehouseDef.filter((a: any) => !used.includes(a.value)))
                                }, 100)

                              }}
                              onFocus={() => {
                                const wh = getValues('listInventory')
                                const used = wh.map((a: any) => a.warehouseid).toString()
                                setOptionWarehouse(optionWarehouseDef.filter((a: any) => !used.includes(a.value)))
                              }}
                              classNamePrefix="select"
                              className={`react-select ${errors.listInventory?.[index]?.warehouseid && 'is-invalid'}`}
                              options={optionWarehouse}
                              isClearable={false}
                              menuPosition="fixed"
                              placeholder={errors.listInventory?.[index]?.warehouseid ? t('Required choose warehouse') : ''}
                            />)
                          }}
                        />
                      </div>}
                    </td>
                    <td style={{ width: '20%' }}>
                      <Controller
                        name={`listInventory.${index}.stockquantity`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Input
                            name={`listInventory.${index}.stockquantity`}
                            type='number'
                            value={!isNullOrUndefined(value) ? value : undefined}
                            onChange={(val: any) => {
                              onChange(val.target.value)
                            }}
                            placeholder={t("")}
                            {...field}
                            style={{ width: '100%' }}
                          />
                        )}
                      />
                    </td>
                    <td style={{ width: '20%' }}>
                      <Controller
                        name={`listInventory.${index}.reservedquantity`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Input
                            name={`listInventory.${index}.reservedquantity`}
                            type='number'
                            value={!isNullOrUndefined(value) ? value : undefined}
                            onChange={(val: any) => {
                              onChange(val.target.value)
                            }}
                            placeholder={t("")}
                            {...field}
                            style={{ width: '100%' }}
                          />
                        )}
                      />
                    </td>
                    <td style={{ width: '20%' }}>
                      <Controller
                        name={`listInventory.${index}.plannedquantity`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Input
                            name={`listInventory.${index}.plannedquantity`}
                            type='number'
                            value={!isNullOrUndefined(value) ? value : undefined}
                            onChange={(val: any) => {
                              onChange(val.target.value)
                            }}
                            placeholder={t("")}
                            {...field}
                            style={{ width: '100%' }}
                          />
                        )}
                      />
                    </td>
                    <td style={{ width: '10%' }} >
                      <div style={{ width: "50px", cursor: "pointer" }} className='d-flex align-items-center'>
                        <Icon.Trash2 fontSize={20} color='red' className='me-1' onClick={() => {
                          removeWH(index)
                        }} />
                        {
                          replaceNumberNullOrUndefined(index) + 1 === fieldsWH?.length &&
                          <Icon.PlusCircle fontSize={20} color="blue"
                            onClick={() => {
                              const obj = {
                                rowid: generateUUID(),
                                fieldid: undefined,
                                productid: dataItem.id,
                                warehouseid: undefined,
                                stockquantity: 0,
                                reservedquantity: 0,
                                plannedquantity: 0
                              }
                              appendWH(obj)
                              setDataSelected(obj)
                            }} />
                        }
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>}
            {fieldsWH?.length === 0 && <tbody><tr>
              <td colSpan={6}><div style={{ cursor: "pointer" }} className='d-flex align-items-center'>
                <Icon.PlusCircle fontSize={20} color="blue" onClick={() => {
                  appendWH({
                    rowid: generateUUID(),
                    fieldid: undefined,
                    productid: dataItem.id,
                    warehouseid: undefined,
                    stockquantity: 0,
                    reservedquantity: 0,
                    plannedquantity: 0
                  })
                }} />
              </div></td>
            </tr></tbody>}
          </table>
        </TableUseHookForm>
      </div>

    </Fragment >
  )
}
export default TableMultiWarehouseVariant