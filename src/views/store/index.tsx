import { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { StoreContext } from './useContext'
import Table from './table'
import ModalComponent from './modal'
import { useTranslation } from "react-i18next"
import { ITypeModal } from "@src/domain/models"

import {userAction, userSubject} from "@configs/acl/ability"
import NotPermission from "@components/not-permission"
import {useAbility} from "@casl/react"
import {AbilityContext} from "@utils/context/Can"
import ModalView, { IFieldView } from '@components/modal-view'

const BankPage = () => {
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

  const renderFields: IFieldView[] = [
    {
      value: dataItem.code, label: "Store code"
    },
    {
      value: dataItem.name, label: "Store name"
    },
    {
      value: dataItem.description, label: "Description"
    },
    {
      value: dataItem.address, label: "Address"
    },
    {
      value: dataItem.phone, label: "Phone"
    },
    {
      value: dataItem.displayOrder, label: "Display order"
    }
  ]
  
  return (
    <Fragment>
      <Helmet>
        <title>{t("Store")}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject.Store) ? (
        <StoreContext.Provider value={{
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
              titleHeader='Store'
              windowSize={windowSize}
              renderFields={renderFields}
              labelSize='large'
            />
          </div>
        </StoreContext.Provider>
      ) : (
        <NotPermission />
      )}
     
    </Fragment>
  )
}
export default BankPage