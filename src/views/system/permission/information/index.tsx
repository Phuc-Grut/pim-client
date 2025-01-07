import { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import Table from './table'
import { useTranslation } from "react-i18next"
import { PermissionInformationContext } from './useContext'
import {ITypeModal} from "@src/domain/models"

const title = 'Permission information'

const PermissionFunctionPage = () => {
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
        <title>{t(title)}</title>
      </Helmet>
      <PermissionInformationContext.Provider value={{ openModal, handleModal, dataItem, setDataItem, typeModal, setTypeModal, windowSize }} >
        <div className='todo-application'>
          <Table />
        </div>
      </PermissionInformationContext.Provider>
    </Fragment>
  )
}
export default PermissionFunctionPage