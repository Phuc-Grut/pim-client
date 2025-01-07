import { lazy } from 'react'
import * as IFRoutes from '../../domain/models/IRouteObject'

const DashboardPage = lazy(() => import('../../views/dashboard'))
const FlowPage = lazy(() => import('../../views/flow'))

const DashboardRoutes:IFRoutes.RouteObject[] = [
  {
    path: '/dashboard',
    element: <DashboardPage />
  },
  {
    path: '/flow',
    element: <FlowPage />
  }
]

export default DashboardRoutes
