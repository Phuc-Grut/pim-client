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
import {TextInput, NumberInput} from '@components/input'
import { ProductContext } from '../../useContext'
import classNames from 'classnames'
import { IFDataProductInventory } from '@src/domain/models/IProductInventory'

const SidebarWarehouse = (props: any) => {
  const { t } = useTranslation()
  const { typeSidebar, setDataSidebar, windowSize } = useContext(ProductContext)
  const { dataModal, openModal, handleModal, widthSide } = props


  // ** States
  const formSchema = yup.object().shape({
  })


  const defaultValues: IFDataProductInventory = {
    id: "",
    productId: '',
    warehouseId: "",
    stockQuantity: 0,
    reservedQuantity: 0,
    plannedQuantity: 0
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    reset,
    formState: { }
  } = useForm<IFDataProductInventory>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })


  useEffect(() => {
    if (openModal.warehouse === false) {
      clearErrors()
      reset()
    } else {
      if (dataModal.warehouse && !isObjEmpty(dataModal.warehouse)) {
        Object.entries(dataModal.warehouse).forEach(
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
    setDataSidebar((old: any) => ({ ...old, warehouse: {} }))
    handleModal('warehouse')
  }


  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (typeSidebar.warehouse?.value === 'Add') {
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
    console.log(data)
  }

  const render = () => {
    if (typeSidebar.warehouse?.value === 'Add' || typeSidebar.warehouse?.value === 'Edit') {
      return <div
        className={classNames('customizer po-cus po-sidebar d-none d-md-block', {
          open: openModal.warehouse
        })}
        style={{ width: openModal.warehouse ? widthSide : '400px' }}
      >
        <Form id='form-warehouse' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
          <Scrollbars autoHide
            autoHeight
            autoHeightMax={windowSize.innerHeight - 0}>
            <div className='customizer-header p-50 position-relative bb-1 d-flex align-items-center'>
              <span className='cursor-poiter' ><X onClick={() => handleModal('Warehouse')} /></span>
              {typeSidebar.warehouse.value === 'Add' && <h5 className='mb-0 ms-50'>{t('Add')} - </h5>}
              {typeSidebar.warehouse.value === 'Edit' && <h5 className='mb-0 ms-50'>{t('edit')} - </h5>}
              <h5 className='mb-0 ms-50'>{t('warehouse')}</h5>
            </div>
            <div className='modal-body flex-grow-1 pb-sm-0 pb-3'>
              <Row className="m-0 gy-1 mb-2 me-1">
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="name"
                    label={t("Warehouse name")}
                    placeholder=''
                    required={true}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='weight'
                    label={t('Real weight')}
                    placeholder=''
                    labelSize='label-small'
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='length'
                    label={t('Length')}
                    placeholder=''
                    labelSize='label-small'
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='width'
                    label={t('Width')}
                    placeholder=''
                    labelSize='label-small'
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='height'
                    label={t('Height')}
                    placeholder=''
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
      return <></>
    }
  }
  return render()
}

export default SidebarWarehouse
