import { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { ServiceAddContext } from './useContext'
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
import { addPeriod } from '@src/utility/Common'

const ServiceAddPage = () => {
  const { t } = useTranslation()

  const ability = useAbility(AbilityContext)

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [openModal, setOpenModal] = useState(false)
  const [dataItem, setDataItem] = useState<any>({})
  const [typeModal, setTypeModal] = useState<ITypeModal>('')
  const [openModalOrder, setOpenModalOrder] = useState(false)
  const [openModalDetail, setOpenModalDetail] = useState(false)

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

  const handleModalOrder = () => {
    setOpenModalOrder(!openModalOrder)
  }

  const handleModalDetail = () => {
    setOpenModalDetail(!openModalDetail)
  }

  const optionMethod: any = {
    0: "Cố định",
    1: "Biến động"
  }

  const renderFields: IFieldView[] = [
    {
      value: dataItem.code, label: "ServiceCode"
    },
    {
      value: dataItem.name, label: "ServiceName"
    },
    {
      value: optionMethod[dataItem.calculationMethod], label: "CalculationMethod", col: 6
    },
    {
      value: dataItem.currency, label: "Currency", col: 6
    },
    {
      value: addPeriod(dataItem.price), label: "FixPrice", col: 6, isHidden: dataItem.calculationMethod !== 0
    },
    {
      value: "", label: "", col: 6, isHidden: dataItem.calculationMethod !== 0
    },
    {
      value: addPeriod(dataItem.minPrice), label: "MinPrice", col: 6, isHidden: dataItem.calculationMethod !== 1
    },
    {
      value: addPeriod(dataItem.maxPrice), label: "MaxPrice", col: 6, isHidden: dataItem.calculationMethod !== 1
    },
    {
      value: dataItem.priceSyntax, label: "PriceSyntax", col: 12, isHidden: dataItem.calculationMethod !== 1
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
        <title>{t("ServiceAdd")}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject.ServiceAdd) ? (
        <ServiceAddContext.Provider value={{
          openModal,
          handleModal,
          dataItem,
          setDataItem,
          typeModal,
          setTypeModal,
          windowSize,
          openModalOrder,
          handleModalOrder,
          openModalDetail,
          handleModalDetail
        }} >
          <div className='app-user-list'>
            <Table />
            <ModalComponent />
            <ModalView
              dataItem={dataItem}
              handleModalDetail={handleModalDetail}
              openModalDetail={openModalDetail}
              setDataItem={setDataItem}
              titleHeader='ServiceAdd'
              windowSize={windowSize}
              renderFields={renderFields}
              labelSize='large'
            />
          </div>
        </ServiceAddContext.Provider>
      ) : (
        <NotPermission />
      )}
      
    </Fragment>
  )
}
export default ServiceAddPage