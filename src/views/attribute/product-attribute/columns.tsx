import { headerTemplate, checkTemplate, statusTemplate } from '@src/utility/Common'

export const headerColumns = [
  {
    isPrimaryKey: true,
    field: 'code',
    headerText: "Product attribute code",
    visible: true,
    width: 150,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'name',
    headerText: "Product attribute name",
    visible: true,
    width: 200,
    headerTemplate
  },
  {
    isPrimaryKey: false,
    textAlign: "center",
    field: "allowFiltering",
    headerText: "Allow filtering",
    visible: true,
    width: 100,
    typeFilter: "Checkbox",
    hideOperator: true,
    headerTemplate,
    template: checkTemplate
  },
  {
    isPrimaryKey: true,
    field: 'status',
    headerText: "Status",
    textAlign: "center",
    visible: true,
    width: 100,
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
    headerText: "Product attribute name",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  }
]