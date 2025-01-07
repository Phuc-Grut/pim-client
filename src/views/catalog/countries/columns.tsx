import {Fragment} from "react"
import { useTranslation } from "react-i18next"
import { Badge } from 'reactstrap'

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
    headerText: "CurrencyFormat",
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
    visible: true,
    width: 110,
    headerTemplate,
    template: statusTemplate
  }
]