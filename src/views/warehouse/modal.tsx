// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Modal, ModalBody, Button, Form, Input, Label, Row, Col } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { WarehouseContext } from './useContext'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useWarehouse } from './hooks'
import { IFDataWarehouse } from '@src/domain/models/IWarehouse'
import { TextInput } from '@components/input'
import { CreatableSelectBox, SelectBox } from '@components/select'
import { useCountry } from '../catalog/countries/hooks'
import { useStateProvince } from '../catalog/state-province/hooks'
import { useDistrict } from '../catalog/district/hooks'
import { useWard } from '../catalog/ward/hooks'
import { notificationSuccess } from '@components/notifications'
import ModalHeader from '@components/modal-header'


const ModalComponent = () => {
  // ** Props
  const { t } = useTranslation()
  const { openModal, handleModal, dataItem, typeModal } = useContext(WarehouseContext)
  // ** States

  const [lstCountry, setlstCountry] = useState<any[]>([])
  const [lstStateProvince, setlstStateProvince] = useState<any[]>([])
  const [lstDistrict, setlstDistrict] = useState<any[]>([])
  const [lstWard, setlstWard] = useState<any[]>([])

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

  //const [country, setCountry] = useState<any>({})
  //const [province, setProvince] = useState<any>({})
  //const [district, setDistrict] = useState<any>({})
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const {
    addWarehouseApi,
    editWarehouseApi
  } = useWarehouse()
  const {
    getListCountryApi
  } = useCountry()
  const {
    getListStateProvinceApi
  } = useStateProvince()
  const {
    getListDistrictApi
  } = useDistrict()
  const {
    getListWardApi
  } = useWard()
  // ** Effect

  // ** States
  const formSchema = yup.object().shape({
    code: yup
      .string()
      .required((t("Warehouse code") + t(" is required")))
      //.matches(/^[A-Za-z0-9]+$/, t("Do not contain special characters"))
      .max(50, (t("Warehouse code") + t(" must less than 255 characters"))),
    // .min(2, (t("Warehouse code") + t(" must greater than 2 characters"))),
    name: yup.string()
      .required((t("Warehouse name") + t(" is required")))
      .max(255, (t("Warehouse name") + t(" must less than 255 characters")))
      .min(2, (t("Warehouse name") + t(" must greater than 2 characters"))),
    phoneNumber: yup
      .string()
      .matches(/^0\d{9,10}$|^$/, t("Invalid phone number"))
      .max(11)
  })

  const defaultValues: IFDataWarehouse = {
    id: "",
    code: "",
    name: "",
    latitude: 0,
    longitude: 0,
    country: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
    api: "",
    token: "",
    displayOrder: 0,
    createdBy: undefined,
    createdDate: undefined,
    updatedBy: undefined,
    updatedDate: undefined,
    coordinates: '',
    status: 1
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    watch,
    setError,
    formState: { errors }
  } = useForm<IFDataWarehouse>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })
  
  useEffect(() => {
    let name = watch("name")
    if (typeModal === 'Edit' && name === dataItem.name) {
      setValue('code', dataItem.code)
    } else {
      name = name?.toLowerCase()
      name = name?.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
      name = name?.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
      name = name?.replace(/ì|í|ị|ỉ|ĩ/g, "i")
      name = name?.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
      name = name?.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
      name = name?.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
      name = name?.replace(/đ/g, "d")
      name = name?.toUpperCase()
      clearErrors()
      setValue('code', getFirstLetters(name))
    }
  }, [watch("name")])

  const getFirstLetters = (str: any) => {
    const firstLetters = str
      .split(' ')
      .map((word: any) => word[0])
      .join('')
    return firstLetters
  }
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

  const changeCountry = (data: any) => {
    setlstStateProvince([])
    setlstDistrict([])
    setlstWard([])
    if (data?.value) {
      const obj = lstCountry.find((a: any) => a.value === data.value)
      if (obj) {
        getListStateProvinceApi({ $country: obj?.id, $status: 1 }).unwrap()
          .then((rs: any) => {
            setTimeout(() => {
              if (rs.length > 0) {
                const newData = rs.map((a: any) => ({ value: a.label, label: a.label, id: a.value }))
                if (typeModal !== "Add" && !rs.find((c: any) => c.label === dataItem?.province)) {
                  newData.unshift({ value: dataItem?.province, label: dataItem?.province })
                }
                setlstStateProvince(newData)
              }
            }, 100)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
    } else {
      getCountry()
    }
    if (typeModal === "Edit" && dataItem?.province) {
      setlstStateProvince([{ value: dataItem?.province, label: dataItem?.province }])
    }
  }

  const changeProvince = (data: any) => {
    setlstDistrict([])
    setlstWard([])
    if (data?.value) {
      const obj = lstStateProvince.find((a: any) => a.value === data.value)
      if (obj) {
        getListDistrictApi({ $stateProvince: obj?.id, $status: 1 }).unwrap()
          .then((rs: any) => {
            setTimeout(() => {
              if (rs.length > 0) {
                const newData = rs.map((a: any) => ({ value: a.label, label: a.label, id: a.value }))
                if (typeModal !== "Add" && !rs.find((c: any) => c.label === dataItem?.district)) {
                  newData.unshift({ value: dataItem?.district, label: dataItem?.district })
                }
                setlstDistrict(newData)
              }
            }, 100)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
    }
    if (typeModal === "Edit" && dataItem?.district) {
      setlstDistrict([{ value: dataItem?.district, label: dataItem?.district }])
    }
  }

  const changeDistrict = (data: any) => {
    setlstWard([])
    if (data?.value) {
      const obj = lstDistrict.find((a: any) => a.value === data.value)
      if (obj) {
        getListWardApi({ $district: obj?.id, $status: 1 }).unwrap()
          .then((rs: any) => {
            setTimeout(() => {
              if (rs.length > 0) {
                const newData = rs.map((a: any) => ({ value: a.label, label: a.label, id: a.value }))
                if (typeModal !== "Add" && !rs.find((c: any) => c.label === dataItem?.ward)) {
                  newData.unshift({ value: dataItem?.ward, label: dataItem?.ward })
                }
                setlstWard(newData)
              }
            }, 100)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
    }
    if (typeModal === "Edit" && dataItem?.ward) {
      setlstWard([{ value: dataItem?.ward, label: dataItem?.ward }])
    }
  }

  // useEffect(() => {
  //   if (country?.value) {
  //     setlstStateProvince([])
  //     setlstDistrict([])
  //     setlstWard([])
  //     getListStateProvinceApi({ $country: country?.value, $status: 1 })
  //       .unwrap()
  //       .then((rs: any) => {
  //         rs.unshift({ value: "", label: t("Select") })
  //         setlstStateProvince(rs)
  //       })
  //       .catch((ex) => {
  //         console.log(ex)
  //       })
  //   }
  //   if (typeModal === "Edit" && dataItem?.province) {
  //     setlstStateProvince([{ value: dataItem?.province, label: dataItem?.province }])
  //   }
  // }, [watch('country')])

  // useEffect(() => {
  //   if (province.value) {
  //     setlstDistrict([])
  //     setlstWard([])
  //     getListDistrictApi({ $stateProvince: province?.value, $status: 1 })
  //       .unwrap()
  //       .then((rs: any) => {
  //         setlstDistrict(rs)
  //       })
  //       .catch((ex) => {
  //         console.log(ex)
  //       })
  //   }
  //   if (typeModal === "Edit" && dataItem?.district) {
  //     setlstDistrict([{ value: dataItem?.district, label: dataItem?.district }])
  //   }
  // }, [province])

  // useEffect(() => {
  //   if (district.value) {
  //     setlstWard([])
  //     getListWardApi({ $district: district?.value, $status: 1 })
  //       .unwrap()
  //       .then((rs: any) => {
  //         setlstWard(rs)
  //       })
  //       .catch((ex) => {
  //         console.log(ex)
  //       })
  //   }
  //   if (typeModal === "Edit" && dataItem?.ward) {
  //     setlstWard([{ value: dataItem?.ward, label: dataItem?.ward }])
  //   }
  // }, [district])
  // ** Function to run when sidebar opens
  //Quốc gia
  const getCountry = () => {
    getListCountryApi({ $status: 1 })
      .unwrap()
      .then((rsCountry: any) => {
        setTimeout(() => {
          // if (typeModal?.value !== "Add" && !rs.find((c: any) => c.label === dataItem?.country)) {
          //   setlstCountry([{ value: dataItem?.country, label: dataItem?.country }])
          // } else {
          //   if (rs.length > 0) {
          //     const newData = rs.map((a: any) => ({ value: a.label, label: a.label, id: a.value }))
          //     setlstCountry(newData)
          //   }
          // }
          if (rsCountry.length > 0) {
            const newData = rsCountry.map((a: any) => ({ value: a.label, label: a.label, id: a.value }))
            if (typeModal !== "Add" && !rsCountry.find((c: any) => c.label === dataItem?.country)) {
              newData.unshift({ value: dataItem?.country, label: dataItem?.country })
            }
            setlstCountry(newData)
          }

          if (dataItem?.country) {
            const country = rsCountry.find((a: any) => a.label === dataItem?.country)
            getListStateProvinceApi({ $country: country?.value, $status: 1 }).unwrap()
              .then((rsProvince: any) => {
                setTimeout(() => {
                  if (rsProvince.length > 0) {
                    const newData = rsProvince.map((a: any) => ({ value: a.label, label: a.label, id: a.value }))
                    setlstStateProvince(newData)
                  }

                  if (dataItem?.province) {
                    const province = rsProvince.find((a: any) => a.label === dataItem?.province)
                    getListDistrictApi({ $stateProvince: province?.value, $status: 1 }).unwrap()
                      .then((rsDistric: any) => {
                        setTimeout(() => {
                          if (rsDistric.length > 0) {
                            const newData = rsDistric.map((a: any) => ({ value: a.label, label: a.label, id: a.value }))
                            setlstDistrict(newData)
                          }

                          if (dataItem?.district) {
                            const district = rsDistric.find((a: any) => a.label === dataItem?.district)
                            getListWardApi({ $district: district?.value, $status: 1 }).unwrap()
                              .then((rsWard: any) => {
                                setTimeout(() => {
                                  if (rsWard.length > 0) {
                                    const newData = rsWard.map((a: any) => ({ value: a.label, label: a.label, id: a.value }))
                                    setlstWard(newData)
                                  }
                                }, 100)
                              })
                              .catch((ex) => {
                                console.log(ex)
                              })
                          }
                        }, 100)
                      })
                      .catch((ex) => {
                        console.log(ex)
                      })
                  }
                }, 100)
              })
              .catch((ex) => {
                console.log(ex)
              })
          }
          
        }, 100)
      })
      .catch((ex) => {
        console.log(ex)
      })
  }
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
      changeCountry({ value: dataItem?.country })
      changeProvince({ value: dataItem?.province })
      changeDistrict({ value: dataItem?.district })

      
    } else {
      reset()
    }
    getCountry()
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
    data.latitude = parseFloat(data.latitude)
    data.longitude = parseFloat(data.longitude)
    if (typeModal === 'Add') {
      addWarehouseApi(data).unwrap()
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
      editWarehouseApi(data).unwrap()
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
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title='Warehouse' />
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
                    label={t('Warehouse code')}
                    required={true}
                    labelSize='d-flex form-row-inline label-small'
                    placeholder={t("AutomaticGeneration")}
                    errors={errors.code} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='name'
                    label={t('Warehouse name')}
                    required={true}
                    labelSize='d-flex form-row-inline label-small'
                    errors={errors.name} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='company'
                    label={t('Company')}
                    labelSize='d-flex form-row-inline label-small'
                    errors={errors.company} />
                </Col>
                <Col md={6} xs={12}>
                  <div className="d-flex form-row-inline label-small">
                    <Label className="form-label">{t("Location")}</Label>
                    <div className="form-input-content">
                      <Row>
                        <Col md={6} xs={12}>
                          <Controller
                            name={'latitude'}
                            control={control}
                            render={({ field }) => (
                              <Input
                                autoFocus
                                type={'text'}
                                {...field}
                              />
                            )}
                          />
                        </Col>
                        <Col md={6} xs={12}>
                          <Controller
                            name={'longitude'}
                            control={control}
                            render={({ field }) => (
                              <Input
                                autoFocus
                                type={'text'}
                                {...field}
                              />
                            )}
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='displayOrder'
                    type='number'
                    label={t('Display order')}
                    labelSize='d-flex form-row-inline label-small'
                  />
                </Col>
                <Col md={12} xs={12}>
                  <div className="d-flex form-row-inline label-small">
                    <Label className="form-label">{t("Address")}</Label>
                    <div className="form-input-content">
                      <Row className="gy-50">
                        <Col lg={3}>
                          <CreatableSelectBox
                            control={control}
                            name="country"
                            callback={(val: any) => changeCountry(val)}
                            isLabel={false}
                            isClearable={true}
                            options={lstCountry}
                            placeholder={t("SelectCountry")}
                          />
                        </Col>
                        <Col lg={3}>
                          <CreatableSelectBox
                            control={control}
                            name="province"
                            callback={(val: any) => changeProvince(val)}
                            isLabel={false}
                            isClearable={true}
                            // fieldValue="label"
                            options={lstStateProvince}
                            placeholder={t("SelectProvince")}
                          />
                        </Col>
                        <Col lg={3}>
                          <CreatableSelectBox
                            control={control}
                            name="district"
                            callback={(val: any) => changeDistrict(val)}
                            isLabel={false}
                            isClearable={true}
                            // fieldValue="label"
                            options={lstDistrict}
                            placeholder={t("SelectDistrict")}
                          />
                        </Col>
                        <Col lg={3}>
                          <CreatableSelectBox
                            control={control}
                            name="ward"
                            isLabel={false}
                            isClearable={true}
                            // fieldValue="label"
                            options={lstWard}
                            placeholder={t("SelectWard")}
                          />
                        </Col>
                        <Col lg={12}>
                          <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                              //placeholder={t('Địa chỉ chi tiết')}
                              />
                            )}
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='postalCode'
                    label={t('PostalCode')}
                    labelSize='d-flex form-row-inline label-small'
                  />
                </Col>
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='phoneNumber'
                    label={t('Phone number')}
                    labelSize='d-flex form-row-inline label-small'
                    errors={errors.phoneNumber}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='api'
                    label={t('Api')}
                    labelSize='d-flex form-row-inline label-small'
                  />
                </Col>
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='token'
                    label={t('Token')}
                    labelSize='d-flex form-row-inline label-small'
                  />
                </Col>
                <Col md={6} xs={12}>
                  <SelectBox
                    control={control}
                    name="status"
                    labelSize='label-small'
                    label={t("Status")}
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
      </Form >
    </Modal >
  )
}

export default ModalComponent
