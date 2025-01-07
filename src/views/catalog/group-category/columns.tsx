import {Fragment} from "react"
import { useTranslation } from "react-i18next"
import { statusTemplate } from '@src/utility/Common'

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
    field: 'code',
    headerText: "InfomationChannelCode",
    visible: true,
    width: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'name',
    headerText: "InfomationChannelName",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'description',
    headerText: "Description",
    clipMode: "EllipsisWithTooltip",
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
    hideOperator: true,
    typeFilter: "Checkbox",
    visible: true,
    width: 110,
    headerTemplate,
    template: statusTemplate
  }
]