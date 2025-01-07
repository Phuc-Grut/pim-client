// ** React Imports
import { Navigate, useLocation } from 'react-router-dom'
import { useContext, Suspense } from 'react'

// ** Context Imports
import { AbilityContext } from '@src/utility/context/Can'
import { useAppContext } from '@src/contexts/AppContext'

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const location = useLocation()
  const prevPath = location.pathname
  const queryString = location.search
  const urlParams = new URLSearchParams(queryString)
  const tenant = urlParams.get('tenant')

  const ability = useContext(AbilityContext)
  // const user = JSON.parse(localStorage.getItem('userData'))
  const { state } = useAppContext()
  const { isAuthenticated, userInfo } = state

  if (route) {
    let action = 'read'
    const resource = 'Menu'
    let restrictedRoute = false
    let layout = 'vertical'

    if (route.meta) {
      layout = route.meta.layout ? route.meta.layout : layout
      action = route.meta.action ? route.meta.action : action
      restrictedRoute = route.meta.restricted ? route.meta.restricted : restrictedRoute
    }
    if (!isAuthenticated && !userInfo) {
      return <Navigate to={`/login?redirect=${prevPath}&tenant=${tenant}`} />

      //
      // if (prevPath && tenant) {
      //   return <Navigate to={`/login?redirect=${prevPath}&tenant=${tenant}`} />
      // } else {
      //   if (prevPath) {
      //     return <Navigate to={`/login?redirect=${prevPath}`} />
      //   }
      //   if (tenant) {
      //     return <Navigate to={`/login?redirect=${prevPath}&tenant=${tenant}`} />
      //   }
      //   return <Navigate to={`/login`} />
      // }
    }
    if (userInfo && restrictedRoute && layout) {
      return <Navigate to='/' />
    }
    if (userInfo && restrictedRoute && user.role === 'client') {
      return <Navigate to='/access-control' />
    }
    if (userInfo && !ability.can(action || 'read', resource)) {
      return <Navigate to='/misc/not-authorized' replace />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
