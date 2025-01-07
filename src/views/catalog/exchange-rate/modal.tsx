// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ModalBody, Button, Form, Row, Col } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { ExchangeRateContext } from './useContext'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useExchangeRate } from './hooks'
import { IFDataExchangeRate } from '@src/domain/models/IExchangeRate'
import {TextInput} from '@components/input'
import {SelectBox} from '@components/select'
import { useCurrency } from '../currency/hooks'
import { notificationError, notificationSuccess } from '@components/notifications'
import ModalHeader from '@components/modal-header'
import DatePickerInput from '@components/datepicker'


const ModalComponent = () => {
  // ** Props
  const { t } = useTranslation()
  const { openModal, handleModal, dataItem, typeModal } = useContext(ExchangeRateContext)
  const [optionCurrency, setOptionCurrency] = useState<any>([])
  // ** States
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const {
    addExchangeRateApi,
    editExchangeRateApi
  } = useExchangeRate()

  const {
    getListCurrencyApi
  } = useCurrency()


  // ** States
  const formSchema = yup.object().shape({
    currencyCode: yup
      .string()
      .required((t("Code") + t(" is required")))
      .matches(/^[A-Za-z0-9]+$/, t("Do not contain special characters"))
      .max(50, (t("Code") + t(" must less than 255 characters")))
      .min(2, (t("Code") + t(" must greater than 2 characters"))),
    currencyId: yup
      .string()
      .required((t("Code") + t(" is required"))),
    note: yup
      .string()
      .max(500, (t("Note") + t(" must less than 500 characters")))
  })

  const defaultValues: IFDataExchangeRate = {
    id: "",
    currencyId: "",
    fromCurrency: "",
    toCurrency: "",
    rate: 0,
    activeDate: undefined,
    status: 1,
    createdBy: undefined,
    createdDate: undefined,
    updatedBy: undefined,
    updatedDate: undefined
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm<IFDataExchangeRate>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const optionStatus = [
    {
      value: 1,
      label: t("Active")
    },
    {
      value: 0,
      label: t("Inactive")
    }
  ]
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  // ** Function to run when sidebar opens
  const handleFormOpened = () => {
    if (!isObjEmpty(dataItem)) {
      Object.entries(dataItem).forEach(
        ([name, value]: any) => {
          if (name.includes("Date") || name.includes("date")) {
            setValue(name, value ? new Date(value) : undefined)
          } else {
            setValue(name, value)
          }
        }
      )
    } else {
      reset()
    }
    getListCurrencyApi({ $status: 1 }).unwrap()
      .then((rs) => {
        setTimeout(() => {
          setOptionCurrency(rs)
        }, 10)
      })
      .catch((ex) => {
        console.log(ex)
      })
  }

  // ** Function to run when sidebar closes
  const handleFormClosed = () => {
    clearErrors()
  }
  
  // ** Function to reset fileds
  const handleCancel = () => {
    handleModal()
  }


  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (typeModal === 'Edit' || typeModal === 'Add') {
      return (
        <Fragment>
          <Button color="primary" className="mb-75 me-1">
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
          <Button color="primary" className="mb-75 me-1" onClick={handleModal}>
            {t('Delete')}
          </Button>
          <Button color="secondary" onClick={handleCancel} outline className="mb-75 me-1">
            {t('Close')}
          </Button>
        </Fragment>
      )
    }
  }

  
  const onSubmit = (data: any) => {
    if (typeModal === 'Add') {
      addExchangeRateApi(data).unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModal()
            notificationSuccess(t('Add Successful'))
          } else {
            for (let i = 0; i < rs.errors.length; i++) {
              setError(
                rs.errors[i].propertyName.toLowerCase(),
                { type: 'custom', message: t(rs.errors[i].errorMessage) }
              )
            }
            notificationError(t("Add Fails"))
          }
        })
        .catch((ex) => console.log(ex))
    } else {
      editExchangeRateApi(data).unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModal()
            notificationSuccess(t("Update Successful"))
          } else {
            for (let i = 0; i < rs.errors.length; i++) {
              setError(
                rs.errors[i].propertyName.toLowerCase(),
                { type: 'custom', message: t(rs.errors[i].errorMessage) }
              )
            }
            notificationError(t("Update Fails"))
          }
        })
        .catch((ex) => console.log(ex))
    }
  }
  return (
    <Modal
      isOpen={openModal}
      toggle={handleModal}
      className='modal-dialog-centered modal-lg'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleFormClosed}
    >
      <Form id='form-modal-globalzone' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title='Exchange rate' />
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <ModalBody>
            <div>
              <Row className="m-0 gy-1 mb-2 me-1">
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="currencyId"
                    labelSize='d-flex form-row-inline label-medium'
                    label={t("Currency exchange")}
                    disabled={typeModal === 'Detail'}
                    errors={errors.currencyId}
                    placeholder={t("Select")}
                    options={optionCurrency}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='toCurrency'
                    label={t('Currency code')}
                    disabled={typeModal === 'Detail'}
                    required={true}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.toCurrency} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='rate'
                    type='number'
                    disabled={typeModal === 'Detail'}
                    label={t('Exchange rate')}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.rate} />
                </Col>
                <Col md={12} xs={12}>
                  <DatePickerInput
                    control={control}
                    name="activeDate"
                    label={t("Active date")}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.activeDate}
                    required={true}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="status"
                    labelSize='d-flex form-row-inline label-medium'
                    label={t("Status")}
                    disabled={typeModal === 'Detail'}
                    errors={errors.status}
                    placeholder={t("Select")}
                    options={optionStatus}
                  />
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Scrollbars>
        <div
          className="d-flex justify-content-end p-1"
          style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}
        >
          {renderFooterButtons()}
        </div>
      </Form>
    </Modal>
  )
}

export default ModalComponent
