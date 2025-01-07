import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { statusDefault, statusObjDefault } from "@src/domain/constants/constantSelect"
import { Badge } from 'reactstrap'

const objStatus = statusDefault.reduce((a: any, v: any) => ({ ...a, [v.value]: v.label }), {})

const statusTemplate = (props: any) => {
  return (
    <Badge className='text-capitalize' color={statusObjDefault[props.status]} pill>
      {objStatus[props.status]}
    </Badge>
  )
}

const headerTemplate = (props: any) => {
  const { t } = useTranslation()
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
    headerText: 'Currency code',
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'name',
    headerText: 'Currency name',
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'locale',
    headerText: "Locale",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'customFormatting',
    headerText: "Currency format",
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
    typeFilter: "Checkbox",
    hideOperator: true,
    visible: true,
    width: 110,
    headerTemplate,
    template: statusTemplate
  }
]