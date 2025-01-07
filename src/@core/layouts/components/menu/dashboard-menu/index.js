// ** React Imports
import { Fragment, useState, useRef } from 'react'

// ** Third Party Components
import classnames from 'classnames'

// ** Vertical Menu Components
import VerticalMenuHeader from '../vertical-menu/VerticalMenuHeader'
import {NavItem, NavLink} from "reactstrap"
import {Link} from "react-router-dom"
import {getMenuByModule} from "@src/layouts/store"
import {useDispatch} from "react-redux"
import IconCustom from "@components/icon"
import PerfectScrollbar from "react-perfect-scrollbar"

const Sidebar = props => {
  // ** Props
  const { menuCollapsed, menu, skin, menuData } = props
  const path = window.location.pathname
  const dispatch = useDispatch()
  // ** States
  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false)
  const [active, setActive] = useState(path ? path : '')

  // ** Ref
  const shadowRef = useRef(null)

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    setMenuHover(true)
  }

  // ** Scroll Menu
  const scrollMenu = container => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.add('d-block')
      }
    } else {
      if (shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.remove('d-block')
      }
    }
  }
  const onChangeMenuModule = (val) => {
    setActive(val.navLink)
    if (val.code !== 'Dashboard') {
      dispatch(getMenuByModule({
        code: val.id,
        allMenu: menuData
      }))
    }
  }

  const renderMenu = () => {
    if (menuData.length) {
      return menuData
        .map(item => {
          return (
            <NavItem key={item.code} className=''>
              <NavLink
                className={classnames('d-flex align-items-center', {active: item.navLink === active})}
                tag={Link}
                to={item.navLink}
                id={item.code}
                onClick={() => onChangeMenuModule(item)}
              >
                <IconCustom  iconName={item.resAttributes && item.resAttributes.VLAYOUT_ICON ? item.resAttributes.VLAYOUT_ICON : 'Home'} fontSize={17}/>
                <span>{item.title}</span>
              </NavLink>
            </NavItem>
          )
        })
        .slice(0, 10)
    } else {
      return null
    }
  }

  return (
    <Fragment>
      <div
        className={classnames('main-menu menu-fixed menu-accordion menu-shadow', {
          expanded: menuHover || menuCollapsed === false,
          'menu-light': skin !== 'semi-dark' && skin !== 'dark',
          'menu-dark': skin === 'semi-dark' || skin === 'dark'
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu ? (
          menu({ ...props })
        ) : (
          <Fragment>
            {/* Vertical Menu Header */}
            <VerticalMenuHeader menuHover={menuHover} {...props} />
            {/* Vertical Menu Header Shadow */}
            <div className='shadow-bottom' ref={shadowRef}></div>
            {/* Perfect Scrollbar */}
            <div className=''>

              <PerfectScrollbar
                className='main-menu-content'
                onScrollY={container => scrollMenu(container)}
              >
                <ul className='navigation navigation-main'>
                  {renderMenu()}
                </ul>
              </PerfectScrollbar>
            </div>

          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default Sidebar
