import {Fragment} from "react"
import { useTranslation } from "react-i18next"
import {statusDefault, statusObjDefault} from "@src/domain/constants/constantSelect"
import { Badge } from 'reactstrap'
import { numberTemplate } from "@src/utility/Common"
import moment from "moment"

const objStatus = statusDefault.reduce((a: any, v: any) => ({ ...a, [v.value]: v.label}), {})

const statusTemplate = (props: any) => {
  return (
    <Badge className='text-capitalize' color={statusObjDefault[props.status]} pill>
      {objStatus[props.status]}
    </Badge>
  )
}

const headerTemplate = (props: any) => {
  const {t} = useTranslation()
  return (
    <Fragment>
      {t(props.headerText)}
    </Fragment>
  )
}

const activeDateTemplate = (props: any) => {
  return props.activeDate !== null ? moment(props.activeDate).format('DD/MM/yyyy HH:mm') : ''
}

export const headerColumns = [
  {
    field: "toCurrency",
    headerText: "Currency exchange",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    field: "fromCurrency",
    headerText: "Original currency",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'calculation',
    headerText: "Calculation",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    hideOperator: true,
    typeFilter: "Checkbox",
    headerTemplate
  },
  {
    field: "rate",
    headerText: "Exchange rate",
    textAlign: "right",
    typeFilter: "Number",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate,
    template: numberTemplate
  },
  {
    field: "activeDate",
    headerText: "Active date",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate,
    hideOperator: true,
    typeFilter: "DateRange",
    template: activeDateTemplate
  },
  {
    textAlign: "center",
    field: "status",
    headerText: "Status",
    visible: true,
    width: 110,
    hideOperator: true,
    typeFilter: "Checkbox",
    headerTemplate,
    template: statusTemplate
  }
]