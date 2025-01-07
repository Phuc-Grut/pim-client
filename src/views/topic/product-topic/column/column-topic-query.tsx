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

export const headerColumnsTopicQuery = [
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
    field: 'sourceCode',
    headerText: "Source code",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'keyword',
    headerText: "Keyword",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'condition',
    headerText: "Condition",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'pageQuery',
    headerText: "Page query",
    visible: true,
    width: 130,
    maxWidth: 150,
    minWidth: 110,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'description',
    headerText: "Description",
    visible: true,
    width: 200,
    maxWidth: 250,
    minWidth: 150,
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