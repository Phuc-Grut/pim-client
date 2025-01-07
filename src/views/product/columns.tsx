import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import {
  optionYesNO,
  statusDefault,
  statusObjDefault,
  tierPriceMethod
} from "@src/domain/constants/constantSelect"
import { Badge } from "reactstrap"
import { IGridColumns } from "@src/domain/interfaces/IGridColumns"
import {CDN_URL_VIEW} from "@src/domain/constants"
import { addPeriod, dateTemplate, dateTimeTemplate } from "@src/utility/Common"
import { isObjEmpty } from "@src/utility/Utils"
import avatarDefault from '@src/assets/images/avatars/default-pro.jpg'

const objStatus = statusDefault.reduce(
  (a: any, v: any) => ({ ...a, [v.value]: v.label }),
  {}
)

const statusTemplate = (props: any) => {
  return (
    <Badge
      className="text-capitalize"
      color={statusObjDefault[props.status]}
      pill
    >
      {objStatus[props.status]}
    </Badge>
  )
}
// const DateTemplate = (props: any) => {
//   return (
//     <Fragment>
//       {formatDate(props.signDate)}
//     </Fragment>
//   )
// }

const headerTemplate = (props: any) => {
  const { t } = useTranslation()
  return <Fragment>{t(props.headerText)}</Fragment>
}

const numberTemplate = (props: any) => {
  return (
    <Fragment>
      <div className='text-right'>
        {addPeriod(props[props.column.field])}
      </div>
    </Fragment>
  )
}

