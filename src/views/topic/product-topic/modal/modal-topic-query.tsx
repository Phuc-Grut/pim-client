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
import { IProductTopicQuery } from '@src/domain/models/IProductTopicQuery'
import { useProductTopicQuery } from '../product-topic-query/hook'
import CreatableSelect from "react-select/creatable"


const ModalProductTopicQuery = () => {
  // ** Props
  const { t } = useTranslation()
  const { 
    openModalQuery, 
    handleModalQuery, 
    dataItemQuery, 
    typeModalQuery,
    setDataItemQuery,
    dataItem
  } = useContext(ProductTopicContext)
  // ** States
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const {
    addProductTopicQueryApi,
    editProductTopicQueryApi
  } = useProductTopicQuery()

  // ** States
  const formSchema = yup.object().shape({
    name: yup.string()
      .required((t("Name") + t(" is required")))
      .max(255, t("Name") + t(" must less than 255 characters"))
      .min(2, (t("Name") + t(" must greater than 2 characters"))),
    description: yup
      .string()
      .max(500, (t("Description") + t(" must less than 500 characters")))
      .nullable()
  })
 
  const [inputValue, setInputValue] = useState<any>("")
  const [valueTag, setValueTag] = useState<any>([])
  
  const components = {
    DropdownIndicator: null
  }

  const defaultValues: IProductTopicQuery = {
    description: "",
    id: "",
    name: "",
    displayOrder: 0,
    status: 1,
    title: ''
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm<IProductTopicQuery>({
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
    const result = dataItemQuery?.keyword ? dataItemQuery?.keyword?.split(",") : []
    result?.map((x: any) => {
      lstTags.push({ value: x, label: x })
    })
    setValueTag(lstTags)
      
    if (!isObjEmpty(dataItemQuery)) {
      Object.entries(dataItemQuery).forEach(
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
    clearErrors()
    reset()
    setDataItemQuery({})
  }

  // ** Function to reset fileds
  const handleCancel = () => {
    handleModalQuery()
    reset()
    setDataItemQuery({})
  }


  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (typeModalQuery === 'Edit' || typeModalQuery === 'Add') {
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
  }


  const onSubmit = (data: IProductTopicQuery) => {
    const keyword = valueTag ? valueTag?.map((val: any) => val.value).toString() : ""
    data.keyword = keyword

    if (typeModalQuery === 'Add') {
      addProductTopicQueryApi({...data, productTopicId: dataItem.id}).unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModalQuery()
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
      editProductTopicQueryApi(data).unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModalQuery()
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
  
  return (
    <Modal
      isOpen={openModalQuery}
      toggle={handleModalQuery}
      className='modal-dialog-centered modal-lg'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleFormClosed}
      backdrop="static"
    >
      <Form id='form-modal-globalzone' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModalQuery} typeModal={typeModalQuery} title='Product topic query' />
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <ModalBody>
            <Row className='m-0 gy-1 mb-2 me-1'>
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
                <TextInput
                  control={control}
                  name='sourceCode'
                  labelSize='label-medium'
                  label={t('Source code')}
                  errors={errors.sourceCode}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  name='sourcePath'
                  labelSize='label-medium'
                  label={t('Source path')}
                  errors={errors.sourcePath}
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
                  name='condition'
                  type='number'
                  labelSize='label-medium'
                  label={t('Condition')}
                  errors={errors.condition}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  name='productType'
                  type='number'
                  labelSize='label-medium'
                  label={t('Product type')}
                  errors={errors.productType}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  name='pageQuery'
                  type='number'
                  labelSize='label-medium'
                  label={t('Page query')}
                  errors={errors.pageQuery}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  name='sortQuery'
                  type='number'
                  labelSize='label-medium'
                  label={t('Sort query')}
                  errors={errors.sortQuery}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  name='category'
                  labelSize='label-medium'
                  label={t('Category')}
                  errors={errors.category}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  name='seller'
                  labelSize='label-medium'
                  label={t('Seller')}
                  errors={errors.seller}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}  xl={12}>
                <TextInput
                  control={control}
                  name='brandId'
                  labelSize='label-medium'
                  label={t('Brand')}
                  errors={errors.brandId}
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

export default ModalProductTopicQuery
