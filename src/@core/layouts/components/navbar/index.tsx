// ** React Imports
import { Fragment } from 'react'
import classnames from "classnames"

// ** Custom Components
import NavbarUser from './NavbarUser'
import BookmarkCustom from './NavbarBookmarks'

const ThemeNavbar = (props: any) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  return (
    <Fragment>
      <div className={classnames('d-flex justify-content-between align-items-center position-relative w-100  p-0')}>
        <div className='bookmark-wrapper custom-bookmark d-flex align-items-center'>
          <BookmarkCustom setMenuVisibility={setMenuVisibility} />
        </div>
        <NavbarUser skin={skin} setSkin={setSkin} />
      </div>

    </Fragment>
  )
}

export default ThemeNavbar
