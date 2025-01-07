// import initialAbility from '@configs/acl/initialAbility'
import {IContextMenu} from '@src/domain/models/IContextMenu'

import {Fragment} from "react"
import { useTranslation } from "react-i18next"
import {ContextMenuItems} from "@src/domain/constants/constantContextMenu"
import { statusTemplate } from '@src/utility/Common'

export const canContextMenuItems: IContextMenu[] = []

// context menu default
const listContextMenuPermission = [
  { id: 'OPEN' },
  { id: 'EDIT' },
  { id: 'ORDER' },
  { id: 'DELETE' }
]


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

const headerTemplate = (props: any) => {
  const {t} = useTranslation()
  return (
    <Fragment>
      {t(props.headerText)}
    </Fragment>
  )
}

export const headerColumns = [
  {
    isPrimaryKey: true,
    field: 'code',
    headerText: "Product type code",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'name',
    headerText: "Product type name",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'description',
    headerText: "Description",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: false,
    textAlign: "center",
    field: 'status',
    headerText: "Status",
    hideOperator: true,
    typeFilter: "Checkbox",
    visible: true,
    width: 110,
    headerTemplate,
    template: statusTemplate
  }
]
export const sortColumns = [
  {
    isPrimaryKey: true,
    field: 'key',
    headerText: "Product type code",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'label',
    headerText: "Product type name",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  }
]