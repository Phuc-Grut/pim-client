import mock from '../mock'

// ** Utils
// import {paginateArray} from '../utils'

const dataVertical = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    action: 'read',
    typeIcon: 'svg',
    icon: 'HouseDoor',
    children: [
      {
        id: 'customer1',
        title: 'Customer1',
        action: 'read',
        typeIcon: 'svg',
        icon: 'HouseDoor',
        navLink: '/partner/customer',
        children: []
      }
    ]
  },
  {
    header: 'Partner',
    action: 'read'
  },
  {
    id: 'customer',
    title: 'Customer',
    action: 'read',
    typeIcon: 'svg',
    icon: 'HouseDoor',
    navLink: '/partner/customer'
  },
  {
    id: 'agency',
    title: 'Agency',
    icon: 'HouseDoor',
    navLink: '/partner/agency'
  },
  {
    header: 'Service'
  },
  {
    id: 'service',
    title: 'Product',
    icon: 'HouseDoor',
    navLink: '/service/product'
  },
  {
    id: 'package',
    title: 'Package',
    icon: 'HouseDoor',
    navLink: '/service/package'
  },
  {
    header: 'Sales Policy'
  },
  {
    id: 'PolicyPromotion',
    title: 'Policy Promotion',
    icon: 'HouseDoor',
    navLink: '/sales-policy/promotion'
  },
  {
    id: 'RankAgency',
    title: 'Rank Agency',
    icon: 'HouseDoor',
    navLink: '/sales-policy/rank'
  },
  {
    header: 'Sales'
  },
  {
    id: 'order',
    title: 'Sales Order',
    icon: 'HouseDoor',
    navLink: '/sales/order'
  },
  {
    id: 'bill',
    title: 'Bill',
    icon: 'HouseDoor',
    navLink: '/sales/bill'
  },
  {
    id: 'payment',
    title: 'Payment',
    icon: 'HouseDoor',
    navLink: '/sales/payment'
  },
  {
    id: 'directory',
    title: 'Directory',
    icon: 'HouseDoor',
    navLink: '/sales/directory'
  },
  {
    header: 'Support'
  },
  {
    id: 'support123',
    title: 'Support',
    icon: 'HouseDoor',
    navLink: '/support/support-ticket'
  }
]

const dataHorizontal = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: 'HouseDoor',
    navLink: '/dashboard'
  },
  {
    id: 'Partner',
    title: 'Partner',
    icon: 'HouseDoor',
    children: [
      {
        id: 'customer',
        title: 'Customer',
        icon: 'HouseDoor',
        navLink: '/partner/customer'
      },
      {
        id: 'agency',
        title: 'Agency',
        icon: 'HouseDoor',
        navLink: '/partner/agency'
      }
    ]
  },
  {
    id: 'sales-policy',
    title: 'Sales Policy',
    icon: 'HouseDoor',
    children: [
      {
        id: 'PolicyPromotion',
        title: 'Policy Promotion',
        icon: 'HouseDoor',
        navLink: '/sales-policy/promotion'
      },
      {
        id: 'RankAgency',
        title: 'Rank Agency',
        icon: 'HouseDoor',
        navLink: '/sales-policy/rank'
      }
    ]
  },
  {
    id: 'sales',
    title: 'Sales',
    icon: 'HouseDoor',
    children: [
      {
        id: 'order',
        title: 'Sales Order',
        icon: 'HouseDoor',
        navLink: '/sales/order'
      },
      {
        id: 'bill',
        title: 'Bill',
        icon: 'HouseDoor',
        navLink: '/sales/bill'
      },
      {
        id: 'payment',
        title: 'Payment',
        icon: 'HouseDoor',
        navLink: '/sales/payment'
      },
      {
        id: 'directory',
        title: 'Directory',
        icon: 'HouseDoor',
        navLink: '/sales/directory'
      }
    ]
  },
  {
    id: 'support',
    title: 'Support',
    icon: 'HouseDoor',
    navLink: '/support/support-ticket'
  }
]


mock.onGet('/api/menu-left/vertical').reply(() => {
  return [200, dataVertical]
})

mock.onGet('/api/menu-left/horizontal').reply(() => {
  return [200, dataHorizontal]
})