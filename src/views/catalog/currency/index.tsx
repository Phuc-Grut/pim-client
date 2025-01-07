import { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { CurrencyContext } from './useContext'
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

const title = 'Currency'

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
      value: dataItem.code, label: "Currency code"
    },
    {
      value: dataItem.name, label: "Currency name"
    },
    {
      value: dataItem.locale, label: "Country"
    },
    {
      value: dataItem.customFormatting, label: "Currency format"
    },
    {
      value: dataItem.displayOrder, label: "Display order"
    },
    {
      value: <Badge className='text-capitalize' color={statusObjColorDefault[dataItem.status]} pill>
        {t(statusObjDefault_Status[dataItem.status])}
      </Badge>,
      label: "Status"
    }
  ]
  
  return (
    <Fragment>
      <Helmet>
        <title>{t('Catalog')} - {t(title)}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject.Currency) ? (
        <CurrencyContext.Provider value={{ openModal, handleModal, dataItem, setDataItem, typeModal, setTypeModal, windowSize, openModalDetail, handleModalDetail }} >
          <div className='app-user-list'>
            <Table />
            <ModalComponent />
            <ModalView
              dataItem={dataItem}
              handleModalDetail={handleModalDetail}
              openModalDetail={openModalDetail}
              setDataItem={setDataItem}
              titleHeader={title}
              windowSize={windowSize}
              renderFields={renderFields}
            />
          </div>
        </CurrencyContext.Provider>
      ) : (
        <NotPermission />
      )}
      
    </Fragment>
  )
}
export default BankPage