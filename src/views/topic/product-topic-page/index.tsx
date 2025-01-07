import { useAbility } from '@casl/react'
import NotPermission from '@components/not-permission'
import { userAction, userSubject } from '@src/configs/acl/ability'
import { AbilityContext } from '@src/utility/context/Can'
import { Fragment, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { ProductTopicPageContext } from './useContext'
import Table from './table'
import ModalComponent from './modal/modal-component'
import ModalView from './modal/modal-view'

const ProductTopicPage = () => {
  const {t} = useTranslation()
  const ability = useAbility(AbilityContext)
  const getWindowSize = () => {
    const {innerWidth, innerHeight} = window
    return {innerWidth, innerHeight}
  }

  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [openModal, setOpenModal] = useState(false)
  const [dataItem, setDataItem] = useState({})
  const [typeModal, setTypeModal] = useState<string>('')

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const handleModal = () => {
    setOpenModal(!openModal)
  }
  
  return (
    <Fragment>
      <Helmet>
        <title>{t('App setting')} - {t("Product topic page")}</title>
      </Helmet>
      {ability.can(userAction.ADD, userSubject.ProductTopicPage) && <ProductTopicPageContext.Provider value={{
        openModal,
        handleModal,
        dataItem,
        setDataItem,
        typeModal,
        setTypeModal,
        windowSize
      }}>
        <div className='app-user-list'>
          <Table/>
          <ModalComponent/>
          <ModalView/>
        </div>
      </ProductTopicPageContext.Provider>}

      {ability.cannot(userAction.ADD, userSubject.ProductTopicPage) && (
        <NotPermission/>
      )}
      
    </Fragment>
  )
}

export default ProductTopicPage