export const pictureTemplate = (props: any) => {
  const img: string | null | undefined = props.image
  return (
    <Fragment>
      {img === null || img === undefined || img === "" ? (
        <img src={avatarDefault} width={30} alt={''} />
      ) : (
        <>
          {img.startsWith("http") ? (
            <img src={img} width={30} alt={''} />
          ) : (
            <img
              alt={''}
              src={`${CDN_URL_VIEW}/${img}`}
              width={30}
              onError={(event: any) => {
                event.target.src = ""
              }}
            />
          )}
        </>
      )}
    </Fragment>
  )
}
const pictureTemplateRelated = (props: any) => {
  const img: string | null | undefined = props.image
  return (
    <Fragment>
      {img === null || img === undefined || img === "" ? (
        <div></div>
      ) : (
        <>
          {img.startsWith("http") ? (
            <img src={img} height={60} alt='' />
          ) : (
            <img
              alt={''}
              src={`${CDN_URL_VIEW}/${img}`}
              height={60}
              onError={(event: any) => {
                event.target.src = ""
              }}
            />
          )}
        </>
      )}
    </Fragment>
  )
}
const attrTemp = (props: any) => {
  return (
    <Fragment>
      {props.attr?.filter((a:any) => !isObjEmpty(a)).map((a:any, i:number) => (
        <div key={i}>{Object.keys(a)} : {Object.values(a)}</div>
      ))}
    </Fragment>
  )
}
const booleanParams = { params: { checked: false } }
const filterOptions = { operator: "contains", mode: "Immediate" }
export const headerColumns: IGridColumns[] = [
  {
    isPrimaryKey: false,
    field: "image",
    headerText: "Picture",
    visible: true,
    textAlign: "center",
    width: 50,
    minWidth: 40,
    maxWidth: 65,
    headerTemplate,
    template: pictureTemplate,
    allowFiltering: false
  },
  {
    isPrimaryKey: true,
    field: "code",
    headerText: "ProductCode",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 125,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    type: "string",
    filter: filterOptions
  },
  {
    isPrimaryKey: true,
    field: "name",
    headerText: "Product name",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 200,
    minWidth: 150,
    maxWidth: 350,
    headerTemplate,
    textAlign: "left",
    type: "string",
    filter: filterOptions
  },
  {
    isPrimaryKey: false,
    field: "unitName",
    headerText: "Unit",
    visible: true,
    width: 90,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    clipMode: "EllipsisWithTooltip",
    textAlign: "left"
  },
  {
    isPrimaryKey: false,
    field: "price",
    headerText: "Price",
    visible: true,
    width: 100,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    template: numberTemplate,
    clipMode: "EllipsisWithTooltip",
    textAlign: "right",
    editType: 'numeric',
    typeFilter: "Number"
  },
  {
    isPrimaryKey: false,
    field: "stockQuantity",
    headerText: "Stock quantity",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 100,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    template: numberTemplate,
    textAlign: "right",
    type: "string",
    typeFilter: "Number"
  },
  {
    isPrimaryKey: false,
    field: "productType",
    headerText: "Product type",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 140,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    type: "string",
    typeFilter: "Checkbox",
    hideOperator: true
  },
  {
    isPrimaryKey: false,
    field: "channel",
    headerText: "InfomationChannel",
    clipMode: "EllipsisWithTooltip",
    visible: false,
    width: 125,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    type: "string",
    filter: filterOptions
  },
  {
    isPrimaryKey: false,
    field: "store",
    headerText: "Store",
    clipMode: "EllipsisWithTooltip",
    visible: false,
    width: 125,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    type: "string",
    filter: filterOptions
  },
  {
    isPrimaryKey: false,
    field: "brand",
    headerText: "Product brand",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 125,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    type: "string",
    filter: filterOptions
  },
  {
    isPrimaryKey: false,
    field: "manufacturer",
    headerText: "Manufacturers",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 150,
    minWidth: 150,
    maxWidth: 250,
    headerTemplate,
    type: "string",
    filter: filterOptions
  },
  {
    isPrimaryKey: false,
    field: "warehouse",
    headerText: "Warehouse",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 125,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    type: "string",
    filter: filterOptions
  },
  {
    isPrimaryKey: false,
    field: "status",
    headerText: "Status",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 100,
    minWidth: 90,
    maxWidth: 125,
    headerTemplate,
    template: statusTemplate,
    textAlign: "center",
    type: "string",
    typeFilter: "Checkbox",
    hideOperator: true
  },
  {
    isPrimaryKey: false,
    field: "createdByName",
    headerText: "Created By",
    clipMode: "EllipsisWithTooltip",
    visible: false,
    width: 125,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    type: "string"
  },
  {
    isPrimaryKey: false,
    field: "createdDate",
    headerText: "Created Date",
    visible: true,
    clipMode: "EllipsisWithTooltip",
    width: 125,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    type: "string",
    typeFilter: 'DateRange',
    hideOperator: true,
    template: dateTimeTemplate
  },
  {
    isPrimaryKey: false,
    field: "updatedByName",
    headerText: "Updated By",
    visible: false,
    clipMode: "EllipsisWithTooltip",
    width: 125,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    type: "string"
  },
  {
    isPrimaryKey: false,
    field: "updatedDate",
    headerText: "Updated Date",
    visible: false,
    clipMode: "EllipsisWithTooltip",
    width: 125,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    type: "string",
    typeFilter: 'DateRange',
    hideOperator: true,
    template: dateTimeTemplate
  }
]
export const headerColumnsVariant: IGridColumns[] = [
  {
    isPrimaryKey: true,
    field: "code",
    headerText: "ProductCode",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 125,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: "name",
    headerText: "Product name",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 200,
    minWidth: 150,
    maxWidth: 350,
    headerTemplate,
    textAlign: "left"
  },
  {
    isPrimaryKey: true,
    field: "attributesJson",
    headerText: "Attribute",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 200,
    minWidth: 150,
    maxWidth: 350,
    headerTemplate,
    textAlign: "left",
    template: attrTemp
  },
  {
    isPrimaryKey: false,
    field: "price",
    headerText: "Price",
    visible: true,
    width: 100,
    minWidth: 100,
    maxWidth: 150,
    textAlign:"right",
    headerTemplate,
    template: numberTemplate
  },
  {
    isPrimaryKey: false,
    field: "stockQuantity",
    headerText: "Stock quantity",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 100,
    minWidth: 100,
    maxWidth: 150,
    textAlign:"right",
    headerTemplate,
    template: numberTemplate
  },
  {
    isPrimaryKey: false,
    field: "status",
    headerText: "Status",
    visible: true,
    width: 100,
    minWidth: 90,
    maxWidth: 125,
    headerTemplate,
    template: statusTemplate,
    textAlign: "center",
    type: "string",
    typeFilter: "Checkbox",
    hideOperator: true
  }, 
  {
    isPrimaryKey: false,
    field: "createdDate",
    headerText: "Created Date",
    visible: true,
    width: 125,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    type: "string",
    template: dateTimeTemplate
  }
]

export const ColumnsTablePriceByQty = [
  {
    isPrimaryKey: true,
    field: "Quantity",
    headerText: "Quantity",
    visible: true,
    width: 130,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: "Price",
    headerText: "Price",
    visible: true,
    width: 130,
    textAlign:"right",
    headerTemplate
  }
]

