// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ModalBody, Button, Form, Row, Col } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { StoreContext } from './useContext'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useStore } from './hooks'
import { IFDataStore } from '@src/domain/models/IStore'
import {TextInput} from '@components/input'
import { notificationSuccess } from '@components/notifications'
import ModalHeader from '@components/modal-header'


const ModalComponent = () => {
  // ** Props
  const { t } = useTranslation()
  const { openModal, handleModal, dataItem, typeModal } = useContext(StoreContext)
  // ** States
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const {
    addStoreApi,
    editStoreApi
  } = useStore()

  // ** States
  const formSchema = yup.object().shape({
    code: yup
      .string()
      .required((t("Store code") + t(" is required")))
      //.matches(/^[A-Za-z0-9]+$/, t("Do not contain special characters"))
      .max(50, (t("Store code") + t(" must less than 255 characters"))),
    name: yup.string()
      .required((t("Store name") + t(" is required")))
      .max(255, t("Store name") + t(" must less than 255 characters"))
      .min(2, (t("Store name") + t(" must greater than 2 characters"))),
    note: yup
      .string()
      .max(500, (t("Note") + t(" must less than 500 characters"))),
    phone: yup
      .string()
      .matches(/^0\d{9,10}$|^$/, t("Invalid phone number"))
      .max(11)
  })

  const defaultValues: IFDataStore = {
    id: "",
    code: "",
    name: "",
    description: "",
    address: "",
    phone: "",
    displayOrder: 0
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm<IFDataStore>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })
  const [windowSize, setWindowSize] = useState(getWindowSize())

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
  }

  // ** Function to run when sidebar closes
  const handleFormClosed = () => {
    clearErrors()
    reset()
  }


  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color="primary" className="mb-75 me-1">
          {t('Save')}
        </Button>
        <Button color="secondary" onClick={handleModal} outline className="mb-75 me-1">
          {t('Close')}
        </Button>
      </Fragment>
    )
  }


  const onSubmit = (data: any) => {
    console.log(typeModal)
    if (typeModal === 'Add') {
      addStoreApi(data).unwrap()
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

          }
        })
        .catch((ex) => console.log(ex))
    } else {
      editStoreApi(data).unwrap()
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
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title="Store" />
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <ModalBody>
            <div>
              <Row className="m-0 gy-1 mb-2 me-1">
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='code'
                    label={t('Store code')}
                    required={true}
                    labelSize='d-flex form-row-inline label-small'
                    errors={errors.code} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='name'
                    label={t('Store name')}
                    required={true}
                    labelSize='d-flex form-row-inline label-small'
                    errors={errors.name} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='description'
                    label={t('Description')}
                    labelSize='d-flex form-row-inline label-small'
                    errors={errors.description} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='address'
                    label={t('Address')}
                    labelSize='d-flex form-row-inline label-small'
                    errors={errors.address} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='phone'
                    label={t('Phone')}
                    labelSize='d-flex form-row-inline label-small'
                    errors={errors.phone} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='displayOrder'
                    type='number'
                    label={t('Display order')}
                    labelSize='d-flex form-row-inline label-small'
                    errors={errors.displayOrder} />
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
