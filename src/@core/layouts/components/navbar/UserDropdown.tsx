// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
// import { useDispatch } from 'react-redux'
// import { handleLogout } from '@store/authentication'

// ** Third Party Components
import * as Icon from 'becoxy-icons'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
// import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import AvatarDefault from '@components/avatar-default'
import { DEFAULT_AVATAR } from '@src/domain/constants'
import { useAppContext } from '@src/contexts/AppContext'
import { deleteCookie } from '@src/utility/Utils'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import api from '@src/infra/api'

const UserDropdown = () => {
  // ** Store Vars
  // const dispatch = useDispatch()
  const { t } = useTranslation()
  const { state } = useAppContext()
  const [dropUser, setDropUser] = useState<any[]>([])
  const { isAuthenticated, userInfo } = state

  // ** State
  // const [userData, setUserData] = useState<any>(null)

  //** ComponentDidMount
  // useEffect(() => {
  //   if (isUserLoggedIn() !== null) {
  //     const data = localStorage.getItem("userData")
  //     // @ts-ignore
  //     setUserData(JSON.parse(data))
  //   }
  // }, [])

  //** Vars
  // const userAvatar = (userData && userData.avatar)
  const userAvatar = isAuthenticated && userInfo && userInfo.photo ? userInfo.photo : DEFAULT_AVATAR

  useEffect(() => {
    api.configApi
      .getConfigByCodeApi({ code: 'USER_LOGGED_ACTION' })
      .then(rs => {
        window.localStorage.setItem('USER_LOGGED_ACTION', rs.value)
        setDropUser(JSON.parse(rs.value))
      })
      .catch(ex => console.log(ex))
  }, [])

  const handlerLogout = () => {
    deleteCookie('tenant')
    const domain = `${window.location.protocol}//${window.location.host}`
    const logoutUrl = `${process.env.REACT_APP_BASE_BFF}/account/signout?redirectUrl=${domain}`
    window.location.href = logoutUrl
  }

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold mb-25'>
            {(isAuthenticated && userInfo && userInfo.fullname) || 'John Doe'}
          </span>
          <span className='user-status'>{(isAuthenticated && userInfo && userInfo.tenant) || 'Admin'}</span>
        </div>
        {/*{userData && userData.avatar ? <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online'/> : ''}*/}
        {/*<AvatarDefault img={defaultAvatar} imgHeight='40' imgWidth='40' status='online'/>*/}
        <AvatarDefault
          img={userAvatar}
          initials={true}
          content={userInfo && userInfo.fullname}
          color={'light-primary'}
          imgHeight={40}
          imgWidth={40}
          status='online'
          style={{ background: 'none' }}
        />
      </DropdownToggle>
      <DropdownMenu end>
      {dropUser?.map((item: any) => {
           const IconComponent = Icon[item.icon as keyof typeof Icon]
        return (
        <DropdownItem tag={Link} to={item.url}>
              <IconComponent fontSize={14} className="me-75" />
          <span className='align-middle'>{t(item.name)}</span>
        </DropdownItem>
        )
      })}
        {/*<DropdownItem tag={Link} to='/apps/email'>*/}
        {/*  <Icon.Mail fontSize={14} className='me-75'/>*/}
        {/*  <span className='align-middle'>Inbox</span>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem tag={Link} to='/apps/todo'>*/}
        {/*  <Icon.CheckSquare fontSize={14} className='me-75'/>*/}
        {/*  <span className='align-middle'>Tasks</span>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem tag={Link} to='/apps/chat'>*/}
        {/*  <Icon.MessageSquare fontSize={14} className='me-75'/>*/}
        {/*  <span className='align-middle'>Chats</span>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem divider/>*/}
        {/* <DropdownItem tag={Link} to='http://account-dev.vfico.local/security'>
          <Icon.Settings fontSize={14} className='me-75' />
          <span className='align-middle'>{t('Change password')}</span>
        </DropdownItem> */}
        {/*<DropdownItem tag={Link} to='/pages/pricing'>*/}
        {/*  <Icon.CreditCard fontSize={14} className='me-75'/>*/}
        {/*  <span className='align-middle'>Pricing</span>*/}
        {/*</DropdownItem>*/}
        {/* <DropdownItem tag={Link} to='/pages/faq'>
          <Icon.HelpCircle fontSize={14} className='me-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem> */}
        <DropdownItem onClick={handlerLogout}>
          <Icon.Power fontSize={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
