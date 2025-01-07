import { Fragment, useContext, useEffect, useState } from "react"
import '@styles/react/apps/app-todo.scss'
import * as Icon from "becoxy-icons"
import { useTranslation } from "react-i18next"
import { Button, Card, CardBody, Col, Row } from "reactstrap"
import { usePermissionAdmin } from "../hooks"
import { PermissionResolveTree } from "../identity/permisssion-resolve-tree"
import Select from "react-select"
import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import {notificationError} from "@utils/notification"
import Scrollbars from "react-custom-scrollbars"
import { IContext, PermissionInformationContext } from "./useContext"

const ButtonHeader = ({ }: any) => {
  const { t } = useTranslation()
  return (
    <div className='d-flex justify-content-between align-items-center w-100'>
      <div className='bar__action-left'>
        <BreadCrumbsNotLink breadCrumbActive={t('Permission information')} breadCrumbParent={{ title: t('Permission') }} />
      </div>
    </div>
  )
}

const FilterHeader = ({
  handleIdentityAssignedToChange,
  identityAssignedTo
}: any) => {
  const { t } = useTranslation()
  const optionObject = [
    { value: 0, label: t("User") },
    { value: 1, label: t("Group user") }
  ]
  return (
    <div className='d-flex justify-content-between align-items-center w-100'>
      <Row className='m-0 gx-1 d-flex flex-wrap justify-content-start align-items-center w-100'>
        <Col xs={12} sm={6} md={2} lg={2}>
          <Select options={optionObject} onChange={handleIdentityAssignedToChange} value={identityAssignedTo} placeholder={t("Select object")} className='react-select' classNamePrefix='select' ></Select>
        </Col>
      </Row>
    </div>
  )
}


const TablePermissionIdentity = () => {
  const { t } = useTranslation()
  // ** States
  const { windowSize } = useContext<IContext>(PermissionInformationContext)
  const [dataPermission, setDataPermission] = useState([])
  const [identityAssignedTo, setIdentityAssignedTo]: any = useState({ value: 1, label: t("Group user") })
  const {
    getTreeResourcePermissionApi
  } = usePermissionAdmin()

  useEffect(() => {
    getTreeResourcePermissionApi({ type: identityAssignedTo?.value === 1 ? 'role' : 'user' }).unwrap()
      .then((rs: any) => {
        const list: any = PermissionResolveTree(rs)
        setDataPermission(list)
      })
      .catch(() => notificationError(`${t('Get')} ${t('error')} `))
  }, [identityAssignedTo])

  const handleIdentityAssignedToChange = (val: any) => {
    setIdentityAssignedTo(val)
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
        <Card className='table-bar bar__query'>
          <CardBody className='pe-0 ps-0'>
            <FilterHeader
              identityAssignedTo={identityAssignedTo}
              handleIdentityAssignedToChange={handleIdentityAssignedToChange}
            />
          </CardBody>
        </Card>
        <Card className='table-bar bar__query '>
          <Scrollbars autoHide
            autoHeight
            autoHeightMin={windowSize.innerHeight - 225}
            autoHeightMax={windowSize.innerHeight - 225}>
            <table className="w-100">
              <thead>
                <tr>
                  <th className="border p-75" style={{ width: '40%' }}>{t('Function')}</th>
                  <th className="border p-75" >{t('Permission')}</th>
                </tr>
              </thead>
              <tbody>
                {dataPermission?.map((resource: any) => {
                  return (<tr key={resource.id}>
                    <td className="border p-75" >
                      <div className="d-flex flex-wrap me-2 p pt-25 pb-25">
                        {resource?.title?.map((ele: any, index: any) => {
                          return (<div className="me-50" key={index}> {t(ele)} {(index < resource?.title.length - 1) ? '>>' : ''}</div>)
                        })}
                      </div>
                    </td>
                    <td className="border">
                      {
                        resource?.objects?.map((element: any, index: number) => {
                          return (
                            <td className={`d-flex align-items-center header-table-custom ${index !== resource?.objects?.length - 1 ? 'border-bottom' : ''}`}>
                              <td className="d-flex me-1 w-25  p-25 border-end">
                                <div className="me-75">
                                  {element.type === 'role' ? <Icon.UsersFill fontSize={17}></Icon.UsersFill> : <Icon.UserFill fontSize={17}></Icon.UserFill>}
                                </div>
                                {element.name}
                              </td>
                              <td className="p-25">
                                {element?.privileges?.map((item: any) => {
                                  return (
                                    <Button
                                      key={index}
                                      color={item.havePermission ? 'success' : 'secondary'}
                                      className='me-75 p-50'
                                      outline={!item.havePermission}
                                      disabled={true}
                                      style={{ fontSize: '13px', fontWeight: '550' }}>
                                      {item.permissionName}
                                    </Button>
                                  )
                                })}
                              </td>
                            </td>
                          )
                        })}
                    </td>
                  </tr>)
                })}
              </tbody>
            </table>
          </Scrollbars>
        </Card>
      </div>
    </Fragment >
  )
}

export default TablePermissionIdentity