export const ColumnsExpensePrice = [
  {
    isPrimaryKey: true,
    field: "expensePriceID",
    headerText: "ExpensePriceID",
    visible: true,
    width: "100",
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: "expensePriceName",
    headerText: "ExpensePriceName",
    visible: true,
    width: "100",
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: "percentValue",
    headerText: "PercentValue",
    visible: true,
    width: "100",
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: "isChangeExpense",
    headerText: "IsChangeExpense",
    visible: true,
    width: "100",
    headerTemplate,
    displayAsCheckBox: true,
    edit: booleanParams,
    editType: "booleanedit"
  }
]

export const ColumnsAttribute = [
  {
    isPrimaryKey: true,
    field: "attributeID",
    headerText: "AttributeID",
    visible: true,
    width: "100",
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: "displayType",
    headerText: "DisplayType",
    visible: true,
    width: "100",
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: "attributeValueID",
    headerText: "AttributeValueID",
    visible: true,
    width: "100",
    headerTemplate
  }
]

export const ItemStructure = [
  {
    isPrimaryKey: true,
    field: "ItemStructureID",
    headerText: "ItemStructureID",
    visible: true,
    width: "100",
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: "ItemStructureName",
    headerText: "ItemStructureName",
    visible: true,
    width: "100",
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: "UnitID",
    headerText: "UnitID",
    visible: true,
    width: "100",
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: "ItemName",
    headerText: "ItemName",
    visible: true,
    width: "100",
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: "status",
    headerText: "status",
    visible: true,
    width: "100",
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: "UnitName",
    headerText: "UnitName",
    visible: true,
    width: "100",
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: "Quantity",
    headerText: "Quantity",
    visible: true,
    width: "100",
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: "Note",
    headerText: "Note",
    visible: true,
    width: "100",
    headerTemplate
  }
]
export const headerColumnsWarehouse: IGridColumns[] = [
  {
    isPrimaryKey: false,
    field: "id",
    headerText: "Warehouse",
    visible: true,
    width: "0",
    headerTemplate
  },
  {
    isPrimaryKey: false,
    field: "name",
    headerText: "Warehouse",
    visible: true,
    width: 250,
    minWidth: 200,
    maxWidth: 300,
    headerTemplate
  },
  {
    isPrimaryKey: false,
    field: "stockQuantity",
    headerText: "stockQuantity",
    visible: true,
    width: 120,
    minWidth: 100,
    maxWidth: 140,
    textAlign:"right",
    headerTemplate,
    template: numberTemplate
  },
  {
    isPrimaryKey: false,
    field: "reservedQuantity",
    headerText: "Reserved Quantity",
    visible: true,
    width: 120,
    minWidth: 100,
    maxWidth: 140,
    textAlign:"right",
    headerTemplate,
    template: numberTemplate
  },
  {
    isPrimaryKey: false,
    field: "plannedQuantity",
    headerText: "Plans quantity",
    visible: true,
    width: 120,
    minWidth: 100,
    maxWidth: 140,
    textAlign:"right",
    headerTemplate,
    template: numberTemplate
  }
]
export const headerColumnsPackage: IGridColumns[] = [
  {
    isPrimaryKey: false,
    field: "id",
    headerText: "",
    visible: true,
    width: "0",
    headerTemplate
  },
  {
    isPrimaryKey: false,
    field: "name",
    headerText: "Package",
    visible: true,
    width: 250,
    minWidth: 200,
    maxWidth: 300,
    headerTemplate
  },
  {
    isPrimaryKey: false,
    field: "weight",
    headerText: "Real weight",
    visible: true,
    width: 120,
    minWidth: 100,
    maxWidth: 140,
    textAlign:"right",
    headerTemplate,
    template: numberTemplate
  },
  {
    isPrimaryKey: false,
    field: "length",
    headerText: "Length",
    visible: true,
    width: 120,
    minWidth: 100,
    maxWidth: 140,
    textAlign:"right",
    headerTemplate,
    template: numberTemplate
  },
  {
    isPrimaryKey: false,
    field: "width",
    headerText: "Width",
    visible: true,
    width: 120,
    minWidth: 100,
    maxWidth: 140,
    textAlign:"right",
    headerTemplate,
    template: numberTemplate
  },
  {
    isPrimaryKey: false,
    field: "height",
    headerText: "Height",
    visible: true,
    width: 120,
    minWidth: 100,
    maxWidth: 140,
    textAlign:"right",
    headerTemplate,
    template: numberTemplate
  }
]
export const headerColumnsSpecialAttribute: IGridColumns[] = [
  {
    isPrimaryKey: false,
    field: "specificationAttributeName",
    headerText: "Specification attribute name",
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    headerTemplate
  },
  {
    isPrimaryKey: false,
    field: "optionName",
    headerText: "Option",
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    headerTemplate
  }
]
export const headerColumnsProductAttribute: IGridColumns[] = [
  {
    isPrimaryKey: false,
    field: "name",
    headerText: "Product attribute name",
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    headerTemplate
  },
  {
    isPrimaryKey: false,
    field: "opt",
    headerText: "Option",
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    headerTemplate
  }
]
export const headerColumnsProductAttributeCombination: IGridColumns[] = [
  {
    field: "name",
    headerText: "Product attribute name",
    visible: true,
    width: 200,
    minWidth: 180,
    maxWidth: 250,
    headerTemplate
  },
  {
    field: "isActive",
    headerText: "Active",
    visible: true,
    width: 100,
    minWidth: 100,
    maxWidth: 100,
    headerTemplate
  },
  {
    field: "price",
    headerText: "Price",
    visible: true,
    width: 100,
    minWidth: 100,
    maxWidth: 100,
    textAlign:"right",
    headerTemplate
  },
  {
    field: "sku",
    headerText: "SKU",
    visible: true,
    width: 100,
    minWidth: 100,
    maxWidth: 100,
    headerTemplate
  },
  {
    field: "stockQuantity",
    headerText: "Stock quantity",
    visible: true,
    width: 100,
    minWidth: 100,
    maxWidth: 100,
    textAlign:"right",
    headerTemplate
  }
]
export const headerColumnsProductRelated: IGridColumns[] = [
  {
    isPrimaryKey: false,
    field: "image",
    headerText: "Picture",
    visible: true,
    textAlign: "center",
    width: 20,
    minWidth: 20,
    maxWidth: 25,
    headerTemplate,
    template: pictureTemplateRelated,
    allowFiltering: false
  },
  {
    field: "code",
    headerText: "Product code",
    visible: true,
    width: 70,
    minWidth: 60,
    maxWidth: 80,
    headerTemplate
  },
  {
    field: "name",
    headerText: "Product name",
    visible: true,
    width: 240,
    minWidth: 220,
    maxWidth: 260,
    headerTemplate
  }
]

