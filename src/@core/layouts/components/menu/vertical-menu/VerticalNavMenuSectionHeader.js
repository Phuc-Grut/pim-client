// ** Third Party Components
import {MoreHorizontal} from 'becoxy-icons'
import {useTranslation} from 'react-i18next'

const VerticalNavMenuSectionHeader = ({item}) => {
  const {t} = useTranslation()
  return (
    <li className='navigation-header'>
      {item.resAttributes && item.resAttributes.ISHEADER === '1' ? (
        <span>{t(item.title)}</span>
      ) : ''}
      <MoreHorizontal className='feather-more-horizontal'/>
    </li>
  )
}

export default VerticalNavMenuSectionHeader
