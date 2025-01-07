import {Fragment, useEffect, useState} from 'react'
import {Helmet} from "react-helmet"
import { GroupUserContext } from './useContext'
import Table from './table'
import ModalComponent from './modal'
import {useTranslation} from "react-i18next"
import ModalAddMemberComponent from './modal-add-member'
import {userAction, userSubject} from "@configs/acl/ability"
import {useAbility} from "@casl/react"
import {AbilityContext} from "@utils/context/Can"
import NotPermission from "@components/not-permission"
import {ITypeModal} from "@src/domain/models"

const title = 'Group user'

const BankPage = () => {
  const { t } = useTranslation()
  const ability = useAbility(AbilityContext)
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [dataItem, setDataItem] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const [openModalAddMember, setOpenModalAddMember] = useState(false)
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
  const handleModalAddMember = () => {
    setOpenModalAddMember(!openModalAddMember)
  }
  return (
    <Fragment>
      <Helmet>
        <title>{t(title)}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject.SystemGroupUser) && <GroupUserContext.Provider value={{ openModal, handleModal, dataItem, setDataItem, typeModal, setTypeModal, openModalAddMember, handleModalAddMember, windowSize}} >
        <div className='todo-application'>
          <Table />
          <ModalComponent />
          <ModalAddMemberComponent />
        </div>
      </GroupUserContext.Provider>}

      {ability.cannot(userAction.OPEN, userSubject.SystemGroupUser) && (
        <NotPermission/>
      )}
      
    </Fragment>
  )
}
export default BankPage