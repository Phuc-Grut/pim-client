import { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { UnitContext } from './useContext'
import Table from './table'
import ModalComponent from './modal'
import { useTranslation } from "react-i18next"
import { ITypeModal } from "@src/domain/models"
import * as Icon from 'becoxy-icons'
import {userAction, userSubject} from "@configs/acl/ability"
import NotPermission from "@components/not-permission"
import {useAbility} from "@casl/react"
import {AbilityContext} from "@utils/context/Can"
import ModalView, { IFieldView } from '@components/modal-view'
import { statusObjColorDefault, statusObjDefault_Status } from '@src/domain/constants/constantSelect'
import { Badge } from 'reactstrap'
import { addPeriod, checkObjColor } from '@src/utility/Common'

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
      value: dataItem.code, label: "Unit code", col: 6
    },
    {
      value: dataItem.name, label: "Unit name", col: 6
    },
    {
      value: dataItem.groupUnitName, label: "Group unit", col: 6
    },
    {
      value: dataItem.namePlural, label: "NamePlural", col: 6
    },
    {
      value: <Badge className='icon-capitalize p-25' color={checkObjColor[dataItem.isDefault]} pill>
        {dataItem.isDefault ? <Icon.Check fontSize={12} /> : <Icon.X fontSize={12} />}
      </Badge>,
      label: "IsMainUnit",
      col: 6
    },
    {
      value: addPeriod(dataItem.rate), label: "RateToMainUnit", col: 6
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
        <title>{t('Catalog')} - {t("Unit")}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject.Unit) ? (
        <UnitContext.Provider value={{ openModal, handleModal, dataItem, setDataItem, typeModal, setTypeModal, windowSize, openModalDetail, handleModalDetail }} >
          <div className='app-user-list'>
            <Table />
            <ModalComponent />
            <ModalView
              dataItem={dataItem}
              handleModalDetail={handleModalDetail}
              openModalDetail={openModalDetail}
              setDataItem={setDataItem}
              titleHeader='Unit'
              windowSize={windowSize}
              renderFields={renderFields}
              labelSize='large'
            />
          </div>
        </UnitContext.Provider>
      ) : (
        <NotPermission />
      )}
      
    </Fragment>
  )
}
export default BankPage