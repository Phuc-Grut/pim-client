import {IContextMenu, IIdContext} from "@src/domain/models/IContextMenu"
import {ContextMenuItems} from "@src/domain/constants/constantContextMenu"
import {userSubject} from "@configs/acl/ability"
import {getContext} from "@utils/Utils"
import { getPermisions } from "@src/utility/PermisionUtils"

export const canContextMenuItems: IContextMenu[] = []
export const canContextMenuVariant: IContextMenu[] = []

const listPermission = getPermisions(userSubject.Product)

const context = [
  { id: "READ" },
  { id: "EDIT" },
  { id: "DUPLICATE" },
  { id: "VARIANT" },
  { id: "DELETE" }
]
const contextVariant = [
  { id: "OPEN" },
  { id: "EDIT" },
  { id: "DELETE" }
]

const contextMenu: any = getContext(context, ContextMenuItems)
const contextMenuVariant: any = getContext(contextVariant, ContextMenuItems)

// get data contextMenuStatus in resource
contextMenu.map((item: IContextMenu) => {
  listPermission.map((per: IIdContext) => {
    if (item.action === per.id) {
      canContextMenuItems.push(item)
    }
  })
})

// get data contextMenuStatus in resource
contextMenuVariant.map((item: IContextMenu) => {
  listPermission.map((per: IIdContext) => {
    if (item.action === per.id) {
      canContextMenuVariant.push(item)
    }
  })
})
