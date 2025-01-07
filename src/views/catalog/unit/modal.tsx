// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ModalBody, Button, Form, Row, Col } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { UnitContext } from './useContext'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useUnit } from './hooks'
import { IFDataUnit } from '@src/domain/models/IUnit'
import { CheckboxInput, TextInput } from '@components/input'
import { SelectBox } from '@components/select'
import { useGroupUnit } from '../group-unit/hooks'
import { notificationSuccess } from '@components/notifications'
import ModalHeader from '@components/modal-header'


const ModalComponent = () => {
  // ** Props
  const { t } = useTranslation()
  const { openModal, handleModal, dataItem, typeModal } = useContext(UnitContext)
  // ** States
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const [optionGroupUnit, setOptionGroupUnit] = useState([])

  const {
    addUnitApi,
    editUnitApi
  } = useUnit()
  const {
    getListGroupUnitApi
  } = useGroupUnit()

  // ** States
  const formSchema = yup.object().shape({
    code: yup
      .string()
      .required((t("Unit code") + t(" is required")))
      .matches(/^[A-Za-z0-9]+$/, t("Do not contain special characters"))
      .max(50, (t("Unit code") + t(" must less than 255 characters")))
      .min(1, (t("Unit code") + t(" must greater than 1 characters"))),
    name: yup.string()
      .required((t("Unit name") + t(" is required")))
      .max(255, t("Unit name") + t(" must less than 255 characters"))
      .min(2, (t("Unit name") + t(" must greater than 2 characters")))
  })

  const defaultValues: IFDataUnit = {
    id: "",
    code: "",
    name: "",
    namePlural: "",
    displayLocale: "",
    groupUnitId: "",
    isDefault: false,
    rate: 0,
    description: "",
    displayOrder: 0,
    status: 1
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm<IFDataUnit>({
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
    getListGroupUnitApi({ $status: 1 }).unwrap()
      .then((rs) => {
        setTimeout(() => {
          setOptionGroupUnit(rs)
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
    if (typeModal === 'Add') {
      addUnitApi(data).unwrap()
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
      editUnitApi(data).unwrap()
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
      className='modal-dialog-centered modal-lg-1'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleFormClosed}
    >
      <Form id='form-modal-globalzone' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title="Unit" />
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <ModalBody>
            <div>
              <Row className="m-0 gy-1 mb-2 me-1">
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='code'
                    label={t('Unit code')}
                    required={true}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.code} />
                </Col>
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='name'
                    label={t('Unit name')}
                    required={true}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.name} />
                </Col>
                <Col md={6} xs={6}>
                  <SelectBox
                    control={control}
                    name="groupUnitId"
                    labelSize='d-flex form-row-inline label-medium'
                    label={t("Group unit")}
                    errors={errors.groupUnitId}
                    placeholder={t("Select")}
                    options={optionGroupUnit}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='namePlural'
                    label={t('NamePlural')}
                    required={true}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.namePlural} />
                </Col>
                <Col md={6} xs={12}>
                  <CheckboxInput
                    name="isDefault"
                    control={control}
                    label={t('IsMainUnit')}
                    labelSize='d-flex form-row-inline label-medium'
                  />
                </Col>
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='rate'
                    type='number'
                    label={t('RateToMainUnit')}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.rate} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='description'
                    type='textarea'
                    row={3}
                    label={t('Description')}
                    labelSize='d-flex form-row-inline label-medium' />
                </Col>
                <Col md={6} xs={12}>
                  <SelectBox
                    control={control}
                    name="status"
                    labelSize='d-flex form-row-inline label-medium'
                    label={t("Status")}
                    errors={errors.status}
                    placeholder={t("Select")}
                    options={optionStatus}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='displayOrder'
                    type='number'
                    label={t('Display order')}
                    labelSize='d-flex form-row-inline label-medium'
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
