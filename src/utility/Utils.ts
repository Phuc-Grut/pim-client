import { IContextMenu, IIdContext } from '@src/domain/models/IContextMenu'
import { lazy } from 'react'
import { DefaultRoute } from '../router/routes'
import { CDN_URL_VIEW, REPLACE_STRING_CDN } from "@src/domain/constants"
// import _ from 'lodash'
// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj: any) => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = (num: any) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = (html: any) => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = (date: any) => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
// export const formatDate = (value: any, formatting: any = { month: 'short', day: 'numeric', year: 'numeric' }) => {
//   if (!value) { return value }
//   return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
// }

// ** Returns short month of passed date
export const formatDateToMonthShort = (value: any, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting: any = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

function padTo2Digits(num: any) {
  return num.toString().padStart(2, '0')
}

export const formatDate = (date: any) => {
  const d = new Date(date)
  const rs = [
    padTo2Digits(d.getDate()),
    padTo2Digits(d.getMonth() + 1),
    d.getFullYear()
  ].join('/')
  return rs
}

export const convertString = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
  str = str.replace(/đ/g, "d")
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
  str = str.replace(/Đ/g, "D")
  return str
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
// export const isUserLoggedIn = () => localStorage.getItem('userData')
// // export const getUserData = () => JSON.parse(localStorage.getItem('userData'))
// export const getUserData = () => (localStorage.getItem('userData'))
export const getCurrentApp = () => {
  try {
    const productCode = process.env.REACT_APP_PRODUCT_CODE
    const listApp = localStorage.getItem('SHORT_LINK_APP')
    if (listApp) {
      return JSON.parse(listApp).find((x: { productCode: string }) => x.productCode === productCode)
    } else {
      return {}
    }
  } catch {
    return {}
  }
}
/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (user: any) => {
  if (user) { return DefaultRoute }
  // if (userRole === 'client') { return '/access-control' }
  return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

export const setCookie = (cName: string, cValue: any, exDays: any) => {
  const d = new Date()
  d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000))
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${cName}=${cValue}; ${expires};path=/`
}

export const getCookie = (cname: any) => {
  const name = `${cname}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}
export const deleteCookie = (cName: string) => {
  const expires = `expires=0`
  document.cookie = `${cName}=; ${expires};path=/`
}

export const deleteAllCookie = () => {
  const cookies = document.cookie.split(";")

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf("=")
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = `${name}=;expires=0"`
  }
}

const clean = (obj: any) => {
  if (!isObjEmpty(obj)) {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName].length === 0) {
        delete obj[propName]
      }
    }
    return obj
  }
}

export const recurseList = (obj: any) => {
  return Object.keys(obj).reduce((acc: Object[], cur) => {
    if (obj[cur] instanceof Object) {
      const data: Object[] = {
        ...obj[cur]
      }
      clean(data)
      const children = recurseList(obj[cur])
      if (children.length) {
        clean(obj[cur])
      }
      acc.push(data)
    }
    return acc
  }, [])
}

export const nestArray = (items: any, id = null, link = 'parent') => {
  return items
    .filter((item: any) => item[link] === id)
    .map((item: any) => ({
      ...item,
      children: nestArray(items, item.id)
    }))
}

export const flattenArray = (arr: any) => {
  if (!arr) { return [] }
  return arr.reduce((r: any, { children, ...rest }: any) => {
    r.push(rest)
    if (children) { r.push(...flattenArray(children)) }
    return r
  }, [])
}

export const formatBytes = (props: any, decimals = 2) => {
  if (!+props.size) {
    return '0 Bytes'
  }
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(props.size) / Math.log(k))
  return `${parseFloat((props.size / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const checkListContext = (param: { id: string }[], parList: IContextMenu[]) => {
  return param.length === 0 ? [] : parList.filter(p => param.some(l => l.id === p.id))
}

export const getContext = (arr1: IIdContext[], array2: IContextMenu[]) => {
  if (arr1) {
    return arr1.map((item: IIdContext) => {
      const rs = array2.find((i: IContextMenu) => item.id === i.id)
      return { ...rs }
    })
  }

}

export const getDuplicate2Array = (source: any, target: any) => {
  const dup: any = []
  const rs = [...target]
  for (let i = 0; i < source.length; i++) {
    const srcObj: any = source[i]
    const tarObj: any = rs.find(function (obj: any) {
      return obj.name === srcObj.name
    })

    if (tarObj) {
      dup.push(srcObj)
    }
  }
  return dup
}

export const getDjf2Array = (source: any, target: any) => {
  const rs = [...target]
  for (let i = 0; i < source.length; i++) {
    const srcObj: any = source[i]
    const tarObj: any = rs.find(function (obj: any) {
      return obj.name === srcObj.name
    })

    if (!tarObj) {
      rs.push(srcObj)
    }
  }
  return rs
}

// find object by value of key
export const getObject = (array: any, key: any, value: any) => {
  let o
  array.some(function iter(a: any) {
    if (a[key] === value) {
      o = a
      return true
    }
    return Array.isArray(a.children) && a.children.some(iter)
  })
  return o
}

export const loadComponent = (name: string) => {
  if (name === undefined || name === null || name === '') {
    return require("./../views/charts/components/defaultTemplate").default
  }
  return require(`./../views/charts/components/${name}.tsx`).default
}

export const importView = (name: string) => {
  const Data = lazy(() => import(`./../views/charts/components/${name}`)
    .catch(() => import(`./../views/charts/components/defaultTemplate`)))

  return Data
}

export const removeSpace = (str: string) => {
  return str.replace(/\s/g, '')
}

export const getOrganizationLocal = () => {
  const data = { id: '', text: '' }
  const dataLocal = localStorage.getItem('organization')
  const organizationLocal = JSON.parse(dataLocal && dataLocal !== "undefined" ? dataLocal : 'null')
  if (organizationLocal !== null) {
    return { id: organizationLocal.id, text: organizationLocal.text }
  }
  return data
}

export const reverseString = (str: any): string => {
  return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0)
}

export const getString = (str: string, regex: any) => {
  if (str.length > 0) {
    const revers = reverseString(str)
    const index = revers.search(regex)
    const preRs = revers.substring(0, index)
    const rs = reverseString(preRs)
    return rs
  }
  return ''

}
export const generateUUID = () => { // Public Domain/MIT
  let d = new Date().getTime()//Timestamp
  let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16//random number between 0 and 16
    if (d > 0) { //Use timestamp until depleted
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else { //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r : 0x3).toString(16)
  })
}

export const editorBeforeUpload = (str: string) => {
  const search: any = CDN_URL_VIEW
  const replace: any = REPLACE_STRING_CDN
  const rs = str ? str.replace(search, replace) : ''
  return rs

}


export const editorBeforeView = (str: string) => {
  const search: any = REPLACE_STRING_CDN
  const replace: any = CDN_URL_VIEW

  const rs = str ? str.replace(search, replace) : ''
  return rs
}


type ILocal = 'vi-VN' | 'en-US' | undefined
type ICurrencyCode = 'VND' | 'USD' | undefined

export const currency = (value: any, currencyCode: ICurrencyCode = undefined, local: ILocal = 'vi-VN') => {
  if (currencyCode) {
    const CUR = new Intl.NumberFormat(local, {
      style: 'currency',
      currency: currencyCode ? currencyCode : 'VND'
    })

    return value ? CUR.format(value) : 0
  } else {
    const CUR = new Intl.NumberFormat()

    return value ? CUR.format(value) : 0
  }

}
