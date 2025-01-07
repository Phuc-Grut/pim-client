// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Modal, ModalBody, Button, Form, Row, Col, Label, FormFeedback, Input} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { ProductBrandContext } from './useContext'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useProductBrand } from './hooks'
import { IFDataProductBrand } from '@src/domain/models/IProductBrand'
import {TextInput} from '@components/input'
import {SelectBox} from '@components/select'
import ModalHeader from '@components/modal-header'
import {notificationSuccess, notificationError} from '@components/notifications'
import AvatarUpload from "@components/avatar-upload"
import CreatableSelect from "react-select/creatable"
import { useProductTag } from '../catalog/product-tag/hooks'

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label
})

const ModalComponent = () => {
  // ** Props
  const { t } = useTranslation()
  const { getListProductTagApi } = useProductTag()

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
  const { openModal, handleModal, dataItem, typeModal } = useContext(ProductBrandContext)
  const [inputValue, setInputValue] = useState('')
  const [valueTag, setValueTag] = useState<any>([])
  const [optionProductTag, setOptionProductTag] = useState<any[]>([])

  // ** States
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const {
    addProductBrandApi,
    editProductBrandApi
  } = useProductBrand()
  
  // ** States
  const formSchema = yup.object().shape({
    code: yup
      .string()
      .required((t("Product brand code") + t(" is required")))
      .matches(/^[A-Za-z0-9]+$/, t("Do not contain special characters"))
      .max(50, (t("Product brand code") + t(" must less than 255 characters"))),
    name: yup.string()
      .required((t("Product brand name") + t(" is required")))
      .max(255, t("Product brand name") + t(" must less than 255 characters"))
      .min(2, (t("Product brand name") + t(" must greater than 2 characters"))),
    description: yup
      .string()
      .max(500, (t("Description") + t(" must less than 500 characters")))
  })

  const defaultValues: IFDataProductBrand = {
    description: "",
    image: "",
    tags: [],
    id: "",
    code: "",
    name: "",
    displayOrder: 0,
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
    // watch,
    setError,
    formState: { errors }
  } = useForm<IFDataProductBrand>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })
  // useEffect(() => {
  //   let name = watch("name")
  //   if (typeModal === 'Edit' && name === dataItem.name) {
  //     setValue('code', dataItem.code)
  //   } else {
  //     name = name?.toLowerCase()
  //     name = name?.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
  //     name = name?.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
  //     name = name?.replace(/ì|í|ị|ỉ|ĩ/g, "i")
  //     name = name?.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
  //     name = name?.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
  //     name = name?.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
  //     name = name?.replace(/đ/g, "d")
  //     name = name?.toUpperCase()
  //     clearErrors()
  //     setValue('code', getFirstLetters(name))
  //   }
  // }, [watch("name")])

  // const getFirstLetters = (str: any) => {
  //   const firstLetters = str
  //     .split(' ')
  //     .map((word: any) => word[0])
  //     .join('')
  //   console.log('firstLetters', firstLetters)
  //   return firstLetters
  // }
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
    getListProductTagApi({$status: 1, $type: 0})
      .unwrap()
      .then((rs: any[]) => {
        setOptionProductTag(rs)

        if (dataItem?.tags && typeModal === 'Edit') {
          const listTag: string[] = dataItem?.tags?.split(",")
          const result = rs.filter(x => listTag.includes(x.value))
          const newValueTag = listTag.map(tag => {
            const matchedResult = result.find(x => x.value === tag)
            return matchedResult ? matchedResult : { value: tag, label: tag }
          })
          setValueTag(newValueTag)
        }
      })
    
    if (!isObjEmpty(dataItem)) {
      Object.entries(dataItem).forEach(
        ([name, value]: any) => {
          if (name === 'tags') {
            const ttag = value ? value.split(',') : []
            const tags = ttag.map((it: any) => ({
              label: it,
              value: it
            }))

            setValue(name, tags)
            setValueTag(tags)
          } else if (name.includes("Date") || name.includes("date")) {
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
    setValueTag([])
    reset()
  }
  
  // ** Function to reset fileds
  const handleCancel = () => {
    handleModal()
  }

  const handleKeyDown = (event: any) => {
    if (!inputValue) { return }
    switch (event.key) {
    case 'Enter':
    case 'Tab':
      setValueTag((prev: any) => [...prev, createOption(inputValue)])
      setInputValue('')
      event.preventDefault()
    }
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
    const tags = valueTag.map((it: any) => it.value)
    data.tags = tags.toString()
    if (typeModal === 'Add') {
      addProductBrandApi(data).unwrap()
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
      editProductBrandApi(data).unwrap()
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
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title='Product brand' />
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <ModalBody>
            <div>
              <Row className="m-0 gy-1 mb-2 me-1">
                <Col md={12} xs={12}>
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
                <Col md={12} xs={12}>

                  <div className={'form-row-inline d-flex label-medium'}>
                    <Label className="form-label" >{t('Product brand code')} </Label>
                    <div className={'form-input-content'}>
                      <Controller
                        name={'code'}
                        control={control}
                        render={({ field: { value, onChange  } }) => (
                          <Input
                            placeholder={''}
                            value={value}
                            onChange={(val: any) => {
                              onChange(val.target.value.toUpperCase())
                            }}
                          />
                        )}
                      />
                      {errors.code && <FormFeedback>{errors.code.message}</FormFeedback>}
                    </div>
                  </div>

                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='name'
                    label={t('Product brand name')}
                    disabled={typeModal === 'Detail'}
                    required={true}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.name} />
                </Col>

                <Col md={12} xs={12}>
                  <div className={'form-row-inline d-flex label-medium'}>
                    <Label className="form-label" >{t("Tags")}</Label>
                    <div className={'form-input-content'}>
                      <CreatableSelect
                        components={{ DropdownIndicator: null }}
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
                        options={optionProductTag}
                        menuPosition='fixed'
                      />
                    </div>
                  </div>
                </Col>


                <Col md={6} xs={6}>
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
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='displayOrder'
                    type='number'
                    disabled={typeModal === 'Detail'}
                    label={t('Display order')}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.displayOrder} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='description'
                    type='textarea'
                    row={3}
                    disabled={typeModal === 'Detail'}
                    label={t('Description')}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.description} />
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
