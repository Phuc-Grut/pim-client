import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { statusDefault, statusObjDefault } from "@src/domain/constants/constantSelect"
import { Badge } from 'reactstrap'

const objStatus = statusDefault.reduce((a: any, v: any) => ({ ...a, [v.value]: v.label }), {})
const statusTemplate = (props: any) => {
  const { t } = useTranslation()
  return (
    <Badge className='text-capitalize' color={statusObjDefault[props.status]} pill>
      {t(objStatus[props.status])}
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
    headerText: "Code",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'name',
    headerText: "Name",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'slug',
    headerText: "Slug",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: false,
    field: 'title',
    headerText: "Title",
    visible: true,
    width: 120,
    maxWidth: 140,
    minWidth: 120,
    headerTemplate
  },
  {
    isPrimaryKey: false,
    field: 'tags',
    headerText: "Tags",
    visible: true,
    width: 120,
    maxWidth: 140,
    minWidth: 120,
    headerTemplate
  },
  {
    isPrimaryKey: false,
    field: 'description',
    headerText: "Description",
    visible: true,
    width: 120,
    maxWidth: 140,
    minWidth: 120,
    headerTemplate
  },
  {
    isPrimaryKey: false,
    textAlign: "center",
    field: 'status',
    headerText: "Status",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    typeFilter: "Checkbox",
    hideOperator: true,
    headerTemplate,
    template: statusTemplate
  }
]

export const sortColumns = [
  {
    isPrimaryKey: true,
    field: 'key',
    headerText: "Code",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'label',
    headerText: "Name",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  }
]