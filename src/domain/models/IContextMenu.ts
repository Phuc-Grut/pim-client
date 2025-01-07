import {IActions} from "@configs/acl/ability"

export interface IIdContext {
  id: string
}
export interface IContextMenu {
  id: string,
  text: string,
  target?: string,
  iconCss?: string,
  action: IActions
}