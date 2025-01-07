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

const typeTemplate = (props: any) => {
  const { t } = useTranslation()

  const optionType: any = {
    0: t("Product brand"),
    1: t("InfomationChannel"),
    2: t("CategoryProduct"),
    3: t("Product management")
  }

  return (typeof props.type === "number") ? optionType[props.type] : ""
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
    isPrimaryKey: false,
    field: 'type',
    headerText: "Type",
    hideOperator: true,
    typeFilter: "Checkbox",
    visible: true,
    width: 110,
    headerTemplate,
    template: typeTemplate
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