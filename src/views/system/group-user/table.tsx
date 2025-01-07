import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import GridTableTemplate from "@components/grid-table-template"
import { IRowInfo } from "@src/domain/models/ITableGrid"
import classNames from "classnames"
import { Fragment, useContext, useEffect, useState } from "react"
import '@styles/react/apps/app-todo.scss'
import * as Icon from "becoxy-icons"
import { useTranslation } from "react-i18next"
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap"
import Swal from 'sweetalert2'
import Select from "react-select"
import PerfectScrollbar from 'react-perfect-scrollbar'
import withReactContent from "sweetalert2-react-content"
import { headerColumns } from './columns'
import { GroupUserContext } from "./useContext"
import ListViewSelect from "@components/list-view-select"
import ListViewTemplate from "./template-list-view"
import { useSystemGroupUser } from "./hooks"
import {notificationError, notificationSuccess} from "@utils/notification"

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
  const { handleModal, setDataItem, setTypeModal, handleModalAddMember, windowSize } = useContext(GroupUserContext)
  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [data, setData] = useState([])
  const [statusAssignedTo, setStatusAssignedTo] = useState<number>()
  const [dataUser, setDataUser] = useState([])
  const [selected, setSelected]: any = useState()
  const [commandData, setCommandData] = useState<IRowInfo>({})
  const [totalItem, setTotalItem] = useState(0)
  const [mainSidebar, setMainSidebar] = useState(false)

  useEffect(() => {
    if (commandData.type === 'Delete') {
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
    checkInit,
    checkInitGroupUserUser,
    getListGroupUserApi,
    getPagingUsersGroupUserApi,
    removeUserGroupUserApi
  } = useSystemGroupUser()

  useEffect(() => {
    dataToRender()
  }, [checkInit, checkInitGroupUserUser, searchTerm, statusAssignedTo])

  useEffect(() => {
    if (selected) {
      getPagingUsersGroupUserApi({
        $roleId: selected.id,
        $keyword: searchTerm,
        $skip: (currentPage - 1) * pageSize,
        $top: pageSize
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
  }, [currentPage, pageSize, selected, checkInit, checkInitGroupUserUser, searchTerm])

  //call api
  //getDataTable
  const dataToRender = () => {
    getListGroupUserApi({
      $keyword: searchTerm,
      $status: statusAssignedTo
    }).unwrap()
      .then((rs) => {
        setTimeout(() => {
          if (rs.length > 0) {
            if (!selected) {
              rs[0].isChecked = true
              setSelected(rs[0])
            } else {
              const index = rs.findIndex((ele: any) => ele.id === selected.id)
              if (index !== -1) {
                setSelected(rs[index])
              }
            }
          }
          setData(rs)
        }, 100)
      })
      .catch(() => notificationError(`${t('Get')} ${t('error')} `))
  }
  const handleDelete = (id: string) => {
    removeUserGroupUserApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          notificationSuccess(`${t('Delete')} ${t('success')} `)
        }
      })
      .catch(() => notificationError(`${t('Delete')} ${t('error')} `))
  }
  let timeOut: any
  const handleTextChange = (val: string) => {
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      setSearchTerm(val)
    }, 500)
  }

  const handleAdd = () => {
    handleModal()
    setDataItem({})
    if (setTypeModal) {
      setTypeModal('Add')
    }
  }

  const handleStatusAssignedToChange = (val: any) => {
    setStatusAssignedTo(val?.value)
  }


  const handleAddMember = () => {
    setDataItem({ role: selected, dataOldUser: dataUser })
    handleModalAddMember()
  }
  const handleMainSidebar = () => setMainSidebar(!mainSidebar)
  //view
  const filterStatusTemPlate = () => {
    return (
      <div className="d-flex flex-wrap justify-content-start  align-items-center">
        <div className="d-flex flex-wrap justify-content-start align-items-center">
          <div className='sidebar-toggle cursor-pointer d-block d-lg-none mx-1 mt-25' onClick={handleMainSidebar}>
            <Icon.Menu fontSize={21} />
          </div>
          <div className="mx-1 py-25" style={{ fontSize: '16px', fontWeight: '500' }}>
            {selected?.name}
          </div>
        </div>
      </div >
    )
  }
  const inforTemplate = () => {
    return (
      <div className=" pt-25 pb-25 cursor-pointer" onClick={handleAddMember}>
        <span style={{ textDecoration: 'underline', color: '#0e6fff' }}>{t('Add member')} </span>
      </div>
    )
  }

  const toolbarOptions = [
    {
      template: filterStatusTemPlate,
      align: 'left'
    },
    {
      template: inforTemplate,
      align: 'right'
    }
  ]

  return (
    <Fragment>
      <div className='table-toolbar'>
        <Card className='table-bar bar__action'>
          <CardBody>
            <div className='d-flex justify-content-between align-items-center w-100'>
              <div className='bar__action-left'>
                <BreadCrumbsNotLink breadCrumbActive={t('Group user')} breadCrumbParent={{ title: t('System') }}/>
              </div>
              <div className='bar__action-right d-flex'>
                <Button color='primary' onClick={handleAdd} className='d-flex'>
                  <Icon.Plus fontSize={14} className='me-50' />
                  {t('Add group')}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className='table-bar bar__query'>
          <CardBody className='pe-0 ps-0'>
            <div className='d-flex justify-content-start align-items-center w-100'>
              <Row className='m-0 gx-1 d-flex flex-wrap justify-content-start align-items-center w-100'>
                <Col xs={12} sm={6} md={3} lg={2} className='pt-25 pb-25'>
                  <Select
                    isClearable={true}
                    options={optionStatus}
                    onChange={handleStatusAssignedToChange}
                    placeholder={t("Select")}
                    className='react-select'
                    classNamePrefix='select' ></Select>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
        <Card className='table-bar bar__query'>
          <div className='content-area-wrapper p-0' style={{ height: windowSize.innerHeight - 230 }}>
            <div
              className={classNames('sidebar-left', {
                show: mainSidebar
              })}
            >
              <div className='sidebar' >
                <div className='sidebar-content todo-sidebar'>
                  <Row>
                    <Col xs={12} className='border-right mt-0 mb-0'>
                      <div className='p-1'>
                        <Input
                          type='text'
                          id='search-permission'
                          style={{ height: '28px' }}
                          onChange={(e) => handleTextChange(e.target.value)}
                          placeholder={t('Search...')}
                        />
                      </div>

                    </Col>
                    <Col className='todo-app-menu h-100'>
                      <PerfectScrollbar style={{ height: windowSize.innerHeight - 290 }} options={{ wheelPropagation: false }}>
                        <ListViewSelect setSelected={setSelected} selected={selected} showCheckBox={false} data={data} Template={ListViewTemplate}></ListViewSelect>
                      </PerfectScrollbar>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className='content-right'>
              <div
                className={classNames('body-content-overlay', {
                  show: mainSidebar
                })}
                onClick={handleMainSidebar}
              ></div>
              <div className='d-flex flex-column'>
                <GridTableTemplate
                  resource='tableGroupUsers'
                  idTable='GroupUsers'
                  dataTable={dataUser}
                  columns={headerColumns}
                  height={windowSize.innerHeight - 383}
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
            </div>
          </div>
        </Card>
      </div>
    </Fragment>
  )
}

export default Table