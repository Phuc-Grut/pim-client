
export default [

  {
    code: "Attribute",
    id: "Attribute",
    name: "Attribute",
    title: "Attribute",
    url: "/attribute",
    navLink: "/attribute",
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
    children: [
      {
        code: "ProductAttribute",
        id: "ProductAttribute",
        name: "ProductAttribute",
        title: "Product attribute",
        url: "/attribute/product-attribute",
        navLink: "/attribute/product-attribute",
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
        resAttributes: {
          ISBOOKMARKED: "1",
          VLAYOUT_ICON: "Circle"
        },
        sortOrder: 1,
        status: 1
      },
      {
        code: "SpecificationAttribute",
        id: "SpecificationAttribute",
        name: "SpecificationAttribute",
        title: "Specification attribute",
        url: "/attribute/specification-attribute",
        navLink: "/attribute/specification-attribute",
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
        resAttributes: {
          ISBOOKMARKED: "1",
          VLAYOUT_ICON: "Circle"
        },
        sortOrder: 1,
        status: 1
      }
    ],
    resAttributes: {
      ISBOOKMARKED: "1",
      VLAYOUT_ICON: "BecoxyAttr"
    },
    sortOrder: 1,
    status: 1
  }
]