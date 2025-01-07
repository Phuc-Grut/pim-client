import {IContextMenu} from "@src/domain/models/IContextMenu"
import {ContextMenuItems} from "@src/domain/constants/constantContextMenu"
import {userSubject} from "@configs/acl/ability"
import {checkListContext} from "@utils/Utils"
import { getPermisions } from "@src/utility/PermisionUtils"

export const canContextMenuItems: IContextMenu[] = []

const listPermission = getPermisions(userSubject.ProductTopicPage)

const context = [
  { id: 'EDIT' },
  { id: 'OPEN' },
  { id: 'ORDER' },
  { id: 'DELETE' }
]


const contextMenu = checkListContext(context, ContextMenuItems)

// get data contextMenuStatus in resource
contextMenu.map((item: IContextMenu) => {
  listPermission.map((per: any) => {
    if (item.action === per.id) {
      canContextMenuItems.push(item)
    }
  })
})
