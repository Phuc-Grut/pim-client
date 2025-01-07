import GridTableTemplate from '@components/grid-table-template'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Input, Row } from 'reactstrap'
import BreadCrumbsNotLink from '@components/breadcrumbs-not-link'
import * as Icon from "becoxy-icons"
import { userAction, userSubject } from '@src/configs/acl/ability'
import { CanPer } from '@src/utility/context/Can'
import { useTranslation } from 'react-i18next'
import Select from "react-select"
import { ProductTopicPageContext } from './useContext'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { headerColumns, sortColumns } from './column'
import { canContextMenuItems } from './contextMenu'
import { useProductTopicPage } from './hook'
import { notificationError, notificationSuccess } from '@components/notifications'
import { expressionAnd } from '@src/utility/Common'
import { expressionOr } from '@src/utility/context/map-object'
import ModalSortComponent from '@components/sort-component'
const MySwal = withReactContent(Swal)

const ButtonHeader = ({
  setTypeModal,
  setDataItem,
  handleModal
}: any) => {
  const { t } = useTranslation()
  const handleAdd = () => {
    setTypeModal('Add')
    setDataItem(Math.random())
    handleModal()
  }
  return (
    <div className='d-flex justify-content-between align-items-center w-100'>
      <div className='bar__action-left'>
        <BreadCrumbsNotLink breadCrumbActive={t('Product topic page')} />
      </div>
      <div className='bar__action-right d-flex'>
        <CanPer I={userAction.ADD} a={userSubject.ProductTopicPage}>
          <Button color='primary' onClick={handleAdd} className='me-1 d-flex'>
            <Icon.Plus fontSize={14} className='me-50' />
            {t('Add')}
          </Button>
        </CanPer>
  
      </div>
    </div>
  )
}
  
const FilterHeader = ({
  handleStatusAssignedToChange,
  handleTextChange
}: any) => {
  const { t } = useTranslation()
  const optionStatus = [
    {
      value: null,
      label: t("Select status")
    },
    {
      value: 1,
      label: t("Active")
    },
    {
      value: 0,
      label: t("Inactive")
    }
  ]
  return (
    <div className='d-flex justify-content-between align-items-center w-100'>
      <Row className='m-0 gx-1 d-flex flex-wrap justify-content-end align-items-center w-100'>
        <Col xs={12} sm={6} md={3} lg={2} className='pt-25 pb-25'>
          <Select options={optionStatus} onChange={handleStatusAssignedToChange} placeholder={t("Select status")} className='react-select' classNamePrefix='select' ></Select>
        </Col>
        <Col xs={12} sm={6} md={3} lg={2} className='pt-25 pb-25'>
          <Input
            type='text'
            id='search-permission'
            className='w-100'
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder={t('Search...')}
          />
        </Col>
      </Row>
    </div>
  )
}
  
