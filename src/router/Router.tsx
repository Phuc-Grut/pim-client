// ** Router imports
import { lazy } from 'react'

// ** Interface route object
import * as IFRouteObject from '../domain/models/IRouteObject'
// ** Router imports
import { useRoutes, Navigate } from 'react-router-dom'
// ** Layouts
import BlankLayout from '../@core/layouts/BlankLayout'
// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'
// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils/Utils'
//import authHelper from '@src/auth/authHelper'
// ** GetRoutes
import { getRoutes } from './routes'
import { useAppContext } from '@src/contexts/AppContext'
// ** Components
const Error = lazy(() => import('../views/pages/misc/Error'))
const Login = lazy(() => import('../views/pages/authentication/Login'))
const NotAuthorized = lazy(() => import('../views/pages/misc/NotAuthorized'))
// const Callback = lazy(() => import('../views/pages/authentication/Callback'))

const Router = () => {
  const url = window.localStorage.getItem('redirect')
  const { state } = useAppContext()
  const { isAuthenticated } = state

  // ** Hooks
  const { layout } = useLayout()
  const allRoutes = getRoutes(layout)
  const getHomeRoute = () => {
    if (isAuthenticated) {
      const routeUrl = getHomeRouteForLoggedInUser('admin')
      return routeUrl
    } else {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const tenant = urlParams.get('tenant')
      if (url) {
        return `/login?redirect=${url}&tenant=${tenant}`
      } else {
        return `/login?tenant=${tenant}`
      }
    }
  }

  const routes: IFRouteObject.RouteObject[] = [
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },
    // {
    //   path: '/callback',
    //   element: <BlankLayout />,
    //   children: [{ path: '/callback', element: <Callback /> }]
    // },
    {
      path: '/auth/not-auth',
      element: <BlankLayout />,
      children: [{ path: '/auth/not-auth', element: <NotAuthorized /> }]
    },
    ...allRoutes
    // {
    //   path: '*',
    //   element: <BlankLayout />,
    //   children: [{ path: '*', element: <Error /> }]
    // }
  ]

  return useRoutes(routes)
}

export default Router
