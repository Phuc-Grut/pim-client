import { Fragment, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ModalBody, Button, Form, Row, Col, Label } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { ProductContext } from './useContext'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { IFModelProduct, IFProductVariant } from '@src/domain/models/IProduct'
import { CheckboxInput, NumberInput, RadioInput, TextInput } from '@components/input'
import { SelectBox } from '@components/select'
import ModalHeader from '@components/modal-header'
import { useProduct } from './hooks'
import { statusDefault } from '@src/domain/constants/constantSelect'
import { useDeliveryTime } from '../catalog/delivery-time/hooks'
import { useUnit } from '../catalog/unit/hooks'
import { useGroupUnit } from '../catalog/group-unit/hooks'
import { isNullOrUndefined } from '@src/utility/hooks/isNullOrUndefined'
import { connectString } from '@src/utility/hooks/connectString'
import TableUseHookForm from '@src/assets/scss/theme/TableUseHookForm'
import { isObjEmpty } from '@src/utility/Utils'
import TableMultiWarehouseVariant from './variant/table-multi-warehouse'
import TablePackageVariant from './variant/table-package'
import TableImageVariant from './variant/table-image'
import { notificationError, notificationSuccess } from '@components/notifications'

const ModalVariant = () => {
  const { openModalVariant, handleModalVariant, dataItem, dataSidebar, typeModal, windowSize, optionCurrency, selectedImageVariant, setSelectedImageVariant, typeSidebar } = useContext(ProductContext)
  const { t } = useTranslation()
  const optionStatus = statusDefault.map((a: any) => ({ ...a, label: t(a.label) }))
  const manageInventoryMethod = [
    {
      value: 0,
      label: t("Don't track inventory")
    },
    {
      value: 1,
      label: t("Track inventory")
    }
  ]
  const { getListDeliveryTimeApi } = useDeliveryTime()
  const { getPagingProductAttributeMappingApi, addVariantApi } = useProduct()
  const { getListUnitApi } = useUnit()
  const { getListGroupUnitApi } = useGroupUnit()

  const [listAttr, setListAttr] = useState<any[]>([])
  const [optionDelieveryTime, setOptionDelieveryTime] = useState([])
  const [optionUnit, setOptionUnit] = useState([])
  const [optionGroupUnit, setOptionGroupUnit] = useState([])

  const ListInventorySchema = {
    warehouseid: yup.string()
      .required(connectString(['requestChoose', 'Warehouse>']))
  }
  const formSchema = yup.object().shape({
    name: yup.string()
      .required(t("Product name") + t(" is required"))
      .min(2, (t("Name") + t(" must greater than 2 characters")))
      .max(400, (t("Name") + t(" must less than 400 characters"))),
    listInventory: yup.array().of(yup.object().shape(ListInventorySchema))
  })

  const defaultValues: IFModelProduct = {
    listInventory: []
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    setValue,
    setError,
    getValues,
    formState: { errors }
  } = useForm<IFModelProduct>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })

  // ** Function to run when sidebar opens
  const handleFormDuplicateOpened = () => {
    if (typeSidebar.variant?.value === 'Add') {
      if (!isObjEmpty(dataItem)) {
        setValue("name", dataItem?.name)
        setValue("status", dataItem?.status)
        setValue("price", dataItem?.price)
        setValue("currency", dataItem?.currency)
        setValue("deliveryTimeId", dataItem?.deliveryTimeId)
        setValue("unitType", dataItem?.unitType)
        setValue("unitId", dataItem?.unitId)
        setValue("unitCode", dataItem?.unitCode)
        setValue("manageInventoryMethodId", dataItem?.manageInventoryMethodId)
        setValue("multiPacking", dataItem?.multiPacking)
      }
    }
    if (typeSidebar.variant?.value === 'Edit') {
      if (!isObjEmpty(dataSidebar.variant)) {
        Object.entries(dataSidebar.variant).forEach(
          ([name, value]: any) => {
            if (name.includes("Date") || name.includes("date")) {
              setValue(name, value ? new Date(value) : undefined)
            } else {
              setValue(name, value)
            }
          }
        )
      }
    }
  }
  useEffect(() => {
    if (openModalVariant === true) {
      if (dataItem?.id) {
        getPagingProductAttributeMappingApi({
          $skip: 0,
          $top: 100,
          $productId: dataItem?.id
        }).unwrap()
          .then((rs) => {
            if (rs?.items) {
              setTimeout(() => {
                setListAttr(rs?.items.map((a: any) => ({ ...a, label: a.name })))
                const att = !isNullOrUndefined(dataSidebar.variant?.attributesJson) ? JSON.parse(dataSidebar.variant?.attributesJson) : []
                if (typeSidebar.variant?.value === 'Edit' && att) {
                  rs?.items?.map((a: any) => {
                    if (!isObjEmpty(a)) {
                      const it = att?.find((b: any) => b[a?.alias])
                      if (it) {
                        setValue(a?.alias, it[a?.alias])
                      }
                    }
                  })
                }
              }, 100)
            }
          })
      }
      if (optionDelieveryTime?.length === 0) {
        getListDeliveryTimeApi().unwrap()
          .then((rs) => {
            setTimeout(() => {
              setOptionDelieveryTime(rs)
            }, 10)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
      if (optionGroupUnit?.length === 0) {
        getListGroupUnitApi({ $status: 1 }).unwrap()
          .then((rs) => {
            setTimeout(() => {
              setOptionGroupUnit(rs?.map((a: any) => ({ ...a, value: a.key, key: a.value })))
            }, 10)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
      if (optionUnit?.length === 0) {
        getListUnitApi({ $status: 1 }).unwrap()
          .then((rs) => {
            setTimeout(() => {
              setOptionUnit(rs)
            }, 10)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
    }
  }, [openModalVariant, dataSidebar.variant])

  // ** Function to run when sidebar closes
  const handleFormDuplicateClosed = () => {
    setSelectedImageVariant([])
    clearErrors()
    reset()
  }

  // ** Function to reset fileds
  const handleCancel = () => {
    handleFormDuplicateClosed()
    handleModalVariant()
  }
  //** Renders Footer Buttons
  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color="primary" className="mb-75 me-1"  >
          <div>{typeSidebar.variant?.value === 'Add' ? t('Add') : t('edit')}</div>
        </Button>
        <Button color="secondary" onClick={handleCancel} outline className="mb-75 me-1">
          {t('Close')}
        </Button>
      </Fragment>
    )
  }
  const renderError = (rs: any) => {
    for (let i = 0; i < rs?.errors.length; i++) {
      const string = rs?.errors[i].errorMessage?.split(' ').reduce((accumulator: string, currentValue: any) => `${accumulator} ${t(currentValue)}`, '')
      notificationError(t(rs?.errors[i].errorMessage))
      setError(
        rs?.errors[i].propertyName.toLowerCase(),
        { type: 'custom', message: string }
      )
    }
  }
  const onSubmit = (data: any) => {
    const obj: IFProductVariant = {
      ...data,
      parentId: dataItem?.id,
      packages: data.listPackage?.length,
      attributesJson: JSON.stringify(listAttr?.map((a: any) => ({ [a.alias]: data?.[a.alias] }))),
      listInventory: data?.listInventory?.map((a: any, i: number) => ({
        id: a.fieldid,
        warehouseid: a.warehouseid,
        stockquantity: a.stockquantity,
        reservedquantity: a.reservedquantity,
        plannedquantity: a.plannedquantity,
        displayOrder: i
      })),
      listPackage: data?.listPackage?.map((a: any, i: number) => ({
        id: a.fieldid,
        name: a.name,
        height: a.height,
        weight: a.weight,
        width: a.width,
        length: a.length,
        displayOrder: i
      })),
      listMedia: selectedImageVariant?.map((a: any, i: number) => ({
        id: a?.fieldid,
        name: a.name,
        path: a.path,
        mediaType: a.mediaType,
        displayOrder: i
      }))
    }
    addVariantApi(obj).unwrap()
      .then((rs: any) => {
        if (rs.isValid === true) {
          handleModalVariant()
          if (obj.id) {
            notificationSuccess(t('Edit Successful'))
          } else {
            notificationSuccess(t('Add Successful'))
          }
        } else {
          renderError(rs)
        }
      })
  }

  return (
    <Modal
      isOpen={openModalVariant}
      toggle={handleModalVariant}
      className='modal-dialog-centered modal-xl'
      contentClassName='p-0'
      onOpened={handleFormDuplicateOpened}
      onClosed={handleFormDuplicateClosed}
    >
      <Form id='form-modal-globalzone'
        className='todo-modal'
        onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModalVariant} typeModal={typeSidebar.variant?.value} title='VariantProduct' />
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <ModalBody>
            <div className='box form-box__border mb-3'>
              <h5 className="m-0 form-box__border--title">{t('Product information')}</h5>
              <Row className="m-0 gy-1 mb-2 me-1">
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='name'
                    label={t('Product name')}
                    required={true}
                    labelSize='label-medium'
                    placeholder=''
                    errors={errors.name} />
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <SelectBox
                    control={control}
                    name="status"
                    label={t("Status")}
                    labelSize='label-medium'
                    disabled={typeModal === 'Detail'}
                    errors={errors.status}
                    required={true}
                    placeholder={t("Select")}
                    options={optionStatus}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <div className=' align label-medium form-row-inline d-flex'>
                    <Label >{t('Attribute')}</Label>
                    <div style={{ flexGrow: 1 }}>
                      {listAttr?.map((a: any, i: number) => (<div key={i} className='mb-50'>
                        <RadioInput
                          control={control}
                          name={a?.alias}
                          label={a?.name}
                          inLine={false}
                          labelSize='label-medium'
                          radioOptions={a?.options?.map((b: any) => ({ ...b, value: b.alias, key: b.value }))}
                          buttonInline={true}
                          disabled={typeSidebar.variant?.value === 'Edit'}
                        />
                      </div>))}
                    </div>
                  </div>
                </Col>
                <Col md={12} xs={12}>
                  <div className=' align label-medium form-row-inline d-flex'>
                    <Label >{t('Image')}</Label>
                    <div style={{ flexGrow: 1 }}>
                      <TableImageVariant />
                    </div>
                  </div>
                </Col>
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='sku'
                    label={t('SKU')}
                    labelSize='label-medium'
                    placeholder='' />
                </Col>
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='manufacturerNumber'
                    label={t('Manufacturer code')}
                    labelSize='label-medium'
                    placeholder='' />
                </Col>
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='gtin'
                    label={t('Gtin')}
                    labelSize='label-medium'
                    placeholder='' />
                </Col>
                <Col md={6} xs={12}>
                  <Row>
                    <div className='d-flex'>
                      <Col md={8} xs={8}>
                        <NumberInput
                          control={control}
                          name='price'
                          label={t('Sales cost')}
                          required={true}
                          placeholder=''
                          labelSize='label-medium'
                          errors={errors.price}
                        />
                      </Col>
                      <Col md={4} xs={4}>
                        <SelectBox
                          control={control}
                          name="currency"
                          labelSize='label-small'
                          label={t("")}
                          isLabel={false}
                          disabled={true}
                          required={true}
                          placeholder={t("Currency")}
                          options={optionCurrency}
                        />
                      </Col>
                    </div>
                  </Row>
                </Col>
                <Col md={6} xs={12}>
                  <div className='d-flex'>
                    {<Col md={7} xs={12}>
                      <SelectBox
                        control={control}
                        name="unitType"
                        labelSize='label-medium'
                        label={t("Unit")}
                        required={true}
                        disabled={typeModal !== 'Add'}
                        placeholder={t("Group unit")}
                        options={optionGroupUnit}
                      />
                    </Col>}
                    <Col md={5} xs={12}>
                      <SelectBox
                        control={control}
                        name="unitId"
                        labelSize='label-medium'
                        label={t("")}
                        isLabel={false}
                        errors={errors.unitId}
                        disabled={typeModal === 'Detail'}
                        placeholder={t("Unit")}
                        options={optionUnit}
                      />
                    </Col>
                  </div>
                </Col>
              </Row>
            </div>
            {<div className='box form-box__border mb-3'>
              <h5 className="m-0 form-box__border--title">{t('Inventory and shipping')}</h5>
              <Row className='gy-1 mb-1'>
                <Col md={6} xs={12}>
                  <SelectBox
                    control={control}
                    name="manageInventoryMethodId"
                    labelSize='label-medium'
                    label={t("Managing method")}
                    disabled={typeModal === 'Detail'}
                    errors={null}
                    placeholder={t("")}
                    options={manageInventoryMethod}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <div className='label-medium d-flex form-row-inline'>
                    <Label className="form-label" for='isMultiWarehouse'>{t('Stock information')}</Label>
                    <div style={{ width: 'calc(100% - 150px)' }}>
                      <TableMultiWarehouseVariant control={control} errors={errors} getValues={getValues} />
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className='gy-30 mb-1'>
                <Col md={12} xs={12}>
                  <CheckboxInput
                    control={control}
                    name='multiPacking'
                    label={t('MultiPacking')}
                    labelSize='label-medium'
                  />
                </Col>
                {watch('multiPacking') === true && <Col md={12} xs={12}>
                  <div className='label-medium d-flex form-row-inline'>
                    <Label className="form-label" for='isMultiWarehouse'>{t('Number of packages')}</Label>
                    <div style={{ width: 'calc(100% - 150px)' }}>
                      {isNullOrUndefined(watch('listPackage')) ? 0 : getValues('listPackage')?.length} {t('Package')}
                    </div>
                  </div>
                </Col>}
                {watch('multiPacking') === true ? <Col md={12} xs={12}>
                  <div className='label-medium d-flex form-row-inline'>
                    <Label className="form-label" for='isMultiWarehouse'>{t('')}</Label>
                    <div style={{ width: 'calc(100% - 150px)' }}>
                      <TablePackageVariant control={control} errors={errors} />
                    </div>
                  </div>
                </Col> : <Col md={12} xs={12}>
                  <div className='label-medium d-flex form-row-inline'>
                    <Label className="form-label" for='MultiPacking'></Label>
                    <div style={{ width: 'calc(100% - 150px)' }}>
                      <div className='table-custom' style={{ border: 'none' }}>
                        <TableUseHookForm>
                          <table className='table table-custom'>
                            <thead className='table__row-header'>
                              <tr>
                                <td style={{ width: '25%' }} ><Label>{'W (g)'}</Label></td>
                                <td style={{ width: '25%' }} ><Label>{'W (mm)'}</Label></td>
                                <td style={{ width: '25%' }} ><Label>{'L (mm)'}</Label></td>
                                <td style={{ width: '25%' }} ><Label>{'H (mm)'}</Label></td>
                              </tr>
                            </thead>
                            <tbody className='table__row-body' style={{ maxHeight: '221px' }}>
                              <tr>
                                <td style={{ width: '25%' }}>
                                  <NumberInput
                                    control={control}
                                    name='weight'
                                    label={t('')}
                                    isLabel={false}
                                    placeholder=''
                                    labelSize='label-medium'
                                  />
                                </td>
                                <td style={{ width: '25%' }}>
                                  <NumberInput
                                    control={control}
                                    name='width'
                                    label={t('')}
                                    isLabel={false}
                                    placeholder=''
                                    labelSize='label-medium'
                                  />
                                </td>
                                <td style={{ width: '25%' }}>
                                  <NumberInput
                                    control={control}
                                    name='length'
                                    label={t('')}
                                    isLabel={false}
                                    placeholder=''
                                    labelSize='label-medium'
                                  />
                                </td>
                                <td style={{ width: '25%' }}>
                                  <NumberInput
                                    control={control}
                                    name='height'
                                    label={t('')}
                                    isLabel={false}
                                    placeholder=''
                                    labelSize='label-medium'
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </TableUseHookForm>
                      </div>
                    </div>
                  </div>
                </Col>}
              </Row>
              <Row className='gy-1 mb-1'>
                <Col md={6} xs={12}>
                  <SelectBox
                    control={control}
                    name="deliveryTimeId"
                    labelSize='label-medium'
                    label={t("Delivery time")}
                    disabled={typeModal === 'Detail'}
                    errors={null}
                    placeholder={t("")}
                    options={optionDelieveryTime}
                  />
                </Col>
              </Row>
            </div>}
          </ModalBody>
        </Scrollbars>
        <div
          className="d-flex justify-content-end p-1"
          style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}
        >
          {renderFooterButtons()}
        </div>
      </Form >
    </Modal >
  )
}
export default ModalVariant