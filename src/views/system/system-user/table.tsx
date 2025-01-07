import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import GridTableTemplate from "@components/grid-table-template"
import { IRowInfo } from "@src/domain/models/ITableGrid"
import { Fragment, useContext, useEffect, useState } from "react"
import '@styles/react/apps/app-todo.scss'
import { useTranslation } from "react-i18next"
import { Card, CardBody } from "reactstrap"
import Swal from 'sweetalert2'
import Select from "react-select"
import withReactContent from "sweetalert2-react-content"
import { headerColumns } from './columns'
import { UserContext } from "./useContext"
import {notificationError, notificationSuccess} from "@utils/notification"
import { useSystemUser } from "./hooks"
import {userAction, userSubject} from "@configs/acl/ability"
import {CanPer} from "@utils/context/Can"
import initAbility from "@configs/acl/initialAbility"

const MySwal = withReactContent(Swal)

const Table = () => {
  const { t } = useTranslation()

  const optionStatus: any = [
    {
      value: 1,
      label: t("Active")
    },
    {
      value: 0,
      label: t("Inactive")
    }
  ]
  const { handleModal, setDataItem, setTypeModal, windowSize } = useContext(UserContext)
  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [dataUser, setDataUser] = useState([])
  const [status, setStatus] = useState<any>()
  const [commandData, setCommandData] = useState<IRowInfo>({})
  const [totalItem, setTotalItem] = useState(0)

  useEffect(() => {
    if (commandData.type === 'Edit') {
      MySwal.fire({
        title: t('Confirm'),
        text: commandData.data.status === 0 ? t('Do you want to active item?') : t('Do you want to deactivate item?'),
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: commandData.data.status === 0 ? t('Active') : t('Deactivate'),
        cancelButtonText: t('Cancel'),
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger ms-1'
        },
        buttonsStyling: false
      }).then(async (result) => {
        if (result.value) {
          commandData.data.status = commandData.data.status === 0 ? 1 : 0
          editProductUserApi(commandData.data).unwrap()
            .then((rs) => {
              if (rs.isValid) {
                notificationSuccess(`${t('Edit')} ${t('success')} `)
              }
            })
        }
      })
    } else if (commandData.type === 'Delete') {
      MySwal.fire({
        title: t('Confirm'),
        text: t('Do you want to delete item?'),
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
          handleDelete(commandData.data.id)
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
        }
      })
    }
  }, [commandData])
  // ** Effect
  const {
    getProductUserPagingApi,
    deleteProductUserApi,
    editProductUserApi,
    checkInit
  } = useSystemUser()

  useEffect(() => {
    dataToRender()
  }, [checkInit, currentPage, pageSize, status])

  //call api
  //getDataTable
  const dataToRender = () => {
    getProductUserPagingApi({
      $skip: (currentPage - 1) * pageSize,
      $top: pageSize,
      $status: status?.value
    }).unwrap()
      .then((rs) => {
        setDataUser([])
        setTimeout(() => {
          setDataUser(rs.items)
        }, 100)
        setTotalItem(rs.total)
      })
      .catch(() => notificationError(`${t('Get')} ${t('error')} `))
  }
  const handleDelete = (id: string) => {
    deleteProductUserApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          notificationSuccess(`${t('Delete')} ${t('success')} `)
        }
      })
  }

  const handleStatus = (val: any) => {
    setStatus(val)
  }

  const handleAdd = () => {
    if (setTypeModal) {
      setTypeModal('Add')
    }
    setDataItem({ dataOldUser: dataUser })
    handleModal()
  }

  const filterStatusTemPlate = () => {
    return (
      <div style={{ width: '230px' }} className="mx-25">
        <Select
          options={optionStatus}
          onChange={handleStatus}
          value={status}
          isClearable={true}
          placeholder={t("Select status")}
          className='react-select w-100'
          classNamePrefix='select' ></Select>
      </div >
    )
  }
  const inforTemplate = () => {
    return (
      <div className=" pt-25 pb-25 cursor-pointer" onClick={handleAdd}>
        <span style={{ textDecoration: 'underline', color: '#0e6fff' }}>{t('Add member')} </span>
      </div>
    )
  }

  const toolbarOptions = [
    {
      template: filterStatusTemPlate,
      align: 'left'
    },
    initAbility.can(userAction.ADD, userSubject.SystemUser) &&
    {
      template: inforTemplate,
      align: 'right'
    }
  ]
  //view
  return (
    <Fragment>
      <div className='table-toolbar'>
        <Card className='table-bar bar__action'>
          <CardBody>
            <div className='d-flex justify-content-between align-items-center w-100'>
              <CanPer I={userAction.ADD} a={userSubject.SystemUser}>
                <div className='bar__action-left'>
                  <BreadCrumbsNotLink breadCrumbActive={t('Người dùng')} breadCrumbParent={{ title: t('System') }}/>
                </div>
              </CanPer>

            </div>
          </CardBody>
        </Card>
        <GridTableTemplate
          resource='SystemUser'
          idTable='SystemUser'
          dataTable={dataUser}
          columns={headerColumns}
          height={windowSize.innerHeight - 310}
          toolbarTemplate={toolbarOptions}
          showToolbar={true}
          allowFilter={false}
          allowSort={false}
          allowPaging={true}
          showColumnChooser={false}
          showPagination={true}
          setCommandData={setCommandData}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalItem={totalItem}
          showContextMenu={true}
          searchForm={false}
        />
      </div>
    </Fragment>
  )
}

export default Table