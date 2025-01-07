import { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { UserContext } from './useContext'
import Table from './table'
import ModalComponent from './modal'
import { useTranslation } from "react-i18next"
import {ITypeModal} from "@src/domain/models"

const title = 'User'

const BankPage = () => {
  const { t } = useTranslation()

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [openModal, setOpenModal] = useState(false)
  const [dataItem, setDataItem] = useState({})
  const [typeModal, setTypeModal] = useState<ITypeModal>('')

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
        <title>{t('Người dùng')} - {t(title)}</title>
      </Helmet>
      <UserContext.Provider value={{ openModal, handleModal, dataItem, setDataItem, typeModal, setTypeModal, windowSize }} >
        <div className='app-user-list'>
          <Table />
          <ModalComponent />
        </div>
      </UserContext.Provider>
    </Fragment>
  )
}
export default BankPage