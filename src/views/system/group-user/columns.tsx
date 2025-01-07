import Avatar from "@components/avatar"
import {userAction, userSubject} from "@configs/acl/ability"
import initAbility from "@configs/acl/initialAbility"

const commandList: any = initAbility.can(userAction.DELETE, userSubject.SystemGroupUser) ? [{ type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' }, title: 'Delete' }] : []
const userTemplate = (props: any) => {
  return (
    <div className="d-flex align-items-center">
      <div>
        <Avatar img={(props.photo === undefined || props.photo === '') ? '' : props.photo} initials content={props.userName ? props.userName : ''} imgHeight='30' imgWidth='30' />
      </div>
      <div className="ms-50">
        <div id="Emptext" className="fw-bolder">{props.userName}</div>
      </div>
    </div>
  )
}

export const headerColumns = [
  {
    isPrimaryKey: true,
    field: 'userName',
    headerText: "User",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    template: userTemplate
  },
  {
    isPrimaryKey: true,
    field: 'name',
    headerText: "Full name",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80
  },
  {
    isPrimaryKey: false,
    field: 'email',
    headerText: "Email",
    visible: true,
    width: 110
  },
  {
    headerText: 'Action',
    width: 120,
    maxWidth: 140,
    minWidth: 100,
    textAlign: "center",
    commands: commandList
  }
]