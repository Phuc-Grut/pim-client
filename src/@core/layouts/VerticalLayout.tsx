// ** React Imports
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import {handleContentWidth, handleMenuCollapsed, handleMenuHidden} from '@store/layout'
import { UploadFileContext } from '@src/utility/context/Upload'
// ** Third Party Components
import classnames from 'classnames'
import { ArrowUp } from 'becoxy-icons'

// ** Reactstrap Imports
import { Navbar, Button } from 'reactstrap'

// ** Configs
import themeConfig from '@configs/themeConfig'

// ** Custom Components

import Customizer from '@components/customizer'
import ScrollToTop from '@components/scrolltop'
import FooterComponent from './components/footer'
import NavbarComponent from './components/navbar'
import SidebarComponent from './components/menu/vertical-menu'

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'
import { useSkin } from '@hooks/useSkin'
import { useLayout } from '@hooks/useLayout'
import { useNavbarType } from '@hooks/useNavbarType'
import { useFooterType } from '@hooks/useFooterType'
import { useNavbarColor } from '@hooks/useNavbarColor'

// ** Styles
import '@styles/base/core/menu/menu-types/vertical-menu.scss'
import '@styles/base/core/menu/menu-types/vertical-overlay-menu.scss'
import ModalUploadFile from './components/ModalUploadFile'
import PerfectScrollbar from "react-perfect-scrollbar"

