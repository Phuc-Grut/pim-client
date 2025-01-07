export default [
  {
    code: "Catalog",
    id: "Catalog",
    name: "Catalog",
    title: "Catalog",
    url: "/catalog",
    navLink: "/catalog",
    parent: null,
    privileges: {
      ACTIVE: false,
      READ: false,
      OPEN: false,
      ADD: false,
      EDIT: false,
      SEARCH: false,
      DELETE: false
    },
    // children: [
    //   {
    //     code: "ProductType",
    //     id: "ProductType",
    //     name: "ProductType",
    //     title: "Product type",
    //     url: "/catalog/product-type",
    //     navLink: "/catalog/product-type",
    //     parent: null,
    //     privileges: {
    //       ACTIVE: false,
    //       READ: false,
    //       OPEN: false,
    //       ADD: false,
    //       EDIT: false,
    //       SEARCH: false,
    //       DELETE: false
    //     },
    //     resAttributes: {
    //       ISBOOKMARKED: "1",
    //       VLAYOUT_ICON: "Circle"
    //     },
    //     sortOrder: 1,
    //     status: 1
    //   },
    //   {
    //     code: "Product Category",
    //     id: "Product Category",
    //     name: "Product Category",
    //     title: "Product Category",
    //     url: "/catalog/product-category",
    //     navLink: "/catalog/product-category",
    //     parent: null,
    //     privileges: {
    //       ACTIVE: false,
    //       READ: false,
    //       OPEN: false,
    //       ADD: false,
    //       EDIT: false,
    //       SEARCH: false,
    //       DELETE: false
    //     },
    //     resAttributes: {
    //       ISBOOKMARKED: "1",
    //       VLAYOUT_ICON: "Circle"
    //     },
    //     sortOrder: 1,
    //     status: 1
    //   },
    //   {
    //     code: "InfomationChannel",
    //     id: "InfomationChannel",
    //     name: "InfomationChannel",
    //     title: "InfomationChannel",
    //     url: "/catalog/group-category",
    //     navLink: "/catalog/group-category",
    //     parent: null,
    //     privileges: {
    //       ACTIVE: false,
    //       READ: false,
    //       OPEN: false,
    //       ADD: false,
    //       EDIT: false,
    //       SEARCH: false,
    //       DELETE: false
    //     },
    //     resAttributes: {
    //       ISBOOKMARKED: "1",
    //       VLAYOUT_ICON: "Circle"
    //     },
    //     sortOrder: 1,
    //     status: 1
    //   },
    //   {
    //     code: "Channel List",
    //     id: "Channel List",
    //     name: "Channel List",
    //     title: "Channel List",
    //     url: "/catalog/channel-list",
    //     navLink: "/catalog/channel-list",
    //     parent: null,
    //     privileges: {
    //       ACTIVE: false,
    //       READ: false,
    //       OPEN: false,
    //       ADD: false,
    //       EDIT: false,
    //       SEARCH: false,
    //       DELETE: false
    //     },
    //     resAttributes: {
    //       ISBOOKMARKED: "1",
    //       VLAYOUT_ICON: "Circle"
    //     },
    //     sortOrder: 1,
    //     status: 1
    //   },

    //   {
    //     code: "Currency",
    //     id: "Currency",
    //     name: "Currency",
    //     title: "Currency",
    //     url: "/catalog/currency",
    //     navLink: "/catalog/currency",
    //     parent: null,
    //     privileges: {
    //       ACTIVE: false,
    //       READ: false,
    //       OPEN: false,
    //       ADD: false,
    //       EDIT: false,
    //       SEARCH: false,
    //       DELETE: false
    //     },
    //     resAttributes: {
    //       ISBOOKMARKED: "1",
    //       VLAYOUT_ICON: "Circle"
    //     },
    //     sortOrder: 1,
    //     status: 1
    //   },
    //   {
    //     code: "ExchangeRate",
    //     id: "ExchangeRate",
    //     name: "ExchangeRate",
    //     title: "Exchange rate",
    //     url: "/catalog/exchange-rate",
    //     navLink: "/catalog/exchange-rate",
    //     parent: null,
    //     privileges: {
    //       ACTIVE: false,
    //       READ: false,
    //       OPEN: false,
    //       ADD: false,
    //       EDIT: false,
    //       SEARCH: false,
    //       DELETE: false
    //     },
    //     resAttributes: {
    //       ISBOOKMARKED: "1",
    //       VLAYOUT_ICON: "Circle"
    //     },
    //     sortOrder: 1,
    //     status: 1
    //   },
    //   {
    //     code: "Unit",
    //     id: "Unit",
    //     name: "Unit",
    //     title: "Unit",
    //     url: "/catalog/unit",
    //     navLink: "/catalog/unit",
    //     parent: null,
    //     privileges: {
    //       ACTIVE: false,
    //       READ: false,
    //       OPEN: false,
    //       ADD: false,
    //       EDIT: false,
    //       SEARCH: false,
    //       DELETE: false
    //     },
    //     resAttributes: {
    //       ISBOOKMARKED: "1",
    //       VLAYOUT_ICON: "Circle"
    //     },
    //     sortOrder: 1,
    //     status: 1
    //   },
    //   {
    //     code: "GroupUnit",
    //     id: "GroupUnit",
    //     name: "GroupUnit",
    //     title: "Group unit",
    //     url: "/catalog/group-unit",
    //     navLink: "/catalog/group-unit",
    //     parent: null,
    //     privileges: {
    //       ACTIVE: false,
    //       READ: false,
    //       OPEN: false,
    //       ADD: false,
    //       EDIT: false,
    //       SEARCH: false,
    //       DELETE: false
    //     },
    //     resAttributes: {
    //       ISBOOKMARKED: "1",
    //       VLAYOUT_ICON: "Circle"
    //     },
    //     sortOrder: 1,
    //     status: 1
    //   },
    //   {
    //     code: "TaxCategory",
    //     id: "TaxCategory",
    //     name: "TaxCategory",
    //     title: "Tax category",
    //     url: "/catalog/tax-category",
    //     navLink: "/catalog/tax-category",
    //     parent: null,
    //     privileges: {
    //       ACTIVE: false,
    //       READ: false,
    //       OPEN: false,
    //       ADD: false,
    //       EDIT: false,
    //       SEARCH: false,
    //       DELETE: false
    //     },
    //     resAttributes: {
    //       ISBOOKMARKED: "1",
    //       VLAYOUT_ICON: "Circle"
    //     },
    //     sortOrder: 1,
    //     status: 1
    //   },
    //   {
    //     code: "DeliveryTime",
    //     id: "DeliveryTime",
    //     name: "DeliveryTime",
    //     title: "Delivery time",
    //     url: "/catalog/delivery-time",
    //     navLink: "/catalog/delivery-time",
    //     parent: null,
    //     privileges: {
    //       ACTIVE: false,
    //       READ: false,
    //       OPEN: false,
    //       ADD: false,
    //       EDIT: false,
    //       SEARCH: false,
    //       DELETE: false
    //     },
    //     resAttributes: {
    //       ISBOOKMARKED: "1",
    //       VLAYOUT_ICON: "Circle"
    //     },
    //     sortOrder: 1,
    //     status: 1
    //   },
    //   {
    //     code: "ProductTag",
    //     id: "ProductTag",
    //     name: "ProductTag",
    //     title: "Product tag",
    //     url: "/catalog/product-tag",
    //     navLink: "/catalog/product-tag",
    //     parent: null,
    //     privileges: {
    //       ACTIVE: false,
    //       READ: false,
    //       OPEN: false,
    //       ADD: false,
    //       EDIT: false,
    //       SEARCH: false,
    //       DELETE: false
    //     },
    //     resAttributes: {
    //       ISBOOKMARKED: "1",
    //       VLAYOUT_ICON: "Circle"
    //     },
    //     sortOrder: 1,
    //     status: 1
    //   }
    // ],
    resAttributes: {
      ISBOOKMARKED: "1",
      VLAYOUT_ICON: "BecoxyList"
    },
    sortOrder: 1,
    status: 1
  }
]
