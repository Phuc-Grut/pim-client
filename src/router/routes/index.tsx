// ** React Imports
import {Fragment} from 'react'

// ** Interface route object
import * as IFRouteObject from '../../domain/models/IRouteObject'

// ** Routes Imports
import AppRoutes from './Apps'
import DashboardRoutes from './Dashboards'
import SystemRoutes from "@src/router/routes/system"

// ** Layouts
import BlankLayout from '../../@core/layouts/BlankLayout'
import VerticalLayout from '../../layouts/VerticalLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'
import LayoutWrapper from '../..//@core/layouts/components/layout-wrapper'

// ** Route Components
import PublicRoute from '../../@core/components/routes/PublicRoute'
import PrivateRoute from '../../@core/components/routes/PrivateRoute'


// ** Utils
import {isObjEmpty} from '@utils/Utils'

const getLayout: any = {
  blank: <BlankLayout/>,
  vertical: <VerticalLayout/>,
  horizontal: <HorizontalLayout/>
}

// ** Document title
const TemplateTitle = '%s - PIM - VFico'

// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...AppRoutes,
  ...SystemRoutes
]
const getRouteMeta = (route: IFRouteObject.RouteObject) => {
  // @ts-ignore
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return {routeMeta: route.meta}
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout: string, defaultLayout: string) => {
  const LayoutRoutes: IFRouteObject.RouteObject[] = []

  if (Routes) {
    Routes.filter((route: IFRouteObject.RouteObject) => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      ) {
        let RouteTag = PrivateRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
        }
        if (route.element) {
          const Wrapper =
            // @ts-ignore
            isObjEmpty(route.element.props) && isBlank === false ? LayoutWrapper : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = (layout: string) => {
  const defaultLayout: string = layout || 'vertical'
  const layouts: string[] = ['vertical', 'horizontal', 'blank']

  const AllRoutes: IFRouteObject.RouteObject[] = []

  layouts.forEach(layoutItem => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export {DefaultRoute, TemplateTitle, Routes, getRoutes}
