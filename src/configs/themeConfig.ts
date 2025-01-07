// You can customize the template with the help of this file
//Template config options
import { ToastPosition } from 'react-hot-toast'
const toast:ToastPosition = 'top-right'
const themeConfig = {
  app: {
    appName: '',
    appCdn: 'https://pim-gw.becoxy.com/',
    appLogoImage: 'https://cdn.becoxy.com/static/image/app/logo-pim.png'//require('@src/assets/images/logo/logo.svg').default
  },
  layout: {
    isRTL: false,
    skin: 'light', // light, dark, bordered, semi-dark
    type: 'vertical', // vertical, horizontal
    contentWidth: 'full', // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      height: 63, // 4.45rem ~ 63px
      type: 'sticky', // static , sticky , floating, hidden
      backgroundColor: 'white' // BS color options [primary, success, etc]
    },
    footer: {
      type: 'sticky', // static, sticky, hidden
      height: 47 // 3.35rem ~ 47px
    },
    customizer: false,
    scrollTop: true, // Enable scroll to top button
    toastPosition: toast // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  },
  system: {
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'DD/MM/yyyy HH:mm',
    timeFormat: 'HH:mm',
    dateFormatMoment: 'DD/MM/yyyy',
    pageSizes: [20, 30, 50, 100]
  },
  selectZIndex: 100,
  themeColor: '#c4c4c4'
}

export default themeConfig
