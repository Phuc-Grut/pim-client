import { Fragment, useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { ProductContext } from './useContext'
import Table from './table'
import ModalComponent from './modal'
import { useTranslation } from 'react-i18next'
import SidebarTierPrice from './components/sub-modal/sidebar-tier-price'
import SidebarServiceAdd from './components/sub-modal/sidebar-service-add'
import SidebarPackage from './components/sub-modal/sidebar-package'
import ModalDetail from "./modalDetail"
import SidebarSpecAttr from './components/sub-modal/sidebar-specification-attribute'
import SidebarProdAttr from './components/sub-modal/sidebar-product-attribute'
import SidebarProductRelated from './components/sub-modal/sidebar-product-related'
import SidebarProdAttrOption from './components/sub-modal/sidebar-product-attribute-option'
import SidebarProdAttrCombination from './components/sub-modal/sidebar-product-attribute-combination'
import ModalDuplicate from './modalDuplicate'
import { useStore } from '../store/hooks'
import { useCurrency } from '../catalog/currency/hooks'
import ModalVariant from './modalVariant'
import TableVariant from './tableVariant'
import { ITypeModal } from "@src/domain/models"

import { userAction, userSubject } from "@configs/acl/ability"
import NotPermission from "@components/not-permission"
import { useAbility } from "@casl/react"
import { AbilityContext } from "@utils/context/Can"
import { IFDataProductInventory } from '@src/domain/models/IProductInventory'
import { useForm } from 'react-hook-form'

const ProductPage = () => {
  const { t } = useTranslation()
  const ability = useAbility(AbilityContext)

  const { getListStoreApi } = useStore()
  const { getListCurrencyApi } = useCurrency()
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const [openModal, setOpenModal] = useState(false)
  const [openSidebar, setOpenSidebar] = useState<any>({ warehouse: false, tierPrice: false, serviceAdd: false, package: false, specAttr: false, prodAttr: false, prodAttrOpt: false, prodRelated: false, attrComb: false, variant: false })
  const [dataSidebar, setDataSidebar]: any = useState({ warehouse: {}, tierPrice: {}, serviceAdd: {}, package: {}, specAttr: {}, prodAttr: {}, prodAttrOpt: {}, prodRelated: {}, attrComb: {}, variant: {} })
  const [openAside, setOpenAside] = useState(false)
  const [typeModal, setTypeModal] = useState<ITypeModal>('')
  const [typeSidebar, setTypeSidebar] = useState('')
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [itemId, setItemId]: any = useState("")
  const [dataItem, setDataItem]: any = useState({})
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  const [optionGrCategory, setOptionGrCategory] = useState([])
  const [openModalDuplicate, setOpenModalDuplicate] = useState(false)
  const [openModalVariant, setOpenModalVariant] = useState(false)
  const [optionStore, setOptionStore] = useState([])
  const [optionCurrency, setOptionCurrency] = useState([])
  const [selectedImageVariant, setSelectedImageVariant] = useState([])
  const [dataTable, setDataTable] = useState<any>({ prodAtt: [] })
  const [typeSubModal, setTypeSubModal] = useState('')
  const [productId, setProductId] = useState('')
  const [initSideBar, setInitSideBar] = useState(false)
  const [dataRelated, setDataRelated] = useState([])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }

  }, [])

  const handleAside = () => {
    setOpenAside(!openAside)
  }

  const handleModal = () => {
    setOpenModal(!openModal)
  }

  const handleSidebar = (name: string) => {
    setOpenSidebar((old: any) => ({ ...old, [name]: !openSidebar[name] }))
  }
  const handleModalDetail = () => {
    setOpenModalDetail(!openModalDetail)
  }
  const handleModalDuplicate = () => {
    setOpenModalDuplicate(!openModalDuplicate)
  }
  const handleModalVariant = () => {
    setOpenModalVariant(!openModalVariant)
  }
  useEffect(() => {
    if (openModal === true) {
      if (optionStore?.length === 0) {
        getListStoreApi({}).unwrap()
          .then((rs) => {
            setTimeout(() => {
              setOptionStore(rs)
            }, 10)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
      if (optionCurrency?.length === 0) {
        getListCurrencyApi({ $status: 1, $keyword: '' }).unwrap()
          .then((rs) => {
            setTimeout(() => {
              const nrs = rs.map((a: any) => ({ value: a.key, label: a.key, key: a.value }))
              setOptionCurrency(nrs)
            }, 100)
          })
      }
    }
  }, [openModal])
  const {
  } = useForm<IFDataProductInventory>({
    mode: 'onChange'
  })
  return (
    <Fragment>
      <Helmet>
        <title>{t("Product")}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject.Product) ? (
        <ProductContext.Provider value={{
          windowSize,
          openAside,
          setOpenAside,
          openModal,
          handleAside,
          handleModal,
          typeModal,
          setTypeModal,
          itemId,
          setItemId,
          tabIndex,
          setTabIndex,
          dataItem,
          setDataItem,
          typeSidebar,
          setTypeSidebar,
          dataSidebar,
          setDataSidebar,
          handleSidebar,
          openModalDetail,
          setOpenSidebar,
          setOpenModalDetail,
          handleModalDetail,
          optionGrCategory,
          setOptionGrCategory,
          handleModalDuplicate,
          openModalDuplicate,
          setOpenModalDuplicate,
          optionStore,
          optionCurrency,
          handleModalVariant,
          openModalVariant,
          openSidebar,
          setSelectedImageVariant,
          selectedImageVariant,
          dataTable,
          setDataTable,
          typeSubModal,
          setTypeSubModal,
          productId,
          setProductId,
          initSideBar,
          setInitSideBar,
          dataRelated,
          setDataRelated
        }}>
          <div className='todo-application'>
            <Table></Table>
            <ModalComponent />
            <SidebarTierPrice widthSide={'400px'} openModal={openSidebar} handleModal={handleSidebar} dataModal={dataSidebar} ></SidebarTierPrice>
            <SidebarServiceAdd widthSide={'500px'} openModal={openSidebar} handleModal={handleSidebar} dataModal={dataSidebar} ></SidebarServiceAdd>
            <SidebarPackage widthSide={'400px'} openModal={openSidebar} handleModal={handleSidebar} dataModal={dataSidebar} ></SidebarPackage>
            <SidebarSpecAttr widthSide={'400px'} openModal={openSidebar} handleModal={handleSidebar} dataModal={dataSidebar} ></SidebarSpecAttr>
            <SidebarProdAttr widthSide={'400px'} openModal={openSidebar} handleModal={handleSidebar} dataModal={dataSidebar} ></SidebarProdAttr>
            <SidebarProductRelated widthSide={'500px'} openModal={openSidebar} handleModal={handleSidebar} dataModal={dataSidebar} ></SidebarProductRelated>
            <SidebarProdAttrOption widthSide={'500px'} openModal={openSidebar} handleModal={handleSidebar} dataModal={dataSidebar} ></SidebarProdAttrOption>
            <SidebarProdAttrCombination widthSide={'1000px'} openModal={openSidebar} handleModal={handleSidebar} dataModal={dataSidebar} ></SidebarProdAttrCombination>
            <ModalDetail />
            <ModalDuplicate />
            <ModalVariant />
            <TableVariant />
          </div>
        </ProductContext.Provider>
      ) : (
        <NotPermission />
      )}

    </Fragment>
  )
}

export default ProductPage