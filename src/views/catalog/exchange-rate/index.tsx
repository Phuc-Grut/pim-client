import { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { ExchangeRateContext } from './useContext'
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
import moment from 'moment'
import themeConfig from '@src/configs/themeConfig'

const title = 'Exchange rate'

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
      value: dataItem.toCurrency, label: "Currency exchange"
    },
    {
      value: dataItem.fromCurrency, label: "Original currency"
    },
    {
      value: <>
        <p>
          {dataItem.calculation}
        </p>
        <strong>
          {`(1 ${dataItem.fromCurrency || t("Original currency")} = 1 ${dataItem.calculation} ${addPeriod(dataItem.rate)} ${dataItem.toCurrency || t("Currency exchange")})`}
        </strong>
      </>,
      label: "Calculation",
      col: 6
    },
    {
      value: addPeriod(dataItem.rate), label: "Exchange rate", col: 6
    },
    {
      value: dataItem.activeDate ? moment(dataItem.activeDate).format(themeConfig.system.dateTimeFormat) : "", label: "Active date"
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
      {ability.can(userAction.OPEN, userSubject.ExchangeRate) ? (
        <ExchangeRateContext.Provider value={{ openModal, handleModal, dataItem, setDataItem, typeModal, setTypeModal, windowSize, openModalDetail, handleModalDetail }} >
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
        </ExchangeRateContext.Provider>
      ) : (
        <NotPermission />
      )}
      
    </Fragment>
  )
}
export default BankPage