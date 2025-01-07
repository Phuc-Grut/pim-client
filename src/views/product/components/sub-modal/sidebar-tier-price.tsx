// ** React Imports
import { Fragment, useContext, useEffect } from 'react'
import { X } from 'becoxy-icons'
import { useForm } from 'react-hook-form'
import { Button, Form, Row, Col } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useProduct } from '../../hooks'
import { IFDataTierPrice } from '@src/domain/models/ITierPrice'
import { ProductContext } from '../../useContext'
import DatePickerCustom from '@components/datepicker-custom'
import { notificationError, notificationSuccess } from '@components/notifications'
import { tierPriceMethod } from '@src/domain/constants/constantSelect'
import classNames from 'classnames'
import {SelectBox} from "@components/select"
import {NumberInput} from "@components/input"

const SidebarTierPrice = (props: any) => {
  const { t } = useTranslation()
  const option = tierPriceMethod.map((a:any) => ({...a, label: t(a.label)}))
  const { addTierPriceApi, editTierPriceApi } = useProduct()
  const { dataItem, typeSidebar, setDataSidebar, setTypeSidebar, windowSize, optionStore } = useContext(ProductContext)
  const { dataModal, openModal, handleModal, widthSide } = props


  // ** States
  const formSchema = yup.object().shape({
  })


  const defaultValues: IFDataTierPrice = {
    id: "",
    calculationMethod: 0,
    price: 0,
    quantity: 0,
    startDate: undefined,
    endDate: undefined,
    productId: ''
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    reset, watch,
    formState: { errors }
  } = useForm<IFDataTierPrice>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })

  useEffect(() => {
    if (openModal.tierPrice === false) {
      reset()
    } else {
      if (dataModal.tierPrice && !isObjEmpty(dataModal.tierPrice)) {
        Object.entries(dataModal.tierPrice).forEach(
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
  }, [openModal])

  // ** Function to reset fileds
  const handleCancel = () => {
    clearErrors()
    reset()
    setDataSidebar((old: any) => ({ ...old, tierPrice: {} }))
    handleModal('tierPrice')
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

    if (typeSidebar.tierPrice?.value === 'Add') {
      addTierPriceApi(data).unwrap()
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
      editTierPriceApi(data).unwrap()
        .then((rs) => {
          if (rs.errors.length === 0) {
            clearErrors()
            reset()
            setDataSidebar((old: any) => ({ ...old, tierPrice: {} }))
            setTypeSidebar((old: any) => ({ ...old, tierPrice: { value: 'Add' } }))
            notificationSuccess(t("Update Successful"))
          } else {
            notificationError(t('Update Failed'))
          }
        })
        .catch((ex) => console.log(ex))
    }
  }

  const render = () => {
    if (typeSidebar.tierPrice?.value === 'Add' || typeSidebar.tierPrice?.value === 'Edit') {
      return <div
        className={classNames('customizer po-cus po-sidebar d-none d-md-block', {
          open: openModal['tierPrice']
        })}
        style={{ width: openModal['tierPrice'] ? widthSide : '400px' }}
      >
        <Form id='form-tierPrice' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
          <Scrollbars autoHide
            autoHeight
            autoHeightMax={windowSize.innerHeight - 0}>
            <div className='customizer-header p-50 position-relative bb-1 d-flex align-items-center'>
              <span className='cursor-poiter' ><X onClick={() => handleModal('tierPrice')} /></span>
              {typeSidebar.tierPrice.value === 'Add' && <h5 className='mb-0 ms-50'>{t('Add')} - </h5>}
              {typeSidebar.tierPrice.value === 'Edit' && <h5 className='mb-0 ms-50'>{t('edit')} - </h5>}
              <h5 className='mb-0 ms-50'>{t('Price classification')}</h5>
            </div>
            <div className='modal-body flex-grow-1 pb-sm-0 pb-3'>
              <Row className="m-0 gy-1 mb-2 me-1">
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="storeId"
                    inLine={false}
                    label={t("Store")}
                    labelSize='label-small'
                    placeholder=''
                    options={optionStore}
                    errors={errors.storeId}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="calculationMethod"
                    label={t("Calculation method")}
                    required={true}
                    inLine={false}
                    options={option}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='quantity'
                    label={t('Quantity')}
                    placeholder=''
                    labelSize='label-small'
                    required={true}
                    inLine={false}
                    errors={errors.quantity}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='price'
                    inLine={false}
                    label={(watch('calculationMethod') === 0 || watch('calculationMethod') === 1) ? t('Price') : t('Percent')}
                    placeholder=''
                    labelSize='label-small'
                    required={true}
                    errors={errors.price}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <DatePickerCustom
                    control={control}
                    name="startDate"
                    label={t("Start date")}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <DatePickerCustom
                    control={control}
                    name="endDate"
                    label={t("End date")}
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

export default SidebarTierPrice
