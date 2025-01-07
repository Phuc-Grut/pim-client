// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import { X, Plus, Edit, Info } from 'becoxy-icons'
import { useForm } from 'react-hook-form'
import { Modal, ModalBody, Button, Form } from 'reactstrap'

import { isObjEmpty } from '@src/utility/Utils'
import { useTranslation } from 'react-i18next'
import Swal from 'sweetalert2'
import { IFDataProductUser } from '@src/domain/models/IProductUser'
import withReactContent from 'sweetalert2-react-content'
import {notificationError, notificationSuccess} from "@utils/notification"
import GridTableTemplate from '@components/grid-table-template'
import Avatar from '@components/avatar'
import Scrollbars from 'react-custom-scrollbars'
import { UserContext } from './useContext'
import { useSystemUser } from './hooks'
import {IRowSelected} from "@src/domain/models/ITableGrid"
const MySwal = withReactContent(Swal)

const userTemplate = (props: any) => {
  return (
    <div className="d-flex align-items-center">
      <div>
        <Avatar img={props.photo === '' ? '' : props.photo} initials content={props.loginName ? props.loginName : ''} imgHeight='30' imgWidth='30' />
      </div>
      <div className="ms-50">
        <div id="Emptext" className="fw-bolder">{props.loginName}</div>
      </div>
    </div>
  )
}

export const headerColumns = [
  {
    type: 'checkbox',
    width: '50'
  },
  {
    isPrimaryKey: true,
    field: 'loginName',
    headerText: "User",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    template: userTemplate
  },
  {
    isPrimaryKey: true,
    field: 'firstName',
    headerText: "First name",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80
  },
  {
    isPrimaryKey: true,
    field: 'lastName',
    headerText: "Last name",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80
  },
  {
    isPrimaryKey: true,
    field: 'email',
    headerText: "Email",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80
  }
]

const ModalHeader = (props: any) => {
  // ** Props
  const { title, handleModal, typeModal } = props
  const { t } = useTranslation()


  const handleModalIcon = () => {
    if (typeModal === 'Edit') {
      return <Edit fontSize={17} className='me-1' />
    } else if (typeModal === 'Detail') {
      return <Info fontSize={17} className='me-1' />
    } else {
      return <Plus fontSize={17} className='me-1' />
    }
  }

  return (
    <div className='modal-header d-flex align-items-center justify-content-between mb-1'>
      <h5 className='modal-title'>
        {handleModalIcon()} {t(title)}
      </h5>
      <div className='todo-item-action d-flex align-items-center'>
        <X
          className='fw-normal mt-25 cursor-pointer'
          fontSize={16}
          onClick={handleModal}
        />
      </div>
    </div>
  )
}

const ModalComponent = () => {
  // ** Props
  const { t } = useTranslation()
  const { openModal, handleModal, dataItem, typeModal, windowSize } = useContext(UserContext)
  // ** States
  const [pageSize, setPageSize] = useState(20)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState([])
  const [selections, setSelections] = useState([])
  const [totalItem, setTotalItem] = useState(0)

  const {
    addProductUserApi,
    getPagingUserApi
  } = useSystemUser()
  // ** States


  const defaultValues: IFDataProductUser = {
    id: "",
    productId: "",
    listUserId: [],
    status: 1
  }

  const {
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    formState: { }
  } = useForm<IFDataProductUser>({
    mode: 'onChange',
    defaultValues
  })

  const dataToRender = () => {
    getPagingUserApi({
      $keyword: searchTerm,
      $skip: (currentPage - 1) * pageSize,
      $top: pageSize
    }).unwrap()
      .then((rs) => {
        setTimeout(() => {
          rs.items.forEach((element: any) => {
            if (selections?.findIndex((e: any) => e.id === element.id) !== -1) {
              element.isChecked = true
            }
          })
          setData(rs.items)
          setTotalItem(rs.total)
        }, 100)
      })
      .catch(() => notificationError(`${t('Get')} ${t('error')} `))
  }

  useEffect(() => {
    dataToRender()
  }, [currentPage, pageSize, searchTerm])

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
    dataToRender()
  }

  // ** Function to run when sidebar closes
  const handleFormClosed = () => {
    setSelections([])
    clearErrors()
  }
  // ** Function to reset fileds
  const handleCancel = () => {
    handleModal()
  }

  const removeAllItem = () => {
    setSelections([])
  }

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (typeModal === 'Edit' || typeModal === 'Add') {
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
    } else {
      return (
        <Fragment>
          <Button color="secondary" onClick={handleCancel} outline className="me-1">
            {t('Close')}
          </Button>
        </Fragment>
      )
    }
  }

  const onSubmit = (data: any) => {
    if (selections?.length > 0) {
      if (dataItem?.product?.countUsers + selections?.length > dataItem?.product?.maxUsers) {
        MySwal.fire({
          title: t('Confirm'),
          text: t('The service plan you are using has a user limit set! Please upgrade to be able to add users.'),
          allowOutsideClick: false,
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: t('Update now'),
          cancelButtonText: t('Cancel'),
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger ms-1'
          },
          buttonsStyling: false
        }).then(async (result) => {
          if (result.value) {
            window.location.href = "/subscription"
          } else if (result.dismiss === MySwal.DismissReason.cancel) {
          }
        })
      } else {
        selections.forEach((element: any) => {
          data.listUserId.push(element.id)
        })
        addProductUserApi(data).unwrap()
          .then((rs) => {
            if (rs.isValid === true) {
              handleModal()
              notificationSuccess(`${t('Add')} ${t('success')} `)
            } else {
              for (let i = 0; i < rs.errors.length; i++) {
                MySwal.fire({
                  title: t('Confirm'),
                  text: t('The service plan you are using has a user limit set! Please upgrade to be able to add users.'),
                  allowOutsideClick: false,
                  icon: 'error',
                  showCancelButton: true,
                  confirmButtonText: t('Update now'),
                  cancelButtonText: t('Cancel'),
                  customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-danger ms-1'
                  },
                  buttonsStyling: false
                }).then(async (result) => {
                  if (result.value) {
                    window.open('https://admin.becoxy.com/subscription')
                  } else if (result.dismiss === MySwal.DismissReason.cancel) {
                  }
                })
              }
            }
          })
          .catch(() => notificationError(`${t('Add')} ${t('error')} `))
      }
    } else {
      notificationError(`${t('Please select user')}`)
    }
  }

  const toolbarOptions = [
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

  const rowSelected = (args: IRowSelected) => {
    setSelections(args.selected)
  }

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
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title={t('User')} />
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <ModalBody>
            <div className='box form-box__border mb-2 p-2'>
              <h5 className='m-0 form-box__border--title'>{t('Select member')}</h5>
              <GridTableTemplate
                resource='tableUsers'
                idTable='Users'
                height={300}
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
                rowSelected={rowSelected}
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
    </Modal>
  )
}

export default ModalComponent
