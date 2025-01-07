// ** React Imports
import { Fragment, useContext, useEffect, useState, KeyboardEventHandler} from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { Modal, ModalBody, Button, Form, Input, Label, Row, Col } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as Icon from "becoxy-icons"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { CategoryContext } from './useContext'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useCategory } from './hook'
import { IFDataCategory } from '@src/domain/models/ICategory'
import {TextInput} from '@components/input'
import {SelectBox} from '@components/select'
import { notificationError, notificationSuccess } from '@components/notifications'
import ModalHeader from '@components/modal-header'
import CreatableSelect from "react-select/creatable"
import { useProductTag } from '../catalog/product-tag/hooks'
import { useGroupCategory } from '../catalog/group-category/hooks'

const ModalComponent = () => {
  // ** Props
  const { t } = useTranslation()
  const { setParentCategory, openModal, handleModal, setDataItem, dataItem, typeModal, groupAssignedTo, parentCategory, breadCrumb } = useContext(CategoryContext)
  // ** States
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const {
    addCategoryApi,
    editCategoryApi
  } = useCategory()

  const { getListProductTagApi } = useProductTag()
  const { getListGroupCategoryApi } = useGroupCategory()

  const [optionGroupCategory, setOptionGroupCategory] = useState<any[]>([])

  // ** States
  const formSchema = yup.object().shape({
    code: yup
      .string()
      .required((t("CategoryProductCode") + t(" is required")))
      .matches(/^[0-9a-zA-Z\.]+$/, t("Do not contain special characters"))
      .max(50, (t("CategoryProductCode") + t(" must less than 255 characters")))
      .min(1, (t("CategoryProductCode") + t(" must greater than 2 characters"))),
    name: yup.string()
      .required(t("CategoryProductName") + t(" is required"))
      .max(255, t("CategoryProductName") + t(" must less than 255 characters"))
      .min(2, (t("CategoryProductName") + t(" must greater than 2 characters"))),
    note: yup
      .string()
      .max(500, (t("Note") + t(" must less than 500 characters")))
  })

  const defaultValues: IFDataCategory = {
    id: "",
    code: "",
    name: "",
    fullName: undefined,
    description: "",
    image: undefined,
    web: undefined,
    url: undefined,
    // groupCategoryId: groupAssignedTo?.value,
    parentCategoryId: parentCategory?.value,
    parentCategoryName: parentCategory?.label,
    groupCategoryCode: undefined,
    groupCategoryName: undefined,
    displayOrder: 0,
    status: 1,
    createdBy: undefined,
    createdByName: undefined,
    createdDate: undefined,
    updatedBy: undefined,
    updatedByName: undefined,
    updatedDate: undefined,
    jsonData: [],
    keywords: ""
  }
  // const components = {
  //   DropdownIndicator: null
  // }
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

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm<IFDataCategory>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })
  const { fields, remove, append   } = useFieldArray({
    control,
    name: "jsonData"
  })
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [inputValue, setInputValue] = useState<any>("")
  const [valueTag, setValueTag] = useState<any>([])
  const [optionProductTag, setOptionProductTag] = useState<any[]>([])
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


  const handleFormOpened = () => {
    getListGroupCategoryApi({$status: 1})
      .unwrap()
      .then((rs: any[]) => {
        setOptionGroupCategory(rs)
      })

    getListProductTagApi({$status: 1, $type: 4})
      .unwrap()
      .then((rs: any[]) => {
        setOptionProductTag(rs)

        if (dataItem?.keywords && typeModal === 'Edit') {
          const listTag: string[] = dataItem?.keywords?.split(",")
          const result = rs.filter(x => listTag.includes(x.value))
          const newValueTag = listTag.map(tag => {
            const matchedResult = result.find(x => x.value === tag)
            return matchedResult ? matchedResult : { value: tag, label: tag }
          })
          setValueTag(newValueTag)
        }
      })
    if (!isObjEmpty(dataItem) && typeModal === 'Edit') {
      // const lstTags: any[] = []
      // const result = dataItem?.keywords ? dataItem?.keywords?.split(",") : []
      // result?.map((x: any) => {
      //   lstTags.push({ value: x, label: x })
      // })
      // setValueTag(lstTags)
      Object.entries(dataItem).forEach(
        ([name, value]: any) => {
          if (name.includes("Date") || name.includes("date")) {
            setValue(name, value ? new Date(value) : undefined)
          }
          if (name === "jsonData") {
            setValue(name, value ? JSON.parse(value) : [])
          } else {
            setValue(name, value)
          }
        }
      )
    } else if ( 
      parentCategory?.value && typeModal === 'Add'
    ) {
      reset()
      setValue("parentCategoryId", parentCategory?.value)
      setValue("parentCategoryName", parentCategory?.label)
    } else if ( 
      breadCrumb.length > 1 && typeModal === 'Add'
    ) {
      reset()
      const last = breadCrumb[breadCrumb.length - 1]
      if (last?.id) {
        setValue("parentCategoryId", last?.id)
      }
      if (last?.title) {
        setValue("parentCategoryName", last?.title)
      }
    } else {
      reset()
    }
  }

  // ** Function to run when sidebar closes
  const handleFormClosed = () => {
    clearErrors()
    reset()
    setDataItem({})
    setParentCategory({})
    setValueTag("")

  }
  
  // ** Function to reset fileds
  const handleCancel = () => {
    handleModal()
    clearErrors()
    reset()
    setDataItem({})
    setParentCategory({})
    setValueTag("")
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
    const obj = {...data}
    obj.keywords = valueTag ? valueTag?.map((val: any) => val.value).toString() : ""
    obj.jsonData = JSON.stringify(obj.jsonData)
    obj.groupCategoryId = groupAssignedTo?.value
    if (typeModal === 'Add') {
      addCategoryApi(obj).unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModal()
            notificationSuccess(t('Add Successful'))
          } else {
            rs.errors.forEach((element: any) => {
              setError(
                element.propertyName.toLowerCase(),
                { type: 'custom', message: t(element.errorMessage) }
              )
            })
            notificationError(t("Add Fails"))
          }
        })
        .catch((ex) => console.log(ex))
    } else {
      editCategoryApi(obj).unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModal()
            notificationSuccess(t("Update Successful"))
          } else {
            rs.errors.forEach((element: any) => {
              setError(
                element.propertyName.toLowerCase(),
                { type: 'custom', message: t(element.errorMessage) }
              )
            })
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
      className='modal-xl'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleFormClosed}
    >
      <Form id='form-modal-globalzone' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title="Channel List" />
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
                    label={t('CategoryProductCode')}
                    disabled={typeModal === 'Detail'}
                    required={true}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.code}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='name'
                    label={t('CategoryProductName')}
                    disabled={typeModal === 'Detail'}
                    required={true}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.name} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='parentCategoryName'
                    label={t('ParentCategory')}
                    disabled={true}
                    labelSize='d-flex form-row-inline label-medium'
                  />
                </Col>
                <Col md={12} xs={12}>
                  <SelectBox
                    options={optionGroupCategory}
                    control={control}
                    name='groupCategoryId'
                    label={t('InfomationChannel')}
                    labelSize='d-flex form-row-inline label-medium'
                    callback={(e: any) => {
                      setValue("groupCategoryCode", e.key)
                      setValue("groupCategoryName", e.label)
                    }}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='image'
                    label={t('Image')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium'/>
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='url'
                    label={t('Url')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium'/>
                </Col>
                <Col md={12} xs={12}>
                  <div className="d-flex form-row-inline label-medium">
                    <Label className="form-label">{t("Keyword")}</Label>
                    <div className="form-input-content">
                      <CreatableSelect
                        // components={components}
                        inputValue={inputValue}
                        isClearable
                        classNamePrefix="select"
                        className="react-select"
                        isMulti
                        // menuIsOpen={true}
                        onChange={(newValue) => {
                          setValueTag(newValue)
                        }}
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

                <Col md={12} xs={12}>
                  <div
                    className={"d-flex form-row-inline label-medium"}
                  >
                    <Label className="form-label">
                      {t("Attribute")}  </Label>
                    <div>
                      {fields.map((field, index) => {
                        return (
                          <div key={field.id} className="mb-1">
                            <section  className={"d-flex section"} key={field.id}>
                              <Controller
                                name={`jsonData.${index}.name`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    autoFocus
                                    placeholder={t("Code")}
                                    {...field}
                                    className={"me-2"}
                                    style={{minWidth: "20vw"}}
                                  />
                                )}
                             
                              />
                              <Controller
                                name={`jsonData.${index}.value`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    placeholder={t("Value")}
                                    {...field}
                                    className={"me-2"}
                                    style={{minWidth: "30vw"}}
                                  />
                                )}
                              />
                              <div style={{width: "50px", cursor:"pointer"}}  className='d-flex align-items-center'>
                                <Icon.Trash2 fontSize={20} color='red' onClick={() => remove(index)} />
                              </div>
                            </section>
                          </div>
                        )
                      })}
                      {fields.length === 0 && <Col  md={12} xs={12} >
                        <div style={{width: "50px", cursor:"pointer"}}  className='d-flex align-items-center'>
                          <Icon.PlusCircle fontSize={20} color="blue" onClick={() => append({name: '', value: ''})} />

                        </div>
                      </Col>}
                    </div>
                  </div>
                </Col>
                {fields.length !== 0 && <Col md={12} xs={12} style={{marginTop: 0}}>
                  <div
                    className={"d-flex form-row-inline label-medium"}
                  >
                    <Label className="form-label">
                    </Label>
                    <div style={{width: "50px", cursor:"pointer"}}  className='d-flex align-items-center'>
                      <Icon.PlusCircle fontSize={20} color="blue" onClick={() => append({name: '', value: ''})} />

                    </div>
                  </div>
                </Col>}
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
