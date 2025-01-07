import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { Badge } from "reactstrap"

const commandList: any = [
  { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' }, title: 'Edit' },
  // { type: 'Detail', buttonOption: { cssClass: 'e-flat', iconCss: 'e-eye e-icons' }, title: 'Detail' },
  { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' }, title: 'Delete' }
]

function sttTemplate(props: any) {
  return (<div >
    {(Number(props.index) + 1)}
  </div>)
}

const statusObj: any = {
  null: 'light-warning',
  1: 'light-success',
  0: 'light-secondary'
}

const statusTemplate = (props: any) => {
  const { t } = useTranslation()
  return (
    <Badge className='text-capitalize' color={statusObj[props.status]} pill>
      {props.status ? t('Active') : t('Inactive')}
    </Badge>
  )
}

const headerTemplate = (props: any) => {
  const { t } = useTranslation()
  return (<Fragment>
    {t(props.headerText)}
  </Fragment>)
}

export const columns = [
  {
    isPrimaryKey: true,
    headerText: "STT",
    textAlign: "center",
    visible: true,
    width: 70,
    template: sttTemplate,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'code',
    headerText: "Ward code",
    visible: true,
    maxWidth: 120,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'name',
    headerText: "Ward name",
    visible: true,
    maxWidth: 200,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'shortName',
    headerText: "Short name",
    visible: true,
    maxWidth: 200,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'note',
    headerText: "Note",
    visible: true,
    width: 180,
    maxWidth: 200,
    minWidth: 160,
    headerTemplate
  },
  {
    isPrimaryKey: false,
    textAlign: "center",
    field: 'status',
    headerText: "Status",
    visible: true,
    width: 110,
    headerTemplate,
    template: statusTemplate
  },
  {
    headerText: 'Action',
    width: 120,
    textAlign: "center",
    commands: commandList,
    headerTemplate
  }
]