// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** ThemeConfig Import
import themeConfig from '../configs/themeConfig'

const initialFooterHeight = () => {
  const item = window.localStorage.getItem('footer')
  const height = (item && JSON.parse(item) === 'sticky') || (item && JSON.parse(item) === 'static') ? 47  : 0
  return item ? height : themeConfig.layout.footer.height
}

const initialNavbarHeight = () => {
  const item = window.localStorage.getItem('navbarType')
  const height = (item && JSON.parse(item) === 'sticky') || (item && JSON.parse(item) === 'static') ? 63 : (item && JSON.parse(item)) === 'floating' ? 77  : 0
  return item ? height : themeConfig.layout.navbar.height
}

const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem('menuCollapsed')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed
}

const initialDirection = () => {
  const item = window.localStorage.getItem('direction')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.isRTL
}

const initialSkin = () => {
  const item = window.localStorage.getItem('skin')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.skin
}

const initialFooter = () => {
  const item = window.localStorage.getItem('footer')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.footer.type
}

// const initialLayout = () => {
//   const item = window.localStorage.getItem('layout')
//   //** Parse stored json or if none return initialValue
//   return item ? JSON.parse(item) : themeConfig.layout.type
// }

const initialNavbarColor = () => {
  const item = window.localStorage.getItem('navbarColor')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.navbar.backgroundColor
}

const initialNavbarType = () => {
  const item = window.localStorage.getItem('navbarType')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.navbar.type
}

// const initialContentWidth = () => {
//   const item = window.localStorage.getItem('contentWidth')
//   //** Parse stored json or if none return initialValue
//   return item ? JSON.parse(item) : themeConfig.layout.contentWidth
// }

const initialLanguage = () => {
  const item = window.localStorage.getItem('i18nextLng')
  //** Parse stored json or if none return initialValue
  return item ? item : 'vi'
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    skin: initialSkin(),
    isRTL: initialDirection(),
    // layout: initialLayout(),
    layout: themeConfig.layout.type,
    lastLayout: themeConfig.layout.type,
    menuCollapsed: initialMenuCollapsed(),
    footerType: initialFooter(),
    footerHeight: initialFooterHeight(),
    navbarType: initialNavbarType(),
    navbarHeight: initialNavbarHeight(),
    menuHidden: themeConfig.layout.menu.isHidden,
    contentWidth: themeConfig.layout.contentWidth,
    navbarColor: initialNavbarColor(),
    language: initialLanguage()
  },
  reducers: {
    handleRTL: (state, action) => {
      state.isRTL = action.payload
      window.localStorage.setItem('direction', JSON.stringify(action.payload))
    },
    handleSkin: (state, action) => {
      state.skin = action.payload
      window.localStorage.setItem('skin', JSON.stringify(action.payload))
    },
    handleLayout: (state, action) => {
      state.layout = action.payload
      window.localStorage.setItem('layout', JSON.stringify(action.payload))
    },
    handleFooterType: (state, action) => {
      state.footerType = action.payload
      state.footerHeight = action.payload === 'sticky' || action.payload === 'static' ? 47  : 0
      window.localStorage.setItem('footer', JSON.stringify(action.payload))
    },
    handleNavbarType: (state, action) => {
      state.navbarType = action.payload
      // navbarHeight = 4.45rem ~ 63px, floating: + 1rem marginTop = 5.45rem ~ 77px
      state.navbarHeight = action.payload === 'sticky' || action.payload === 'static' ? 63 : action.payload === 'floating' ? 77  : 0
      window.localStorage.setItem('navbarType', JSON.stringify(action.payload))
    },
    handleMenuHidden: (state, action) => {
      state.menuHidden = action.payload
    },
    handleLastLayout: (state, action) => {
      state.lastLayout = action.payload
    },
    handleNavbarColor: (state, action) => {
      state.navbarColor = action.payload
      window.localStorage.setItem('navbarColor', JSON.stringify(action.payload))
    },
    handleContentWidth: (state, action) => {
      state.contentWidth = action.payload
      window.localStorage.setItem('contentWidth', JSON.stringify(action.payload))
    },
    handleMenuCollapsed: (state, action) => {
      // state.menuCollapsed = action.payload
      window.localStorage.setItem('menuCollapsed', JSON.stringify(action.payload))
    },
    handleChangeLanguage: (state, action) => {
      state.language = action.payload
      window.localStorage.setItem('i18nextLng', action.payload)
    }
  }
})

export const {
  handleRTL,
  handleSkin,
  handleLayout,
  handleLastLayout,
  handleMenuHidden,
  handleNavbarType,
  handleFooterType,
  handleNavbarColor,
  handleContentWidth,
  handleMenuCollapsed,
  handleChangeLanguage
} = layoutSlice.actions

export default layoutSlice.reducer
