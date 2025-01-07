// ** Third Party Components
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from 'react-country-flag'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import {handleChangeLanguage} from '@store/layout'
import {useDispatch} from 'react-redux'

const IntlDropdown = () => {
  // ** Hooks
  const { i18n } = useTranslation()
  const dispatch = useDispatch()
  // ** Vars
  // const langObj = {
  //   en: 'English',
  //   de: 'German',
  //   // fr: 'French',
  //   pt: 'Portuguese',
  //   vi: 'Việt Nam'
  // }

  // ** Function to switch Language
  const handleLangUpdate = (e: any, lang: any) => {
    e.preventDefault()
    i18n.changeLanguage(lang)
    window.localStorage.setItem('i18nextLng', lang)
    dispatch(handleChangeLanguage(lang))
  }

  return (
    <UncontrolledDropdown href='/' tag='li' className='dropdown-language nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link' onClick={e => e.preventDefault()}>
        <ReactCountryFlag
          svg
          className='country-flag flag-icon'
          countryCode={i18n.language === 'en' ? 'us' : (i18n.language === 'vi' ? 'VN' : i18n.language)}
        />
        {/* <span className='selected-language'>{langObj[i18n.language]}</span> */}
      </DropdownToggle>
      <DropdownMenu className='mt-0' end>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'vi')}>
          <ReactCountryFlag className='country-flag' countryCode='vn' svg />
          <span className='ms-1'>Việt Nam</span>
        </DropdownItem>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'en')}>
          <ReactCountryFlag className='country-flag' countryCode='us' svg />
          <span className='ms-1'>English</span>
        </DropdownItem>
        {/*<DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'fr')}>*/}
        {/*  <ReactCountryFlag className='country-flag' countryCode='fr' svg />*/}
        {/*  <span className='ms-1'>French</span>*/}
        {/*</DropdownItem>*/}
        {/* <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'de')}>
          <ReactCountryFlag className='country-flag' countryCode='de' svg />
          <span className='ms-1'>German</span>
        </DropdownItem>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'pt')}>
          <ReactCountryFlag className='country-flag' countryCode='pt' svg />
          <span className='ms-1'>Portuguese</span>
        </DropdownItem> */}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default IntlDropdown
