// ** React Imports
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { X } from 'becoxy-icons'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, Label, Row, Col } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useProduct } from '../../hooks'
import { ProductContext } from '../../useContext'
import { notificationError, notificationSuccess } from '@components/notifications'
import { tierPriceMethod, optionYesNO, optionStatus } from '@src/domain/constants/constantSelect'
import classNames from 'classnames'
import { useServiceAdd } from '@src/views/service-add/hooks'
import { IFDataProductServiceAdd } from '@src/domain/models/IProdcuctServiceAdd'
import { connectString } from '@src/utility/hooks/connectString'
import {FormulaInput, NumberInput} from "@components/input"
import {SelectBox} from "@components/select"

const parameters: any[] = [
  {
    type: 'parameters',
    value: 'BHXN_CTY_DONG',
    label: 'BHXH (Công ty đóng)',
    description: 'Tự động tính dự trên mức lương đóng BH và tỷ lệ đóng trong hồ sơ nhân viên'
  },
  {
    type: 'parameters',
    value: 'BHTN',
    label: 'BHTN',
    description: 'Tự động tính dự trên mức lương đóng BH và tỷ lệ đóng trong hồ sơ nhân viên'
  }
]

const SidebarServiceAdd = (props: any) => {
  const ref = useRef()
  const { t } = useTranslation()
  const option = tierPriceMethod.map((a:any) => ({...a, label: t(a.label)}))
  const optionYN = optionYesNO.map((a:any) => ({...a, label: t(a.label)}))
  const optStatus = optionStatus.map((a:any) => ({...a, label: t(a.label)}))
  const { getServiceAddPagingApi } = useServiceAdd()
  const { dataItem, typeSidebar, setDataSidebar, setTypeSidebar, tabIndex, windowSize, optionCurrency } = useContext(ProductContext)
  const { dataModal, openModal, handleModal, widthSide } = props
  const [optionServiceAdd, setOptionServiceAdd] = useState([])

  const { addProductServiceAddApi, editProductServiceAddApi } = useProduct()

  // ** States
  const formSchema = yup.object().shape({
    serviceAddId: yup.string().required(connectString(['Service', 'isRequired']))
  })

  const defaultValues: IFDataProductServiceAdd = {
    id: "",
    productId: "",
    payRequired: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    calculationMethod: 0,
    priceSyntax: '',
    status: 1,
    currency: ''
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    reset,
    formState: { errors }
  } = useForm<IFDataProductServiceAdd>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })


  useEffect(() => {
    if (openModal.serviceAdd === false) {
      clearErrors()
      reset()
    } else {
      setValue("productId", dataItem?.id)
      if (dataModal.serviceAdd && !isObjEmpty(dataModal.serviceAdd)) {
        Object.entries(dataModal.serviceAdd).forEach(
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
    if (tabIndex === '6' && openModal.serviceAdd === true) {
      getServiceAddPagingApi({
        Filter: "",
        Order: "",
        PageNumber: 0,
        PageSize: 100,
        Keyword: ""
      }).unwrap()
        .then((rs) => {
          if (rs?.items) {
            const newrs = rs?.items.map((a:any) => ({...a, value: a.id, label: a.name}))
            setTimeout(() => {
              setOptionServiceAdd(newrs)
            }, 100)
          }
        })
    }

  }, [openModal, tabIndex])


  // ** Function to reset fileds
  const handleCancel = () => {
    reset()
    setDataSidebar((old: any) => ({ ...old, serviceAdd: {} }))
    handleModal('serviceAdd')
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
    data.productId = dataItem?.id
    if (typeSidebar.serviceAdd?.value === 'Add') {
      addProductServiceAddApi(data).unwrap()
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
      editProductServiceAddApi(data).unwrap()
        .then((rs) => {
          if (rs.errors.length === 0) {
            clearErrors()
            reset()
            setTypeSidebar((old: any) => ({ ...old, serviceAdd: { value: 'Add' } }))
            notificationSuccess(t("Update Successful"))
          } else {
            notificationError(t('Update Failed'))
          }
        })
        .catch((ex) => console.log(ex))
    }
  }

  const render = () => {
    if (typeSidebar.serviceAdd?.value === 'Add' || typeSidebar.serviceAdd?.value === 'Edit') {
      return <div
        className={classNames('customizer po-cus po-sidebar d-none d-md-block', {
          open: openModal.serviceAdd
        })}
        style={{ width: openModal.serviceAdd ? widthSide : '400px' }}
      >
        <Form id='form-serviceAdd' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
          <Scrollbars autoHide
            autoHeight
            autoHeightMax={windowSize.innerHeight - 0}>
            <div className='customizer-header p-50 position-relative bb-1 d-flex align-items-center'>
              <span className='cursor-poiter' ><X onClick={() => handleModal('serviceAdd')} /></span>
              {typeSidebar.serviceAdd.value === 'Add' && <h5 className='mb-0 ms-50'>{t('Add')} - </h5>}
              {typeSidebar.serviceAdd.value === 'Edit' && <h5 className='mb-0 ms-50'>{t('edit')} - </h5>}
              <h5 className='mb-0 ms-50'>{t('Charge service')}</h5>
            </div>
            <div className='modal-body flex-grow-1 pb-sm-0 pb-3'>
              <Row className="m-0 gy-30 mb-2 me-1">
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="serviceAddId"
                    label={t("Service")}
                    placeholder=''
                    inLine={false}
                    errors={errors.serviceAddId}
                    options={optionServiceAdd}
                    callback={(a:any) => {
                      console.log(a)
                      setValue('price', a.price)
                      setValue('maxPrice', a.maxPrice)
                      setValue('minPrice', a.minPrice)
                      setValue('currency', a.currency)
                      setValue('priceSyntax', a.priceSyntax)
                    }}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="calculationMethod"
                    label={t("Calculation method")}
                    inLine={false}
                    options={option}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="payRequired"
                    label={t("PayRequired")}
                    placeholder=''
                    labelSize='label-small'
                    inLine={false}
                    options={optionYN}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='price'
                    label={t('Price')}
                    placeholder=''
                    inLine={false}
                    labelSize='label-small'
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='minPrice'
                    inLine={false}
                    label={t('MinPrice')}
                    placeholder=''
                    labelSize='label-small'
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='maxPrice'
                    label={t('MaxPrice')}
                    placeholder=''
                    inLine={false}
                    labelSize='label-small'
                    errors={null}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="currency"
                    label={t("Currency")}
                    placeholder=''
                    labelSize='label-small'
                    inLine={false}
                    options={optionCurrency}
                    callback={(val:any) => console.log(val)}
                  />
                </Col>

                <Col xs={12}>
                  <div className="form-group">
                    <Label className="form-label">
                      {t("PriceSyntax")}
                    </Label>
                    <div className='form-input-content'>
                      <Controller
                        name="priceSyntax"
                        control={control}
                        render={({ field: { value, onChange, ...props } }) => (
                          <FormulaInput
                            {...props}
                            type='textarea'
                            parameters={parameters}
                            value={value}
                            onChange={onChange}
                            ref={ref}
                          />
                        )}
                      />
                    </div>
                  </div>
                </Col>
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="status"
                    label={t("Status")}
                    placeholder=''
                    labelSize='label-small'
                    inLine={false}
                    options={optStatus}
                  />
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

export default SidebarServiceAdd