const VerticalLayout = (props: any) => {
  // ** Props
  const { menu, navbar, footer, children, menuData } = props

  // ** Hooks
  const [isRtl, setIsRtl] = useRTL()
  const { skin, setSkin } = useSkin()
  const { navbarType, setNavbarType } = useNavbarType()
  const { footerType, setFooterType } = useFooterType()
  const { navbarColor, setNavbarColor } = useNavbarColor()
  const { layout, setLayout, setLastLayout } = useLayout()

  // ** Vars
  const dispatch = useDispatch()
  const layoutStore = useSelector((state: any) => state.layout)
  // ** Vars
  const location = useLocation()
  const isHidden = layoutStore.menuHidden
  const contentWidth = layoutStore.contentWidth
  const menuCollapsed = layoutStore.menuCollapsed

  // ** States
  const [uploadings, setUploadings] = useState([])
  const [openModal, setOpenModalUploadFile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [collapsed, setCollapsed] = useState(menuCollapsed)

  // ** Update Window Width
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }


  // ** Toggles Menu Collapsed
  // const setMenuCollapsed = (val: any) => dispatch(handleMenuCollapsed(val))
  const setMenuCollapsed = (val: any) => {
    setCollapsed(val)
    dispatch(handleMenuCollapsed(val))
    // window.localStorage.setItem('menuCollapsed', JSON.stringify(val))
  }

  // ** Handles Content Width
  const setContentWidth = (val: any) => dispatch(handleContentWidth(val))

  // ** Handles Content Width
  const setIsHidden = (val: any) => dispatch(handleMenuHidden(val))

  //** This function will detect the Route Change and will hide the menu on menu item click
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false)
    }
  }, [location])

  //** Sets Window Size & Layout Props
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', handleWindowWidth)
    }
  }, [windowWidth])

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // ** Vars
  const footerClasses: any = {
    static: 'footer-static',
    sticky: 'footer-fixed',
    hidden: 'footer-hidden'
  }

  const navbarWrapperClasses: any = {
    floating: 'navbar-floating',
    sticky: 'navbar-sticky',
    static: 'navbar-static',
    hidden: 'navbar-hidden'
  }

  const navbarClasses: any = {
    floating: contentWidth === 'boxed' ? 'floating-nav container-xxl' : 'floating-nav',
    sticky: 'fixed-top',
    static: 'navbar-static-top',
    hidden: 'd-none'
  }

  const bgColorCondition = navbarColor !== '' && navbarColor !== 'light' && navbarColor !== 'white'

  if (!isMounted) {
    return null
  }
  return (
    <div
      className={classnames(
        `wrapper vertical-layout ${navbarWrapperClasses[navbarType] || 'navbar-floating'} ${footerClasses[footerType] || 'footer-static'
        }`,
        {
          // Modern Menu
          'vertical-menu-modern': windowWidth >= 1200,
          'menu-collapsed': collapsed && windowWidth >= 1200,
          'menu-expanded': !collapsed && windowWidth > 1200,

          // Overlay Menu
          'vertical-overlay-menu': windowWidth < 1200,
          'menu-hide': !menuVisibility && windowWidth < 1200,
          'menu-open': menuVisibility && windowWidth < 1200
        }
      )}
      {...(isHidden ? { 'data-col': '1-column' } : {})}
    >
      <UploadFileContext.Provider value={{ uploadings, setUploadings, setOpenModalUploadFile, openModal }}>
        {!isHidden ? (
          <SidebarComponent
            skin={skin}
            menu={menu}
            menuData={menuData}
            menuCollapsed={collapsed}
            menuVisibility={menuVisibility}
            setMenuCollapsed={setMenuCollapsed}
            setMenuVisibility={setMenuVisibility}
          />
        ) : null}

        <Navbar
          expand='lg'
          container={false}
          light={skin !== 'dark'}
          dark={skin === 'dark' || bgColorCondition}
          color={bgColorCondition ? navbarColor : undefined}
          className={classnames(
            `header-navbar navbar align-items-center ${navbarClasses[navbarType] || 'floating-nav'} navbar-shadow`
          )}
        >
          <div className='navbar-container d-flex content'>
            {navbar ? (
              navbar({ skin, setSkin, setMenuVisibility })
            ) : (
              <NavbarComponent setMenuVisibility={setMenuVisibility} skin={skin} setSkin={setSkin} />
            )}
          </div>
        </Navbar>
        <PerfectScrollbar>
          {children}
        </PerfectScrollbar>


        {/* Vertical Nav Menu Overlay */}
        <div
          className={classnames('sidenav-overlay', {
            show: menuVisibility
          })}
          onClick={() => setMenuVisibility(false)}
        ></div>
        {/* Vertical Nav Menu Overlay */}

        {themeConfig.layout.customizer ? (
          <Customizer
            skin={skin}
            isRtl={isRtl}
            layout={layout}
            setSkin={setSkin}
            setIsRtl={setIsRtl}
            isHidden={isHidden}
            setLayout={setLayout}
            footerType={footerType}
            navbarType={navbarType}
            setIsHidden={setIsHidden}
            themeConfig={themeConfig}
            navbarColor={navbarColor}
            contentWidth={contentWidth}
            setFooterType={setFooterType}
            setNavbarType={setNavbarType}
            setLastLayout={setLastLayout}
            menuCollapsed={menuCollapsed}
            setNavbarColor={setNavbarColor}
            setContentWidth={setContentWidth}
            setMenuCollapsed={setMenuCollapsed}
          />

        ) : null}
        <footer
          className={classnames(`footer footer-light ${footerClasses[footerType] || 'footer-static'}`, {
            'd-none': footerType === 'hidden'
          })}
        >
          {/*{footer ? footer : <FooterComponent footerType={footerType} footerClasses={footerClasses}/>}*/}
          {footer ? footer : <FooterComponent />}
        </footer>
        <ModalUploadFile ></ModalUploadFile>
        {themeConfig.layout.scrollTop === true ? (
          <div className='scroll-to-top'>
            <ScrollToTop showOffset={300} className2='scroll-top d-block'>
              <Button className='btn-icon' color='primary'>
                <ArrowUp fontSize={14} />
              </Button>
            </ScrollToTop>
          </div>
        ) : null}
      </UploadFileContext.Provider>
    </div>
  )
}

export default VerticalLayout
