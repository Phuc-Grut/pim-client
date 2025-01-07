// ** React Imports
import { Fragment, useContext } from 'react'
import { X, Plus, Edit, Info } from 'becoxy-icons'
import { useForm } from 'react-hook-form'
import { Modal, ModalBody, Button, Form, Row, Col } from 'reactstrap'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { GroupUserContext } from './useContext'
import PerfectScrollbar from "react-perfect-scrollbar"
import { useTranslation } from 'react-i18next'
import { useSystemGroupUser } from './hooks'
import { IFDataGroupUser } from '@src/domain/models/IGroupUser'
import { SelectBox } from '@components/select'
import {TextInput} from "@components/input"
import {notificationError, notificationSuccess} from "@utils/notification"

const ModalHeader = (props: any) => {
  // ** Props
  const { title, handleModal, typeModal } = props
  const { t } = useTranslation()


  const handleModalIcon = () => {
    if (typeModal === 'Edit') {
      return <Edit fontSize={17} className='me-1' />
    } else if (typeModal === 'Detail') {
      return <Info fontSize={17} className='me-1' />
    } else {
      return <Plus fontSize={17} className='me-1' />
    }
  }

  return (
    <div className='modal-header d-flex align-items-center justify-content-between mb-1'>
      <h5 className='modal-title'>
        {handleModalIcon()} {t(title)}
      </h5>
      <div className='todo-item-action d-flex align-items-center'>
        <X
          className='fw-normal mt-25 cursor-pointer'
          fontSize={16}
          onClick={handleModal}
        />
      </div>
    </div>
  )
}

const ModalComponent = () => {
  // ** Props
  const { t } = useTranslation()
  const { openModal, handleModal, dataItem, typeModal, setDataItem, windowSize } = useContext(GroupUserContext)
  // ** States
  const {
    addGroupUserApi,
    editGroupUserApi
  } = useSystemGroupUser()
  // ** States
  const formSchema = yup.object().shape({
    name: yup.string()
      .required((t("Group user name") + t("is required")))
      .max(150, t("Group user name") + t("must less than 150 characters"))
      .min(2, (t("Group user name") + t("must greater than 2 characters"))),
    description: yup
      .string()
      .max(500, (t("Description") + t(" must less than 500 characters")))
  })

  const defaultValues: IFDataGroupUser = {
    id: "",
    name: "",
    status: 1,
    description: "",
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
  } = useForm<IFDataGroupUser>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })
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
    }
  }

  // ** Function to run when sidebar closes
  const handleFormClosed = () => {
    reset()
    setDataItem({})
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
          <Button color="primary" className="me-1">
            {t('Save')}
          </Button>
          <Button color="secondary" onClick={handleCancel} outline className="me-1">
            {t('Close')}
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button color="secondary" onClick={handleCancel} outline className="me-1">
            {t('Close')}
          </Button>
        </Fragment>
      )
    }
  }

  const onSubmit = (data: any) => {
    if (typeModal === 'Add') {
      addGroupUserApi(data).unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModal()
            notificationSuccess(`${t('Add')} ${t('success')} `)
          } else {
            for (let i = 0; i < rs.errors.length; i++) {
              setError(
                rs.errors[i].propertyName.toLowerCase(),
                { type: 'custom', message: t(rs.errors[i].errorMessage) }
              )
            }
          }
        })
        .catch(() => notificationError(`${t('Add')} ${t('error')} `))
    } else {
      editGroupUserApi(data).unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModal()
            notificationSuccess(`${t('Edit')} ${t('success')} `)
          } else {
            for (let i = 0; i < rs.errors.length; i++) {
              setError(
                rs.errors[i].propertyName.toLowerCase(),
                { type: 'custom', message: t(rs.errors[i].errorMessage) }
              )
            }
          }
        })
        .catch(() => notificationError(`${t('Edit')} ${t('error')} `))
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
      <Form id='form-modal-globalZone' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title={t('Group user')} />
        <PerfectScrollbar options={{ wheelPropagation: false }} style={{ maxHeight: `calc(${windowSize.innerHeight - 180}px)` }}>
          <ModalBody>
            <div>
              <Row className="m-0 gy-1 mb-2 me-1">
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='name'
                    label={t('Group user name')}
                    disabled={typeModal === 'Detail'}
                    required={true}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.name} />
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
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='description'
                    type='textarea'
                    label={t('Description')}
                    row={3}
                    disabled={typeModal === 'Detail'}
                    required={false}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.description} />
                </Col>
              </Row>
            </div>
          </ModalBody>
        </PerfectScrollbar>
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
