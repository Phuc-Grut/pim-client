
export default [

  {
    code: "Location",
    id: "Location",
    name: "Location",
    title: "Location",
    url: "/location",
    navLink: "/location",
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
        code: "Countries",
        id: "Countries",
        name: "Countries",
        title: "Countries",
        url: "/location/countries",
        navLink: "/location/countries",
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
        code: "StateProvince",
        id: "StateProvince",
        name: "StateProvince",
        title: "State province",
        url: "/location/state-province",
        navLink: "/location/state-province",
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
        code: "Districts",
        id: "Districts",
        name: "Districts",
        title: "Districts",
        url: "/location/districts",
        navLink: "/location/districts",
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
        code: "Ward",
        id: "Ward",
        name: "Ward",
        title: "Ward",
        url: "/location/ward",
        navLink: "/location/ward",
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
      VLAYOUT_ICON: "Navigation"
    },
    sortOrder: 1,
    status: 1
  }
]