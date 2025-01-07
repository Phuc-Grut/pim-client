import { Fragment, useContext, useEffect, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { Modal, ModalBody, Button, Form, Row, Col, Input, Label } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { ProductContext } from './useContext'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { IFDuplicateProductApi } from '@src/domain/models/IProduct'
import { TextInput } from '@components/input'
import { SelectBox } from '@components/select'
import ModalHeader from '@components/modal-header'
import { useCodeSyntax } from '@src/redux/system/codesyntax/hooks'
import { MODULECODE } from '@src/domain/constants'
import { notificationError, notificationSuccess } from '@components/notifications'
import { useProduct } from './hooks'

const ModalDuplicate = () => {

  const { t } = useTranslation()
  const { getCodeSyntaxPagingApi } = useCodeSyntax()
  const { duplicateProductApi, getProductByIdApi } = useProduct()
  const [typeSubmit, setTypeSubmit] = useState(0)
  const { openModalDuplicate, handleModalDuplicate, dataItem, typeModal, setDataItem, setTypeModal, setTabIndex, handleModal } = useContext(ProductContext)

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const formSchema = yup.object().shape({
    // code: yup
    //   .string().nullable()
    //   .max(25, (t("Code") + t(" must less than 25 characters")))
    //   .min(2, (t("Code") + t(" must greater than 2 characters"))).nullable(),
    name: yup.string()
      .required(t("Product name") + t(" is required"))
      .min(2, (t("Name") + t(" must greater than 2 characters")))
      .max(400, (t("Name") + t(" must less than 400 characters")))

  })

  const defaultValues: IFDuplicateProductApi = {
    status: 1,
    isAuto: 1,
    moduleCode: MODULECODE.PRODUCT
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    setError,
    //getValues,
    formState: { errors }
  } = useForm<IFDuplicateProductApi>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })
  const isAutoWatch = useWatch({
    control,
    name: "isAuto"
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
  const handleFormDuplicateOpened = () => {
    setValue("name", dataItem?.name)
    setValue("status", dataItem?.status)
  }

  useEffect(() => {
    if (openModalDuplicate === true) {
      if (isAutoWatch === 1) {
        setValue('code', null)
      } else {
        getCodeSyntaxPagingApi({
          $syntaxCode: MODULECODE.PRODUCT,
          $status: 0
        }).unwrap()
          .then((rs: any) => {
            setValue("code", rs?.code)
          })
          .catch((ex: any) => {
            console.log(ex)
          })
      }
    }
  }, [isAutoWatch, openModalDuplicate])


  // ** Function to run when sidebar closes
  const handleFormDuplicateClosed = () => {
    clearErrors()
    reset()
  }

  // ** Function to reset fileds
  const handleCancel = () => {
    handleFormDuplicateClosed()
    handleModalDuplicate()
  }
  //** Renders Footer Buttons
  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color="primary" className="mb-75 me-1"  >
          <div onClick={() => {
            setTypeSubmit(0)
          }}>{t('Copy')}</div>
        </Button>
        <Button color='primary' className='mb-75 me-1'>
          <div onClick={() => {
            setTypeSubmit(1)
          }}>{t('Copy and edit')}</div>
        </Button>
        <Button color="secondary" onClick={handleCancel} outline className="mb-75 me-1">
          {t('Close')}
        </Button>
      </Fragment>
    )
  }
  const onSubmit = (data: any) => {
    const obj: any = {
      id: dataItem.id,
      code: data.code,
      name: data.name,
      status: data.status,
      isAuto: data.isAuto,
      moduleCode: data.moduleCode
    }
    if (typeModal === 'Duplicate') {
      if (typeSubmit === 0) {
        duplicateProductApi(obj).unwrap().then((rsA) => {
          if (rsA.isValid === true) {
            handleCancel()
            notificationSuccess(t('Copy Successfull'))
          } else {
            for (let i = 0; i < rsA.errors.length; i++) {
              const string = rsA.errors[i].errorMessage?.split(' ').reduce((accumulator: string, currentValue: any) => `${accumulator} ${t(currentValue)}`, '')
              setError(
                rsA.errors[i].propertyName.toLowerCase(),
                { type: 'custom', message: string }
              )
            }
            notificationError(t("Copy Fails"))
          }
        })
          .catch((ex) => console.log(ex))
      } else if (typeSubmit === 1) {
        duplicateProductApi(obj).unwrap().then((rsA) => {
          if (rsA.isValid === true) {
            notificationSuccess(t('Copy Successfull'))
            handleCancel()
            getProductByIdApi(rsA.id)
              .unwrap()
              .then((rs) => {
                setTimeout(() => {
                  if (rs?.listGroupCategory && rs?.listGroupCategory.length > 0) {
                    const l = rs?.listGroupCategory.map((obj: any) => {
                      rs[obj.value] = rs?.listCategory?.filter(
                        (d: any) => d.groupCategoryId === obj.value
                      )
                      return obj.value
                    })
                    rs.idGroupCategories = l
                  } else {
                    rs.idGroupCategories = []
                  }
                  if (rs?.listStore && rs?.listStore.length > 0) {
                    const l = rs?.listStore.map((obj: any) => {
                      return obj.value
                    })
                    rs.limitedToStores = l
                  } else {
                    rs.limitedToStores = []
                  }
                  if (rs?.listTag && rs?.listTag.length > 0) {
                    rs.productTag = rs?.listTag
                  } else {
                    rs.productTag = []
                  }
                  setDataItem(rs)
                  if (setTypeModal) {
                    setTabIndex("0")
                    setTypeModal('Edit')
                  }
                  handleModal()
                }, 100)
              })
              .catch(() => notificationError(t("getDataError")))
          } else {
            for (let i = 0; i < rsA.errors.length; i++) {
              const string = rsA.errors[i].errorMessage?.split(' ').reduce((accumulator: string, currentValue: any) => `${accumulator} ${t(currentValue)}`, '')
              setError(
                rsA.errors[i].propertyName.toLowerCase(),
                { type: 'custom', message: string }
              )
            }
            notificationError(t("Copy Fails"))
          }
        })
          .catch((ex) => console.log(ex))
      }
    }

  }

  return (
    <Modal
      isOpen={openModalDuplicate}
      toggle={handleModalDuplicate}
      className='modal-dialog-centered modal-lg'
      contentClassName='p-0'
      onOpened={handleFormDuplicateOpened}
      onClosed={handleFormDuplicateClosed}
    >
      <Form id='form-modal-globalzone'
        className='todo-modal'
        onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModalDuplicate} typeModal={typeModal} title='Product Duplicate' />
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <ModalBody>
            <div>
              <Row className="m-0 gy-1 mb-2 me-1">
                <Col lg={9} md={9} xs={9}>
                  <TextInput
                    control={control}
                    name='code'
                    label={t('ProductCode')}
                    disabled={isAutoWatch === 1}
                    required={true}
                    labelSize='label-small'
                    placeholder={isAutoWatch === 1 ? t("*******") : ""}
                    errors={null} />
                </Col>
                <Col lg={3} md={3} xs={3}>
                  <div className='d-flex'>
                    <div className='form-check me-1'>
                      <Controller
                        name="isAuto"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Input
                            id='isAuto'
                            type='checkbox'
                            onChange={(val: any) => {
                              onChange(val.target.checked ? 1 : 0)
                            }}
                            checked={value === 1}
                          />
                        )}
                      />
                      <Label className='form-label' for='isAuto'>
                        {t('Auto')}
                      </Label>
                    </div>
                  </div>
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='name'
                    label={t('Product name')}
                    required={true}
                    labelSize='label-small'
                    placeholder=''
                    errors={errors.name} />
                </Col>
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="status"
                    label={t("Status")}
                    labelSize='label-small'
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
export default ModalDuplicate