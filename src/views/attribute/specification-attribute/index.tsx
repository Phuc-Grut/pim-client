import { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { SpecificationAttributeContext } from './useContext'
import Table from './table'
import ModalComponent from './modal'
import { useTranslation } from "react-i18next"
import { ITypeModal } from "@src/domain/models"
import SideOption from './components/sidebarOption'

import {userAction, userSubject} from "@configs/acl/ability"
import NotPermission from "@components/not-permission"
import {useAbility} from "@casl/react"
import {AbilityContext} from "@utils/context/Can"
import ModalView, { IFieldView } from '@components/modal-view'
import { statusObjColorDefault, statusObjDefault_Status } from '@src/domain/constants/constantSelect'
import { Badge } from 'reactstrap'
import ModalOptionsComponent from './modalOption'

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
  const [typeMo, setTypeMo] = useState<any>({})
  const [indexRow, setIndexRow] = useState<any>({})
  const [dataSidebar, setDataSidebar] = useState({})
  const [dataTableDetail, setDataTableDetail] = useState<any[]>([])
  const [dataDeleteDetail, setDataDeleteDetail] = useState<any[]>([])
  const [openSidebar, setOpenSidebar] = useState<boolean>(false)

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
  const handleSidebar = () => {
    setOpenSidebar(!openSidebar)
  }

  const renderFields: IFieldView[] = [
    {
      value: dataItem.code, label: "SpecificationAttributeCode"
    },
    {
      value: dataItem.name, label: "Specification attribute name"
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
  
  const TableOption = () : JSX.Element => {

    return <div className='box form-box__border mt-3' style={{ padding: '15px' }}>
      <h5 className="m-0 form-box__border--title">{t('Select Option')}</h5>
      <ModalOptionsComponent />
    </div>

  }
  
  const handleModalViewClose = () => {
    setDataTableDetail([])
  }
  
  return (
    <Fragment>
      <Helmet>
        <title>{t('Attribute')} - {t("Specification attribute")}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject.SpecificationAttribute) ? (
        <SpecificationAttributeContext.Provider value={{
          openModal,
          handleModal,
          dataItem,
          setDataItem,
          typeModal,
          setTypeModal,
          windowSize,
          dataTableDetail,
          setDataTableDetail,
          dataDeleteDetail,
          setDataDeleteDetail,
          openSidebar,
          setOpenSidebar,
          handleSidebar,
          dataSidebar,
          setDataSidebar,
          typeMo,
          setTypeMo,
          indexRow,
          setIndexRow,
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
              titleHeader='Specification attribute'
              windowSize={windowSize}
              renderFields={renderFields}
              labelSize='large'
              Tabs={TableOption}
              handleModalClose={handleModalViewClose}
            />
            <SideOption />
          </div>
        </SpecificationAttributeContext.Provider>
      ) : (
        <NotPermission />
      )}
     
    </Fragment>
  )
}
export default BankPage