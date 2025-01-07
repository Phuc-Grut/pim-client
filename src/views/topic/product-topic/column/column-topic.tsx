import { statusTemplate } from "@src/utility/Common"
import { useTranslation } from "react-i18next"
import { Fragment } from "react/jsx-runtime"

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
    width: 200,
    maxWidth: 250,
    minWidth: 150,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'description',
    headerText: "Description",
    visible: true,
    width: 300,
    maxWidth: 350,
    minWidth: 250,
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