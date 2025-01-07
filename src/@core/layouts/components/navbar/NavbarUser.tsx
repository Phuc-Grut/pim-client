// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
// import CartDropdown from './CartDropdown'
import UserDropdown from './UserDropdown'
import NavbarSearch from './NavbarSearch'
import NotificationDropdown from './NotificationDropdown'

// ** Third Party Components
import {Sun, Moon} from 'becoxy-icons'

// ** Reactstrap Imports
import {NavItem, NavLink} from 'reactstrap'
import AppsDropdown from "@layouts/components/navbar/AppsDropdown"

const NavbarUser = (props: any) => {
  // ** Props
  const {skin, setSkin} = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')}/>
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')}/>
    }
  }

  return (
    <ul className='nav navbar-nav align-items-center ms-auto'>
      <AppsDropdown/>
      <IntlDropdown/>
      <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler/>
        </NavLink>
      </NavItem>
      <NavbarSearch/>
      <NotificationDropdown/>
      <UserDropdown/>
    </ul>
  )
}
export default NavbarUser
