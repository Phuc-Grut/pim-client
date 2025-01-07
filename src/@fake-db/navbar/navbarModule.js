import mock from '../mock'
const data = localStorage.getItem('allMenu')
// @ts-ignore

export const searchArr = JSON.parse(data)

// console.log(searchArr)

// export const searchArr1 = [
//   {
//     id: 1,
//     target: 'HOME',
//     isBookmarked: true,
//     title: 'Trang chủ',
//     icon: 'Home',
//     link: '/'
//   },
//   {
//     id: 2,
//     target: 'ManagerEmployees',
//     isBookmarked: true,
//     title: 'Nhân sự',
//     icon: 'Users',
//     link: '/hr/employee-dashboard'
//   },
//   {
//     id: 3,
//     target: 'AdministrativeManager',
//     isBookmarked: true,
//     title: 'Hành chính',
//     icon: 'Mail',
//     link: '/hr/administrative-dashboard'
//   },
//   {
//     id: 4,
//     target: 'AssetManagement',
//     isBookmarked: true,
//     title: 'Tài sản',
//     icon: 'Archive',
//     link: '/asset/asset-dashboard'
//   },
//   {
//     id: 5,
//     target: 'PayrollManager',
//     isBookmarked: true,
//     title: 'Công lương',
//     icon: 'DollarSign',
//     link: '/hr/payroll-dashboard'
//   },
//   {
//     id: 6,
//     target: 'RecruitmentManagement',
//     isBookmarked: true,
//     title: 'Tuyển dụng',
//     icon: 'Calendar',
//     link: '/hr/recruitment-dashboard'
//   },
//   {
//     id: 7,
//     target: 'learn',
//     isBookmarked: true,
//     title: 'Đào tạo',
//     icon: 'BookOpen',
//     link: '/learn'
//   },
//   {
//     id: 8,
//     target: 'kpi',
//     isBookmarked: true,
//     title: 'KPI',
//     icon: 'Target',
//     link: '/kpi'
//   },
//   {
//     id: 9,
//     target: 'Category',
//     isBookmarked: true,
//     title: 'Danh mục',
//     icon: 'List',
//     link: '/hr/category-dashboard'
//   },
//   {
//     id: 10,
//     target: 'settings',
//     isBookmarked: true,
//     title: 'Cài đặt',
//     icon: 'Settings',
//     link: '/settings'
//   }
// ]

// GET Search Data
mock.onGet('/api/main-search/data').reply(() => {
  return [200, { searchArr }]
})

// GET Search Data & Bookmarks
mock.onGet('/api/bookmarks/data').reply(() => {
  const bookmarks = searchArr.filter(item => item.resAttributes.ISBOOKMARKED === '1')
  const suggestions = searchArr
  return [200, { suggestions, bookmarks }]
})

// POST Update isBookmarked
mock.onPost('/api/bookmarks/update').reply(config => {
  const { id } = JSON.parse(config.data)

  const obj = searchArr.find(item => item.id === id)

  Object.assign(obj, { isBookmarked: !obj.isBookmarked })

  return [200]
})
