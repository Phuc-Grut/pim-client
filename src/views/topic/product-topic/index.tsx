import { ITypeModal } from '@src/domain/models'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { ProductTopicContext } from './useContext'
import Table from './table'
import ModalProductTopic from './modal/modal-topic'
import api from '@src/infra/api'
import ModalProductTopicQuery from './modal/modal-topic-query'

const ProductTopic = () => {
  const {t} = useTranslation()
  
  const getWindowSize = () => {
    const {innerWidth, innerHeight} = window
    return {innerWidth, innerHeight}
  }

  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [openModal, setOpenModal] = useState(false)
  const [dataItem, setDataItem] = useState<any>({})
  const [typeModal, setTypeModal] = useState<ITypeModal>('')
  const [optionProductTopicPage, setOptionProductTopicPage] = useState<any[]>([])
  const [openModalQuery, setOpenModalQuery] = useState(false)
  const [typeModalQuery, setTypeModalQuery] = useState<ITypeModal>('')
  const [dataItemQuery, setDataItemQuery] = useState<any>({})
  const [productTopicPage, setProductTopicPage] = useState<any>()

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

  const handleModalQuery = () => {
    setOpenModalQuery(!openModalQuery)
  }
  useEffect(() => {
    api.productTopicPageApi.getListboxApi({$status: 1})
      .then(rs => {
        setOptionProductTopicPage(rs)
      })
      .catch((ex) => {
        console.log(ex)
      })
  }, [])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>{t("Product topic")}</title>
      </Helmet>
      <ProductTopicContext.Provider value={{ 
        openModal, 
        handleModal, 
        dataItem,
        setDataItem,
        typeModal,
        setTypeModal,
        windowSize,
        optionProductTopicPage,
        setOptionProductTopicPage,
        handleModalQuery,
        setOpenModalQuery,
        openModalQuery,
        typeModalQuery,
        setTypeModalQuery,
        dataItemQuery,
        setDataItemQuery,
        productTopicPage,
        setProductTopicPage
      }} >
        <div className='app-user-list'>
          <Table />
          <ModalProductTopic />
          <ModalProductTopicQuery />
        </div>
      </ProductTopicContext.Provider>
    </>
  )
}

export default ProductTopic
