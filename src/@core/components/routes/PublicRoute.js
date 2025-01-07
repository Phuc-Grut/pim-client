// ** React Imports
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils/Utils'

const PublicRoute = ({ children, route }) => {
  if (route) {
    const restrictedRoute = route.meta.publicRoute && route.meta.restricted

    if (restrictedRoute) {
      return <Navigate to={getHomeRouteForLoggedInUser('')} />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PublicRoute
