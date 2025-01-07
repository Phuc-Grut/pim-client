// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Modal, ModalBody, Button, Form, Row, Col, Label, Input, FormFeedback } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { ProductAttributeContext } from '../useContext'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useProductAttribute } from '../hooks'
import { IFDataProductAttribute } from '@src/domain/models/IProductAttribute'
import {TextInput} from '@components/input'
import ModalOptionsComponent from '../modal/modalOption'
import ModalHeader from "@components/modal-header"
import { notificationSuccess } from '@components/notifications'
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
    setDataSidebar,
    setOpenSidebar
  } = useContext(ProductAttributeContext)
  // ** States
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  //const [content, setContent] = useState<any>('')
  //const [description, setDescription] = useState<any>('')

  const {
    addProductAttributeApi,
    editProductAttributeApi
  } = useProductAttribute()
  const optionSearchType: any = [
    {
      value: 1,
      label: 'Chọn một'
    },
    {
      value: 2,
      label: 'Chọn nhiều'
    }
  ]
  // ** States
  const formSchema = yup.object().shape({
    name: yup.string()
      .required((t("Product attribute name") + t(" is required")))
      .max(255, t("Product attribute name") + t(" must less than 255 characters"))
      .min(2, (t("Product attribute name") + t(" must greater than 2 characters"))),
    code: yup.string()
      .required((t("Product attribute code") + t(" is required")))
      .max(255, t("Product attribute code") + t(" must less than 255 characters")),
    description: yup
      .string()
      .max(500, (t("Description") + t(" must less than 500 characters")))
  })

  const defaultValues: IFDataProductAttribute = {
    id: "",
    code: "",
    name: "",
    alias: "",
    allowFiltering: true,
    description: "",
    searchType: 1,
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
  } = useForm<IFDataProductAttribute>({
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
  // const getContent = (data: any) => {
  //   const contentBlock = htmlToDraft(data)
  //   const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
  //   const editorState = EditorState.createWithContent(contentState)
  //   setContent(editorState)
  // }
  // const onChangeContent = (data: any) => {
  //   setContent(data)
  //   const rawContentState = convertToRaw(data.getCurrentContent())
  //   const contentConvert = draftToHtml(rawContentState)
  //   setDescription(contentConvert)
  //   // setValue('quotationTerm', quotationTerm)
  // }
  // ** Function to run when sidebar opens
  const handleFormOpened = () => {
    if (!isObjEmpty(dataItem)) {
      Object.entries(dataItem).forEach(
        ([name, value]: any) => {
          // if (name.includes("desciption")) {
          //   getContent(value)
          //   //setValue(name, value ? new Date(value) : undefined)
          // } else {
          //   setValue(name, value)
          // }
          setValue(name, value)
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
    //data.description = description
    const obj = {
      ...data,
      alias: data.code,
      Options: dataTableDetail
    }
    
    if (typeModal === 'Add') {
      addProductAttributeApi(obj).unwrap()
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
      editProductAttributeApi(obj).unwrap()
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
      className='modal-lg-1'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleFormClosed}
    >
      <Form id='form-modal-globalzone' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title={t('Product attribute')} />
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
                      label={t('Product attribute code')}
                      required={true}
                      labelSize='d-flex form-row-inline label-small'
                      errors={errors.code} />
                  </Col>
                  <Col md={12} xs={12}>
                    <TextInput
                      control={control}
                      name='name'
                      label={t('Product attribute name')}
                      required={true}
                      labelSize='d-flex form-row-inline label-small'
                      errors={errors.name} />
                  </Col>
                  {/* <Col md={12} xs={12}>
                    <TextInput
                      control={control}
                      name='alias'
                      label={t('Alias')}
                      required={true}
                      labelSize='d-flex form-row-inline label-small'
                      errors={errors.alias} />
                  </Col> */}
                  {/* <Col md={12} xs={12}>
                    <div className='d-flex form-row-inline label-small'>
                      <Label className='form-label'>
                        <span>{t('Description')}</span>
                      </Label>
                      <div className='form-input-content'>
                        <Editor
                          placeholder={t("Enter description")}
                          editorState={content}
                          onEditorStateChange={data => onChangeContent(data)
                          } />
                      </div>
                    </div>
                  </Col> */}
                  <Col md={6} xs={12}>
                    <SelectBox
                      control={control}
                      name="searchType"
                      labelSize='d-flex form-row-inline label-small'
                      label={t("SearchType")}
                      //placeholder={t("SearchType")}
                      options={optionSearchType}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <div className='d-flex form-row-inline label-small'>
                      <Label className='form-label'>{t("Allow filtering")}</Label>
                      <div className='form-input-content'>
                        <Controller
                          name='allowFiltering'
                          control={control}
                          render={({ field: { value, onChange }}) => (
                            <Input
                              type='checkbox'
                              onChange={(e: any) => onChange(e.target.checked)}
                              checked={value}
                            />
                          )}
                        />
                        {errors.allowFiltering && <FormFeedback>{errors.allowFiltering?.message}</FormFeedback>}
                      </div>
                    </div>
                  </Col>
                  <Col md={6} xs={12}>
                    <SelectBox
                      control={control}
                      name="status"
                      labelSize='d-flex form-row-inline label-small'
                      label={t("Status")}
                      //placeholder={t("Status")}
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
                  {/* <Col md={6} xs={12}>
                    <TextInput
                      control={control}
                      name='option'
                      label={t('Select Option')}
                      type='checkbox'
                      labelSize='d-flex form-row-inline label-small'
                      positionLabel='right'
                    />
                  </Col>
                  <Col md={12} xs={12}>
                    <TextInput
                      control={control}
                      name='mapping'
                      label={t('Mapping')}
                      row={2}
                      type='textarea'
                      labelSize='d-flex form-row-inline label-small'
                    />
                  </Col> */}
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
