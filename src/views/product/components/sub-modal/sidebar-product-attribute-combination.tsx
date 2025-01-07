// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import { X } from 'becoxy-icons'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Label, Row, Col, Input } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useProduct } from '../../hooks'
import { ProductContext } from '../../useContext'
import { notificationError, notificationSuccess } from '@components/notifications'
import classNames from 'classnames'
import AvatarComponent from '@components/avatar-component'
import { removeEmpty } from '@src/utility/hooks/objectRemoveEmptyData'
import { IContextMenu } from '@src/domain/models/IContextMenu'
import { ContextMenuItems } from '@src/domain/constants/constantContextMenu'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { IFDataProductVariantAttributeCombination } from '@src/domain/models/IProductVariantAttributeCombination'
import { useUnit } from '@src/views/catalog/unit/hooks'
import {SelectBox} from "@components/select"
import {NumberInput, TextInput} from "@components/input"
const MySwal = withReactContent(Swal)

const SidebarProdAttrCombination = (props: any) => {
  const { t } = useTranslation()
  const { getListUnitApi } = useUnit()
  const {
    addProductVariantAttributeValueApi,
    editProductVariantAttributeValueApi,
    deleteProductVariantAttributeValueApi,
    getPagingProductAttributeMappingApi
  } = useProduct()
  const { typeSidebar, setDataSidebar, setTypeSidebar, tabIndex, dataSidebar, dataItem, windowSize } = useContext(ProductContext)
  const { openModal, handleModal, widthSide } = props

  const [dataAttr, setDataAtt] = useState<any[]>([])
  const [optionUnit, setOptionUnit] = useState([])
  const [commandData, setCommandData] = useState<any>({})
  // ** States

  const canContextMenuItems: IContextMenu[] = []
  const listContextMenuPermission = [
    { id: 'EDIT' },
    { id: 'DELETE' }
  ]

  listContextMenuPermission.map((item: any) => {
    const rs: any = ContextMenuItems.find((menu: any) => menu.id === item.id)
    if (rs) {
      canContextMenuItems.push(rs)
    }
  })

  const formSchema = yup.object().shape({
  })

  const defaultValues: IFDataProductVariantAttributeCombination = {
    id: '',
    name: '',
    productId: '',
    sku: '',
    gtin: '',
    manufacturerPartNumber: '',
    price: 0,
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    isActive: 1,
    basePriceAmount: 0,
    basePriceBaseAmount: 0,
    assignedMediaFileIds: '',
    deliveryTimeId: '',
    quantityUnitId: '',
    attributesXml: '',
    stockQuantity: 0,
    allowOutOfStockOrders: 0,
    createdBy: '',
    createdDate: undefined,
    updatedBy: '',
    updatedDate: undefined
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { }
  } = useForm<IFDataProductVariantAttributeCombination>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })


  useEffect(() => {
    if (openModal.attrComb === false) {
      reset()
    } else if (openModal.attrComb === true && dataItem?.id) {
      getListUnitApi({ $status: 1 }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setOptionUnit(rs)
          }, 10)
        })
        .catch((ex) => {
          console.log(ex)
        })
      getPagingProductAttributeMappingApi({
        $skip: 0,
        $top: 100,
        $productId: dataItem?.id
      }).unwrap()
        .then((rs) => {
          if (rs?.items) {
            setTimeout(() => {
              setDataAtt(rs?.items)
            }, 100)
          }
        })
        .catch((ex) => {
          console.log(ex)
        })
    }

  }, [openModal, tabIndex])

  // ** Function to reset fileds
  const handleCancel = () => {
    clearErrors()
    setCommandData({})
    reset()
    setDataSidebar((old: any) => ({ ...old, attrComb: {} }))
    handleModal('attrComb')
  }

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color="primary" type="submit" onClick={handleSubmit(onSubmit)} className="me-1">
          {t('Save')}
        </Button>
        <Button color="secondary" onClick={handleCancel} outline className="me-1">
          {t('Close')}
        </Button>
      </Fragment>
    )
  }

  useEffect(() => {
    if (commandData.type === 'DELETE') {
      MySwal.fire({
        title: t('Confirm'),
        text: t('Do you want to delete item?'),
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: t('Delete'),
        cancelButtonText: t('Cancel'),
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger ms-1'
        },
        buttonsStyling: false
      }).then(async (result) => {
        if (result.value) {
          deleteProductVariantAttributeValueApi(commandData.data.id)
            .unwrap()
            .then((rs) => {
              if (rs.isValid) {
                notificationSuccess(t('Delete Item successful!'))
              }
            })
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
        }
      })
    }
  }, [commandData])

  const onSubmit = (_data: any) => {
    const data = removeEmpty(_data)
    if (typeSidebar.attrComb?.value === 'Add') {
      data.productVariantAttributeId = dataSidebar.attrComb?.id
      addProductVariantAttributeValueApi(data).unwrap()
        .then((rs) => {
          if (rs.errors.length === 0) {
            clearErrors()
            setCommandData({})
            reset()
            notificationSuccess(t('Add Successful'))
          } else {
            notificationError(t('Add Failed'))
          }
        })
        .catch((ex) => console.log(ex))
    } else {
      editProductVariantAttributeValueApi(data).unwrap()
        .then((rs) => {
          if (rs.errors.length === 0) {
            clearErrors()
            setCommandData({})
            reset()
            setTypeSidebar((old: any) => ({ ...old, attrComb: { value: 'Add' } }))
            notificationSuccess(t("Update Successful"))
          } else {
            notificationError(t('Update Failed'))
          }
        })
        .catch((ex) => console.log(ex))
    }
  }

  const render = () => {
    if (typeSidebar.attrComb?.value === 'Add' || typeSidebar.attrComb?.value === 'Edit') {
      return <div
        className={classNames('customizer po-cus po-sidebar d-none d-md-block', {
          open: openModal.attrComb
        })}
        style={{ width: openModal.attrComb ? widthSide : '400px' }}
      >
        <Form id='form-attrComb' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
          <Scrollbars autoHide
            autoHeight
            autoHeightMax={windowSize.innerHeight - 0}>
            <div className='customizer-header p-50 position-relative bb-1 d-flex align-items-center'>
              <span className='cursor-poiter' ><X onClick={() => handleCancel()} /></span>
              {typeSidebar.attrComb.value === 'Add' && <h5 className='mb-0 ms-50'>{t('Add')} - </h5>}
              {typeSidebar.attrComb.value === 'Edit' && <h5 className='mb-0 ms-50'>{t('edit')} - </h5>}
              <h5 className='mb-0 ms-50'>{t('Attributes combinations')}</h5>
            </div>
            <div className='modal-body flex-grow-1 pb-sm-0 pb-3'>
              <Row className="m-0 gy-1 mb-2 me-1">
                {dataAttr.length > 0 && dataAttr.map((a: any, i: any) => {
                  return <Col md={6} key={i}>
                    <SelectBox
                      control={control}
                      name={a.id}
                      label={a.name}
                      placeholder=''
                      isMulti={true}
                      options={a.options}
                    />
                  </Col>
                })}
              </Row>
              <Row className="m-0 gy-1 mb-2 me-1">
                <Col md={4} xs={12}>
                  <div className='d-flex form-row-inline'>
                    <Label className='form-label' for='isActive'>
                      {t('Image')}
                    </Label>
                    <AvatarComponent
                      control={control}
                      label='Image'
                      name='image'
                      height={100}
                      width={100}
                      disabled
                      labelSize='label-medium'
                      errors={null}
                    />
                  </div>
                </Col>
                <Col md={8} xs={12}>
                  <div className='d-flex'>
                    <div className=''>
                      <Label className='form-label me-1' for='isActive'>
                        {t('Active')}
                      </Label>
                      <Controller
                        name="isActive"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            value={1}
                            id='isActive'
                            type='checkbox'
                          />
                        )}
                      />

                    </div>
                  </div>
                </Col>
                <Col md={4} xs={8}>
                  <TextInput
                    control={control}
                    name='sku'
                    label={t('SKU')}
                    inLine={false}
                    placeholder='' />
                </Col>
                <Col md={4} xs={8}>
                  <TextInput
                    control={control}
                    name='manufacturerPartNumber'
                    label={t('Manufacturer part number')}
                    inLine={false}
                    placeholder='' />
                </Col>
                <Col md={4} xs={8}>
                  <TextInput
                    control={control}
                    name='gtin'
                    label={t('Gtin')}
                    inLine={false}
                    placeholder='' />
                </Col>
                <Col md={4} xs={12}>
                  <NumberInput
                    control={control}
                    name='price'
                    label={t('Price')}
                    required={true}
                    placeholder=''
                  />
                </Col>
                <Col md={4} xs={12}>
                  <NumberInput
                    control={control}
                    name='quantity'
                    label={t('Quantity')}
                    required={true}
                    placeholder=''
                  />
                </Col>
                <Col md={4} xs={12}>
                  <SelectBox
                    control={control}
                    name='quantityUnitId'
                    label={t('Unit')}
                    placeholder=''
                    isMulti={true}
                    options={optionUnit}
                  />
                </Col>
                <Col md={4} xs={12}>
                  <NumberInput
                    control={control}
                    name='stockQuantity'
                    label={t('stockQuantity')}
                    required={true}
                    placeholder=''
                  />
                </Col>
                <Col md={8} xs={12}>
                  <div className=''>&nbsp;</div>
                  <div className='d-flex'>
                    <div className=''>
                      <Controller
                        name="allowOutOfStockOrders"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            value={1}
                            id='allowOutOfStockOrders'
                            type='checkbox'
                          />
                        )}
                      />
                      <Label className='form-label ms-1' for='allowOutOfStockOrders'>
                        {t('Allow out of stock')}
                      </Label>
                    </div>
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

export default SidebarProdAttrCombination
