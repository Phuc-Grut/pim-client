import { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { ProductAttributeContext } from './useContext'
import Table from './table'
import ModalComponent from './modal/modal'
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
import ModalOptionsComponent from './modal/modalOption'

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
  const [openModalDetail, setOpenModalDetail] = useState(false)
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

  const optionSearchType: any = {
    1: 'Chọn một',
    2: 'Chọn nhiều'
  }
  const renderFields: IFieldView[] = [
    {
      value: dataItem.code, label: "Product attribute code"
    },
    {
      value: dataItem.name, label: "Product attribute name"
    },
    {
      value: optionSearchType[dataItem.searchType], label: "SearchType"
    },
    {
      value: <Badge className='icon-capitalize p-25' color={checkObjColor[dataItem.allowFiltering]} pill>
        {dataItem.allowFiltering ? <Check fontSize={12} /> : <X fontSize={12} />}
      </Badge>,
      label: "Allow filtering",
      col: 6
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
        <title>{t('Attribute')} - {t("Product attribute")}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject["Product attribute"]) ? (
        <ProductAttributeContext.Provider value={{
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
              openModalDetail={openModalDetail}
              setDataItem={setDataItem}
              titleHeader='Product attribute'
              windowSize={windowSize}
              renderFields={renderFields}
              labelSize='large'
              Tabs={TableOption}
              handleModalDetail={handleModalDetail}
              handleModalClose={handleModalViewClose}
            />
          </div>
        </ProductAttributeContext.Provider>
      ) : (
        <NotPermission />
      )}
      
    </Fragment>
  )
}
export default BankPage