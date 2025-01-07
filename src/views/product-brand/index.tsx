import { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { ProductBrandContext } from './useContext'
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
import AvatarViewComponent from '@components/avatar-commponent-view'
import { useProductTag } from '../catalog/product-tag/hooks'

const BankPage = () => {
  const { t } = useTranslation()
  const { getListProductTagApi } = useProductTag()

  const ability = useAbility(AbilityContext)

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }


  const [keywords, setKeywords] = useState<any[]>([])
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

  const handleModalViewOpen = () => {
    getListProductTagApi({$status: 1, $type: 0})
      .unwrap()
      .then((rs: any[]) => {

        if (dataItem?.tags) {
          const listTag: string[] = dataItem?.tags?.split(",")
          const result = rs.filter(x => listTag.includes(x.value))
          const newKeywords = listTag.map(tag => {
            const matchedResult = result.find(x => x.value === tag)
            return matchedResult ? matchedResult.label : tag
          })
          setKeywords(newKeywords)
        }
      })
  }

  const handleName = (data: any) => {
    if (!data) {
      return ""
    }
    return (
      <div>
        {keywords.map((x: any) => (
          <Badge key={x} ml-1 className="text-capitalize " color={"warning"}>
            {x}
          </Badge>
        ))}
      </div>
    )
  }

  const renderFields: IFieldView[] = [
    {
      value:
          <AvatarViewComponent
            height={125}
            width={125}
            label={t('')}
            isLabel={false}
            labelSize='label-medium'
            type={'Product'}
            image={dataItem.image}
          />,
      label: ""
    },
    {
      value: dataItem.code, label: "Product brand code"
    },
    {
      value: dataItem.name, label: "Product brand name"
    },
    {
      value: handleName(dataItem.tags), label: "Tags"
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
        <title>{t("Product brand")}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject.ProductBrand) ? (
        <ProductBrandContext.Provider value={{ openModal, handleModal, dataItem, setDataItem, typeModal, setTypeModal, windowSize, openModalDetail, handleModalDetail }} >
          <div className='app-user-list'>
            <Table />
            <ModalComponent />
            <ModalView
              dataItem={dataItem}
              handleModalDetail={handleModalDetail}
              openModalDetail={openModalDetail}
              setDataItem={setDataItem}
              titleHeader='Product brand'
              windowSize={windowSize}
              renderFields={renderFields}
              labelSize='large'
              handleModalOpen={handleModalViewOpen}
            />
          </div>
        </ProductBrandContext.Provider>
      ) : (
        <NotPermission />
      )}
      
    </Fragment>
  )
}
export default BankPage