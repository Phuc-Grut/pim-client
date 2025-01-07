// ** React Imports
import { Fragment, KeyboardEventHandler, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ModalBody, Button, Form, Row, Col, Label } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import {TextInput} from '@components/input'
import {SelectBox} from '@components/select'
import { notificationError, notificationSuccess } from '@components/notifications'
import ModalHeader from '@components/modal-header'
import { ProductTopicContext } from '../useContext'
import { useProductTopic } from '../hook'
import { IProductTopic } from '@src/domain/models/IProductTopic'
import AvatarUpload from '@components/avatar-upload'
import CreatableSelect from "react-select/creatable"


const ModalProductTopic = () => {
  // ** Props
  const { t } = useTranslation()
  const { 
    openModal, 
    handleModal, 
    dataItem, 
    typeModal, 
    optionProductTopicPage,
    productTopicPage
  } = useContext(ProductTopicContext)
  // ** States
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const {
    addProductTopicApi,
    editProductTopicApi
  } = useProductTopic()

  const [inputValue, setInputValue] = useState<any>("")
  const [valueTag, setValueTag] = useState<any>([])
  
  const components = {
    DropdownIndicator: null
  }


  // ** States
  const formSchema = yup.object().shape({
    code: yup
      .string()
      .required((t("Code") + t(" is required")))
      .max(50, (t("Code") + t(" must less than 255 characters")))
      .min(2, (t("Code") + t(" must greater than 2 characters"))),
    name: yup.string()
      .max(255, t("Name") + t(" must less than 255 characters"))
      .min(2, (t("Name") + t(" must greater than 2 characters"))),
    description: yup
      .string()
      .max(500, (t("Description") + t(" must less than 500 characters"))),
    productTopicPageIds: yup.array().min(1, (t("Product topic page") + t(" is required")))
  })

  const defaultValues: IProductTopic = {
    description: "",
    id: "",
    code: "",
    name: "",
    displayOrder: 0,
    status: 1,
    title: '',
    slug: '',
    keywords: '',
    image: '',
    icon: '',
    icon2: '',
    tags: '',
    productTopicPageIds: []
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm<IProductTopic>({
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
    const lstTags: any[] = []
    const result = dataItem?.keywords ? dataItem?.keywords?.split(",") : []
    result?.map((x: any) => {
      lstTags.push({ value: x, label: x })
    })
    setValueTag(lstTags)

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
      setValue("productTopicPageIds", [productTopicPage?.value])
      setValue("productTopicPageCodes", [productTopicPage?.key])
    }
  }

  // ** Function to run when sidebar closes
  const handleFormClosed = () => {
    clearErrors()
    reset()
  }

  // ** Function to reset fileds
  const handleCancel = () => {
    handleModal()
    reset()
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
    const keywords = valueTag ? valueTag?.map((val: any) => val.value).toString() : ""
    const obj = {...data, keywords}

    if (typeModal === 'Add') {
      addProductTopicApi(obj).unwrap()
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
      editProductTopicApi(obj).unwrap()
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

  const createOption = (label: string) => ({
    label,
    value: label
  })

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) {
      return
    }
    switch (event.key) {
    case "Enter":

    case "Tab":
      setValueTag((prev: any) => [...prev, createOption(inputValue)])
      setInputValue("")
      event.preventDefault()
    }
  }

  const handleProductTopicPage = (e: any[]) => {
    const productTopicPageCodes = e.map(x => x.key)
    setValue("productTopicPageCodes", productTopicPageCodes)
  }

  return (
    <Modal
      isOpen={openModal}
      toggle={handleModal}
      className='modal-dialog-centered modal-lg'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleFormClosed}
      backdrop="static"
    >
      <Form id='form-modal-globalzone' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title='Product topic' />
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <ModalBody>
            <Row className='m-0 gy-1 mb-2 me-1'>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <AvatarUpload
                  // control={control}
                  image={dataItem.image}
                  name='image'
                  height={100}
                  width={100}
                  labelSize='label-medium'
                  type={'Product'}
                  callback={(val: any) => setValue('image', val) }
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  name='code'
                  labelSize='label-medium'
                  label={t('Code')}
                  required={true}
                  errors={errors.code}
                />
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  name='name'
                  labelSize='label-medium'
                  label={t('Name')}
                  errors={errors.name}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <SelectBox
                  options={optionProductTopicPage}
                  control={control}
                  name='productTopicPageIds'
                  labelSize='label-medium'
                  label={t('Product topic page')}
                  errors={errors.productTopicPageIds}
                  required
                  isMulti
                  callback={handleProductTopicPage}
                  placeholder={t("Select")}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  name='slug'
                  labelSize='label-medium'
                  label={t('Slug')}
                  errors={errors.slug}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  name='icon'
                  labelSize='label-medium'
                  label={t('Icon')}
                  errors={errors.icon}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  name='icon2'
                  labelSize='label-medium'
                  label={t('Icon 2')}
                  errors={errors.icon2}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  required
                  name='displayOrder'
                  labelSize='label-medium'
                  label={t('Display order')}
                  errors={errors.displayOrder}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  name='title'
                  labelSize='label-medium'
                  label={t('Title')}
                  errors={errors.title}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <div className="d-flex form-row-inline label-medium">
                  <Label className="form-label">{t("Keyword")}</Label>
                  <div className="form-input-content">
                    <CreatableSelect
                      components={components}
                      inputValue={inputValue}
                      isClearable
                      classNamePrefix="select"
                      className="react-select"
                      isMulti
                      // menuIsOpen={false}
                      onChange={(newValue) => setValueTag(newValue)}
                      onInputChange={(newValue) => {
                        setInputValue(newValue)
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder=""
                      value={valueTag && valueTag.map((x: any) => valueTag.find((val: any) => val.label === x.label))}
                      options={[]}
                      menuPosition='fixed'
                    />
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  name='tags'
                  type='textarea'
                  labelSize='label-medium'
                  label={t('Tags')}
                  errors={errors.tags}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  type='textarea'
                  name='description'
                  labelSize='label-medium'
                  label={t('Description')}
                  errors={errors.description}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}  xl={6}>
                <SelectBox
                  control={control}
                  name='status'
                  label={t("Status")}
                  labelSize='label-medium'
                  options={optionStatus}
                  placeholder={t("Select")}
                />
              </Col>
            </Row>
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

export default ModalProductTopic
