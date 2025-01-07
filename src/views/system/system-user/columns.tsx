// import Avatar from '@components/avatar'
import { statusDefault, statusObjDefault } from '@src/domain/constants/constantSelect'
import { Badge } from 'reactstrap'
import {userSubject} from "@configs/acl/ability"
import AvatarDefault from "@components/avatar-default"
import initAbility from "@configs/acl/initialAbility"

const objStatus = statusDefault.reduce((a: any, v: any) => ({ ...a, [v.value]: v.label }), {})

const statusTemplate = (props: any) => {
  return (
    <Badge className='text-capitalize' color={statusObjDefault[props.status]} pill>
      {objStatus[props.status]}
    </Badge>
  )
}

const commandList: any = [
  { id: 'EDIT', type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' }, title: 'Edit' },
  { id: 'DELETE', type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' }, title: 'Delete' }
]
const commands: any = []
commandList.map((i: any) => {
  if (initAbility.can(i.id, userSubject.SystemUser)) {
    commands.push(i)
  }
})


const userTemplate = (props: any) => {
  return (
    <div className="d-flex align-items-center">
      <div>
        <AvatarDefault
          img={(props.photo === undefined || props.photo === '') ? '' : props.photo}
          initials
          content={props.userName ? props.userName : ''}
          imgHeight='30'
          imgWidth='30' />
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
    isPrimaryKey: true,
    field: 'email',
    headerText: "Email",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80
  },
  {
    isPrimaryKey: false,
    textAlign: "center",
    field: 'status',
    headerText: "Status",
    visible: true,
    width: 110,
    template: statusTemplate,
    allowFiltering: true,
    typeFilter: "Checkbox",
    hideOperator: true
  },
  {
    headerText: 'Action',
    width: 120,
    maxWidth: 140,
    minWidth: 100,
    textAlign: "center",
    commands
  }
]