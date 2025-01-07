import classNames from "classnames"
import { Fragment, useContext, useEffect, useState } from "react"
import '@styles/react/apps/app-todo.scss'
import * as Icon from "becoxy-icons"
import { useTranslation } from "react-i18next"
import { Button, Card, CardBody } from "reactstrap"
import { usePermissionAdmin } from "../hooks"
import TreeViewSelect from "@components/tree-view-select"
import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import { PermissionResolveTree } from "../identity/permisssion-resolve-tree"
import {notificationError, notificationSuccess} from "@utils/notification"
import Scrollbars from "react-custom-scrollbars"
import { IContext, PermissionFunctionContext } from "./useContext"

const ButtonHeader = ({ }: any) => {
  const { t } = useTranslation()
  return (
    <div className='d-flex justify-content-between align-items-center w-100'>
      <div className='bar__action-left'>
        <BreadCrumbsNotLink breadCrumbActive={t('Permissions by function')} breadCrumbParent={{ title: t('Permission') }} />
      </div>
    </div>
  )
}


const TablePermissionFunction = () => {
  const { t } = useTranslation()
  const { handleModal, windowSize, setDataItem } = useContext<IContext>(PermissionFunctionContext)
  // ** States
  const [dataFunctionTree, setDataFunctionTree] = useState(null)
  const [dataFunction, setDataFunction]: any[] = useState([])
  const [dataPermission, setDataPermission]: any[] = useState([])
  const [selected, setSelected]: any = useState()
  const [mainSidebar, setMainSidebar] = useState(false)

  const {
    getTreePermissionApi,
    getPermissionFunctionApi,
    deletePermissonGroupUserApi,
    addPermissonGroupUserApi,
    addPermissonUserApi,
    deletePermissonUserApi
  } = usePermissionAdmin()

  const renderPermission = () => {
    if (selected) {
      getPermissionFunctionApi(selected?.id).unwrap()
        .then((rs: any) => {
          rs.forEach((ele: any) => {
            const ls: any = []
            selected?.privileges.forEach((item: any) => {
              const index = ele.privileges.findIndex((x: any) => x.privilegeId === item.id)
              if (index > -1) {
                ls.push({ ...item, havePermission: true, privilegePermissionId: ele.privileges[index].id })
              } else {
                ls.push({ ...item, havePermission: false })
              }
            })
            ele.privileges = ls
          })
          setDataPermission(rs)
        })
        .catch(() => notificationError(`${t('Get')} ${t('error')} `))
    }
  }

  useEffect(() => {
    if (selected) {
      if (typeof (selected) === 'string') {
        const select = dataFunction?.find((x: any) => x.id === selected)
        if (select) {
          select?.privileges?.map((ele: any) => {
            ele.label = ele.name
            ele.value = ele.id
          })
          setSelected(select)
        }
      } else {
        renderPermission()
      }
    }
  }, [selected])

  useEffect(() => {
    getTreePermissionApi().unwrap()
      .then((rs: any) => {
        setDataFunctionTree(rs)
        setDataFunction(PermissionResolveTree(rs))
      })
      .catch(() => notificationError(`${t('Get')} ${t('error')} `))
  }, [])

  const handleMainSidebar = () => setMainSidebar(!mainSidebar)
  const Onsubmit = (privilege: any, indexIdentity: any) => {
    if (privilege?.havePermission) {
      if (dataPermission[indexIdentity]?.type === 'role') {
        deletePermissonGroupUserApi(JSON.stringify([privilege.privilegePermissionId]))
          .unwrap()
          .then((rs) => {
            if (rs.isValid) {
              privilege.privilegePermissionId = undefined
              privilege.havePermission = false
              setDataPermission([...dataPermission])
              notificationSuccess(`${t('Delete permission')} ${t('success')} `)
            } else {
              notificationError(`${t('Delete permission')} ${t('error')} `)
            }
          })
          .catch(() => notificationError(`${t('Delete permission')} ${t('error')} `))
      } else if (dataPermission[indexIdentity]?.type === 'user') {
        deletePermissonUserApi(JSON.stringify([privilege.privilegePermissionId]))
          .unwrap()
          .then((rs) => {
            if (rs.isValid) {
              privilege.privilegePermissionId = undefined
              privilege.havePermission = false
              setDataPermission([...dataPermission])
              notificationSuccess(`${t('Delete permission')} ${t('success')} `)
            } else {
              notificationError(`${t('Delete permission')} ${t('error')} `)
            }
          })
          .catch(() => notificationError(`${t('Delete permission')} ${t('error')} `))
      }
    } else {
      if (dataPermission[indexIdentity]?.type === 'user') {
        addPermissonUserApi({ listPrivile: [privilege.id], listUser: [dataPermission[indexIdentity]?.id] })
          .unwrap()
          .then((rs) => {
            if (rs.isValid) {
              privilege.privilegePermissionId = rs.ruleSetsExecuted[0]
              privilege.havePermission = true
              setDataPermission([...dataPermission])
              notificationSuccess(`${t('Add permission')} ${t('success')} `)
            } else {
              notificationError(`${t('Add permission')} ${t('error')} `)
            }
          })
          .catch(() => notificationError(`${t('Add permission')} ${t('error')} `))
      } else if (dataPermission[indexIdentity]?.type === 'role') {
        addPermissonGroupUserApi({ listPrivile: [privilege.id], listRole: [dataPermission[indexIdentity]?.id] })
          .unwrap()
          .then((rs) => {
            if (rs.isValid) {
              privilege.privilegePermissionId = rs.ruleSetsExecuted[0]
              privilege.havePermission = true
              setDataPermission([...dataPermission])
              notificationSuccess(`${t('Add permission')} ${t('success')} `)
            } else {
              notificationError(`${t('Add permission')} ${t('error')} `)
            }
          })
          .catch(() => notificationError(`${t('Add permission')} ${t('error')} `))
      }
    }
  }

  const handleAdd = () => {
    setDataItem({ ...selected })
    handleModal()
  }
  //view
  return (
    <Fragment >
      <div>
        <Card className='table-bar bar__action'>
          <CardBody>
            <ButtonHeader />
          </CardBody>
        </Card>
        <Card className='table-bar bar__query '>
          <div className='content-area-wrapper content-area-wrapper-custom p-0'>
            <div
              className={classNames('sidebar-left', {
                show: mainSidebar
              })}
            >
              <div className='sidebar' >
                <div className='sidebar-content todo-sidebar'>
                  <div className='todo-app-menu'>
                    <div className='todo-app-menu  h-100'>
                      <Scrollbars autoHide
                        autoHeight
                        autoHeightMax={windowSize.innerHeight - 183}>
                        <TreeViewSelect
                          TreeChild="children"
                          SetSelectNodes={setSelected}
                          dataTree={dataFunctionTree}
                          treeId="id"
                          treeText="name"
                          allowMultiSelection={false}
                        />
                      </Scrollbars>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='content-right'>
              <div className='content-wrapper'>
                <div className='content-body'>
                  <div
                    className={classNames('body-content-overlay', {
                      show: mainSidebar
                    })}
                    onClick={handleMainSidebar}
                  ></div>
                  <div className="border-start p-1 d-flex flex-wrap justify-content-between">
                    <div className="d-flex flex-wrap justify-content-start">
                      <div className='sidebar-toggle cursor-pointer d-block d-lg-none me-2 mt-25' onClick={handleMainSidebar}>
                        <Icon.Menu fontSize={21} />
                      </div>
                      <strong className="d-flex flex-wrap me-2 p pt-25 pb-25">
                        {selected?.title?.map((ele: any, index: any) => {
                          return (<div className="me-50" key={index}> {t(ele)} {(index < selected?.title.length - 1) ? '>>' : ''}</div>)
                        })}
                      </strong>
                    </div>
                    <div className=" pt-25 pb-25" onClick={handleAdd}>
                      {selected ? <span className="cursor-pointer" style={{ textDecoration: 'underline', color: '#0e6fff' }}>{t('Add identity')} </span> : <></>}
                    </div>
                  </div>
                  <Scrollbars autoHide
                    autoHeight
                    autoHeightMin={windowSize.innerHeight - 233}
                    autoHeightMax={windowSize.innerHeight - 233}>
                    <table className="w-100">
                      <thead>
                        <tr>
                          <th className="border p-75" >{t('Identity')}</th>
                          <th className="border p-75" >{t('Permission')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataPermission?.map((identity: any, indexIdentity: number) => {
                          return (<tr key={identity.id}>
                            <td className="border p-75 " >
                              <div className="d-flex justify-content-start align-items-center">
                                <div className="me-75">
                                  {identity.type === 'role' ? <Icon.UsersFill fontSize={17}></Icon.UsersFill> : <Icon.UserFill fontSize={17}></Icon.UserFill>}
                                </div>
                                {identity.name}
                              </div>
                            </td>
                            <td className="border p-50">
                              <div className="d-flex">
                                {
                                  identity?.privileges.map((element: any, index: number) => {
                                    return (
                                      <Button
                                        key={index}
                                        color={element.havePermission ? 'success' : 'secondary'}
                                        className='me-50 p-50'
                                        outline={!element.havePermission}
                                        disabled={!selected}
                                        onClick={() => {
                                          Onsubmit(element, indexIdentity)
                                        }}
                                        style={{ fontSize: '13px', fontWeight: '550' }}>
                                        {element.name}
                                      </Button>
                                    )
                                  })}
                              </div>
                            </td>
                          </tr>)
                        })}
                      </tbody>
                    </table>
                  </Scrollbars>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div >
    </Fragment >
  )
}

export default TablePermissionFunction