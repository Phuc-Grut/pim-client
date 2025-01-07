import { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { DeliveryTimeContext } from './useContext'
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
import { checkObjColor } from '@src/utility/Common'
import { Check, X } from 'becoxy-icons'

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
      value: dataItem.name, label: "Name"
    },
    {
      value: dataItem.minDays, label: "Min day", col: 6
    },
    {
      value: dataItem.maxDays, label: "Max day", col: 6
    },
    {
      value: dataItem.displayOrder, label: "Display order", col: 6
    },
    {
      value: <Badge className='icon-capitalize p-25' color={checkObjColor[dataItem.isDefault]} pill>
        {dataItem.isDefault ? <Check fontSize={12} /> : <X fontSize={12} />}
      </Badge>,
      label: "IsMainUnit",
      col: 6
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
        <title>{t('Catalog')} - {t("Delivery time")}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject.DeliverTime) ? (
        <DeliveryTimeContext.Provider value={{ openModal, handleModal, dataItem, setDataItem, typeModal, setTypeModal, windowSize, openModalDetail, handleModalDetail }} >
          <div className='app-user-list'>
            <Table />
            <ModalComponent />
            <ModalView
              dataItem={dataItem}
              handleModalDetail={handleModalDetail}
              openModalDetail={openModalDetail}
              setDataItem={setDataItem}
              titleHeader='Delivery time'
              windowSize={windowSize}
              renderFields={renderFields}
              labelSize='large'
            />
          </div>
        </DeliveryTimeContext.Provider>
      ) : (
        <NotPermission />
      )}
      
    </Fragment>
  )
}
export default BankPage