// ** React Imports
import { Fragment, useContext, useEffect } from 'react'
import { X } from 'becoxy-icons'
import { useForm } from 'react-hook-form'
import { Button, Form, Row, Col } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useProduct } from '../../hooks'
import { ProductContext } from '../../useContext'
import { notificationError, notificationSuccess } from '@components/notifications'
import classNames from 'classnames'
import { IFDataProductPackage } from '@src/domain/models/IProdcuctPackage'
import { connectString } from '@src/utility/hooks/connectString'
import {NumberInput, TextInput} from "@components/input"

const SidebarPackage = (props: any) => {
  const { t } = useTranslation()
  const { dataItem, typeSidebar, setDataSidebar, setTypeSidebar, windowSize } = useContext(ProductContext)
  const { dataModal, openModal, handleModal, widthSide } = props

  const { addProductPackageApi, editProductPackageApi } = useProduct()

  // ** States
  const formSchema = yup.object().shape({
    name: yup.string().required(connectString(['Package name', 'isRequired']))
  })


  const defaultValues: IFDataProductPackage = {
    id: "",
    name: '',
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    productId: ""
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    reset,
    formState: { errors }
  } = useForm<IFDataProductPackage>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })


  useEffect(() => {
    if (openModal.package === false) {
      clearErrors()
      reset()
    } else {
      if (dataModal.package && !isObjEmpty(dataModal.package)) {
        Object.entries(dataModal.package).forEach(
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
  }, [openModal])

  // ** Function to reset fileds
  const handleCancel = () => {
    reset()
    setDataSidebar((old: any) => ({ ...old, package: {} }))
    handleModal('package')
  }


  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (typeSidebar.package?.value === 'Add') {
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
          {/* <Button tag={Label} color="primary" className="mb-75 me-1">
            {t('Attached')}
            <Input type='file' onChange={onChangeFile} multiple hidden />
          </Button> */}
          <Button color="secondary" onClick={handleCancel} outline className="mb-75 me-1">
            {t('Close')}
          </Button>
        </Fragment>
      )
    }
  }

  const onSubmit = (data: any) => {
    data.productId = dataItem?.id
    if (typeSidebar.package?.value === 'Add') {
      addProductPackageApi(data).unwrap()
        .then((rs) => {
          if (rs.errors.length === 0) {
            reset()
            clearErrors()
            notificationSuccess(t('Add Successful'))
          } else {
            notificationError(t('Add Failed'))
          }
        })
        .catch((ex) => console.log(ex))
    } else {
      editProductPackageApi(data).unwrap()
        .then((rs) => {
          if (rs.errors.length === 0) {
            reset()
            clearErrors()
            setDataSidebar((old: any) => ({ ...old, package: {} }))
            setTypeSidebar((old: any) => ({ ...old, package: { value: 'Add' } }))
            notificationSuccess(t("Update Successful"))
          } else {
            notificationError(t('Update Failed'))
          }
        })
        .catch((ex) => console.log(ex))
    }
  }

  const render = () => {
    if (typeSidebar.package?.value === 'Add' || typeSidebar.package?.value === 'Edit') {
      return <div
        className={classNames('customizer po-cus po-sidebar d-none d-md-block', {
          open: openModal.package
        })}
        style={{ width: openModal.package ? widthSide : '400px' }}
      >
        <Form id='form-package' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
          <Scrollbars autoHide
            autoHeight
            autoHeightMax={windowSize.innerHeight - 0}>
            <div className='customizer-header p-50 position-relative bb-1 d-flex align-items-center'>
              <span className='cursor-poiter' ><X onClick={() => handleModal('package')} /></span>
              {typeSidebar.package.value === 'Add' && <h5 className='mb-0 ms-50'>{t('Add')} - </h5>}
              {typeSidebar.package.value === 'Edit' && <h5 className='mb-0 ms-50'>{t('edit')} - </h5>}
              <h5 className='mb-0 ms-50'>{t('Package')}</h5>
            </div>
            <div className='modal-body flex-grow-1 pb-sm-0 pb-3'>
              <Row className="m-0 gy-1 mb-2 me-1">
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="name"
                    label={t("Package name")}
                    placeholder=''
                    required={true}
                    inLine={false}
                    errors={errors.name}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='weight'
                    label={t('Real weight')}
                    placeholder=''
                    inLine={false}
                    labelSize='label-small'
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='length'
                    label={t('Lenght')}
                    placeholder=''
                    inLine={false}
                    labelSize='label-small'
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='width'
                    label={t('Width')}
                    placeholder=''
                    inLine={false}
                    labelSize='label-small'
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='height'
                    label={t('Height')}
                    placeholder=''
                    inLine={false}
                    labelSize='label-small'
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

export default SidebarPackage
