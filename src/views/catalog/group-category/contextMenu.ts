import {IContextMenu, IIdContext} from "@src/domain/models/IContextMenu"
import {ContextMenuItems} from "@src/domain/constants/constantContextMenu"
import {userSubject} from "@configs/acl/ability"
import {getContext} from "@utils/Utils"
import { getPermisions } from "@src/utility/PermisionUtils"

export const canContextMenuItems: IContextMenu[] = []

const listPermission = getPermisions(userSubject.InfomationChannel)
const context = [
  {id: 'READ'},
  {id: 'EDIT'},
  {id: 'ORDER'},
  {id: 'DELETE'}
]


const contextMenu: any = getContext(context, ContextMenuItems)

// get data contextMenuStatus in resource
contextMenu.map((item: IContextMenu) => {
  listPermission.map((per: IIdContext) => {
    if (item.action === per.id) {
      canContextMenuItems.push(item)
    }
  })
})