const calculationMethodTemp = (props: any) => {
  const {t} = useTranslation()
  return (
    <Fragment>
      {t(tierPriceMethod.find((a:any) => a.value === props.calculationMethod)?.label ?? '')}
    </Fragment>
  )
}

const payRequiredTemp = (props: any) => {
  const {t} = useTranslation()
  return (
    <Fragment>
      {t(optionYesNO.find((a:any) => a.value === props.payRequired)?.label ?? '')}
    </Fragment>
  )
}

const statusTemp = (props: any) => {
  const {t} = useTranslation()
  return (
    <Fragment>
      {t(statusDefault.find((a:any) => a.value === props.status)?.label ?? '')}
    </Fragment>
  )
}

export const headerColumnsServiceAdd: IGridColumns[] = [
  {
    isPrimaryKey: false,
    field: 'serviceAddName',
    headerText: 'Service name',
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    headerTemplate
  },
  {
    field: 'calculationMethod',
    headerText: 'Calculation method',
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    headerTemplate,
    template: calculationMethodTemp
  },
  {
    field: 'payRequired',
    headerText: 'PayRequired',
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    headerTemplate,
    template: payRequiredTemp
  },
  {
    field: 'price',
    headerText: 'Value',
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    textAlign:"right",
    headerTemplate,
    template: numberTemplate
  },
  {
    field: 'minPrice',
    headerText: 'MinPrice',
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    textAlign:"right",
    headerTemplate,
    template: numberTemplate
  },
  {
    field: 'maxPrice',
    headerText: 'MaxPrice',
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    textAlign:"right",
    headerTemplate,
    template: numberTemplate
  },
  {
    isPrimaryKey: false,
    field: 'currency',
    headerText: 'Currency',
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    headerTemplate
  },
  {
    isPrimaryKey: false,
    field: 'status',
    headerText: 'Status',
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    headerTemplate,
    template: statusTemp
  }
]

export const headerColumnsTier: IGridColumns[] = [
  {
    field: 'quantity',
    headerText: 'Quantity',
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    textAlign:"right",
    headerTemplate,
    template: numberTemplate
  },
  {
    field: 'price',
    headerText: 'Value',
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    textAlign:"right",
    headerTemplate,
    template: numberTemplate
  },
  {
    field: 'method',
    headerText: 'Calculation method',
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    headerTemplate
  },
  {
    field: 'startDate',
    headerText: 'Start date',
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    headerTemplate,
    template: dateTemplate
  },
  {
    field: 'endDate',
    headerText: 'End date',
    visible: true,
    width: 140,
    minWidth: 120,
    maxWidth: 160,
    headerTemplate,
    template: dateTemplate
  }
]
