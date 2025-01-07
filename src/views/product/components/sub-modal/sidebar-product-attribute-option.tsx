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
import { useProduct } from '../../hooks'
import { ProductContext } from '../../useContext'
import { notificationError, notificationSuccess } from '@components/notifications'
import classNames from 'classnames'
import { useProductAttribute } from '@src/views/attribute/product-attribute/hooks'
import { IFDataProductVariantAttributeValue } from '@src/domain/models/IProductVariantAttributeValue'
import AvatarComponent from '@components/avatar-component'
import { useUploadFile } from '@src/utility/hooks/useUploadFile'
import GridTableTemplate from "@components/table-sub-modelTemplate"
import { IGridColumns } from '@src/domain/interfaces/IGridColumns'
import { headerTemplate } from '@src/utility/Common'
import { removeEmpty } from '@src/utility/hooks/objectRemoveEmptyData'
import { IContextMenu } from '@src/domain/models/IContextMenu'
import { ContextMenuItems } from '@src/domain/constants/constantContextMenu'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import {SelectBox} from "@components/select"
import {NumberInput} from "@components/input"
const MySwal = withReactContent(Swal)

const SidebarProdAttrOption = (props: any) => {
  const { t } = useTranslation()
  const { getByIdApi } = useProductAttribute()
  const { uploadImageApi } = useUploadFile()
  const {
    addProductVariantAttributeValueApi,
    editProductVariantAttributeValueApi,
    getPagingProductVariantAttributeValueApi,
    checkProductVariantAttributeValueInit,
    deleteProductVariantAttributeValueApi
  } = useProduct()
  const { typeSidebar, setDataSidebar, setTypeSidebar, tabIndex, dataSidebar, windowSize } = useContext(ProductContext)
  const { dataModal, openModal, handleModal, widthSide } = props

  const [listOption, setListOption] = useState<any[]>([])
  const [selectedOption, setSelectedOption] = useState<any>({})
  const [dataTableOption, setDataTableOption] = useState<any[]>([])
  const [commandData, setCommandData] = useState<any>({})
  // ** States

  const canContextMenuItems: IContextMenu[] = []
  const listContextMenuPermission = [
    { id: 'EDIT' },
    { id: 'DELETE' }
  ]

  listContextMenuPermission.map((item: any) => {
    const rs: any = ContextMenuItems.find((menu: any) => menu.id === item.id)
    if (rs) {
      canContextMenuItems.push(rs)
    }
  })

  const formSchema = yup.object().shape({
  })

  const defaultValues: IFDataProductVariantAttributeValue = {
    id: '',
    productVariantAttributeId: '',
    code: '',
    name: '',
    alias: '',
    image: '',
    color: '',
    priceAdjustment: undefined,
    weightAdjustment: undefined,
    displayOrder: 0,
    createdBy: '',
    createdDate: undefined,
    updatedBy: '',
    updatedDate: undefined,
    createdByName: '',
    updatedByName: ''
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    resetField,
    reset,
    formState: { }
  } = useForm<IFDataProductVariantAttributeValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })

  const colorTemplate = (props: any) => {
    return (
      <div>
        <div>
          <span>{props?.color}</span>
          {props?.color && <span
            className='b-50 d-inline-block ms-1'
            style={{
              borderRadius: '3px',
              width: '20px',
              height: '20px',
              backgroundColor: props?.color ?? '#000'
            }} >
          </span>}
        </div>
      </div>
    )
  }
  const column: IGridColumns[] = [
    {
      isPrimaryKey: false,
      field: 'name',
      headerText: 'Name',
      visible: true,
      width: 150,
      maxWidth: 200,
      minWidth: 120,
      headerTemplate
    },
    {
      isPrimaryKey: false,
      field: 'color',
      headerText: 'Color',
      visible: true,
      width: 100,
      maxWidth: 120,
      minWidth: 80,
      headerTemplate,
      template: colorTemplate
    }
  ]


  useEffect(() => {
    if (openModal.prodAttrOpt === false) {
      reset()
    } else if (openModal.prodAttrOpt === true) {
      if (tabIndex === '2' && dataModal.prodAttrOpt && !isObjEmpty(dataModal.prodAttrOpt)) {
        renderSetvalue(dataModal.prodAttrOpt)

        getByIdApi(dataSidebar.prodAttrOpt?.productAttributeId).unwrap()
          .then((rs) => {
            if (rs?.options) {
              const newrs = rs.options.map((a: any) => ({ ...a, value: a.id, label: a.name }))
              setTimeout(() => {
                setListOption(newrs)
              }, 10)
            }

          })
          .catch((ex) => {
            console.log(ex)
          })
      }
    }

  }, [openModal, tabIndex])

  useEffect(() => {
    if (openModal.prodAttrOpt === false) {
      reset()
    } else if (openModal.prodAttrOpt === true) {
      if (tabIndex === '2' && dataModal.prodAttrOpt && !isObjEmpty(dataModal.prodAttrOpt)) {
        getPagingProductVariantAttributeValueApi({
          $skip: 1,
          $top: 100,
          $productVariantAttributeId: dataModal.prodAttrOpt?.id
        }).unwrap()
          .then((rs) => {
            if (rs?.items) {
              setTimeout(() => {
                setDataTableOption(rs?.items)
              })

            }
          })
      }
    }
  }, [openModal, checkProductVariantAttributeValueInit])

  const renderSetvalue = (data: any) => {
    if (data && !isObjEmpty(data)) {
      Object.entries(data).forEach(
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
  // ** Function to reset fileds
  const handleCancel = () => {
    clearErrors()
    setDataTableOption([])
    setSelectedOption([])
    setCommandData({})
    reset()
    setDataSidebar((old: any) => ({ ...old, prodAttrOpt: {} }))
    handleModal('prodAttrOpt')
  }

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color="primary" type="submit" onClick={handleSubmit(onSubmit)} className="me-1">
          {t('Save')}
        </Button>
        <Button color="secondary" onClick={handleCancel} outline className="me-1">
          {t('Close')}
        </Button>
      </Fragment>
    )
  }

  useEffect(() => {
    if (commandData.type === 'EDIT') {
      if (setTypeSidebar) {
        setTypeSidebar((old: any) => ({ ...old, prodAttrOpt: { value: 'Edit' } }))
      }
      renderSetvalue(commandData.data)
    } else if (commandData.type === 'DELETE') {
      MySwal.fire({
        title: t('Confirm'),
        text: t('Do you want to delete item?'),
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: t('Delete'),
        cancelButtonText: t('Cancel'),
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger ms-1'
        },
        buttonsStyling: false
      }).then(async (result) => {
        if (result.value) {
          deleteProductVariantAttributeValueApi(commandData.data.id)
            .unwrap()
            .then((rs) => {
              if (rs.isValid) {
                notificationSuccess(t('Delete Item successful!'))
              }
            })
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
        }
      })
    }
  }, [commandData])

  const onSubmit = (_data: any) => {
    const data = removeEmpty(_data)
    if (typeSidebar.prodAttrOpt?.value === 'Add') {
      data.productVariantAttributeId = dataSidebar.prodAttrOpt?.id
      addProductVariantAttributeValueApi(data).unwrap()
        .then((rs) => {
          if (rs.errors.length === 0) {
            clearErrors()
            setSelectedOption([])
            setCommandData({})
            reset()
            notificationSuccess(t('Add Successful'))
          } else {
            notificationError(t('Add Failed'))
          }
        })
        .catch((ex) => console.log(ex))
    } else {
      editProductVariantAttributeValueApi(data).unwrap()
        .then((rs) => {
          if (rs.errors.length === 0) {
            clearErrors()
            setSelectedOption([])
            setCommandData({})
            reset()
            setTypeSidebar((old: any) => ({ ...old, prodAttrOpt: { value: 'Add' } }))
            notificationSuccess(t("Update Successful"))
          } else {
            notificationError(t('Update Failed'))
          }
        })
        .catch((ex) => console.log(ex))
    }
  }

  const render = () => {
    if (typeSidebar.prodAttrOpt?.value === 'Add' || typeSidebar.prodAttrOpt?.value === 'Edit') {
      return <div
        className={classNames('customizer po-cus po-sidebar d-none d-md-block', {
          open: openModal.prodAttrOpt
        })}
        style={{ width: openModal.prodAttrOpt ? widthSide : '400px' }}
      >
        <Form id='form-prodAttrOpt' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
          <Scrollbars autoHide
            autoHeight
            autoHeightMax={windowSize.innerHeight - 0}>
            <div className='customizer-header p-50 position-relative bb-1 d-flex align-items-center'>
              <span className='cursor-poiter' ><X onClick={() => handleCancel()} /></span>
              {typeSidebar.prodAttrOpt.value === 'Add' && <h5 className='mb-0 ms-50'>{t('Add')} - </h5>}
              {typeSidebar.prodAttrOpt.value === 'Edit' && <h5 className='mb-0 ms-50'>{t('edit')} - </h5>}
              <h5 className='mb-0 ms-50'>{t('Product attribute option')}: {dataSidebar.prodAttrOpt?.name}</h5>
            </div>
            <div className='modal-body flex-grow-1 pb-sm-0 pb-3'>
              <Row className="m-0 gy-1 mb-1 me-1">
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="code"
                    labelSize='label-medium'
                    label={t("Option")}
                    placeholder=''
                    required={true}
                    options={listOption}
                    callback={(val: any) => {
                      setSelectedOption(val)
                      renderSetvalue(val)
                    }}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='priceAdjustment'
                    label={t('PriceAdjustment')}
                    required={true}
                    placeholder=''
                    labelSize='label-medium'
                  />
                </Col>
                <Col md={12} xs={12}>
                  <NumberInput
                    control={control}
                    name='weightAdjustment'
                    label={t('WeightAdjustment')}
                    required={true}
                    placeholder=''
                    labelSize='label-medium'
                  />
                </Col>
                <Col md={8} xs={12}>
                  <div className='d-flex'>
                    <AvatarComponent
                      control={control}
                      name='image'
                      height={70}
                      width={70}
                      labelSize='label-medium'
                      errors={null}
                      callback={(e: any) => {
                        if (typeof (e.target?.files[0]) !== 'string') {
                          const fromData = new FormData()
                          fromData.append('becoxy', e.target?.files[0])
                          uploadImageApi(fromData).unwrap()
                            .then((rs: any) => {
                              if (!(rs.errors?.length > 0 || rs.detailErrors?.length > 0)) {
                                setValue('image', rs.path)
                              }
                            })
                        } else {
                          resetField('image')
                        }
                      }}
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <div className='mb-1'>
                    <div>{t('Color')}</div>
                    <div>
                      <span>{selectedOption?.color}</span>
                      {selectedOption?.color && <span
                        className='b-50 d-inline-block ms-1'
                        style={{
                          borderRadius: '3px',
                          width: '20px',
                          height: '20px',
                          backgroundColor: selectedOption?.color ?? '#000'
                        }} >
                      </span>}
                    </div>
                  </div>
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
        <div>
          <GridTableTemplate
            idTable='tableProdAttrOpt'
            dataTable={dataTableOption}
            showContextMenu={true}
            contextMenuItems={canContextMenuItems}
            setRowInfo={setCommandData}
            columns={column}
            showPagination={false}
          />
        </div>
      </div>
    } else {
      return <></>
    }
  }

  return render()
}

export default SidebarProdAttrOption
