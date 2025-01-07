// import { User } from 'oidc-client'
// import { injectable } from 'inversify'
// import jwtDecode from 'jwt-decode'
// import { IAuthRepository } from '../domain/interfaces/IAuthRepository'
// import 'reflect-metadata'

// @injectable()
// export class AuthRepository implements IAuthRepository {

//   async login(userLoginInfo: any): Promise<any> {
//     if (!userLoginInfo.username || !userLoginInfo.password) {
//       return {error: 'please fill in the input'}
//     }
//   }

//   isAuthenticated(): boolean {
//     return new Date().getTime() < parseInt(localStorage.getItem('expires_at') ?? '0', 0)
//   }

//   setSession(authResult: User): void {
//     const expiresAt = JSON.stringify(authResult.expires_at * 1000)
//     localStorage.setItem('access_token', authResult.access_token)
//     localStorage.setItem('refresh_token', authResult.refresh_token ?? '')
//     localStorage.setItem('id_token', authResult.id_token)
//     localStorage.setItem('expires_at', expiresAt)
//     localStorage.setItem('userData', JSON.stringify(authResult))

//     const tokenInfo = jwtDecode<any>(authResult.access_token)
//     localStorage.setItem('sub', tokenInfo.sub)
//   }

//   async clearSession(): Promise<void> {
//     localStorage.removeItem('access_token')
//     localStorage.removeItem('refresh_token')
//     localStorage.removeItem('id_token')
//     localStorage.removeItem('expires_at')
//     localStorage.removeItem('sub')
//     localStorage.removeItem('userData')
//     localStorage.removeItem('menu-main')
//     localStorage.removeItem('tenant')
//   }

//   async checkExpirity(token: any) {
//     if (!token) {
//       return {
//         error: 'not matched'
//       }
//     }

//     try {
//       const profile = jwtDecode<{
//         expiredAt: number,
//         exp: number
//       }>(token)

//       const expiredAt = profile.expiredAt || profile.exp * 1000

//       if (expiredAt > new Date().getTime()) {
//         return {
//           ...profile,
//           token,
//           expiredAt: new Date(expiredAt)
//         }
//       } else {
//         return {error: 'Token expired'}
//       }
//     } catch (e) {
//       // eslint-disable-next-line no-console
//       console.log(e)

//       return {error: 'Server Error'}
//     }
//   }
// }
export { }