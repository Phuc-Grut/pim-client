import { ContextMenuItems } from "@src/domain/constants/constantContextMenu"
import { statusDefault, statusObjDefault } from "@src/domain/constants/constantSelect"
import { IContextMenu } from "@src/domain/models/IContextMenu"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { Badge } from "reactstrap"
import { Link } from 'react-router-dom'
export const canContextMenuItems: IContextMenu[] = []

const listContextMenuPermission = [
  { id: 'READ'},
  { id: 'ADD'},
  { id: 'EDIT'},
  { id: 'ORDER'},
  { id: 'DELETE'}
]

// with permission

// // check context menu with permission
// const contextMenuPermission: any = []
// listContextMenuPermission.map((item: any) => {
//   if (initialAbility.can(item.id.toUpperCase(), 'CustomerGroup')) {
//     contextMenuPermission.push(item)
//   }
// })
//
// // get data contextMenuPermission in resource
// contextMenuPermission.map((item: any) => {
//   const rs: any = ContextMenuItems.find((menu: any) => menu.id === item.id)
//   if (rs) {
//     canContextMenuItems.push(rs)
//   }
// })


// without permission
// get data contextMenuStatus in resource
listContextMenuPermission.map((item: any) => {
  const rs: any = ContextMenuItems.find((menu: any) => menu.id === item.id)
  if (rs) {
    canContextMenuItems.push(rs)
  }
})

const contextMenuStatus: any = []
// get data contextMenuStatus in resource
contextMenuStatus.map((item: any) => {
  const rs: any = ContextMenuItems.find((menu: any) => menu.id === item.id)
  if (rs) {
    canContextMenuItems.push(rs)
  }
})

const objStatus = statusDefault.reduce((a: any, v: any) => ({ ...a, [v.value]: v.label}), {})

const statusTemplate = (props: any) => {
  return (
    <Badge className='text-capitalize' color={statusObjDefault[props.status]} pill>
      {objStatus[props.status]}
    </Badge>
  )
}
const headerTemplate = (props: any) => {
  const {t} = useTranslation()
  return (
    <Fragment>
      {t(props.headerText)}
    </Fragment>
  )
}
const headerTemplateName = (props: any) => {
  const {t} = useTranslation()
  const newTo = { 
    pathname: "/catalog/channel-list" 
  }
  const myData = {
    id: props.id,
    name: props.name
  }
  return (
    <div className='url'>
      <Link to={newTo} state={myData}>{t(props.name)}</Link>
    </div>
  )
}
export const headerColumns = [
  {
    isPrimaryKey: true,
    field: 'code',
    headerText: 'CategoryProductCode',
    visible: true,
    width: '100',
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'name',
    headerText: 'CategoryProductName',
    visible: true,
    minWidth: '300',
    width: '350',
    maxWidth: '400',
    headerTemplate,
    template: headerTemplateName
  },
  {
    isPrimaryKey: true,
    field: 'description',
    headerText: 'Description',
    clipMode: "EllipsisWithTooltip",
    visible: true,
    minWidth: '300',
    width: '350',
    headerTemplate
  },
  {
    isPrimaryKey: false,
    field: 'status',
    headerText: 'Trạng thái',
    textAlign: "center",
    hideOperator: true,
    typeFilter: "Checkbox",
    template: statusTemplate,
    visible: true,
    width: '100',
    headerTemplate
  }

]
export const sortColumns = [
  {
    isPrimaryKey: true,
    field: 'key',
    headerText: "CategoryProductCode",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'label',
    headerText: "CategoryProductName",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  }
]