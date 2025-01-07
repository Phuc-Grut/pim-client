// ** React Imports
import { Fragment, useContext, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Modal, ModalBody, Button, Form, Label, Row, Col } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { ServiceAddContext } from './useContext'
import { useTranslation } from 'react-i18next'
import { useServiceAdd } from './hooks'
import { IFDataServiceAdd } from '@src/domain/models/IServiceAdd'
import {TextInput, FormulaInput, NumberInput} from '@components/input'
import {SelectBox} from '@components/select'
import { notificationSuccess } from '@components/notifications'
import ModalHeader from '@components/modal-header'
import { statusDefault } from '@src/domain/constants/constantSelect'
import { useCurrency } from '../catalog/currency/hooks'

// const parameters: any[] = [
//   {
//     type: 'parameters',
//     value: 'DANH_MUC_SAN_PHAM',
//     label: 'Danh mục sản phẩm',
//     description: 'Tham số tương ứng với Danh mục sản phẩm trong sản phẩm'
//   },
//   {
//     type: 'parameters',
//     value: 'KENH_THONG_TIN',
//     label: 'Kênh thông tin',
//     description: 'Tự động tính dự trên mức lương đóng BH và tỷ lệ đóng trong hồ sơ nhân viên'
//   }
// ]

const ModalComponent = () => {
  // ** Props
  const { t } = useTranslation()
  const ref = useRef()
  const { openModal, handleModal, dataItem, typeModal } = useContext(ServiceAddContext)
  const [listCurrency, setlistCurrency] = useState<any[]>([])
  const [parameters, setParameters] = useState<any[]>([])

  // ** States
  const {
    addServiceAddApi,
    editServiceAddApi,
    getListBoxServiceAddPriceSyntaxApi
  } = useServiceAdd()
  const {
    getListCurrencyApi
  } = useCurrency()

  // ** States
  const formSchema = yup.object().shape({
    code: yup
      .string()
      .required((t("ServiceCode") + t(" is required")))
      //.matches(/^[A-Za-z0-9]+$/, t("Do not contain special characters"))
      .max(50, (t("ServiceCode") + t(" must less than 255 characters"))),
    // .min(2, (t("ServiceCode") + t(" must greater than 2 characters"))),
    name: yup.string()
      .required((t("ServiceName") + t(" is required")))
      .max(255, t("ServiceName") + t(" must less than 255 characters"))
      .min(2, (t("ServiceName") + t(" must greater than 2 characters"))),
    note: yup
      .string()
      .max(500, (t("Note") + t(" must less than 500 characters")))
  })
  const listMethod = [
    {
      value: 0,
      label: 'Cố định'
    }, {
      value: 1,
      label: 'Biến động'
    }
  ]
  const defaultValues: IFDataServiceAdd = {
    id: "",
    code: "",
    name: "",
    description: "",
    calculationMethod: 0,
    price: 0,
    priceSyntax: "",
    minPrice: 0,
    maxPrice: 0,
    status: 1,
    displayOrder: 0,
    currency: 'VND'
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    setValue,
    setError,
    formState: { errors }
  } = useForm<IFDataServiceAdd>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })


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
    getListCurrencyApi({})
      .unwrap()
      .then((rs: any) => {
        setTimeout(() => {
          const newrs = rs?.map((a:any) => ({value: a.key, key:a.value, label: a.key}))
          setlistCurrency(newrs)
        }, 100)
      })
      .catch((ex) => {
        console.log(ex)
      })

    getListBoxServiceAddPriceSyntaxApi()
      .unwrap()
      .then((rs: any) => {
        setTimeout(() => {
          const newList = rs?.map((a:any) => ({type: a.type, value: a.key, description: a.description, label: a.label}))
          setParameters(newList)
        }, 100)
      })
      .catch((ex) => {
        console.log(ex)
      })
  }

  // ** Function to run when sidebar closes
  const handleFormClosed = () => {
    clearErrors()
    reset()
  }
 
  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color="primary" className="mb-75 me-1">
          {t('Save')}
        </Button>
        <Button color="secondary" onClick={handleModal} outline className="mb-75 me-1">
          {t('Close')}
        </Button>
      </Fragment>
    )
  }


  const onSubmit = (data: any) => {
    if (typeModal === 'Add') {
      addServiceAddApi(data).unwrap()
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
      editServiceAddApi(data).unwrap()
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
      backdrop='static'
      scrollable
    >
      <Form id='form-modal-globalzone' className='todo-modal modal-form-content' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title="ServiceAdd" />
        <ModalBody>
          <Row className="m-0 gy-1 mb-2 me-1">
            <Col md={12} xs={12}>
              <TextInput
                control={control}
                name='code'
                label={t('ServiceCode')}
                labelSize='d-flex form-row-inline label-medium'
                required
                errors={errors.code}
              />
            </Col>
            <Col md={12} xs={12}>
              <TextInput
                control={control}
                name='name'
                label={t('ServiceName')}
                required={true}
                labelSize='d-flex form-row-inline label-medium'
                errors={errors.name} />
            </Col>
            <Col md={12} xs={12}>
              <TextInput
                control={control}
                name='description'
                label={t('Description')}
                labelSize='d-flex form-row-inline label-medium'
                type='textarea'
                row={2}
                errors={errors.description} />
            </Col>
            <Col md={6} xs={12}>
              <SelectBox
                control={control}
                name="calculationMethod"
                label={t('CalculationMethod')}
                labelSize='d-flex form-row-inline label-medium'
                options={listMethod}
                placeholder={t("")}
              />
            </Col>
            <Col md={6} xs={12}>
              <SelectBox
                control={control}
                name="currency"
                label={t('Currency')}
                labelSize='d-flex form-row-inline label-medium'
                options={listCurrency}
                isClearable={true}
                placeholder={t("")}
              />
            </Col>
            {
              watch("calculationMethod") === 0 && <>
                <Col md={6} xs={12}>
                  <NumberInput
                    control={control}
                    name='price'
                    label={t('FixPrice')}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.displayOrder} />
                </Col>
                <Col md={6} xs={12}>
                </Col>
              </>
            }
            
            {
              watch("calculationMethod") === 1 && <>
                <Col md={6} xs={12}>
                  <NumberInput
                    control={control}
                    name='minPrice'
                    label={t('MinPrice')}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.displayOrder} />
                </Col>
                <Col md={6} xs={12}>
                  <NumberInput
                    control={control}
                    name='maxPrice'
                    label={t('MaxPrice')}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.displayOrder} />
                </Col>
                <Col xs={12}>
                  <div className="d-flex form-row-inline label-medium">
                    <Label className="form-label">
                      {t("PriceSyntax")}
                    </Label>
                    <div className='form-input-content'>
                      <Controller
                        name="priceSyntax"
                        control={control}
                        render={({ field: { value, onChange, ...props } }) => (
                          <FormulaInput
                            {...props}
                            type='textarea'
                            parameters={parameters}
                            value={value}
                            onChange={onChange}
                            ref={ref}
                          />
                        )}
                      />
                    </div>
                  </div>
                </Col>
              </>
            }

            {/* {
              watch("calculationMethod") === 1 && 
                
            }
             */}

            <Col md={6} xs={12}>
              <SelectBox
                control={control}
                name="status"
                labelSize='d-flex form-row-inline label-medium'
                label={t("Status")}
                placeholder={t("Select")}
                options={statusDefault}
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
        </ModalBody>
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
