import { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { TaxCategoryContext } from './useContext'
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

  const optionType: any = {
    0: t("GTGT tax"),
    1: t("Export tax"),
    2: t("Import tax"),
    3: t("Excise tax")
  }

  const renderFields: IFieldView[] = [
    {
      value: dataItem.code, label: "Tax category code", col: 6
    },
    {
      value: dataItem.name, label: "Tax category name", col: 6
    },
    {
      value: dataItem.rate, label: "Tax", col: 6
    },
    {
      value: optionType[dataItem.type], label: "Tax type", col: 6
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
    },
    {
      value: dataItem.description, label: "Description"
    }
  ]
  
  return (
    <Fragment>
      <Helmet>
        <title>{t('Catalog')} - {t("Tax category")}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject.TaxCategory) ? (
        <TaxCategoryContext.Provider value={{ openModal, handleModal, dataItem, setDataItem, typeModal, setTypeModal, windowSize, openModalDetail, handleModalDetail }} >
          <div className='app-user-list'>
            <Table />
            <ModalComponent />
            <ModalView
              dataItem={dataItem}
              handleModalDetail={handleModalDetail}
              openModalDetail={openModalDetail}
              setDataItem={setDataItem}
              titleHeader='Tax category'
              windowSize={windowSize}
              renderFields={renderFields}
            />
          </div>
        </TaxCategoryContext.Provider>
      ) : (
        <NotPermission />
      )}
      
    </Fragment>
  )
}
export default BankPage