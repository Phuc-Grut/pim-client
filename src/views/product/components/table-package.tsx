import { Input, Label } from "reactstrap"
import { Fragment, useContext, useEffect, useState } from 'react'
import * as Icon from 'becoxy-icons'
import { useTranslation } from "react-i18next"
import { useProduct } from "../hooks"
import { ProductContext } from "../useContext"
import { isNullOrUndefined } from "@src/utility/hooks/isNullOrUndefined"
import TableUseHookForm from "@src/assets/scss/theme/TableUseHookForm"
import { Controller, useFieldArray } from "react-hook-form"
import { replaceNumberNullOrUndefined } from "@src/utility/hooks/replaceNumberNullOrUndefined"
import { generateUUID } from "@src/utility/Utils"

const TablePackage = (props: any) => {
  const { control } = props
  const { t } = useTranslation()
  const { getPagingProductPackageApi } = useProduct()
  const { openModal, dataItem, typeModal } = useContext(ProductContext)

  const [dataSelected, setDataSelected] = useState<any>({})
  const { fields: fieldsWH, append: appendWH, remove: removeWH } = useFieldArray({
    control,
    name: "listPackage"
  })

  useEffect(() => {
    if (openModal && typeModal === 'Edit' && dataItem?.id) {
      getPagingProductPackageApi({
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
                  name: a.name,
                  productid: a.productId,
                  length: a.length,
                  height: a.height,
                  weight: a.weight,
                  width: a.width,
                  createdby: a.createdBy,
                  createddate: a.createdDate,
                  createdbyname: a.createdByName
                })
              })
            }, 100)
          }
        })
    }
  }, [openModal])

  return (
    <Fragment>
      <div className='table-custom' style={{ border: 'none' }}>
        <TableUseHookForm>
          <table className='table table-custom'>
            <thead className='table__row-header'>
              <tr>
                <td style={{ width: '18%' }} ><Label>{t('Number of packages')}</Label></td>
                <td style={{ width: '18%' }} ><Label>{'W (g)'}</Label></td>
                <td style={{ width: '18%' }} ><Label>{'W (mm)'}</Label></td>
                <td style={{ width: '18%' }} ><Label>{'L (mm)'}</Label></td>
                <td style={{ width: '18%' }} ><Label>{'H (mm)'}</Label></td>
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
                    <td style={{ width: '18%' }}>
                      {<div>
                        <Controller
                          name={`listPackage.${index}.name`}
                          control={control}
                          render={({ field: { value, onChange } }) => {
                            return (<Input
                              name={`listPackage.${index}.name`}
                              value={!isNullOrUndefined(value) ? value : undefined}
                              onChange={(val: any) => {
                                onChange(val.target.value)
                              }}
                              placeholder={t("")}
                              {...field}
                              style={{ width: '100%' }}
                            />)
                          }}
                        />
                      </div>}
                    </td>
                    <td style={{ width: '18%' }}>
                      <Controller
                        name={`listPackage.${index}.weight`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Input
                            name={`listPackage.${index}.weight`}
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
                    <td style={{ width: '18%' }}>
                      <Controller
                        name={`listPackage.${index}.width`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Input
                            name={`listPackage.${index}.width`}
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
                    <td style={{ width: '18%' }}>
                      <Controller
                        name={`listPackage.${index}.length`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Input
                            name={`listPackage.${index}.length`}
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
                    <td style={{ width: '18%' }}>
                      <Controller
                        name={`listPackage.${index}.height`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Input
                            name={`listPackage.${index}.height`}
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
                                name: undefined,
                                productid: dataItem.id,
                                length: undefined,
                                height: undefined,
                                weight: undefined,
                                width: undefined
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
                    name: undefined,
                    productid: dataItem.id,
                    length: undefined,
                    height: undefined,
                    weight: undefined,
                    width: undefined
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
export default TablePackage