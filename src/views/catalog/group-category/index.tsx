import {Fragment, useEffect, useState} from 'react'
import {Helmet} from "react-helmet"
import { GroupCategoryContext } from './useContext'
import Table from './table'
import ModalComponent from './modal'
import {useTranslation} from "react-i18next"
import {ITypeModal} from "@src/domain/models"
import ModalOrderComponent from './modalOrder'

import {userAction, userSubject} from "@configs/acl/ability"
import NotPermission from "@components/not-permission"
import {useAbility} from "@casl/react"
import {AbilityContext} from "@utils/context/Can"
import ModalView, { IFieldView } from '@components/modal-view'
import { useProductTag } from '../product-tag/hooks'
import { Badge } from 'reactstrap'
import { statusObjColorDefault, statusObjDefault_Status } from '@src/domain/constants/constantSelect'
import AvatarViewComponent from '@components/avatar-commponent-view'

const title = 'InfomationChannel'

const BankPage = () => {
  const { t } = useTranslation()
  const { getListProductTagApi } = useProductTag()

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
  const [openModalOrder, setOpenModalOrder] = useState(false)
  const [optionGroupCategory, setOptionGroupCategory] = useState([])
  const [keywords, setKeywords] = useState<any[]>([])
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

  const handleModalOrder = () => {
    setOpenModalOrder(!openModalOrder)
  }

  const handleModalViewOpen = () => {
    getListProductTagApi({$status: 1, $type: 1})
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
      value: dataItem.code, label: "InfomationChannelCode", col: 6
    },
    {
      value: dataItem.name, label: "InfomationChannelName", col: 6
    },
    {
      value: dataItem.title, label: "Channel title", col: 6
    },
    {
      value: dataItem.email, label: "Email", col: 6
    },
    {
      value: dataItem.url, label: "Url", col: 6
    },
    {
      value: dataItem.phone, label: "Phone", col: 6
    },
    {
      value: handleName(dataItem.tags), label: "Tags"
    },
    {
      value: dataItem.address, label: "Address"
    },
    {
      value: dataItem.facebook, label: "Facebook", col: 6
    },
    {
      value: dataItem.zalo, label: "Zalo", col: 6
    },
    {
      value: dataItem.youtube, label: "Youtube", col: 6
    },
    {
      value: <Badge className='text-capitalize' color={statusObjColorDefault[dataItem.status]} pill>
        {t(statusObjDefault_Status[dataItem.status])}
      </Badge>,
      label: "Status",
      col: 6
    },
    // {
    //   value: dataItem.displayOrder, label: "Display order", col: 6
    // },
    {
      value: dataItem.description, label: "Description"
    }
  ]

  return (
    <Fragment>
      <Helmet>
        <title>{t('Catalog')} - {t(title)}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject.CategoryProduct) ? (
        <GroupCategoryContext.Provider value={{ openModal,
          handleModal,
          dataItem,
          setDataItem,
          typeModal,
          setTypeModal,
          windowSize,
          openModalOrder,
          handleModalOrder,
          optionGroupCategory,
          setOptionGroupCategory,
          handleModalDetail,
          setOpenModalDetail,
          openModalDetail
        }} >
          <div className='app-user-list'>
            <Table />
            <ModalComponent />
            <ModalOrderComponent />
            <ModalView
              dataItem={dataItem}
              renderFields={renderFields}
              openModalDetail={openModalDetail}
              windowSize={windowSize}
              titleHeader={title}
              setDataItem={setDataItem}
              handleModalDetail={handleModalDetail}
              handleModalOpen={handleModalViewOpen}
              labelSize='large'
              modalSize='lg-1'
            />
          </div>
        </GroupCategoryContext.Provider>
      ) : (
        <NotPermission />
      )}
      
    </Fragment>
  )
}
export default BankPage