import {Fragment} from "react"
import { useTranslation } from "react-i18next"
import { checkTemplate, statusTemplate } from '@src/utility/Common'

const headerTemplate = (props: any) => {
  const {t} = useTranslation()
  return (
    <Fragment>
      {t(props.headerText)}
    </Fragment>
  )
}

export const headerColumns = [
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
    field: 'maxDays',
    headerText: "Max day",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    editType: 'numeric',
    typeFilter: "Number",
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'minDays',
    headerText: "Min day",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate,
    editType: 'numeric',
    typeFilter: "Number"
  },
  {
    isPrimaryKey: false,
    field: 'isDefault',
    textAlign: "center",
    headerText: "Is default",
    typeFilter: "Checkbox",
    hideOperator: true,
    visible: true,
    width: 110,
    headerTemplate,
    template: checkTemplate
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
    field: 'label',
    headerText: "Name",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  }
]