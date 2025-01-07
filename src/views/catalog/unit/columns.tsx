import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { checkTemplate, statusTemplate, numberTemplate } from '@src/utility/Common'

const headerTemplate = (props: any) => {
  const { t } = useTranslation()
  return (
    <Fragment>
      {t(props.headerText)}
    </Fragment>
  )
}
const groupTemplate = (props: any) => {
  return (
    <Fragment>
      {props.groupUnitName}
    </Fragment>
  )
}

export const headerColumns = [
  {
    isPrimaryKey: true,
    field: 'code',
    headerText: "Unit code",
    visible: true,
    width: 100,
    maxWidth: 120,
    allowFiltering: true,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'name',
    headerText: "Unit name",
    visible: true,
    width: 100,
    maxWidth: 120,
    allowFiltering: true,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'groupUnitId',
    headerText: "Group unit",
    visible: true,
    width: 200,
    maxWidth: 120,
    minWidth: 80,
    template: groupTemplate,
    typeFilter: "Checkbox",
    hideOperator: true,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'namePlural',
    headerText: "NamePlural",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: false,
    field: 'isDefault',
    headerText: "IsMainUnit",
    visible: true,
    width: 80,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate,
    hideOperator: true,
    typeFilter: "Checkbox",
    template: checkTemplate
  },
  {
    isPrimaryKey: true,
    field: 'rate',
    headerText: "Rate",
    textAlign: 'right',
    visible: true,
    width: 50,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate,
    template: numberTemplate,
    editType: 'numeric',
    typeFilter: "Number"
  },
  {
    isPrimaryKey: false,
    textAlign: "center",
    field: 'status',
    headerText: "Status",
    visible: true,
    width: 80,
    headerTemplate,
    typeFilter: "Checkbox",
    hideOperator: true,
    template: statusTemplate
  }
]
export const sortColumns = [
  {
    isPrimaryKey: true,
    field: 'key',
    headerText: "Unit code",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'label',
    headerText: "Unit name",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  }
]