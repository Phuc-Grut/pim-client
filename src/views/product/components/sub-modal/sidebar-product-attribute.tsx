// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import { X } from 'becoxy-icons'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { Button, Form, Label, Row, Col, Input } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { generateUUID, isObjEmpty } from '@src/utility/Utils'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { SelectBox } from '@components/select'
import { useProduct } from '../../hooks'
import { ProductContext } from '../../useContext'
import { notificationError, notificationSuccess } from '@components/notifications'
import classNames from 'classnames'
import { TextInput } from '@components/input'
import { useProductAttribute } from '@src/views/attribute/product-attribute/hooks'
import { IFDataProductAttributeMapping } from '@src/domain/models/IProductAttributeMapping'
import { connectString } from '@src/utility/hooks/connectString'
import * as Icon from 'becoxy-icons'
import TableUseHookForm from '@src/assets/scss/theme/TableUseHookForm'
import { isNullOrUndefined } from '@src/utility/hooks/isNullOrUndefined'
import { replaceNumberNullOrUndefined } from '@src/utility/hooks/replaceNumberNullOrUndefined'
import Select from "react-select"

const SidebarProdAttr = (props: any) => {
  const { t } = useTranslation()
  const { getListProductAttributeApi, getByIdApi } = useProductAttribute()
  const { addProductAttributeMappingApi, editProductAttributeMappingApi } = useProduct()
  const { dataItem, typeSidebar, setDataSidebar, setTypeSidebar, tabIndex, windowSize, dataTable } = useContext(ProductContext)
  const { dataModal, openModal, handleModal } = props
  const [optionProductAttribute, setOptionProductAttribute] = useState<any[]>([])
  const [dataSelected, setDataSelected] = useState<any>({})
  const [option, setOption] = useState([])
  const [optionDef, setOptionDef] = useState([])
  // ** States
  const formSchema = yup.object().shape({
    productAttributeId: yup.string().required(connectString(['', 'isRequired']))
  })


  const defaultValues: IFDataProductAttributeMapping = {
    id: "",
    productId: '',
    productAttributeId: '',
    textPrompt: '',
    customData: '',
    isRequired: false,
    displayOrder: 0,
    listDetail: []
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    reset,
    getValues,
    formState: { errors }
  } = useForm<IFDataProductAttributeMapping>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })

  const { fields: fieldsD, append: appendD, remove: removeD } = useFieldArray({
    control,
    name: "listDetail"
  })

  useEffect(() => {
    if (openModal.prodAttr === false) {
      reset()
    } else {
      reset()
      if (dataModal.prodAttr && !isObjEmpty(dataModal.prodAttr)) {
        Object.entries(dataModal.prodAttr).forEach(
          ([name, value]: any) => {
            if (name.includes("Date") || name.includes("date")) {
              setValue(name, value ? new Date(value) : undefined)
            } else {
              setValue(name, value)
            }
          }
        )
        getDataOption(dataModal.prodAttr?.productAttributeId)
        dataModal.prodAttr.options?.map((a: any) => appendD({
          rowid: a.id,
          fieldid: a.id,
          name: a.name,
          code: a.code,
          alias: a.alias,
          priceadjustment: a.priceAdjustment,
          weightadjustment: a.weightAdjustment,
          color: a.color
        }))
      }
    }
  }, [openModal.prodAttr, tabIndex, dataModal.prodAttr])

  useEffect(() => {
    if (tabIndex === '3' && openModal.prodAttr === true) {
      getListProductAttributeApi({ $status: 1 }).unwrap()
        .then((rs) => {
          const newrs = rs.map((a:any) => {
            if (dataTable.prodAtt?.filter((b:any) => b.productAttributeId === a.value).length === 0) {
              return a
            }
          })
          setTimeout(() => {
            setOptionProductAttribute(newrs.filter((a:any) => a !== undefined))
          }, 100)
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
  }, [openModal.prodAttr, tabIndex, dataModal.prodAttr, dataTable.prodAtt])

  const getDataOption = (id: string) => {
    getByIdApi(id).unwrap()
      .then((rs) => {
        if (rs?.options) {
          const newrs = rs.options.map((a: any) => ({ ...a, value: a.id, label: a.name }))
          setTimeout(() => {
            setOption(newrs)
            setOptionDef(newrs)
          }, 10)
        }

      })
      .catch((ex) => {
        console.log(ex)
      })

  }
  // ** Function to reset fileds
  const handleCancel = () => {
    clearErrors()
    reset()
    setDataSidebar((old: any) => ({ ...old, prodAttr: {} }))
    handleModal('prodAttr')
  }

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (typeSidebar.serviceAdd?.value === 'Add') {
      return (
        <Fragment>
          <Button color="primary" type="submit" onClick={handleSubmit(onSubmit)} className="mb-75 me-1">
            {t('Save')}
          </Button>
          <Button color="secondary" onClick={handleCancel} outline className="mb-75 me-1">
            {t('Close')}
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button color="primary" type="submit" onClick={handleSubmit(onSubmit)} className="mb-75 me-1">
            {t('Save')}
          </Button>
          <Button color="secondary" onClick={handleCancel} outline className="mb-75 me-1">
            {t('Close')}
          </Button>
        </Fragment>
      )
    }
  }

  const onSubmit = (data: any) => {
    const obj = data
    obj.productId = dataItem?.id
    obj.listDetail = data.listDetail?.map((a: any) => ({ ...a, id: a.fieldid, productVariantAttributeId: dataModal.prodAttr?.id }))
    if (typeSidebar.prodAttr?.value === 'Add') {
      addProductAttributeMappingApi(data).unwrap()
        .then((rs) => {
          if (rs.errors.length === 0) {
            clearErrors()
            reset()
            notificationSuccess(t('Add Successful'))
          } else {
            notificationError(t('Add Failed'))
          }
        })
        .catch((ex) => console.log(ex))
    } else {
      editProductAttributeMappingApi(data).unwrap()
        .then((rs) => {
          if (rs.errors.length === 0) {
            clearErrors()
            reset()
            setDataSidebar((old: any) => ({ ...old, prodAttr: {} }))
            setTypeSidebar((old: any) => ({ ...old, prodAttr: { value: 'Add' } }))
            notificationSuccess(t("Update Successful"))
          } else {
            notificationError(t('Update Failed'))
          }
        })
        .catch((ex) => console.log(ex))
    }
  }

  const render = () => {
    if (typeSidebar.prodAttr?.value === 'Add' || typeSidebar.prodAttr?.value === 'Edit') {
      return <div
        className={classNames('customizer customizer-700  po-cus po-sidebar d-none d-md-block', {
          open: openModal.prodAttr
        })}
      >
        <Form id='form-prodAttr' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
          <Scrollbars autoHide
            autoHeight
            autoHeightMax={windowSize.innerHeight - 0}>
            <div className='customizer-header p-50 position-relative bb-1 d-flex align-items-center'>
              <span className='cursor-poiter' ><X onClick={() => handleModal('prodAttr')} /></span>
              {typeSidebar.prodAttr.value === 'Add' && <h5 className='mb-0 ms-50'>{t('Add')} - </h5>}
              {typeSidebar.prodAttr.value === 'Edit' && <h5 className='mb-0 ms-50'>{t('edit')} - </h5>}
              <h5 className='mb-0 ms-50'>{t('Product attribute')}</h5>
            </div>
            <div className='modal-body flex-grow-1 pb-sm-0 pb-3'>
              <Row className="m-0 gy-50 mb-2 me-1">
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="productAttributeId"
                    label={t("Product attribute")}
                    placeholder=''
                    required={true}
                    inLine={false}
                    errors={errors.attributeControlTypeId}
                    options={optionProductAttribute}
                    callback={(val?: any) => {
                      if (val?.value) {
                        setValue('listDetail', [])
                        getDataOption(val?.value)
                      }
                    }}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <div className='d-flex'>
                    <div className='form-check me-1'>
                      <Controller
                        name="isRequired"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            value={1}
                            id='isRequired'
                            type='checkbox'
                          />
                        )}
                      />
                      <Label className='form-label' for='isRequired'>
                        {t('Required')}
                      </Label>
                    </div>
                  </div>
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="textPrompt"
                    type="textarea"
                    row={1}
                    inLine={false}
                    label={t("Promt")}
                    labelSize='form-group'
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="customData"
                    type="textarea"
                    row={1}
                    inLine={false}
                    label={t("Custom data")}
                    labelSize='form-group'
                  />
                </Col>
                <Col md={12} xs={12}>
                  <Label>{t('Option')}</Label>
                  <div className='table-custom' style={{ border: 'none' }}>
                    <TableUseHookForm>
                      <table className='table table-custom'>
                        <thead className='table__row-header'>
                          <tr>
                            <td style={{ width: '25%' }} ><Label>{t('Name')}</Label></td>
                            <td style={{ width: '20%' }} ><Label>{t('Color')}</Label></td>
                            <td style={{ width: '20%' }} ><Label>{t('PriceAdjustment')}</Label></td>
                            <td style={{ width: '20%' }} ><Label>{t('WeightAdjustmentVT')}</Label></td>
                            <td style={{ width: '15%' }} ><Label></Label></td>
                          </tr>
                        </thead>
                        {fieldsD?.length > 0 && <tbody className='table__row-body' style={{ maxHeight: '221px' }}>
                          {fieldsD?.map((field: any, index: number) => {
                            return (
                              <tr tabIndex={index} key={field.id}
                                style={{ backgroundColor: field?.rowid === dataSelected?.rowid ? '#e0e0e0' : 'unset' }}
                                onClick={() => {
                                  setDataSelected(field)
                                }}
                              >
                                <td style={{ width: '25%' }}>
                                  <Controller
                                    name={`listDetail.${index}.code`}
                                    control={control}
                                    render={({ field: { value, onChange } }) => {
                                      return (<Select
                                        {...field}
                                        value={(!isNullOrUndefined(value) && value !== '') ? optionDef?.find((val: any) => val.value === value) : ''}
                                        onChange={(val: any) => {
                                          if (val?.value !== value) {
                                            setValue(`listDetail.${index}.alias`, val.alias)
                                            setValue(`listDetail.${index}.color`, val.color)
                                            setValue(`listDetail.${index}.priceadjustment`, val.priceAdjustment)
                                            setValue(`listDetail.${index}.weightadjustment`, val.weightAdjustment)
                                            setValue(`listDetail.${index}.name`, val.name)
                                            onChange((!isNullOrUndefined(val) ? val.value : undefined))
                                          } else {
                                            onChange(value)
                                          }
                                          setTimeout(() => {
                                            const wh = getValues('listDetail')
                                            const used = wh?.map((a: any) => a.code).toString()
                                            setOption(optionDef?.filter((a: any) => !used?.includes(a.value)))
                                          }, 100)

                                        }}
                                        onFocus={() => {
                                          const wh = getValues('listDetail')
                                          const used = wh?.map((a: any) => a.code).toString()
                                          setOption(optionDef?.filter((a: any) => !used?.includes(a.value)))
                                        }}
                                        classNamePrefix="select"
                                        className={`react-select ${errors.listDetail?.[index]?.code && 'is-invalid'}`}
                                        options={option}
                                        isClearable={false}
                                        menuPosition="fixed"
                                        placeholder={errors.listDetail?.[index]?.code ? t('Required choose warehouse') : ''}
                                      />)
                                    }}
                                  />
                                </td>
                                <td style={{ width: '20%' }}>
                                  <Controller
                                    name={`listDetail.${index}.color`}
                                    control={control}
                                    render={({ field: { value } }) => (
                                      <div>
                                        <span>{value}</span>
                                        {value && <span
                                          className='b-50 d-inline-block ms-1'
                                          style={{
                                            borderRadius: '3px',
                                            width: '20px',
                                            height: '20px',
                                            backgroundColor: value ?? '#000'
                                          }} >
                                        </span>}
                                      </div>
                                    )}
                                  />
                                </td>
                                <td style={{ width: '20%' }}>
                                  <Controller
                                    name={`listDetail.${index}.priceadjustment`}
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                      <Input
                                        name={`listDetail.${index}.priceadjustment`}
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
                                    name={`listDetail.${index}.weightadjustment`}
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                      <Input
                                        name={`listDetail.${index}.weightadjustment`}
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
                                <td style={{ width: '15%' }} >
                                  <div style={{ width: "50px", cursor: "pointer" }} className='d-flex align-items-center'>
                                    <Icon.Trash2 fontSize={20} color='red' className='me-50' onClick={() => {
                                      removeD(index)
                                    }} />
                                    {
                                      replaceNumberNullOrUndefined(index) + 1 === fieldsD?.length &&
                                      <Icon.PlusCircle fontSize={20} color="blue"
                                        onClick={() => {
                                          const obj = {
                                            rowid: generateUUID(),
                                            fieldid: undefined,
                                            name: undefined,
                                            code: undefined,
                                            alias: undefined,
                                            color: undefined,
                                            weightadjustment: undefined,
                                            priceadjustment: undefined
                                          }
                                          appendD(obj)
                                          setDataSelected(obj)
                                        }} />
                                    }
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>}
                        {fieldsD?.length === 0 && <tbody><tr>
                          <td colSpan={6}><div style={{ cursor: "pointer" }} className='d-flex align-items-center'>
                            <Icon.PlusCircle fontSize={20} color="blue" onClick={() => {
                              appendD({
                                rowid: generateUUID(),
                                fieldid: undefined,
                                name: undefined,
                                code: undefined,
                                alias: undefined,
                                color: undefined,
                                weightadjustment: undefined,
                                priceadjustment: undefined
                              })
                            }} />
                          </div></td>
                        </tr></tbody>}
                      </table>
                    </TableUseHookForm>
                  </div>
                </Col>
              </Row>
            </div>
          </Scrollbars>
          <div
            className="d-flex p-1"
            style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}
          >
            {renderFooterButtons()}
          </div>
        </Form>
      </div>
    } else {
      return <></>
    }
  }

  return render()
}

export default SidebarProdAttr
