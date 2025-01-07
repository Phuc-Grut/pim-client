import GridTableTemplate from "@components/grid-table-template"
import { Fragment, useContext, useEffect, useState } from "react"
import * as Icon from "becoxy-icons"
import { useTranslation } from "react-i18next"
import Select from "react-select"
import {
  Button,
  Card,
  CardBody,
  DropdownItem,
  DropdownMenu,
  Spinner,
  UncontrolledButtonDropdown
} from "reactstrap"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useLocation } from "react-router-dom"
import { headerColumns, canContextMenuItems, sortColumns } from "./columns"
import { useProductCategory } from "./hook"
import { ProductCategoryContext } from "./useContext"
import {
  notificationError,
  notificationSuccess
} from "@components/notifications"
import ModalSortComponent from "@components/sort-component"
import {CanPer} from "@utils/context/Can"
import {userAction, userSubject} from "@configs/acl/ability"
import initAbility from "@configs/acl/initialAbility"
import {IRowSelected} from "@src/domain/models/ITableGrid"
import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import { expressionAnd, expressionOr } from "@src/utility/Common"
const MySwal = withReactContent(Swal)

const ButtonHeader = ({
  handleExport,
  handleAdd
}: any) => {
  const { t } = useTranslation()
  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <div className="bar__action-left">
        <BreadCrumbsNotLink breadCrumbActive={t("CategoryProduct")} breadCrumbParent={{ title: t('Catalog'), link: '/catalog' }}/>
      </div>
      <div className="bar__action-right d-flex">
        <CanPer I={userAction.ADD} a={userSubject.InfomationChannel}>
          <Button color="primary" onClick={handleAdd} className="me-1 d-flex">
            <Icon.Plus fontSize={14} className="me-50" />
            {t("Add")}
          </Button>
        </CanPer>
        <UncontrolledButtonDropdown>
          <DropdownMenu>
            <CanPer I={userAction.ADD} a={userSubject.InfomationChannel}>
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
  const location = useLocation()
  const {
    handleModal,
    setDataItem,
    setTypeModal,
    setParentCategory,
    handleModalDetail,
    setBreadCrumb,
    windowSize
  } = useContext(ProductCategoryContext)
  // ** States
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [data, setData] = useState([])
  const [statusAssignedTo, setStatusAssignedTo] = useState<number>(1)
  const [exports, setExport] = useState<boolean>()
  const [totalItem, setTotalItem] = useState(0)
  const [listContextShow, setListContextShow] = useState<any>(undefined)
  const [listContextHide, setListContextHide] = useState<any>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [openModalSort, setOpenModalSort] = useState(false)
  const [dataSort, setDataSort] = useState([])
  const [queryFilter, setQueryFilter] = useState([])
  const [queryOrder, setQueryOrder] = useState('')
  const listDate: any[] = []
  const listKey = ['status']
  
  
  const listContext = (actions: string[]) => {
    const result = actions.map(x => {
      const mappedAction = {
        CANCEL: "EDIT",
        APPROVAL: "APPROVE"
      }[x] || x

      return initAbility.can(userAction[mappedAction as keyof typeof userAction], userSubject.InfomationChannel) && x
    })

    return result.filter(Boolean)
  }

  const rowSelected = (args: IRowSelected) => {
    if (args.rowData) {
      switch (args.rowData.isActive) {
      case 0:

        setListContextShow({ list: listContext(['APPROVAL']), type: 'SHOW' })
        setListContextHide({ list: listContext(['CANCEL']), type: 'HIDE' })
        break
      case 1:
        setListContextShow({ list: listContext(['CANCEL']), type: 'SHOW' })
        setListContextHide({ list: listContext(['APPROVAL']), type: 'HIDE' })
        break
      case 2:
        setListContextShow({ list: listContext(['APPROVAL']), type: 'SHOW' })
        setListContextHide({ list: listContext(['CANCEL']), type: 'HIDE' })
        break
      }
    }
  }

  // ** Effect
  const {
    getProductCategoryPagingApi,
    deleteProductCategoryApi,
    checkInit,
    getByIdApi,
    sortApi,
    getListProductCategoryApi,
    getParentByIdApi
  } = useProductCategory()

  const handleModalSort = () => {
    getListProductCategoryApi({
      $keyword: searchTerm,
      $status: statusAssignedTo,
      $parentCategoryRootId: location.state?.id ? location.state?.id : "null"
    })
      .unwrap()
      .then((rs: any) => {
        setDataSort(rs)
        setOpenModalSort(!openModalSort)
      })
      .catch((ex: any) => console.log(ex))
  }
  useEffect(() => {
    dataToRender()
  }, [currentPage, pageSize, searchTerm, statusAssignedTo, checkInit, queryFilter])


  const handleDoubleClick = (args: any) => {
    if (args.rowData) {
      getByIdApi(args.rowData.id)
        .unwrap()
        .then((rs: any) => {
          setDataItem(rs)
          handleModalDetail()
        })
        .catch(() => notificationError(t("getDataError")))
      if (setTypeModal) {
        setTypeModal("View")
      }
    }
  }

  const handleContextMenuClick = (args: any) => {
    if (args.rowInfo?.rowData) {
      if (args.item.id === "EDIT") {
        getByIdApi(args.rowInfo.rowData.id)
          .unwrap()
          .then((rs: any) => {
            setDataItem(rs)
            handleModal()
          })
          .catch(() => notificationError(t("getDataError")))
        if (setTypeModal) {
          setTypeModal("Edit")
        }
      }
      if (args.item.id === "ADD") {
        setParentCategory({
          value: args.rowInfo.rowData.id,
          label: args.rowInfo.rowData.name
        })
        if (setTypeModal) {
          setTypeModal("Add")
        }
        handleModal()
      } else if (args.item.id === "READ") {
        getByIdApi(args.rowInfo.rowData.id)
          .unwrap()
          .then((rs: any) => {
            setDataItem(rs)
            handleModalDetail()
          })
          .catch(() => notificationError(t("getDataError")))
        if (setTypeModal) {
          setTypeModal("View")
        }
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
          }
        })
      }
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

    getProductCategoryPagingApi({
      Filter: rs,
      PageNumber: currentPage,
      PageSize: pageSize,
      Order: queryOrder ? queryOrder : '',
      Keyword: searchTerm,
      Status: statusAssignedTo,
      ParentCategoryRootId: location.state?.id ? location.state?.id : "null"
    })
      .unwrap()
      .then((rs) => {
        setTimeout(() => {
          setData(rs.items)
        }, 100)
        setTotalItem(rs.totalCount)
        setLoading(false)
      })
      .catch((ex) => {
        console.log(ex)
        setLoading(false)
      })
    if (location.state?.id) {
      getParentByIdApi(location.state?.id)
        .unwrap()
        .then((rs: any) => {
          const result = rs
            .map((x: any) => ({
              isActive: false,
              link: "/catalog/product-category",
              title: x.name,
              id: x.id
            }))
            .reverse()
          setBreadCrumb([
            {
              isActive: false,
              link: "/catalog/category",
              title: "CategoryProduct"
            },
            ...result
          ])
        })
        .catch(() => notificationError(t("getDataError")))
    } else {
      setBreadCrumb([
        {
          isActive: false,
          link: "/catalog/category",
          title: "CategoryProduct"
        }
      ])
    }
  }
  const handleDelete = (id: string) => {
    deleteProductCategoryApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          notificationSuccess(`${t("Delete Item successful")}!`)
        } else {
          notificationError(`${t(`${rs.errors[0].errorMessage}`)}!`)
        }
      })
      .catch(() => {
        notificationError(`${t("Delete Item error")}!`)
      })
  }

  const handleStatusAssignedToChange = (val: any) => {
    setStatusAssignedTo(val?.value)
  }

  const handleExport = () => {
    setExport(!exports)
  }
  const handleAdd = () => {
    if (setTypeModal) {
      setTypeModal("Add")
    }
    setDataItem(Math.random())
    handleModal()
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

  const filterStatusTemPlate = () => {
    return (
      <div style={{ width: '230px' }}>
        <Select
          value={optionStatus.find(
            (val: any) => val?.value === statusAssignedTo
          )}
          options={optionStatus}
          onChange={handleStatusAssignedToChange}
          isClearable
          placeholder={t("Select")}
          className="react-select"
          classNamePrefix="select"
        ></Select>
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
              handleExport={handleExport}
              handleAdd={handleAdd}
            />
          </CardBody>
        </Card>
        {loading ? (
          <div className="d-flex align-items-center justify-content-center">
            <Spinner type="grow" color="warning" children={false} />
          </div>
        ) : (
          <GridTableTemplate
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
            toolbarTemplate={toolbarOptions}
            listContextShow={listContextShow}
            listContextHide={listContextHide}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            height={windowSize.innerHeight - 310}
            rowSelected={rowSelected}
          />
        )}
        <ModalSortComponent
          openModal={openModalSort}
          handleModal={handleModalSort}
          data={dataSort}
          setData={setDataSort}
          columns={sortColumns}
          sortApi={sortApi}
        />
      </div>
    </Fragment>
  )
}

export default Table
