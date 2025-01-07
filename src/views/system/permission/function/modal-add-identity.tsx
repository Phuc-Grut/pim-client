// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import { Modal, ModalBody, Button, Form} from 'reactstrap'
import { useTranslation } from 'react-i18next'
import * as yup from "yup"
import { usePermissionAdmin } from '../hooks'
import { IFDataPermissionGroupUserApi } from '@src/domain/models/IPermissions'
import { yupResolver } from '@hookform/resolvers/yup'
import {notificationError, notificationSuccess} from "@utils/notification"
import { IContext, PermissionFunctionContext } from './useContext'
import GridTableTemplate from '@components/grid-table-template'
import { SelectBoxMultiple } from '@components/select'
import ModalHeader from '@components/modal-header'
import Scrollbars from 'react-custom-scrollbars'
import { mapObjectError } from '@src/utility/context/map-object'
import {IRowSelected} from "@src/domain/models/ITableGrid"


const headerColumns = [
  {
    type: 'checkbox',
    width: '50'
  },
  {
    isPrimaryKey: true,
    field: 'loginName',
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80
  },
  {
    isPrimaryKey: true,
    field: 'name',
    headerText: "Identity",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80
  },
  {
    isPrimaryKey: true,
    field: 'email',
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80
  }
]
const ModalAddIdentity = () => {
  // ** Props
  const { t } = useTranslation()


  const { openModal, handleModal, dataItem, windowSize } = useContext<IContext>(PermissionFunctionContext)
  // ** States
  const [pageSize, setPageSize] = useState(20)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState([])
  const [selections, setSelections] = useState([])
  const [typeIdentity, setTypeIdentity] = useState({ value: 0, label: t("User") })
  const [totalItem, setTotalItem] = useState(0)

  const {
    addPermissonGroupUserApi,
    addPermissonUserApi,
    getPagingGroupUserByResourceApi,
    getPagingUserByResourceApi
  } = usePermissionAdmin()
  // ** States

  const formSchema = yup.object().shape({
    listPrivile: yup.array()
      .min(1, (t("Privilege") + t("is required")))
  })

  const defaultValues: IFDataPermissionGroupUserApi = {
    listPrivile: [],
    listRole: []
  }

  const {
    control,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors }
  } = useForm<IFDataPermissionGroupUserApi>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })

  const optionObject = [
    { value: 0, label: t("User") },
    { value: 1, label: t("Group user") }
  ]

  const dataToRender = () => {
    if (typeIdentity?.value === 1) {
      getPagingGroupUserByResourceApi({
        $keyword: searchTerm,
        $skip: (currentPage - 1) * pageSize,
        $top: pageSize,
        $resourceId: dataItem?.id
      }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setData(rs.items)
            setTotalItem(rs.total)
          }, 100)
        })
        .catch(() => notificationError(`${t('Get')} ${t('error')} `))
    } else {
      getPagingUserByResourceApi({
        $keyword: searchTerm,
        $skip: (currentPage - 1) * pageSize,
        $top: pageSize,
        $resourceId: dataItem?.id,
        $productId: dataItem?.product?.id
      }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setData(rs.items)
            setTotalItem(rs.total)
          }, 100)
        })
        .catch(() => notificationError(`${t('Get')} ${t('error')} `))
    }
  }

  useEffect(() => {
    if (dataItem?.id) {
      dataToRender()
    }
  }, [currentPage, pageSize, searchTerm, typeIdentity])

  // ** Function to run when sidebar opens
  const handleFormOpened = () => {
    if (dataItem?.id) {
      dataToRender()
    }
  }

  // ** Function to run when sidebar closes
  const handleFormClosed = () => {
    setSelections([])
    reset()
    clearErrors()
  }
  // ** Function to reset fileds
  const handleCancel = () => {
    handleModal()
  }

  const removeAllItem = () => {
    setSelections([])
  }

  const rowSelected = (args: IRowSelected) => {
    setSelections(args.selected)
  }

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color="primary" className="me-1">
          {t('Save')}
        </Button>
        <Button color="secondary" onClick={handleCancel} outline className="me-1">
          {t('Close')}
        </Button>
      </Fragment>
    )
  }

  const onSubmit = (data: any) => {
    if (selections?.length > 0) {
      if (typeIdentity?.value === 1) {
        data.listRole = []
        selections.forEach((element: any) => {
          data.listRole.push(element.id)
        })
        addPermissonGroupUserApi(data).unwrap()
          .then((rs) => {
            if (rs.isValid === true) {
              handleModal()
              notificationSuccess(`${t('Add')} ${t('success')} `)
            } else {
              mapObjectError(rs, setError, t)
              notificationError(`${t('Add')} ${t('error')} `)
            }
          })
          .catch(() => notificationError(`${t('Add')} ${t('error')} `))
      } else {
        data.listUser = []
        selections.forEach((element: any) => {
          data.listUser.push(element.id)
        })
        addPermissonUserApi(data).unwrap()
          .then((rs) => {
            if (rs.isValid === true) {
              handleModal()
              notificationSuccess(`${t('Add')} ${t('success')} `)
            } else {
              mapObjectError(rs, setError, t)
              notificationError(`${t('Add')} ${t('error')} `)
            }
          })
          .catch(() => notificationError(`${t('Add')} ${t('error')} `))
      }
    } else {
      notificationError(t('Please select identity'))
    }
  }

  const toolbarOptions = [
    {
      template: () => {
        return (
          <div className='d-flex'>
            <div style={{ width: '230px' }} className=' me-50'>
              <Select options={optionObject}
                value={typeIdentity}
                onChange={(e: any) => {
                  setTypeIdentity(e)
                  setSelections([])
                }}
                placeholder={t("Select identity")}
                className='react-select w-100'
                classNamePrefix='select'
              ></Select>
            </div>
          </div>
        )
      },
      align: 'left'
    },
    {
      template: () => {
        return (
          <div className={`${selections.length === 0 ? 'd-none' : ''}`} >
            <div className='d-flex justify-content-start mt-25'>
              <div className='me-1'> {t('Selected')} <strong>{selections.length}</strong></div>
              <div onClick={removeAllItem} style={{ color: 'red' }} className='cursor-pointer'> {t('Deselect')} </div>
            </div>
          </div >
        )
      },
      align: 'right'
    }
  ]

  return (
    <Modal
      isOpen={openModal}
      toggle={handleModal}
      className='modal-dialog-centered modal-lg-1'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleFormClosed}
    >
      <Form id='form-modal-globalZone' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModal} typeModal={'Add'} title={dataItem.title} />
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <ModalBody>
            <div className='box form-box__border mb-1'>
              <h5 className='m-0 form-box__border--title'>{t('Select object')}</h5>
              <div className='mb-1'>
                <SelectBoxMultiple
                  control={control}
                  name="listPrivile"
                  label={t("Privilege")}
                  labelSize='label-small'
                  required={true}
                  inLine={false}
                  menuPosition='absolute'
                  placeholder={t("Select")}
                  options={dataItem?.privileges}
                  errors={errors.listPrivile}
                />
              </div>
              <GridTableTemplate
                resource='tableUsers'
                idTable='Users'
                height={400}
                // setDataSelected={setSelections}
                rowSelected={rowSelected}
                dataSelected={selections}
                selectionSettings={{ persistSelection: true }}
                dataTable={data}
                columns={headerColumns}
                showToolbar={true}
                toolbarTemplate={toolbarOptions}
                showColumnChooser={false}
                allowFilter={false}
                allowSort={false}
                showPagination={true}
                allowPaging={true}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalItem={totalItem}
                showContextMenu={true}
                typeSelect={'Multiple'}
              />
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
    </Modal >
  )
}

export default ModalAddIdentity
