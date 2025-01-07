import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import GridTableTemplate from "@components/grid-table-template"
import { Fragment, useContext, useEffect, useState } from "react"
import * as Icon from "becoxy-icons"
import { useTranslation } from "react-i18next"
import {
  Button,
  Card,
  CardBody,
  DropdownItem,
  DropdownMenu,
  UncontrolledButtonDropdown
} from "reactstrap"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
// import classnames from 'classnames'
// ** Table Columns
import { ProductTopicContext } from "./useContext"
import {CanPer} from "@utils/context/Can"
import {userAction, userSubject} from "../../../configs/acl/ability"
import {notificationError, notificationSuccess } from "@components/notifications"
import {expressionAnd, expressionOr } from "@src/utility/Common"
import Select from "react-select"
import { useProductTopic } from "./hook"
import { canContextMenuItems } from "./contextMenu"
import SplitPane, { Pane } from 'split-pane-react'
import { useProductTopicQuery } from "./product-topic-query/hook"
import { headerColumnsTopicQuery } from "./column/column-topic-query"
import { headerColumns, sortColumns } from "./column/column-topic"
import 'split-pane-react/esm/themes/default.css'
import ModalSortComponent from "@components/sort-component"

const MySwal = withReactContent(Swal)

const ButtonHeader = ({
  setTypeModal,
  setDataItem,
  handleModal,
  handleExport
}: any) => {
  const { t } = useTranslation()
  const handleAdd = () => {
    setTypeModal("Add")
    setDataItem(Math.random())
    handleModal()
  }
  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <div className="bar__action-left">
        <BreadCrumbsNotLink breadCrumbActive={t("Product topic")} breadCrumbParent={{ title: t('Catalog'), link: '/catalog' }}/>
      </div>
      <div className="bar__action-right d-flex">
        <CanPer I={userAction.ADD} a={userSubject.GroupUnitCatalog}>
          <Button color="primary" onClick={handleAdd} className="me-1 d-flex">
            <Icon.Plus fontSize={14} className="me-50" />
            {t("Add")}
          </Button>
        </CanPer>
        
        <UncontrolledButtonDropdown>
          <DropdownMenu>
            <CanPer I={userAction.ADD} a={userSubject.GroupUnitCatalog}>
              <DropdownItem onClick={handleExport} tag="a">
                Export
              </DropdownItem>
            </CanPer>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
    </div>
  )
}
const Table = () => {
  const { t } = useTranslation()
  const { 
    handleModal, 
    setDataItem, 
    setTypeModal, 
    handleModalDetail, 
    windowSize,
    optionProductTopicPage,
    setTypeModalQuery,
    handleModalQuery,
    setDataItemQuery,
    productTopicPage,
    setProductTopicPage
  } = useContext(ProductTopicContext)
  // ** States
  const [searchTerm, setSearchTerm]  = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [exports, setExport] = useState<boolean>()
  const [dataTopicQuery, setDataTopicQuery] = useState([])
  
  const [openModalSort, setOpenModalSort] = useState(false)
  const [dataSort, setDataSort] = useState([])
  const [queryFilter, setQueryFilter] = useState([])
  const listKey = ["status"]
  const listDate: any = ['']
  const [queryOrder, setQueryOrder] = useState("")
  const [status, setStatus] = useState<any>({ value: 1, label: t("Active") })
  const [sizes, setSizes] = useState<any[]>([windowSize.innerHeight - 310, 0])
  const [dataSelected, setDataSelected] = useState<any>([])
  const [openDetail, setOpenDetail] = useState<boolean>(false)

  // ** Effect
  const {
    checkInit,
    getProductTopicPagingApi,
    deleteProductTopicApi,
    sortProductTopicApi,
    getListProductTopicApi
  } = useProductTopic()

  const { 
    checkInitQuery,
    getProductTopicQueryPagingApi, 
    deleteProductTopicQueryApi 
  } = useProductTopicQuery()

  useEffect(() => {
    dataToRender()
  }, [currentPage, pageSize, searchTerm, status, checkInit, queryFilter, productTopicPage])

  const handleModalSort = () => {
    setOpenModalSort(!openModalSort)
  }

  useEffect(() => {
    if (dataSelected.length > 0) {
      setOpenDetail(true)
      if (!openDetail) {
        setSizes([windowSize.innerHeight - 515, 350])
      }
      getProductTopicQueryPagingApi({
        Filter: `productTopicId==${dataSelected[0].id}`,
        PageNumber: 1,
        PageSize: 100
      })
        .unwrap()
        .then((rs) => {
          setTimeout(() => {
            setDataTopicQuery(rs.items)
          }, 100)
          // setTotalItem(rs.totalCount)
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
  }, [dataSelected, checkInitQuery])
  // const handleModalSort = () => {
  //   setOpenModalSort(!openModalSort)
  // }
  
  const handleContextMenuClick = (args: any, table: "topic" | "topicQuery") => {
    if (args.rowInfo?.rowData) {

      if (args.item.id === "EDIT") {
        table === "topic" ? setDataItem(args.rowInfo.rowData) : setDataItemQuery(args.rowInfo.rowData)
        table === "topic" ? setTypeModal("Edit") : setTypeModalQuery("Edit")
        table === "topic" ? handleModal() : handleModalQuery()
      } else if (args.item.id === "OPEN") {
        table === "topic" ? setDataItem(args.rowInfo.rowData) : setDataItemQuery(args.rowInfo.rowData)
        handleModalDetail()
      } else if (args.item.id === "ORDER") {
        onGetListGroupUnit()
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
            handleDelete(args.rowInfo.rowData.id, table)
          } else if (result.dismiss === MySwal.DismissReason.cancel) {
          }
        })
      }
    }
  }

  const handleDoubleClick = (args: any) => {
    if (args.rowData) {
      setDataItem(args.rowData)
      handleModalDetail()
    }
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
    getProductTopicPagingApi({
      Filter: `${rs}${(rs.length > 0 && status) ? "$" : ""}${$status()}`,
      Order: queryOrder,
      PageNumber: currentPage,
      PageSize: pageSize,
      Keyword: searchTerm,
      ProductTopicPageId: productTopicPage?.value
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
  const handleDelete = (id: string, table: "topic" | "topicQuery") => {
    const apiDelete: any = {
      topic: deleteProductTopicApi,
      topicQuery: deleteProductTopicQueryApi
    }

    apiDelete[table](id).unwrap().then((rs: any) => {
      if (rs.isValid) {
        notificationSuccess(`${t("Delete Item successful")}!`)
      } else {
        notificationError(`${t(rs.errorMessage)}`)
      }
    }).catch(() => { notificationError(`${t("Delete Item error")}!`) })
  }

  const handleExport = () => {
    setExport(!exports)
  }

  const onGetListGroupUnit = () => {
    getListProductTopicApi({$status: 1, $productTopicPageId: productTopicPage?.value})
      .unwrap()
      .then((rs) => {
        setDataSort(rs)
        handleModalSort()
      })
      .catch((ex) => console.log(ex))
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

  const handleProductTopicPage = (val: any) => {
    setProductTopicPage(val)
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

  const filterProductTopicPagePlate = () => {
    return (
      <div style={{ width: '230px' }}>
        <Select
          options={optionProductTopicPage}
          onChange={handleProductTopicPage}
          value={productTopicPage}
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
    },
    {
      template: filterProductTopicPagePlate,
      align: "left"
    }
  ]
  const toolbarOptions: any = [...toolbarTemplate]
  
  const handleCloseDetail = () => {
    setOpenDetail(false)
    setSizes([windowSize.innerHeight - 310, 0])
  }

  const rowSelected = (value: any) => {
    setDataItem(value.rowData)
    setDataSelected([value.rowData])
  }
      
  const handleAddQuery = () => {
    setTypeModalQuery("Add")
    handleModalQuery()
  }

  //view
  return (
    <Fragment>
      <div className="table-toolbar">
        <Card className="table-bar bar__action">
          <CardBody>
            <ButtonHeader
              setTypeModal={setTypeModal}
              setDataItem={setDataItem}
              handleExport={handleExport}
              handleModal={handleModal}
            />
          </CardBody>
        </Card>
        <div className="table-edit" style={{ height: `${windowSize.innerHeight - 180}px` }}>
          <SplitPane
            className={sizes[1] === 0 ? 'hidden-split' : ''}
            split='horizontal'
            sizes={sizes}
            onChange={setSizes}
            allowResize={sizes[1] > 0}
            sashRender={() => (<></>)}
          >
            <Pane minSize={250} maxSize='100%' style={{ marginBottom: 10 }}>
              <GridTableTemplate
                resource="tableProductTopic"
                idTable="ProductTopic"
                height={openDetail ? windowSize.innerHeight - 314 - sizes[1] : windowSize.innerHeight - 314}
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
                handleContextMenuClick={(e: any) => handleContextMenuClick(e, "topic")}
                allowPaging={true}
                allowExcelExport={false}
                recordDoubleClick={true}
                queryFilter={queryFilter}
                dataSourceFilter={dataSourceFilter}
                setQueryFilter={setQueryFilter}
                handleDoubleClick={handleDoubleClick}
                setQueryOrder={setQueryOrder}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                toolbarTemplate={toolbarOptions}
                rowSelected={rowSelected}
              />
            </Pane>

            <Pane minSize={1} maxSize='90%'>
              <div className='bg-white p-50' style={{ border: '1px solid #e0e0e0' }}>
                <div style={{ marginTop: "5px", marginBottom: "5px" }} className="d-flex justify-content-between align-items-center">
                  <h4 className="m-0">{dataSelected[0]?.code}</h4>
                  <div className="d-flex">
                    <Button color="primary" onClick={handleAddQuery} className="me-1 d-flex">
                      <Icon.Plus fontSize={14} className="me-50" />
                      {t("Add")}
                    </Button>
                    <span><Icon.X style={{ marginRight: 5 }} fontSize={24} onClick={handleCloseDetail} className='cursor-pointer' /></span>
                  </div>
                </div>
              </div>
              <GridTableTemplate 
                resource="RecuitmentPlanDetail"
                idTable="recuitment-plan-detail"
                height={sizes[1] - 102}
                allowResizing
                dataTable={dataTopicQuery}
                showContextMenu={true}
                columns={headerColumnsTopicQuery} 
                contextMenuItems={canContextMenuItems.filter(x => x.id === "EDIT" || x.id === "DELETE")}
                handleContextMenuClick={(e: any) => handleContextMenuClick(e, "topicQuery")}
              />
            </Pane>
          </SplitPane>
        </div>
      </div>
      <ModalSortComponent
        openModal={openModalSort}
        handleModal={handleModalSort}
        data={dataSort}
        setData={setDataSort}
        columns={sortColumns}
        sortApi={sortProductTopicApi}
      />
    </Fragment>
  )
}

export default Table