const Table = () => {
  const { t } = useTranslation()
  
  const { 
    handleModal, 
    setDataItem, 
    setTypeModal, 
    windowSize 
  } = useContext(ProductTopicPageContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [data, setData] = useState<any>([{}])
  const [totalItem, setTotalItem] = useState(0)
  const [queryOrder, setQueryOrder] = useState('')
  const [queryFilter, setQueryFilter] = useState([])
  const [status, setStatus] = useState<any>({ value: 1, label: t("Active") })
  const [openModalSort, setOpenModalSort] = useState(false)
  const [dataSort, setDataSort] = useState([])
  const listKey = ["status"]
  const listDate: any = ['']

  const {
    checkInit,
    getProductTopicPagePagingApi,
    deleteProductTopicPageApi,
    sortProductTopicPageApi,
    getListProductTopicPageApi
  } = useProductTopicPage()

  useEffect(() => {
    dataToRender()
  }, [currentPage, pageSize, searchTerm, status, checkInit, queryFilter])
  
  const handleModalSort = () => {
    setOpenModalSort(!openModalSort)
  }

  //call api
  //getDataTable
  const dataToRender = () => {
    const dictionaryOr: any = {}
    const dictionaryAnd: any = {
    }
    queryFilter.filter((x: any) => listKey.includes(x.key)).forEach((item: any) => {
      if (dictionaryOr[item.key]) {
        dictionaryOr[item.key].push({ ...item })
      } else {
        dictionaryOr[item.key] = [{ ...item }]
      }
    })
    queryFilter.filter((x: any) => !listKey.includes(x.key)).forEach((item: any) => {
      if (dictionaryAnd[item.key]) {
        dictionaryAnd[item.key].push({ ...item })
      } else {
        dictionaryAnd[item.key] = [{ ...item }]
      }
    })
    const rs = `${expressionAnd(dictionaryAnd, dictionaryOr, listDate)}${expressionOr(dictionaryOr)}`

    const $status = () => {
      return status ? `status==${status?.value}` : ""
    }
    getProductTopicPagePagingApi({
      Filter: `${rs}${(rs.length > 0 && status) ? "$" : ""}${$status()}`,
      Order: queryOrder,
      PageNumber: currentPage,
      PageSize: pageSize,
      Keyword: searchTerm
    })
      .unwrap()
      .then((rs) => {
        setTimeout(() => {
          setData(rs.items)
        }, 100)
        setTotalItem(rs.totalCount)
      })
      .catch((ex) => {
        console.log(ex)
      })
  }

  const handleContextMenuClick = (args: any) => {
    if (args.rowInfo?.rowData) {

      if (args.item.id === "EDIT") {
        setDataItem(args.rowInfo.rowData)
        if (setTypeModal) {
          setTypeModal("Edit")
        }
        handleModal()
      } else if (args.item.id === "OPEN") {
        setDataItem(args.rowInfo.rowData)
        // handleModalDetail()
      } else if (args.item.id === "ORDER") {
        onGetListProductTopicPage()
      } else if (args.item.id === "DELETE") {
        MySwal.fire({
          title: t("Confirm"),
          text: t("Do you want to delete item?"),
          icon: "warning",
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: t("Delete"),
          cancelButtonText: t("Cancel"),
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-danger ms-1"
          },
          buttonsStyling: false
        }).then(async (result) => {
          if (result.value) {
            handleDelete(args.rowInfo.rowData.id)
          } else if (result.dismiss === MySwal.DismissReason.cancel) {
          }
        })
      }
    }
  }

  const onGetListProductTopicPage = () => {
    getListProductTopicPageApi({$status: 1})
      .unwrap()
      .then((rs) => {
        setDataSort(rs)
        handleModalSort()
      })
      .catch((ex) => console.log(ex))
  }

  const handleDelete = (id: string) => {
    deleteProductTopicPageApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          notificationSuccess(`${t('Delete')} ${t('success')} `)
        }
      })
      .catch(() => notificationError(`${t('Delete')} ${t('fail')} `))
  }

  const optionStatus: any = [
    {
      value: 1,
      label: `${t("Active")}`
    },
    {
      value: 0,
      label: `${t("Inactive")}`
    }
  ]

  const dataSourceFilter = [
    {
      key: listKey[0],
      data: optionStatus
    }
  ]

  const handleStatus = (val: any) => {
    setStatus(val)
  }

  const filterStatusTemPlate = () => {
    return (
      <div style={{ width: '230px' }}>
        <Select
          options={optionStatus}
          onChange={handleStatus}
          value={status}
          isClearable={true}
          placeholder={t("Select")}
          className='react-select w-100'
          classNamePrefix='select' ></Select>
      </div >
    )
  }
  const toolbarTemplate = [
    {
      template: filterStatusTemPlate,
      align: "left"
    }
  ]
  const toolbarOptions: any = [...toolbarTemplate]

  return (
    <Fragment>
      <div className='table-toolbar'>
        <Card className='table-bar bar__action'>
          <CardBody>
            <ButtonHeader
              setTypeModal={setTypeModal}
              setDataItem={setDataItem}
              handleExport={() => {}}
              handleModal={handleModal} />
          </CardBody>
        </Card>
        <GridTableTemplate
          resource="tableProductTopicPage"
          idTable="ProductTopicPage"
          height={windowSize.innerHeight - 310}
          dataTable={data}
          columns={headerColumns}
          showToolbar={true}
          allowFilter={true}
          allowSort={true}
          showPagination={true}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalItem={totalItem}
          showContextMenu={true}
          contextMenuItems={canContextMenuItems}
          handleContextMenuClick={handleContextMenuClick}
          allowPaging={true}
          allowExcelExport={false}
          // recordDoubleClick={true}
          queryFilter={queryFilter}
          dataSourceFilter={dataSourceFilter}
          setQueryFilter={setQueryFilter}
          // handleDoubleClick={handleDoubleClick}
          setQueryOrder={setQueryOrder}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          toolbarTemplate={toolbarOptions}
        />
      </div>
      <ModalSortComponent
        openModal={openModalSort}
        handleModal={handleModalSort}
        data={dataSort}
        setData={setDataSort}
        columns={sortColumns}
        sortApi={sortProductTopicPageApi}
      />
    </Fragment>
  )
}

export default Table