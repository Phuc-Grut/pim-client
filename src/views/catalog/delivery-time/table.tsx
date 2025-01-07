import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import GridTableTemplate from "@components/grid-table-template"
import { Fragment, useContext, useEffect, useState } from "react"
import * as Icon from "becoxy-icons"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import {
  Button,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  Input,
  Row,
  UncontrolledButtonDropdown
} from "reactstrap"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
// import classnames from 'classnames'
// ** Table Columns
import { headerColumns, sortColumns } from "./columns"
import { useDeliveryTime } from "./hooks"
import { DeliveryTimeContext } from "./useContext"
import ModalSortComponent from "@components/sort-component"
import {canContextMenuItems} from "@src/views/catalog/delivery-time/contextMenu"
import {CanPer} from "@utils/context/Can"
import {userAction, userSubject} from "../../../configs/acl/ability"
import { expressionAnd, expressionOr } from "@src/utility/Common"
import { notificationError } from "@components/notifications"
import Select from "react-select"

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
        <BreadCrumbsNotLink breadCrumbActive={t("Delivery time")} breadCrumbParent={{ title: t('Catalog'), link: '/catalog' }}/>
      </div>
      <div className="bar__action-right d-flex">
        <CanPer I={userAction.ADD} a={userSubject.DeliverTime}>
          <Button color="primary" onClick={handleAdd} className="me-1 d-flex">
            <Icon.Plus fontSize={14} className="me-50" />
            {t("Add")}
          </Button>
        </CanPer>
       
        <UncontrolledButtonDropdown>
          {/* <DropdownToggle outline color='primary' className='dropdown-no-icon d-flex' caret>
            <Icon.MoreVertical fontSize={13} />
            Thao tác
          </DropdownToggle> */}
          <DropdownMenu>
            <CanPer I={userAction.ADD} a={userSubject.DeliverTime}>
              <DropdownItem onClick={handleExport} tag="a">
                Export
              </DropdownItem>
            </CanPer>
            
            {/* <DropdownItem href='/' tag='a'>Option 2</DropdownItem>
            <DropdownItem href='/' tag='a'>Option 3</DropdownItem>
            <DropdownItem divider></DropdownItem>
            <DropdownItem href='/' tag='a'>Separated Link</DropdownItem> */}
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
    </div>
  )
}

const FilterHeader = ({ handleTextChange }: any) => {
  const { t } = useTranslation()
  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <Row className="m-0 gx-1 d-flex flex-wrap justify-content-start align-items-center w-100">
        <Col xs={12} sm={6} md={3} lg={2} className="pt-25 pb-25">
          <Input
            type="text"
            id="search-permission"
            className="w-100"
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder={t("Search...")}
          />
        </Col>
      </Row>
    </div>
  )
}

const Table = () => {
  const { t } = useTranslation()
  const { handleModal, setDataItem, setTypeModal, handleModalDetail, windowSize } =
    useContext(DeliveryTimeContext)
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
  const [queryOrder, setQueryOrder] = useState("")
  const [status, setStatus] = useState<any>({ value: 1, label: t("Active") })

  const listKey = ["isDefault", "status"]
  const listDate: any = ['']

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

  // ** Effect
  const {
    getDeliveryTimePagingApi,
    deleteDeliveryTimeApi,
    getListDeliveryTimeApi,
    sortDeliveryTimeApi,
    checkInit
  } = useDeliveryTime()

  useEffect(() => {
    dataToRender()
  }, [currentPage, pageSize, searchTerm, checkInit, queryFilter, status])
  

  const handleContextMenuClick = (args: any) => {
    if (args.rowInfo?.rowData) {

      if (args.item.id === "EDIT") {
        setDataItem(args.rowInfo.rowData)
        if (setTypeModal) {
          setTypeModal("Edit")
        }
        handleModal()
      } else if (args.item.id === "OPEN") {
        console.log("a")

        setDataItem(args.rowInfo.rowData)
        handleModalDetail()
      } else if (args.item.id === "ORDER") {
        onGetListDeliveryTime()
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
    getDeliveryTimePagingApi({
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
  const handleDelete = (id: string) => {
    deleteDeliveryTimeApi(id)
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
    setOpenModalSort(!openModalSort)
  }
  const onGetListDeliveryTime = () => {
    getListDeliveryTimeApi()
      .unwrap()
      .then((rs) => {
        setDataSort(rs)
        handleModalSort()
      })
      .catch((ex) => console.log(ex))
  }

  const optionDefault: any = [
    {
      value: true,
      label: `${t("Yes")}`
    },
    {
      value: false,
      label: `${t("No")}`
    }
  ]

  const dataSourceFilter = [
    {
      key: listKey[0],
      data: optionDefault
    },
    {
      key: listKey[1],
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
          resource="tableDeliveryTimes"
          idTable="DeliveryTimes"
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
      </div>
      <ModalSortComponent
        openModal={openModalSort}
        handleModal={handleModalSort}
        data={dataSort}
        setData={setDataSort}
        columns={sortColumns}
        sortApi={sortDeliveryTimeApi}
      />
    </Fragment>
  )
}

export default Table
