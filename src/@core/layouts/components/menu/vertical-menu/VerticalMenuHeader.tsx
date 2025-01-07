/* eslint-disable no-unused-vars */
// ** React Imports
import { useEffect, FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '@src/contexts/AppContext'
// ** Icons Imports
import { X, BoxArrowInLeft, BoxArrowInRight } from 'becoxy-icons'

// ** Config
// import themeConfig from '@configs/themeConfig'

// ** Utils
import { getCurrentApp, getHomeRouteForLoggedInUser } from '@utils/Utils'
import { CDN_URL_VIEW } from '@src/domain/constants'

export type VerticalMenuHeaderProps = {
  menuCollapsed?: boolean
  setMenuCollapsed?: (value: boolean) => void
  setMenuVisibility?: (value: boolean) => void
  setGroupOpen: (groups: string[]) => void
  menuHover?: boolean
}

const VerticalMenuHeader: FC<VerticalMenuHeaderProps> = props => {
  // ** Props
  const { menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover } = props

  // ** Vars
  const {
    state: { userInfo }
  } = useAppContext()

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) {
      setGroupOpen([])
    }
  }, [menuHover, menuCollapsed, setGroupOpen])

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <BoxArrowInLeft
          fontSize={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed && setMenuCollapsed(true)}
        />
      )
    } else {
      return (
        <BoxArrowInRight
          fontSize={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed && setMenuCollapsed(false)}
        />
      )
    }
  }

  return (
    <div className='navbar-header'>
      <ul className='nav navbar-nav flex-row' style={{ height: '100%' }}>
        <li className='nav-item me-auto d-flex' style={{ height: '100%' }}>
          <NavLink to={userInfo ? getHomeRouteForLoggedInUser(userInfo) : '/'} className='navbar-brand'>
            <span className='brand-logo'>
              <img
                  src={
                    getCurrentApp().logo?.startsWith('http')
                      ? getCurrentApp().logo
                      : `${CDN_URL_VIEW}/${getCurrentApp().logo}`
                  }
                  alt='logo'
                />            
            </span>
            <h2 className='brand-text mb-0'>{getCurrentApp().shortName}</h2>
          </NavLink>
        </li>
        <li className='nav-item nav-toggle'>
          <div className='nav-link modern-nav-toggle cursor-pointer'>
            <Toggler />
            <X
              onClick={() => setMenuVisibility && setMenuVisibility(false)}
              className='toggle-icon icon-x d-block d-xl-none'
              fontSize={20}
            />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default VerticalMenuHeader
