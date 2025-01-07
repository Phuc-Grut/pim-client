import ModalHeader from '@components/modal-header'
import React, { Fragment, KeyboardEventHandler, useContext, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { Button, Col, Form, Label, Modal, ModalBody, Row } from 'reactstrap'
import { ProductTopicPageContext } from '../useContext'
import { isObjEmpty } from '@src/utility/Utils'
import { useTranslation } from 'react-i18next'
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextInput } from '@components/input'
import { SelectBox } from '@components/select'
import { IProductTopicPage } from '@src/domain/models/IProductTopicPage'
import { notificationError, notificationSuccess } from '@components/notifications'
import { useProductTopicPage } from '../hook'
import AvatarUpload from '@components/avatar-upload'
import CreatableSelect from "react-select/creatable"

const ModalComponent = () => {
  const { t } = useTranslation()
  const { addProductTopicPageApi, editProductTopicPageApi} = useProductTopicPage()

  const {
    openModal,
    handleModal,
    windowSize,
    dataItem,
    typeModal
  } = useContext(ProductTopicPageContext)
      
  
  const [inputValue, setInputValue] = useState<any>("")
  const [valueTag, setValueTag] = useState<any>([])
  
  const components = {
    DropdownIndicator: null
  }

  const defaultValues: IProductTopicPage = {
    code: '',
    icon: "",
    icon2: "",
    status: 1
  }

  const optionStatus = [
    {
      value: 0,
      label: t('Inactive')
    },
    {
      value: 1,
      label: t('Active')
    }
  ]

  const formSchema = yup.object().shape({
    code: yup.string()
      .required(`${t('Code')} ${t('is required')}`)
  })

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    reset,
    setError,
    formState: { errors }
  } = useForm<IProductTopicPage>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(formSchema)
  })

  // eslint-disable-next-line no-unused-vars
  const onSubmit = (data: IProductTopicPage) => {
    const keywords = valueTag ? valueTag?.map((val: any) => val.value).toString() : ""
    const obj = {...data, keywords}
    if (typeModal === 'Add') {
      addProductTopicPageApi(obj).unwrap()
        .then((rs: any) => {
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
        .catch((ex: any) => console.log(ex))
    } else {
      editProductTopicPageApi(obj).unwrap()
        .then((rs: any) => {
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
        .catch((ex: any) => console.log(ex))
    }
  }

  const handleFormOpened = () => {
    if (typeModal === "Edit") {
      const lstTags: any[] = []
      const result = dataItem?.keywords ? dataItem?.keywords?.split(",") : []
      result?.map((x: any) => {
        lstTags.push({ value: x, label: x })
      })
      setValueTag(lstTags)
      if (!isObjEmpty(dataItem)) {
        Object.entries(dataItem).forEach(
          ([name, value]: any) => {         
            setValue(name, value)
          }
        )
      }
    } else {
      handleModalClosed()
    }
  }
  
  const handleModalClosed = () => {
    clearErrors()
    reset()
  }

  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color="primary" className="update-btn update-todo-item me-1">
          {t('Save')}
        </Button>
        <Button color="secondary" onClick={handleModal} outline>
          {t('Close')}
        </Button>
      </Fragment>
    )
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

  return (
    <Modal
      isOpen={openModal}
      toggle={handleModal}
      className='modal-dialog-centered modal-lg-1'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleModalClosed}
      backdrop='static'
    >
      <Form id='form-modal-globalzone' className='todo-modal modal-form-content' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title={t('Product topic page')} />
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <ModalBody>
            <div className='box form-box mb-2'>
              <Row className='gy-1 mb-1 px-1'>
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
                    labelSize='d-flex form-row-inline label-medium'
                    label={t('Code')}
                    required={true}
                    errors={errors.code}
                  />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                  <TextInput
                    control={control}
                    name='name'
                    labelSize='d-flex form-row-inline label-medium'
                    label={t('Name')}
                    errors={errors.name}
                  />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                  <TextInput
                    control={control}
                    name='slug'
                    labelSize='d-flex form-row-inline label-medium'
                    label={t('Slug')}
                    errors={errors.slug}
                  />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                  <TextInput
                    control={control}
                    name='icon'
                    labelSize='d-flex form-row-inline label-medium'
                    label={t('Icon')}
                    errors={errors.icon}
                  />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                  <TextInput
                    control={control}
                    name='icon2'
                    labelSize='d-flex form-row-inline label-medium'
                    label={t('Icon 2')}
                    errors={errors.icon2}
                  />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                  <TextInput
                    control={control}
                    required
                    name='displayOrder'
                    labelSize='d-flex form-row-inline label-medium'
                    label={t('Display order')}
                    errors={errors.displayOrder}
                  />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                  <TextInput
                    control={control}
                    name='title'
                    labelSize='d-flex form-row-inline label-medium'
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
                    labelSize='d-flex form-row-inline label-medium'
                    label={t('Tags')}
                    errors={errors.tags}
                  />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                  <TextInput
                    control={control}
                    type='textarea'
                    name='description'
                    labelSize='d-flex form-row-inline label-medium'
                    label={t('Description')}
                    errors={errors.description}
                  />
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}  xl={6}>
                  <SelectBox
                    control={control}
                    name='status'
                    label={t("Status")}
                    labelSize='d-flex form-row-inline label-medium'
                    options={optionStatus}
                    placeholder={t("Select")}
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