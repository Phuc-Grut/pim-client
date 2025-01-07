
// const setCookie = (cName: string, cValue: any, exDays: any) => {
//   const d = new Date()
//   d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000))
//   const expires = `expires=${d.toUTCString()}`
//   document.cookie = `${cName}=${cValue}; ${expires};path=/`
// }

// const getCookie = (cname: any) => {
//   const name = `${cname}=`
//   const decodedCookie = decodeURIComponent(document.cookie)
//   const ca = decodedCookie.split(';')
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i]
//     while (c.charAt(0) === ' ') {
//       c = c.substring(1)
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length)
//     }
//   }
//   return ""
// }
// const location = window.location
// const url = location.origin
// const queryString = location.search
// const urlParams = new URLSearchParams(queryString)
// const tenant = urlParams.get('tenant')

// if (tenant) {
//   setCookie('tenant', tenant, 365)
// }

// // console.log(url)
// const tenantCode = getCookie('tenant')
// const authorityUrl = process.env.REACT_APP_AUTHORITY
// const clientSecret = process.env.REACT_APP_CLIENT_SECRET
// const clientId = process.env.REACT_APP_CLIENT_ID
// const scopeConfig = process.env.REACT_APP_SCOPE

// const devConfig = {
//   production: false,
//   sso: {
//     authority: `${authorityUrl}/${tenantCode}`,
//     client_id: clientId,
//     client_secret: clientSecret,
//     redirect_uri: `${url}/callback`,
//     post_logout_redirect_uri: `${url}`,
//     response_type: 'code',
//     scope: scopeConfig,
//     silent_redirect_uri: `${url}/silent`,
//     revokeAccessTokenOnSignout: true
//   }
// }
// const stagingConfig = {
//   production: true,
//   sso: {
//     authority: `${authorityUrl}/${tenantCode}`,
//     client_id: clientId,
//     client_secret: clientSecret,
//     redirect_uri: `${url}/callback`,
//     post_logout_redirect_uri: `${url}`,
//     response_type: 'code',
//     scope: scopeConfig,
//     silent_redirect_uri: `${url}/silent`,
//     revokeAccessTokenOnSignout: true
//   }
// }
// const prodConfig = {
//   production: true,
//   sso: {
//     authority: `${authorityUrl}/${tenantCode}`,
//     client_id: clientId,
//     client_secret: clientSecret,
//     redirect_uri: `${url}/callback`,
//     post_logout_redirect_uri: `${url}`,
//     response_type: 'code',
//     scope: scopeConfig,
//     silent_redirect_uri: `${url}/silent`,
//     revokeAccessTokenOnSignout: true
//   }
// }

// // prettier-ignore
// // const masterConfig = process.env.REACT_APP_ENV === 'production' ? prodConfig : process.env.REACT_APP_ENV === 'staging' ? stagingConfig : devConfig
// // @ts-ignore

// const masterConfig = process.env.NODE_ENV === 'production' ? prodConfig : process.env.NODE_ENV === 'staging' ? stagingConfig : devConfig

// export default {
//   ...masterConfig
// }
export { }