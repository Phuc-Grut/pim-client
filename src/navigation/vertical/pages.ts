// ** Icons Import

export default [
  {
    id: "9de5ce12-0e43-4064-844e-0d0365742739",
    code: "Dashboard",
    name: "Trang chủ",
    title: "Trang chủ",
    navLink: "/dashboard",
    url: "/dashboard",
    parent: null,
    status: 1,
    sortOrder: 1,
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
      ISBOOKMARKED: "1"
    }
  },
  {
    id: "8a1b4b59-3c1e-474a-a487-8d18aabd5ab5",
    code: "Sales",
    name: "Mua hàng",
    title: "Mua hàng",
    navLink: "/sales/dashboard",
    url: "/sales/dashboard",
    parent: null,
    status: 1,
    sortOrder: 2,
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
      VLAYOUT_ICON: "Users",
      ISBOOKMARKED: "1"
    },
    children: [
      {
        id: "94ce5b75-a3b2-4d4d-8089-598d37d91c54",
        code: "EmployeeDashboard",
        name: "Dashboard",
        title: "Dashboard",
        navLink: "/sales/dashboard",
        url: "/sales/dashboard",
        parent: "8a1b4b59-3c1e-474a-a487-8d18aabd5ab5",
        status: 1,
        sortOrder: 1,
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
          ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5",
          VLAYOUT_ICON: "Home"
        }
      },
      {
        id: "f3e30901-2cd1-48cd-8006-206870cd626c",
        code: "Insurances",
        name: "Insurances",
        title: "Insurances",
        navLink: "/sales/insurances",
        url: "/sales/insurances",
        parent: "8a1b4b59-3c1e-474a-a487-8d18aabd5ab5",
        status: 1,
        sortOrder: 2,
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
          VLAYOUT_ICON: "es_icon-Insurance",
          ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5"
        }
      },
      {
        id: "a74b95c5-b51e-4fbf-b41e-749e78e1bc17",
        code: "Organizations",
        name: "Organizations",
        title: "Organizations",
        navLink: "/sales/organizations",
        url: "/sales/organizations",
        parent: "8a1b4b59-3c1e-474a-a487-8d18aabd5ab5",
        status: 1,
        sortOrder: 3,
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
          ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5",
          VLAYOUT_ICON: "Circle"
        }
      },
      {
        id: "75f06fa5-7d9d-43be-ad3f-3a2c84beb0a2",
        code: "Departments",
        name: "Departments",
        title: "Departments",
        navLink: "/sales/departments",
        url: "/sales/departments",
        parent: "8a1b4b59-3c1e-474a-a487-8d18aabd5ab5",
        status: 1,
        sortOrder: 4,
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
          VLAYOUT_ICON: "es_icon-Department",
          ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5"
        }
      },
      {
        id: "f6626c11-6956-4ebc-bd21-c0a8c8290b61",
        code: "Employees",
        name: "Employees profile",
        title: "Employees profile",
        navLink: "/sales/employees",
        url: "/sales/employees",
        parent: "8a1b4b59-3c1e-474a-a487-8d18aabd5ab5",
        status: 1,
        sortOrder: 5,
        privileges: {
          ACTIVE: true,
          READ: true,
          OPEN: true,
          ADD: true,
          EDIT: false,
          SEARCH: true,
          DELETE: true
        },
        resAttributes: {
          ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5",
          VLAYOUT_ICON: "User"
        }
      },
      {
        id: "cc0268dc-17a8-46e0-a77b-4804d5077c02",
        code: "LaborContract",
        name: "Labor contract",
        title: "Labor contract",
        navLink: "/sales/labor-contract",
        url: "/sales/labor-contract",
        parent: "8a1b4b59-3c1e-474a-a487-8d18aabd5ab5",
        status: 1,
        sortOrder: 6,
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
          ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5",
          VLAYOUT_ICON: "FileText"
        }
      },
      {
        id: "f44ccc0a-ccfa-4ad8-be1a-d420ee284908",
        code: "ContractExtend",
        name: "Contract extend",
        title: "Contract extend",
        navLink: "/sales/contract-extend",
        url: "/sales/contract-extend",
        parent: "8a1b4b59-3c1e-474a-a487-8d18aabd5ab5",
        status: 1,
        sortOrder: 7,
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
          VLAYOUT_ICON: "FilePlus",
          ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5"
        }
      },
      {
        id: "daee9ec7-90e5-4b92-83ea-8e20a11b8061",
        code: "ContractTermination",
        name: "Contract termination",
        title: "Contract termination",
        navLink: "/sales/contract-termination",
        url: "/sales/contract-termination",
        parent: "8a1b4b59-3c1e-474a-a487-8d18aabd5ab5",
        status: 1,
        sortOrder: 8,
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
          ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5",
          VLAYOUT_ICON: "FileMinus"
        }
      },
      {
        id: "d48e3450-de7a-42a5-8de4-4d0d8ce602c4",
        code: "SalaryProfile",
        name: "Salary profile",
        title: "Salary profile",
        navLink: "/sales/salary-profile",
        url: "/sales/salary-profile",
        parent: "8a1b4b59-3c1e-474a-a487-8d18aabd5ab5",
        status: 1,
        sortOrder: 9,
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
          VLAYOUT_ICON: "es_icon-SalaryProfile",
          ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5"
        }
      },
      {
        id: "c89dc348-3b29-4688-9887-787e6c8fdcf1",
        code: "AppointManager",
        name: "Appoint manager",
        title: "Appoint manager",
        navLink: "/sales/appoint-manager",
        url: "/sales/appoint-manager",
        parent: "8a1b4b59-3c1e-474a-a487-8d18aabd5ab5",
        status: 1,
        sortOrder: 10,
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
          VLAYOUT_ICON: "Award",
          ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5"
        },
        children: [
          {
            id: "7846a91b-642a-4d25-b2b1-681c125cfc0c",
            code: "AppointmentProposals",
            name: "Appointment Proposals",
            title: "Appointment Proposals",
            navLink: "/sales/appointment-proposals",
            url: "/sales/appointment-proposals",
            parent: "c89dc348-3b29-4688-9887-787e6c8fdcf1",
            status: 1,
            sortOrder: 1,
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
              ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5",
              VLAYOUT_ICON: "Circle"
            }
          },
          {
            id: "1000a7e6-ff34-473d-bc59-518486eab584",
            code: "DecisionAppoints",
            name: "Decision Appoints",
            title: "Decision Appoints",
            navLink: "/sales/decision-appoints",
            url: "/sales/decision-appoints",
            parent: "c89dc348-3b29-4688-9887-787e6c8fdcf1",
            status: 1,
            sortOrder: 2,
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
              VLAYOUT_ICON: "Circle",
              ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5"
            }
          }
        ]
      },
      {
        id: "13569521-8734-4263-916e-0a69fa36aef4",
        code: "SubsidizeManager",
        name: "Subsidize manager",
        title: "Subsidize manager",
        navLink: "/sales/subsidize-manager",
        url: "/sales/subsidize-manager",
        parent: "8a1b4b59-3c1e-474a-a487-8d18aabd5ab5",
        status: 1,
        sortOrder: 11,
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
          VLAYOUT_ICON: "Heart",
          ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5"
        }
      },
      {
        id: "e26965a7-daae-4203-a3a8-f028df523613",
        code: "RewardDiscipline",
        name: "Reward discipline",
        title: "Reward discipline",
        navLink: "/sales/reward-discipline",
        url: "/sales/reward-discipline",
        parent: "8a1b4b59-3c1e-474a-a487-8d18aabd5ab5",
        status: 1,
        sortOrder: 12,
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
          ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5",
          VLAYOUT_ICON: "Award"
        }
      },
      {
        id: "fc7b12a5-298c-4575-b3ad-0ee6e6085581",
        code: "HandOvers",
        name: "Hand over",
        title: "Hand over",
        navLink: "/sales/hand-overs",
        url: "/sales/hand-overs",
        parent: "8a1b4b59-3c1e-474a-a487-8d18aabd5ab5",
        status: 1,
        sortOrder: 13,
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
          ROOT_ID: "8A1B4B59-3C1E-474A-A487-8D18AABD5AB5",
          VLAYOUT_ICON: "Circle"
        }
      }
    ]
  },
  {
    id: "e6626cd3-33bb-4519-8b75-c85194bba801",
    code: "AssetManagement",
    name: "Tài sản",
    title: "Tài sản",
    navLink: "/asset/dashboard",
    url: "/asset/dashboard",
    parent: null,
    status: 1,
    sortOrder: 3,
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
      VLAYOUT_ICON: "Box"
    },
    children: [
      {
        id: "653dcc72-e162-4316-8f37-a3f6643553ad",
        code: "AssetDashboard",
        name: "Dashboard",
        title: "Dashboard",
        navLink: "/asset/dashboard",
        url: "/asset/dashboard",
        parent: "e6626cd3-33bb-4519-8b75-c85194bba801",
        status: 1,
        sortOrder: 1,
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
          VLAYOUT_ICON: "Home",
          ROOT_ID: "E6626CD3-33BB-4519-8B75-C85194BBA801"
        }
      },
      {
        id: "d8a55aa1-bd1d-4687-aa29-c415c1135982",
        code: "AssetAllocation",
        name: "Asset allocation",
        title: "Asset allocation",
        navLink: "/asset/asset-allocation",
        url: "/asset/asset-allocation",
        parent: "e6626cd3-33bb-4519-8b75-c85194bba801",
        status: 1,
        sortOrder: 2,
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
          VLAYOUT_ICON: "Star",
          ROOT_ID: "E6626CD3-33BB-4519-8B75-C85194BBA801"
        }
      },
      {
        id: "645b5d6f-93d5-4b2f-b1a5-6343e8fb86c8",
        code: "AssetManagement",
        name: "Asset management",
        title: "Asset management",
        navLink: "/asset/asset-management",
        url: "/asset/asset-management",
        parent: "e6626cd3-33bb-4519-8b75-c85194bba801",
        status: 1,
        sortOrder: 3,
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
          VLAYOUT_ICON: "Box",
          ROOT_ID: "E6626CD3-33BB-4519-8B75-C85194BBA801"
        }
      },
      {
        id: "24c226cd-281a-4f4d-b93e-bd729f9a2e7f",
        code: "AssetHandoverReport",
        name: "Asset handover report",
        title: "Asset handover report",
        navLink: "/asset/asset-handover-report",
        url: "/asset/asset-handover-report",
        parent: "e6626cd3-33bb-4519-8b75-c85194bba801",
        status: 1,
        sortOrder: 4,
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
          ROOT_ID: "E6626CD3-33BB-4519-8B75-C85194BBA801",
          VLAYOUT_ICON: "FileText"
        }
      },
      {
        id: "78b813a1-ee43-418b-ba7e-0eabd3027a80",
        code: "AssetClassCatalog",
        name: "Asset class catalog",
        title: "Asset class catalog",
        navLink: "/asset/asset-class-catalog",
        url: "/asset/asset-class-catalog",
        parent: "e6626cd3-33bb-4519-8b75-c85194bba801",
        status: 1,
        sortOrder: 5,
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
          ROOT_ID: "E6626CD3-33BB-4519-8B75-C85194BBA801",
          VLAYOUT_ICON: "Pocket"
        }
      },
      {
        id: "f11a21d3-11e1-40a6-93fd-cfb6f8bf9322",
        code: "AssetCategoryCatalog",
        name: "Asset category catalog",
        title: "Asset category catalog",
        navLink: "/asset/asset-category-catalogs",
        url: "/asset/asset-category-catalogs",
        parent: "e6626cd3-33bb-4519-8b75-c85194bba801",
        status: 1,
        sortOrder: 6,
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
          VLAYOUT_ICON: "Pocket",
          ROOT_ID: "E6626CD3-33BB-4519-8B75-C85194BBA801"
        }
      }
    ]
  },
  {
    id: "a3f72029-e648-4970-ba9f-edf1b54f565b",
    code: "AdministrativeManager",
    name: "Hành chính",
    title: "Hành chính",
    navLink: "/administrative/dashboard",
    url: "/administrative/dashboard",
    parent: null,
    status: 1,
    sortOrder: 4,
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
      VLAYOUT_ICON: "Mail"
    },
    children: [
      {
        id: "143f61b2-36d7-4ade-a3d6-2bc294b9d4df",
        code: "AdministrationDashboard",
        name: "Dashboard",
        title: "Dashboard",
        navLink: "/administrative/dashboard",
        url: "/administrative/dashboard",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 1,
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
          VLAYOUT_ICON: "Home",
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B"
        }
      },
      {
        id: "53338c2d-64b1-45ae-9b9a-876469968103",
        code: "Announcements",
        name: "Announcements",
        title: "Announcements",
        navLink: "/administrative/announcements",
        url: "/administrative/announcements",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 2,
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
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B",
          VLAYOUT_ICON: "Bell"
        }
      },
      {
        id: "d9a02756-6393-4002-92e8-94d9ada7fe12",
        code: "RegisterCars",
        name: "Register cars",
        title: "Register cars",
        navLink: "/administrative/register-cars",
        url: "/administrative/register-cars",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 3,
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
          VLAYOUT_ICON: "Truck",
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B"
        }
      },
      {
        id: "41bb329f-57df-45b1-806a-dbaab3b48184",
        code: "RegisterEats",
        name: "Register eats",
        title: "Register eats",
        navLink: "/administrative/register-eats",
        url: "/administrative/register-eats",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 4,
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
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B",
          VLAYOUT_ICON: "Coffee"
        }
      },
      {
        id: "c5dc5fb9-47ae-4a07-bd1f-bd6d6b0ef4ee",
        code: "MealCustomer",
        name: "Meal customer",
        title: "Meal customer",
        navLink: "/administrative/meal-customer",
        url: "/administrative/meal-customer",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 5,
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
          VLAYOUT_ICON: "Circle",
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B"
        }
      },
      {
        id: "65cfa017-3f53-42c7-afc9-16577a94a321",
        code: "MeetingCalendars",
        name: "Meeting calendars",
        title: "Meeting calendars",
        navLink: "/administrative/meeting-calendars",
        url: "/administrative/meeting-calendars",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 6,
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
          VLAYOUT_ICON: "Calendar",
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B"
        }
      },
      {
        id: "06ce92b5-f9ca-4fa7-b092-7abdc7cb98de",
        code: "Mission",
        name: "Mission",
        title: "Mission",
        navLink: "/administrative/mission",
        url: "/administrative/mission",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 7,
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
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B",
          VLAYOUT_ICON: "Briefcase"
        }
      },
      {
        id: "46944e08-5b89-4b2b-9595-8f4e4e2d04b9",
        code: "LeaveRequest",
        name: "Leave request",
        title: "Leave request",
        navLink: "/administrative/leave-request",
        url: "/administrative/leave-request",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 8,
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
          VLAYOUT_ICON: "Circle",
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B"
        }
      },
      {
        id: "5adf3d0b-5143-4b5d-a196-469fe83dc8c7",
        code: "Leave",
        name: "Leave",
        title: "Leave",
        navLink: "/administrative/leave",
        url: "/administrative/leave",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 9,
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
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B",
          VLAYOUT_ICON: "Circle"
        }
      },
      {
        id: "bfd4cb0e-d250-4766-8cbe-5ea08121b73c",
        code: "Overtime",
        name: "Overtime",
        title: "Overtime",
        navLink: "/administrative/overtime",
        url: "/administrative/overtime",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 10,
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
          VLAYOUT_ICON: "Clock",
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B"
        }
      },
      {
        id: "afb0ab51-df1e-45e8-8eb0-a3dcd86ef488",
        code: "AdvancePays",
        name: "Advance pays",
        title: "Advance pays",
        navLink: "/administrative/advance-pays",
        url: "/administrative/advance-pays",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 11,
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
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B",
          VLAYOUT_ICON: "Circle"
        }
      },
      {
        id: "73784bce-2bb7-4e54-a94a-c3e36e00900f",
        code: "Pay",
        name: "Pay",
        title: "Pay",
        navLink: "/administrative/pay",
        url: "/administrative/pay",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 12,
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
          VLAYOUT_ICON: "CreditCard",
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B"
        }
      },
      {
        id: "71e6c8d0-2ab6-4ee0-8da7-bda81641ef46",
        code: "LateEarly",
        name: "LateEarly",
        title: "LateEarly",
        navLink: "/administrative/late-early",
        url: "/administrative/late-early",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 13,
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
          VLAYOUT_ICON: "Circle",
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B"
        }
      },
      {
        id: "422a97fd-bdeb-49a5-b30b-6f8d853efddc",
        code: "Resigns",
        name: "Resigns",
        title: "Resigns",
        navLink: "/administrative/resigns",
        url: "/administrative/resigns",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 14,
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
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B",
          VLAYOUT_ICON: "Circle"
        }
      },
      {
        id: "0082781e-a027-490b-9bea-1b4fbbb9cac2",
        code: "LeaveAllocations",
        name: "Leave allocations",
        title: "Leave allocations",
        navLink: "/administrative/leave-allocations",
        url: "/administrative/leave-allocations",
        parent: "a3f72029-e648-4970-ba9f-edf1b54f565b",
        status: 1,
        sortOrder: 15,
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
          ROOT_ID: "A3F72029-E648-4970-BA9F-EDF1B54F565B",
          VLAYOUT_ICON: "Circle"
        }
      }
    ]
  },
  {
    id: "0f4c2e8d-74f7-4d70-8223-edaac3e623f8",
    code: "PayrollManager",
    name: "Công - Lương",
    title: "Công - Lương",
    navLink: "/payroll/dashboard",
    url: "/payroll/dashboard",
    parent: null,
    status: 1,
    sortOrder: 5,
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
      VLAYOUT_ICON: "es_icon-Payroll"
    },
    children: [
      {
        id: "29e00480-eec5-4399-a2a2-0956095de5ce",
        code: "PayrollDashboard",
        name: "Dashboard",
        title: "Dashboard",
        navLink: "/payroll/dashboard",
        url: "/payroll/dashboard",
        parent: "0f4c2e8d-74f7-4d70-8223-edaac3e623f8",
        status: 1,
        sortOrder: 1,
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
          VLAYOUT_ICON: "Home",
          ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8"
        }
      },
      {
        id: "e082a383-0732-49e0-9c52-168f2b6b496a",
        code: "SetupTimekeeping",
        name: "Setup",
        title: "Setup",
        navLink: null,
        url: null,
        parent: "0f4c2e8d-74f7-4d70-8223-edaac3e623f8",
        status: 1,
        sortOrder: 2,
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
          VLAYOUT_ICON: "Settings",
          ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8"
        },
        children: [
          {
            id: "261ae0f4-d965-4e0a-b4cd-2d31c4c7fa5a",
            code: "Symbol",
            name: "Symbol",
            title: "Symbol",
            navLink: "/payroll/setup/symbol",
            url: "/payroll/setup/symbol",
            parent: "e082a383-0732-49e0-9c52-168f2b6b496a",
            status: 1,
            sortOrder: 1,
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
              ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8",
              VLAYOUT_ICON: "Circle"
            }
          },
          {
            id: "b8ac314b-e0a1-4b10-836d-0d459187e30d",
            code: "Timekeeper",
            name: "Timekeeper",
            title: "Timekeeper",
            navLink: "/payroll/setup/timekeeper",
            url: "/payroll/setup/timekeeper",
            parent: "e082a383-0732-49e0-9c52-168f2b6b496a",
            status: 1,
            sortOrder: 2,
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
              VLAYOUT_ICON: "Circle",
              ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8"
            }
          },
          {
            id: "6cb7f34e-0f8a-484c-9d03-43e0f038a27c",
            code: "StandardWork",
            name: "StandardWork",
            title: "StandardWork",
            navLink: "/payroll/setup/standard-work",
            url: "/payroll/setup/standard-work",
            parent: "e082a383-0732-49e0-9c52-168f2b6b496a",
            status: 1,
            sortOrder: 3,
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
              ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8",
              VLAYOUT_ICON: "Circle"
            }
          }
        ]
      },
      {
        id: "946758bf-4bdb-4e1c-ad6a-bb52645718f7",
        code: "ArrangeWorkShifts",
        name: "Arrange work shifts",
        title: "Arrange work shifts",
        navLink: "/payroll/arrange-work-shifts",
        url: "/payroll/arrange-work-shifts",
        parent: "0f4c2e8d-74f7-4d70-8223-edaac3e623f8",
        status: 1,
        sortOrder: 2,
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
          VLAYOUT_ICON: "Circle",
          ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8"
        }
      },
      {
        id: "1fd83259-b21a-475a-ad64-f20612da2823",
        code: "AttendanceExplanation",
        name: "Attendance explanation",
        title: "Attendance explanation",
        navLink: "/payroll/attendance-explanation",
        url: "/payroll/attendance-explanation",
        parent: "0f4c2e8d-74f7-4d70-8223-edaac3e623f8",
        status: 1,
        sortOrder: 3,
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
          ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8",
          VLAYOUT_ICON: "FileText"
        }
      },
      {
        id: "2274e069-4205-46d3-8069-c3516c56ceaa",
        code: "AdjustmentOfShiftArrangement",
        name: "Adjustment of shift arrangement",
        title: "Adjustment of shift arrangement",
        navLink: "/payroll/adjustment-of-shift-arrangement",
        url: "/payroll/adjustment-of-shift-arrangement",
        parent: "0f4c2e8d-74f7-4d70-8223-edaac3e623f8",
        status: 1,
        sortOrder: 4,
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
          VLAYOUT_ICON: "Circle",
          ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8"
        }
      },
      {
        id: "7b51c25b-0a8d-4e80-a230-860231baf191",
        code: "Input/outputData",
        name: "Input/output data",
        title: "Input/output data",
        navLink: "/payroll/Input/output-data",
        url: "/payroll/Input/output-data",
        parent: "0f4c2e8d-74f7-4d70-8223-edaac3e623f8",
        status: 1,
        sortOrder: 5,
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
          ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8",
          VLAYOUT_ICON: "Database"
        }
      },
      {
        id: "dcf30399-d123-48ba-86fa-087ce28bfe53",
        code: "Free timekeeping",
        name: "Free timekeeping",
        title: "Free timekeeping",
        navLink: "/payroll/free-timekeeping",
        url: "/payroll/free-timekeeping",
        parent: "0f4c2e8d-74f7-4d70-8223-edaac3e623f8",
        status: 1,
        sortOrder: 6,
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
          VLAYOUT_ICON: "CheckCircle",
          ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8"
        }
      },
      {
        id: "01c7edc1-7557-46d3-987a-ba406063809f",
        code: "SummaryOfOvertimeHours",
        name: "Summary of overtime hours",
        title: "Summary of overtime hours",
        navLink: "/payroll/summary-of-overtime-hours",
        url: "/payroll/summary-of-overtime-hours",
        parent: "0f4c2e8d-74f7-4d70-8223-edaac3e623f8",
        status: 1,
        sortOrder: 7,
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
          VLAYOUT_ICON: "Clock",
          ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8"
        }
      },
      {
        id: "901f211b-4981-4d7c-87b9-dfa29422868b",
        code: "Timesheets",
        name: "Timesheets",
        title: "Timesheets",
        navLink: "/payroll/timesheets",
        url: "/payroll/timesheets",
        parent: "0f4c2e8d-74f7-4d70-8223-edaac3e623f8",
        status: 1,
        sortOrder: 8,
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
          ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8",
          VLAYOUT_ICON: "Table"
        }
      },
      {
        id: "bde9b415-6d48-4bc5-bb59-9ebe569a43ac",
        code: "SummaryTimesheet",
        name: "Summary timesheet",
        title: "Summary timesheet",
        navLink: "/payroll/summary-timesheet",
        url: "/payroll/summary-timesheet",
        parent: "0f4c2e8d-74f7-4d70-8223-edaac3e623f8",
        status: 1,
        sortOrder: 9,
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
          VLAYOUT_ICON: "Clipboard",
          ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8"
        }
      },
      {
        id: "b31947b7-f169-4036-a3b1-8d51f355b435",
        code: "GeneralSalaryTable",
        name: "General salary table",
        title: "General salary table",
        navLink: "/payroll/general-salary-table",
        url: "/payroll/general-salary-table",
        parent: "0f4c2e8d-74f7-4d70-8223-edaac3e623f8",
        status: 1,
        sortOrder: 10,
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
          ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8",
          VLAYOUT_ICON: "Circle"
        }
      },
      {
        id: "7e5da00b-3901-42fe-bdfe-fa4b5ad56ff8",
        code: "ExternalSalaries",
        name: "External salaries",
        title: "External salaries",
        navLink: "/payroll/external-salaries",
        url: "/payroll/external-salaries",
        parent: "0f4c2e8d-74f7-4d70-8223-edaac3e623f8",
        status: 1,
        sortOrder: 11,
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
          VLAYOUT_ICON: "Circle",
          ROOT_ID: "0F4C2E8D-74F7-4D70-8223-EDAAC3E623F8"
        }
      }
    ]
  },
  {
    id: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
    code: "RecruitmentManagement",
    name: "Tuyển dụng",
    title: "Tuyển dụng",
    navLink: "/recruitment/dashboard",
    url: "/recruitment/dashboard",
    parent: null,
    status: 1,
    sortOrder: 6,
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
      VLAYOUT_ICON: "es_icon-Hiring",
      ISBOOKMARKED: "1"
    },
    children: [
      {
        id: "0ef4ab5f-02bd-44b9-b6f0-335895123fb5",
        code: "RecruitmentDashboard",
        name: "Dashboard",
        title: "Dashboard",
        navLink: "/recruitment/dashboard",
        url: "/recruitment/dashboard",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 1,
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
          VLAYOUT_ICON: "Home",
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD"
        }
      },
      {
        id: "f220fb91-821e-4f41-8204-5e857a382b7e",
        code: "Recruitmentrequests",
        name: "Recruitment requests",
        title: "Recruitment requests",
        navLink: "/recruitment/requests",
        url: "/recruitment/requests",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 2,
        privileges: {
          ACTIVE: false,
          READ: false,
          OPEN: false,
          ADD: true,
          EDIT: false,
          SEARCH: false,
          DELETE: true
        },
        resAttributes: {
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD",
          VLAYOUT_ICON: "FileText"
        }
      },
      {
        id: "42327e1f-2737-4a1e-b267-39e86fe453f9",
        code: "RecruitmentPlan",
        name: "Recruitment plan",
        title: "Recruitment plan",
        navLink: "/recruitment/plan",
        url: "/recruitment/plan",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 3,
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
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD",
          VLAYOUT_ICON: "Clipboard"
        }
      },
      {
        id: "23dd3a40-cde8-4fff-957d-1371cb13fb39",
        code: "CandidateProfile",
        name: "Candidate profile",
        title: "Candidate profile",
        navLink: "/recruitment/candidate-profile",
        url: "/recruitment/candidate-profile",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 4,
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
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD",
          VLAYOUT_ICON: "Users"
        },
        children: [
          {
            id: "11e42807-2a49-49a5-ae43-cfb2487c0f44",
            code: "ApplicantKaban",
            name: "Applicant kanban",
            title: "Applicant kanban",
            navLink: "/recruitment/applicant/kanban",
            url: "/recruitment/applicant/kanban",
            parent: "23dd3a40-cde8-4fff-957d-1371cb13fb39",
            status: 1,
            sortOrder: 1,
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
              ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD",
              VLAYOUT_ICON: "Circle"
            }
          },
          {
            id: "c1fa20fb-f06f-4757-9d60-ad581a51e70b",
            code: "ApplicantList",
            name: "Applicant List",
            title: "Applicant List",
            navLink: "/recruitment/applicant/list",
            url: "/recruitment/applicant/list",
            parent: "23dd3a40-cde8-4fff-957d-1371cb13fb39",
            status: 1,
            sortOrder: 2,
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
              VLAYOUT_ICON: "Circle",
              ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD"
            }
          }
        ]
      },
      {
        id: "49ab8abc-305c-4fc3-951a-6437eaada367",
        code: "SchedulerInterview",
        name: "Scheduler interview",
        title: "Scheduler interview",
        navLink: "/recruitment/scheduler-interview",
        url: "/recruitment/scheduler-interview",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 5,
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
          VLAYOUT_ICON: "Calendar",
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD"
        }
      },
      {
        id: "30dfbd9c-8f67-4a93-9d2e-551e8b7932f5",
        code: "InterviewReview",
        name: "Interview Review",
        title: "Interview Review",
        navLink: "/recruitment/interview-review",
        url: "/recruitment/interview-review",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 6,
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
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD",
          VLAYOUT_ICON: "CheckSquare"
        }
      },
      {
        id: "b003b4b4-6ef1-4438-a802-910739f550cb",
        code: "ResultReview",
        name: "Result review",
        title: "Result review",
        navLink: "/recruitment/result-review",
        url: "/recruitment/result-review",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 7,
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
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD",
          VLAYOUT_ICON: "Clipboard"
        }
      },
      {
        id: "2ec58d84-8c35-434b-b984-2b19a4545bea",
        code: "StaffPlan",
        name: "Staff plan",
        title: "Staff plan",
        navLink: "/recruitment/staff-plan",
        url: "/recruitment/staff-plan",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 8,
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
          VLAYOUT_ICON: "User",
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD"
        }
      },
      {
        id: "fce0ec96-cb4d-4f9d-9f9f-9a6ca652b420",
        code: "Vacancies",
        name: "Vacancies",
        title: "Vacancies",
        navLink: "/recruitment/vacancies",
        url: "/recruitment/vacancies",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 11,
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
          VLAYOUT_ICON: "Pocket",
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD"
        }
      },
      {
        id: "cef5a85e-b684-417f-ad06-b517a3387c46",
        code: "RecruitmentStage",
        name: "Recruitment stage",
        title: "Recruitment stage",
        navLink: "/recruitment/recruitment-stage",
        url: "/recruitment/recruitment-stage",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 12,
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
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD",
          VLAYOUT_ICON: "Pocket"
        }
      },
      {
        id: "fafe8e32-dd88-4b7b-9094-d009786d1db5",
        code: "SourceCandidates",
        name: "Source candidates",
        title: "Source candidates",
        navLink: "/recruitment/source-candidates",
        url: "/recruitment/source-candidates",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 13,
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
          VLAYOUT_ICON: "Pocket",
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD"
        }
      },
      {
        id: "4ca5021c-3280-458b-8a6c-075ecaaf2e7f",
        code: "ReasonsForRejectingApplicants",
        name: "Reasons for rejecting applicants",
        title: "Reasons for rejecting applicants",
        navLink: "/recruitment/reasons-for-ejecting-applicants",
        url: "/recruitment/reasons-for-ejecting-applicants",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 14,
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
          VLAYOUT_ICON: "Pocket",
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD"
        }
      },
      {
        id: "1124975c-bfe2-4337-8eae-e1bb4af1236a",
        code: "InterviewPanel",
        name: "Interview panel",
        title: "Interview panel",
        navLink: "/recruitment/interview-panel",
        url: "/recruitment/interview-panel",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 15,
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
          VLAYOUT_ICON: "Pocket",
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD"
        }
      },
      {
        id: "5877ae0a-d469-4de8-9abe-bc161ea56e1e",
        code: "SettingScoreWeightAccordingToInterviewCriteria",
        name: "Setting score weight according to interview criteria",
        title: "Setting score weight according to interview criteria",
        navLink: "/recruitment/setting-score-weight",
        url: "/recruitment/setting-score-weight",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 16,
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
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD",
          VLAYOUT_ICON: "Pocket"
        }
      },
      {
        id: "b61609e7-c6c3-4496-a52b-e82e24ae86ba",
        code: "InterviewCriteria",
        name: "Interview criteria",
        title: "Interview criteria",
        navLink: "/recruitment/interview-criteria",
        url: "/recruitment/interview-criteria",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 17,
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
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD",
          VLAYOUT_ICON: "Pocket"
        }
      },
      {
        id: "5908cab2-d1de-47dd-a938-c8d4ff6c43b9",
        code: "emailTemplates",
        name: "Email templates",
        title: "Email templates",
        navLink: "/recruitment/email-templates",
        url: "/recruitment/email-templates",
        parent: "4e7a2dcb-e5d7-4fe1-b1ef-ed25e0994ebd",
        status: 1,
        sortOrder: 18,
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
          ROOT_ID: "4E7A2DCB-E5D7-4FE1-B1EF-ED25E0994EBD",
          VLAYOUT_ICON: "Pocket"
        }
      }
    ]
  },
  {
    id: "708f1548-ba30-403e-a2bb-e12c85565a6f",
    code: "Catalog",
    name: "Danh mục",
    title: "Danh mục",
    navLink: "/catalog/currency",
    url: "/catalog/currency",
    parent: null,
    status: 1,
    sortOrder: 7,
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
      VLAYOUT_ICON: "List",
      ISBOOKMARKED: "1"
    },
    children: [
      {
        id: "20c084e8-c07f-44b6-a574-dd60d052c763",
        code: "Location",
        name: "Location",
        title: "Location",
        navLink: null,
        url: null,
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 1,
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
          VLAYOUT_ICON: "Globe"
        },
        children: [
          {
            id: "b291411c-cddc-4d2c-bcbd-b3f5c71e5aab",
            code: "Country",
            name: "Countrys",
            title: "Countrys",
            navLink: "/catalog/countrys",
            url: "/catalog/countrys",
            parent: "20c084e8-c07f-44b6-a574-dd60d052c763",
            status: 1,
            sortOrder: 1,
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
              ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
              VLAYOUT_ICON: "Circle"
            }
          },
          {
            id: "290ae466-4b1b-4204-a03f-d29d41606b0c",
            code: "StateProvince",
            name: "State province",
            title: "State province",
            navLink: "/catalog/state-province",
            url: "/catalog/state-province",
            parent: "20c084e8-c07f-44b6-a574-dd60d052c763",
            status: 1,
            sortOrder: 2,
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
              ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
              VLAYOUT_ICON: "Circle"
            }
          },
          {
            id: "7d08dc56-a7b2-45c3-8c24-e359c357d2fc",
            code: "District",
            name: "District",
            title: "District",
            navLink: "/catalog/districts",
            url: "/catalog/districts",
            parent: "20c084e8-c07f-44b6-a574-dd60d052c763",
            status: 1,
            sortOrder: 3,
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
              VLAYOUT_ICON: "Circle",
              ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
            }
          },
          {
            id: "393ade2b-f511-40ff-b112-cbd6e79749b0",
            code: "Ward",
            name: "Ward",
            title: "Ward",
            navLink: "/catalog/ward",
            url: "/catalog/ward",
            parent: "20c084e8-c07f-44b6-a574-dd60d052c763",
            status: 1,
            sortOrder: 4,
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
              VLAYOUT_ICON: "Circle",
              ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
            }
          }
        ]
      },
      {
        id: "8885dde0-3436-4212-aad1-9b367457939c",
        code: "Universitys",
        name: "Universitys",
        title: "Universitys",
        navLink: "/catalog/universitys",
        url: "/catalog/universitys",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 2,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "es_icon-school"
        }
      },
      {
        id: "8ed8f675-4379-4b2b-be0c-ee8456802192",
        code: "Currency",
        name: "Currency",
        title: "Currency",
        navLink: "/catalog/currency",
        url: "/catalog/currency",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 3,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "es_icon-branch"
        }
      },
      {
        id: "75e32afd-b264-4673-9f44-67a606eed2e1",
        code: "Professional",
        name: "Professional",
        title: "Professional",
        navLink: "/catalog/professional",
        url: "/catalog/professional",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 4,
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
          VLAYOUT_ICON: "BookOpen",
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
        }
      },
      {
        id: "2dad6b9d-7a6a-48b3-a7c9-dcc9889741d4",
        code: "CertificateGroup",
        name: "Certificate group",
        title: "Certificate group",
        navLink: "/catalog/certificate-group",
        url: "/catalog/certificate-group",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 5,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "Award"
        }
      },
      {
        id: "0a6afeb6-619b-4063-b6f1-7c78c34f7f61",
        code: "Qualifications",
        name: "Qualifications",
        title: "Qualifications",
        navLink: "/catalog/qualifications",
        url: "/catalog/qualifications",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 6,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "es_icon-qualification"
        }
      },
      {
        id: "8a7c13f2-dace-4018-b7aa-e393596632a6",
        code: "Education",
        name: "Education",
        title: "Education",
        navLink: "/catalog/education",
        url: "/catalog/education",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 7,
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
          VLAYOUT_ICON: "es_icon-education",
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
        }
      },
      {
        id: "87b01d78-29c9-47b2-a71e-75795a8cb982",
        code: "Ranks",
        name: "Ranks",
        title: "Ranks",
        navLink: "/catalog/ranks",
        url: "/catalog/ranks",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 8,
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
          VLAYOUT_ICON: "es_icon-rank",
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
        }
      },
      {
        id: "3b05ac12-d850-4109-b1b0-be8dbf304bc2",
        code: "Marriage",
        name: "Marriage",
        title: "Marriage",
        navLink: "/catalog/marriage",
        url: "/catalog/marriage",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 9,
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
          VLAYOUT_ICON: "Heart",
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
        }
      },
      {
        id: "46ebb342-93d3-4a8c-a086-bd9c80164e07",
        code: "Ethnic",
        name: "Ethnic",
        title: "Ethnic",
        navLink: "/catalog/ethnic",
        url: "/catalog/ethnic",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 10,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "Rss"
        }
      },
      {
        id: "2ccc8a10-d1d9-4448-b8ef-93160304c7fe",
        code: "Religion",
        name: "Religion",
        title: "Religion",
        navLink: "/catalog/religion",
        url: "/catalog/religion",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 11,
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
          VLAYOUT_ICON: "Radio",
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
        }
      },
      {
        id: "85fb7cd8-d775-4692-8ffa-16c00479c825",
        code: "Bank",
        name: "Bank",
        title: "Bank",
        navLink: "/catalog/bank",
        url: "/catalog/bank",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 12,
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
          VLAYOUT_ICON: "es_icon-bank",
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
        }
      },
      {
        id: "e159b4f9-f494-4177-82e3-981889bfe741",
        code: "HealthCare",
        name: "Health care",
        title: "Health care",
        navLink: "/catalog/health-care",
        url: "/catalog/health-care",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 13,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "es_icon-hospital"
        }
      },
      {
        id: "fd357594-2e39-4649-8e34-076e73f47926",
        code: "Positions",
        name: "Positions",
        title: "Positions",
        navLink: "/catalog/position",
        url: "/catalog/position",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 14,
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
          VLAYOUT_ICON: "es_icon-position",
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
        }
      },
      {
        id: "dda709f7-d78e-4a93-8876-4d564a777321",
        code: "Shift",
        name: "Shift",
        title: "Shift",
        navLink: "/catalog/shift",
        url: "/catalog/shift",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 17,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "Clock"
        }
      },
      {
        id: "b0e3fe62-147f-4ee7-93d1-9e7a95762ec4",
        code: "EatShift",
        name: "Eat shift",
        title: "Eat shift",
        navLink: "/catalog/eat-shift",
        url: "/catalog/eat-shift",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 18,
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
          VLAYOUT_ICON: "Clipboard",
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
        }
      },
      {
        id: "dc33c2c9-532b-4847-8df9-e520069d7f4e",
        code: "PITRules",
        name: "PIT rules",
        title: "PIT rules",
        navLink: "/catalog/PIT-rules",
        url: "/catalog/PIT-rules",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 19,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "Pocket"
        }
      },
      {
        id: "736a0b63-d9f2-465b-8e00-181c47f9cb58",
        code: "OvertimeRules",
        name: "Overtime rules",
        title: "Overtime rules",
        navLink: "/catalog/overtime-rules",
        url: "/catalog/overtime-rules",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 20,
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
          VLAYOUT_ICON: "Columns",
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
        }
      },
      {
        id: "a3edf1c2-31c2-44c4-ad47-443f9113d0d0",
        code: "FormOfLeave",
        name: "Form of leave",
        title: "Form of leave",
        navLink: "/catalog/form-of-leave",
        url: "/catalog/form-of-leave",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 21,
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
          VLAYOUT_ICON: "Pocket",
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
        }
      },
      {
        id: "8bc268ae-996d-49e1-ad0e-2977949f6890",
        code: "ModeBreakForm",
        name: "Mode break form",
        title: "Mode break form",
        navLink: "/catalog/mode-break-form",
        url: "/catalog/mode-break-form",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 22,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "Pocket"
        }
      },
      {
        id: "c5248745-399b-42e9-b57f-72a69927fb3b",
        code: "Holidays",
        name: "Holidays",
        title: "Holidays",
        navLink: "/catalog/holidays",
        url: "/catalog/holidays",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 23,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "Pocket"
        }
      },
      {
        id: "37706345-d9f4-42df-8db9-2413d9a530ee",
        code: "SalaryScale",
        name: "Salary scale",
        title: "Salary scale",
        navLink: "/catalog/salary-scale",
        url: "/catalog/salary-scale",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 24,
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
          VLAYOUT_ICON: "Pocket",
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
        }
      },
      {
        id: "4f51a0f1-007b-465d-b534-942c0f901ef2",
        code: "SalaryGroup",
        name: "Salary group",
        title: "Salary group",
        navLink: "/catalog/salary-group",
        url: "/catalog/salary-group",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 25,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "Pocket"
        }
      },
      {
        id: "5771f6bf-247c-49a4-99fc-2a28d29730c7",
        code: "Wage",
        name: "Wage",
        title: "Wage",
        navLink: "/catalog/wage",
        url: "/catalog/wage",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 26,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "Pocket"
        }
      },
      {
        id: "f3a2f4a7-6fb8-4633-940a-064eecc99432",
        code: "SalaryPeriod",
        name: "Salary period",
        title: "Salary period",
        navLink: "/catalog/salary-period",
        url: "/catalog/salary-period",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 27,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "Pocket"
        }
      },
      {
        id: "5f302a76-69b1-4e4a-a1f7-3f05bce2d429",
        code: "AllowanceCatalog",
        name: "Allowance catalog",
        title: "Allowance catalog",
        navLink: "/catalog/allowance-catalog",
        url: "/catalog/allowance-catalog",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 28,
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
          VLAYOUT_ICON: "Pocket",
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
        }
      },
      {
        id: "16dd7f02-e799-4233-bed8-8f504f99abc9",
        code: "Cost",
        name: "Cost",
        title: "Cost",
        navLink: "/catalog/cost",
        url: "/catalog/cost",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 29,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "Pocket"
        }
      },
      {
        id: "08def5e2-5db6-4567-85bc-471b3946b822",
        code: "Unit",
        name: "Unit",
        title: "Unit",
        navLink: "/catalog/unit",
        url: "/catalog/unit",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 30,
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
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F",
          VLAYOUT_ICON: "Pocket"
        }
      },
      {
        id: "c4e6c8a6-c3a1-45bd-ac83-e196234543f5",
        code: "LicensePlates",
        name: "License plates",
        title: "License plates",
        navLink: "/catalog/license-plates",
        url: "/catalog/license-plates",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 31,
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
          VLAYOUT_ICON: "Pocket",
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
        }
      },
      {
        id: "9f9b9b1b-1a72-44b3-99eb-34049f65368d",
        code: "CatalogOfAmountsPlus/minus",
        name: "Catalog of amount plus/minus",
        title: "Catalog of amount plus/minus",
        navLink: "/catalog/catalog-of-amounts-plus/minus",
        url: "/catalog/catalog-of-amounts-plus/minus",
        parent: "708f1548-ba30-403e-a2bb-e12c85565a6f",
        status: 1,
        sortOrder: 32,
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
          VLAYOUT_ICON: "Pocket",
          ROOT_ID: "708F1548-BA30-403E-A2BB-E12C85565A6F"
        }
      }
    ]
  },
  {
    code: "ExpensePrice",
    id: "ExpensePrice",
    name: "Expense price",
    title: "Expense price",
    url: "/expense-price",
    navLink: "/expense-price",
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
      VLAYOUT_ICON: "Users"
    },
    sortOrder: 1,
    status: 1
  },
  {
    code: "GroupItem",
    id: "GroupItem",
    name: "Group item",
    title: "Group item",
    url: "/group-item",
    navLink: "/group-item",
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
      VLAYOUT_ICON: "Users"
    },
    sortOrder: 1,
    status: 1
  },
  {
    code: "Tax",
    id: "Tax",
    name: "Tax",
    title: "Tax",
    url: "/tax",
    navLink: "/tax",
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
      VLAYOUT_ICON: "Users"
    },
    sortOrder: 1,
    status: 1
  },
  {
    code: "InventoryQuantity",
    id: "InventoryQuantity",
    name: "Inventory quantity",
    title: "Inventory quantity",
    url: "/inventory-quantity",
    navLink: "/inventory-quantity",
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
      VLAYOUT_ICON: "Users"
    },
    sortOrder: 1,
    status: 1
  },
  {
    code: "ImportRequest",
    id: "ImportRequest",
    name: "ImportRequest",
    title: "ImportRequest",
    url: "/importRequest",
    navLink: "/importRequest",
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
      VLAYOUT_ICON: "Users"
    },
    sortOrder: 1,
    status: 1
  }
]
