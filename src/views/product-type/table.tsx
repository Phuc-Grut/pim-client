import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import GridTableTemplate from "@components/grid-table-template"
import { Fragment, useContext, useEffect, useState } from "react"
import * as Icon from "becoxy-icons"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import Select from "react-select"
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
import { headerColumns, canContextMenuItems, sortColumns } from "./columns"
import { useProductType } from "./hooks"
import { ProductTypeContext } from "./useContext"
import ModalSortComponent from "@components/sort-component"
import { notificationError } from "@components/notifications"
import { expressionAnd, expressionOr } from "@src/utility/Common"

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
        <BreadCrumbsNotLink breadCrumbActive={t("Product type")} breadCrumbParent={{ title: t('Catalog'), link: '/catalog' }} />
      </div>
      <div className="bar__action-right d-flex">
        <Button color="primary" onClick={handleAdd} className="me-1 d-flex">
          <Icon.Plus fontSize={14} className="me-50" />
          {t("Add")}
        </Button>
        <UncontrolledButtonDropdown>
          <DropdownMenu>
            <DropdownItem onClick={handleExport} tag="a">
              Export
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
    </div>
  )
}

const Table = () => {
  const { t } = useTranslation()
  const { handleModal, setDataItem, setTypeModal, handleModalDetail, windowSize } =
    useContext(ProductTypeContext)
  // ** States
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [exports, setExport] = useState<boolean>()
  const [openModalSort, setOpenModalSort] = useState(false)
  const [dataSort, setDataSort] = useState([])
  const [queryFilter, setQueryFilter] = useState([])
  const [queryOrder, setQueryOrder] = useState('')
  const listDate: any[] = []
  const listKey = ['status']
  const [status, setStatus] = useState<any>({ value: 1, label: t("Active") })

  const {
    getProductTypePagingApi,
    deleteProductTypeApi,
    getListProductTypeApi,
    sortProductTypeApi,
    checkInit
  } = useProductType()

  useEffect(() => {
    dataToRender()
  }, [currentPage, pageSize, searchTerm, status, checkInit, queryFilter])
  

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
        handleModalDetail()
      } else if (args.item.id === "ORDER") {
        handleModalSort()
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

  const handleDoubleClick = (args: any) => {
    if (args.rowData) {
      setDataItem(args.rowData)
      handleModalDetail()
    }
  }

  //call api
  //getDataTable
  const dataToRender = () => {
    const dictionaryOr : any = {}
    const dictionaryAnd : any = {}
    queryFilter.filter((x: any) => listKey.includes(x.key)).forEach((item :any) => {
      if (dictionaryOr[item.key]) {
        dictionaryOr[item.key].push({ ...item })
      } else {
        dictionaryOr[item.key] = [{ ...item }]
      }
    })
    queryFilter.filter((x: any) => !listKey.includes(x.key)).forEach((item :any) => {
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
    
    getProductTypePagingApi({
      Filter: `${rs}${rs.length > 0 && status ? "$" : ""}${$status()}`,
      PageNumber: currentPage,
      PageSize: pageSize,
      Order: queryOrder ? queryOrder : '',
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

  const handleDelete = (id: string) => {
    deleteProductTypeApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          toast.success(
            <Fragment>
              <div className="toastify-header">
                <div className="title-wrapper">
                  <h6 className="toast-title">
                    {t("Delete Item successful!")}
                  </h6>
                </div>
              </div>
              <div className="toastify-body">
                <ul className="list-unstyled mb-0">
                  <li></li>
                </ul>
              </div>
            </Fragment>
          )
        } else {
          notificationError(`${t(`${rs.errors[0].errorMessage}`)}!`)
        }
      })
  }

  const handleExport = () => {
    setExport(!exports)
  }

  const handleModalSort = () => {
    getListProductTypeApi({})
      .unwrap()
      .then((rs) => {
        setDataSort(rs)
        setOpenModalSort(!openModalSort)
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
        <GridTableTemplate
          resource='tableProductTypes'
          idTable='ProductTypes'
          height={windowSize.innerHeight - 310}
          dataTable={data}
          columns={headerColumns}
          allowFilter={true}
          showToolbar={true}
          allowSort={true}
          allowPaging={true}
          showPagination={true}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalItem={totalItem}
          showContextMenu={true}
          contextMenuItems={canContextMenuItems}
          handleContextMenuClick={handleContextMenuClick}
          allowExcelExport={false}
          recordDoubleClick={true}
          dataSourceFilter={dataSourceFilter}
          queryFilter={queryFilter}
          setQueryOrder={setQueryOrder}
          setQueryFilter={setQueryFilter}
          handleDoubleClick={handleDoubleClick}
          // groupBy={groupBy}         
          toolbarTemplate={toolbarOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <ModalSortComponent
          openModal={openModalSort}
          handleModal={handleModalSort}
          data={dataSort}
          setData={setDataSort}
          columns={sortColumns}
          sortApi={sortProductTypeApi}
        />
      </div>
    </Fragment>
  )
}

export default Table
