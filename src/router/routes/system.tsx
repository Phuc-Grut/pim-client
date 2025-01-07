import { lazy } from 'react'
import * as IFRoutes from '../../domain/models/IRouteObject'

const SystemUserPage = lazy(() => import('../../views/system/system-user'))
const SystemGroupUserPage = lazy(() => import('../../views/system/group-user'))
const SystemPermissionIdentityPage = lazy(() => import('../../views/system/permission/identity'))
const SystemPermissionFunctionPage = lazy(() => import('../../views/system/permission/function'))
const SystemPermissionInformationPage = lazy(() => import('../../views/system/permission/information'))

const SystemRoutes:IFRoutes.RouteObject[] = [
  {
    path: '/system/user',
    element: <SystemUserPage/>
  },
  {
    path: '/system/group-user',
    element: <SystemGroupUserPage/>
  },
  {
    path: '/system/permission-identity',
    element: <SystemPermissionIdentityPage/>
  },
  {
    path: '/system/permission-info',
    element: <SystemPermissionInformationPage/>
  },
  {
    path: '/system/permission-function',
    element: <SystemPermissionFunctionPage/>
  }

]

export default SystemRoutes