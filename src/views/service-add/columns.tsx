import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import {  numberTemplate, statusTemplate } from '@src/utility/Common'


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
    headerText: "ServiceCode",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'name',
    headerText: "ServiceName",
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
    visible: false,
    width: 200,
    maxWidth: 250,
    minWidth: 150,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'price',
    headerText: "FixPrice",
    textAlign: 'right',
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate,
    template: numberTemplate,
    type: "string",
    typeFilter: "Number"
  },
  {
    isPrimaryKey: true,
    field: 'minPrice',
    headerText: "MinPrice",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate,
    template: numberTemplate,
    textAlign: "right",
    type: "string",
    typeFilter: "Number"
  },
  {
    isPrimaryKey: true,
    field: 'maxPrice',
    headerText: "MaxPrice",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate,
    template: numberTemplate,
    textAlign: "right",
    type: "string",
    typeFilter: "Number"
  },
  {
    isPrimaryKey: false,
    field: 'priceSyntax',
    headerText: "PriceSyntax",
    visible: true,
    width: 150,
    headerTemplate,
    // template: numberTemplate,
    textAlign: "right",
    type: "string",
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
    template: statusTemplate,
    hideOperator: true,
    typeFilter: "Checkbox"
  }

]
export const sortColumns = [
  {
    isPrimaryKey: true,
    field: 'key',
    headerText: "ServiceCode",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'label',
    headerText: "ServiceName",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  }
]