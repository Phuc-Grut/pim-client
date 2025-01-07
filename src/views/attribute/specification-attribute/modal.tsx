// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ModalBody, Button, Form, Row, Col } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { SpecificationAttributeContext } from './useContext'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useSpecificationAttribute } from './hooks'
import { IFDataSpecificationAttribute } from '@src/domain/models/ISpecificationAttribute'
import {TextInput} from '@components/input'
import ModalOptionsComponent from './modalOption'
import { notificationSuccess } from '@components/notifications'
import ModalHeader from '@components/modal-header'
import {SelectBox} from '@components/select'
import { statusDefault } from '@src/domain/constants/constantSelect'


const ModalComponent = () => {
  // ** Props
  const { t } = useTranslation()
  const {
    openModal,
    handleModal,
    dataItem,
    setDataItem,
    typeModal,
    dataTableDetail,
    setDataTableDetail,
    setDataDeleteDetail,
    setDataSidebar,
    setOpenSidebar
  } = useContext(SpecificationAttributeContext)
  // ** States
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const {
    addSpecificationAttributeApi,
    editSpecificationAttributeApi
  } = useSpecificationAttribute()

  // ** States
  const formSchema = yup.object().shape({
    name: yup.string()
      .required((t("Specification attribute name") + t(" is required")))
      .max(255, t("Specification attribute name") + t(" must less than 255 characters"))
      .min(2, (t("Specification attribute name") + t(" must greater than 2 characters"))),
    code: yup.string()
      .required((t("NamePlural") + t(" is required")))
  })

  const defaultValues: IFDataSpecificationAttribute = {
    id: "",
    code: "",
    name: "",
    alias: "",
    description: "",
    status: 1,
    displayOrder: 1
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm<IFDataSpecificationAttribute>({
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
    setDataItem({})
    setDataTableDetail([])
    setDataDeleteDetail([])
    setDataSidebar({})
    setOpenSidebar(false)
  }

  // ** Function to reset fileds
  const handleCancel = () => {
    handleModal()
  }


  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
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
  }


  const onSubmit = (data: any) => {
    const obj = {
      ...data,
      alias: data.code,
      options: dataTableDetail
    }
    if (typeModal === 'Add') {
      addSpecificationAttributeApi(obj).unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModal()
            setOpenSidebar(false)
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
      editSpecificationAttributeApi(obj).unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModal()
            setOpenSidebar(false)
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
      backdrop={'static'}
      className='modal-dialog-centered modal-lg-1'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleFormClosed}
    >
      <Form id='form-modal-globalzone' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title="Specification attribute" />
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <ModalBody>
            <section>
              <div className='box form-box__border mb-3'>
                <h5 className="m-0 form-box__border--title">{t('General information')}</h5>
                <Row className="m-0 gy-1 mb-2 me-1">
                  <Col md={12} xs={12}>
                    <TextInput
                      control={control}
                      name='code'
                      label={t('SpecificationAttributeCode')}
                      required={true}
                      labelSize='d-flex form-row-inline label-small'
                      errors={errors.code} />
                  </Col>
                  {/* <Col md={6} xs={12}>
                    <TextInput
                      control={control}
                      name='alias'
                      label={t('Alias')}
                      required={true}
                      labelSize='d-flex form-row-inline label-small'
                      errors={errors.alias} />
                  </Col> */}
                  <Col md={12} xs={12}>
                    <TextInput
                      control={control}
                      name='name'
                      label={t('Specification attribute name')}
                      required={true}
                      labelSize='d-flex form-row-inline label-small'
                      errors={errors.name} />
                  </Col>
                  <Col md={12} xs={12}>
                    <TextInput
                      control={control}
                      name='description'
                      type='textarea'
                      row={3}
                      label={t('Description')}
                      labelSize='d-flex form-row-inline label-small'
                      errors={errors.description} />
                  </Col>
                  <Col md={6} xs={6}>
                    <SelectBox
                      control={control}
                      name="status"
                      labelSize='d-flex form-row-inline label-small'
                      label={t("Status")}
                      errors={errors.status}
                      placeholder={t("Select")}
                      options={statusDefault}
                    />
                  </Col>
                  <Col md={6} xs={12}>
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
            </section>
            <section>
              <div className='box form-box__border'>
                <h5 className="m-0 form-box__border--title">{t('Select Option')}</h5>
                <ModalOptionsComponent />
              </div>
            </section>
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
