import { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { GroupUnitContext } from './useContext'
import Table from './table'
import ModalComponent from './modal'
import { useTranslation } from "react-i18next"
import { ITypeModal } from "@src/domain/models"

import {userAction, userSubject} from "@configs/acl/ability"
import NotPermission from "@components/not-permission"
import {useAbility} from "@casl/react"
import {AbilityContext} from "@utils/context/Can"
import ModalView, { IFieldView } from '@components/modal-view'
import { statusObjColorDefault, statusObjDefault_Status } from '@src/domain/constants/constantSelect'
import { Badge } from 'reactstrap'

const BankPage = () => {
  const { t } = useTranslation()

  const ability = useAbility(AbilityContext)

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [openModal, setOpenModal] = useState(false)
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [dataItem, setDataItem] = useState<any>({})
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

  const handleModalDetail = () => {
    setOpenModalDetail(!openModalDetail)
  }

  const renderFields: IFieldView[] = [
    {
      value: dataItem.code, label: "Group unit code"
    },
    {
      value: dataItem.name, label: "Group unit name"
    },
    {
      value: dataItem.description, label: "Description"
    },
    {
      value: <Badge className='text-capitalize' color={statusObjColorDefault[dataItem.status]} pill>
        {t(statusObjDefault_Status[dataItem.status])}
      </Badge>,
      label: "Status",
      col: 6
    },
    {
      value: dataItem.displayOrder, label: "Display order", col: 6
    }
  ]

  return (
    <Fragment>
      <Helmet>
        <title>{t('Catalog')} - {t('Group unit')}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject.GroupUnitCatalog) ? (
        <GroupUnitContext.Provider value={{ openModal, handleModal, dataItem, setDataItem, typeModal, setTypeModal, windowSize, openModalDetail, handleModalDetail }} >
          <div className='app-user-list'>
            <Table />
            <ModalComponent />
            <ModalView
              dataItem={dataItem}
              handleModalDetail={handleModalDetail}
              openModalDetail={openModalDetail}
              setDataItem={setDataItem}
              titleHeader='Group unit'
              windowSize={windowSize}
              renderFields={renderFields}
            />
          </div>
        </GroupUnitContext.Provider>
      ) : (
        <NotPermission />
      )}
      
    </Fragment>
  )
}
export default BankPage