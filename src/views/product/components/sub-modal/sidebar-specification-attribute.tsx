// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import { X } from 'becoxy-icons'
import { useForm } from 'react-hook-form'
import { Button, Form, Row, Col } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import {SelectBox} from '@components/select'
import { useProduct } from '../../hooks'
import { ProductContext } from '../../useContext'
import { notificationError, notificationSuccess } from '@components/notifications'
import classNames from 'classnames'
import { useSpecificationAttribute } from '@src/views/attribute/specification-attribute/hooks'
import { connectString } from '@src/utility/hooks/connectString'
import { IFDataProductSpecificationAttributeMapping } from '@src/domain/models/IProductSpecificationAttributeMapping'

const SidebarSpecAttr = (props: any) => {
  const { t } = useTranslation()
  const { getListSpecificationAttributeApi, getByIdApi } = useSpecificationAttribute()
  const { addProductSpecificationAttributeMappingApi, editProductSpecificationAttributeMappingApi } = useProduct()
  const { dataItem, typeSidebar, setDataSidebar, setTypeSidebar, tabIndex, windowSize } = useContext(ProductContext)
  const { dataModal, openModal, handleModal, widthSide } = props
  const [specificationAttribute, setSpecificationAttribute]: any = useState()
  const [optionSpecificationAttribute, setOptionSpecificationAttribute] = useState([])
  const [optionSpecificationAttributeOption, setOptionSpecificationAttributeOption] = useState([])

  // ** States
  const formSchema = yup.object().shape({
    specificationAttributeId: yup.string().required(connectString(['Specification attribute', 'isRequired'])),
    specificationAttributeOptionId: yup.string().required(connectString(['Option', 'isRequired']))
  })

  const defaultValues: IFDataProductSpecificationAttributeMapping = {
    id: "",
    productId: '',
    specificationAttributeOptionId: '',
    specificationAttributeId: '',
    displayOrder: 0
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    resetField,
    reset,
    formState: { errors }
  } = useForm<IFDataProductSpecificationAttributeMapping>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })

  useEffect(() => {
    if (openModal.specAttr === false) {
      reset()
    } else {
      if (dataModal.specAttr && !isObjEmpty(dataModal.specAttr)) {
        Object.entries(dataModal.specAttr).forEach(
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
    if (tabIndex === '2' && openModal.specAttr === true) {
      getListSpecificationAttributeApi({$status: 1}).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setOptionSpecificationAttribute(rs)
          }, 10)
        })
        .catch((ex) => {
          console.log(ex)
        })
    }

  }, [openModal, tabIndex])

  useEffect(() => {
    if (specificationAttribute?.value) {
      resetField('specificationAttributeOptionId')
      getByIdApi(specificationAttribute?.value).unwrap()
        .then((rs) => {
          if (rs?.options) {
            const newrs = rs?.options.map((a: any) => ({ ...a, label: a.name, value: a.id, key: a.code }))
            setTimeout(() => {
              setOptionSpecificationAttributeOption(newrs)
            }, 10)
          }

        })
        .catch((ex) => {
          console.log(ex)
        })
    }
  }, [specificationAttribute])
  // ** Function to reset fileds
  const handleCancel = () => {
    clearErrors()
    reset()
    setDataSidebar((old: any) => ({ ...old, specAttr: {} }))
    handleModal('specAttr')
  }

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (typeSidebar.serviceAdd?.value === 'Add') {
      return (
        <Fragment>
          <Button color="primary" type="submit" onClick={handleSubmit(onSubmit)} className="mb-75 me-1">
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
          <Button color="primary" type="submit" onClick={handleSubmit(onSubmit)} className="mb-75 me-1">
            {t('Save')}
          </Button>
          <Button color="secondary" onClick={handleCancel} outline className="mb-75 me-1">
            {t('Close')}
          </Button>
        </Fragment>
      )
    }
  }

  const onSubmit = (data: any) => {
    data.productId = dataItem?.id
    if (typeSidebar.specAttr?.value === 'Add') {
      addProductSpecificationAttributeMappingApi(data).unwrap()
        .then((rs) => {
          if (rs.errors.length === 0) {
            clearErrors()
            reset()
            notificationSuccess(t('Add Successful'))
          } else {
            notificationError(t('Add Failed'))
          }
        })
        .catch((ex) => console.log(ex))
    } else {
      editProductSpecificationAttributeMappingApi(data).unwrap()
        .then((rs) => {
          if (rs.errors.length === 0) {
            clearErrors()
            reset()
            setDataSidebar((old: any) => ({ ...old, specAttr: {} }))
            setTypeSidebar((old: any) => ({ ...old, specAttr: { value: 'Add' } }))
            notificationSuccess(t("Update Successful"))
          } else {
            notificationError(t('Update Failed'))
          }
        })
        .catch((ex) => console.log(ex))
    }
  }

  const render = () => {
    if (typeSidebar.specAttr?.value === 'Add' || typeSidebar.specAttr?.value === 'Edit') {
      return <div
        className={classNames('customizer po-cus po-sidebar d-none d-md-block', {
          open: openModal['specAttr']
        })}
        style={{ width: openModal['specAttr'] ? widthSide : '400px' }}
      >
        <Form id='form-specAttr' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
          <Scrollbars autoHide
            autoHeight
            autoHeightMax={windowSize.innerHeight - 0}>
            <div className='customizer-header p-50 position-relative bb-1 d-flex align-items-center'>
              <span className='cursor-poiter' ><X onClick={() => handleModal('specAttr')} /></span>
              {typeSidebar.specAttr.value === 'Add' && <h5 className='mb-0 ms-50'>{t('Add')} - </h5>}
              {typeSidebar.specAttr.value === 'Edit' && <h5 className='mb-0 ms-50'>{t('edit')} - </h5>}
              <h5 className='mb-0 ms-50'>{t('Specification attribute')}</h5>
            </div>
            <div className='modal-body flex-grow-1 pb-sm-0 pb-3'>
              <Row className="m-0 gy-1 mb-2 me-1">
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="specificationAttributeId"
                    label={t("Specification attribute")}
                    placeholder=''
                    inLine={false}
                    required={true}
                    errors={errors.specificationAttributeId}
                    callback={(val: any) => setSpecificationAttribute(val)}
                    options={optionSpecificationAttribute}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="specificationAttributeOptionId"
                    label={t("Option")}
                    placeholder=''
                    required={true}
                    errors={null}
                    inLine={false}
                    options={optionSpecificationAttributeOption}
                  />
                </Col>
              </Row>
            </div>
          </Scrollbars>
          <div
            className="d-flex p-1"
            style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}
          >
            {renderFooterButtons()}
          </div>
        </Form>
      </div>
    } else {
      return null
    }
  }

  return render()
}

export default SidebarSpecAttr
