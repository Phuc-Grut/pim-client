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
import { useGroupCategory } from "../catalog/group-category/hooks"
import { useLocation } from "react-router-dom"
// import classnames from 'classnames'
// ** Table Columns
import { headerColumns, canContextMenuItems, sortColumns } from "./columns"
import { useCategory } from "./hook"
import { CategoryContext } from "./useContext"
import {
  notificationError,
  notificationSuccess
} from "@components/notifications"
import ModalSortComponent from "@components/sort-component"
import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import { expressionAnd, expressionOr } from "@src/utility/Common"

const MySwal = withReactContent(Swal)

const ButtonHeader = ({ handleExport, handleAdd, breadCrumbChild  }: any) => {
  const { t } = useTranslation()
    return (
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="bar__action-left">
        <BreadCrumbsNotLink
              breadCrumbActive={t('Channel List')}
              breadCrumbParent={{ title: t('Catalog'), link: '/catalog' }}
              breadCrumbChildren = {breadCrumbChild}
            />
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
  const location = useLocation()
  const {
    handleModal,
    setDataItem,
    setTypeModal,
    groupAssignedTo,
    setGroupAssignedTo,
    setParentCategory,
    handleModalDetail,
    breadCrumb,
    setBreadCrumb,
    windowSize
  } = useContext(CategoryContext)
  // ** States
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [data, setData] = useState([])
  const [statusAssignedTo, setStatusAssignedTo] = useState<number>(1)
  const [optionGroup, setOptionGroup] = useState([])
  const [exports, setExport] = useState<boolean>()
  const [totalItem, setTotalItem] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [openModalSort, setOpenModalSort] = useState(false)
  const [dataSort, setDataSort] = useState([])
  const [queryFilter, setQueryFilter] = useState([])
  const [queryOrder, setQueryOrder] = useState('')
  const listDate: any[] = []
  const listKey = ['status']
  const [breadCrumbChild, setBreadCrumbChild] = useState<any>(null)

  // ** Effect
  const {
    getCategoryPagingApi,
    deleteCategoryApi,
    checkInit,
    getByIdApi,
    sortApi,
    getListCategoryApi,
    getParentByIdApi
  } = useCategory()

  const { getListGroupCategoryApi } = useGroupCategory()
  const handleModalSort = () => {
    getListCategoryApi({
      $keyword: searchTerm,
      $status: statusAssignedTo,
      $groupCategoryId: groupAssignedTo?.value ? groupAssignedTo?.value : undefined,
      $parentCategoryId: location.state?.id ? location.state?.id : "null"
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
  }, [
    currentPage,
    pageSize,
    searchTerm,
    statusAssignedTo,
    checkInit,
    groupAssignedTo,
    queryFilter
  ])

  useEffect(() => {
    getListGroupCategoryApi({})
      .unwrap()
      .then(async (rs) => {
        setOptionGroup(rs)
        if (rs && rs.length > 0) {
          const obj = { value: rs[0].value, label: rs[0].label }
          const groupCategoryLocal = await localStorage.getItem("groupCategory")
          if (groupCategoryLocal && groupCategoryLocal !== "undefined") {
            setGroupAssignedTo(JSON.parse(groupCategoryLocal))
          } else {
            setGroupAssignedTo(obj)
            localStorage.setItem("groupCategory", JSON.stringify(obj))
          }
        }
      })
      .catch((ex) => console.log(ex))
  }, [])


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
    getCategoryPagingApi({
      Filter: rs,
      PageNumber: currentPage,
      PageSize: pageSize,
      Order: queryOrder ? queryOrder : '',
      Keyword: searchTerm,
      Status: statusAssignedTo,
      GroupCategoryId: groupAssignedTo?.value ? groupAssignedTo?.value : undefined,
      ParentCategoryId: location.state?.id ? location.state?.id : "null"
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
          setBreadCrumbChild([...rs].reverse())
          const result = rs
            .map((x: any) => ({
              isActive: false,
              link: "/catalog/channel-list",
              title: x.name,
              id: x.id
            }))
            .reverse()
          setBreadCrumb([
            {
              isActive: false,
              link: "/catalog/channel-list",
              title: "Channel List"
            },
            ...result
          ])
        })
        .catch(() => notificationError(t("getDataError")))
    } else {
      setBreadCrumbChild('')
      setBreadCrumb([
        {
          isActive: false,
          link: "/catalog/channel-list",
          title: "Channel List"
        }
      ])
    }
  }
  const handleDelete = (id: string) => {
    deleteCategoryApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          notificationSuccess(`${t("Delete Item successful")}!`)
        } else {
          notificationError(t(`${rs.errors[0].errorMessage}`))
        }
      })
      .catch(() => {
        notificationError(`${t("Delete Item error")}!`)
      })
  }
  // const handleTextChange = (val: string) => {
  //   setSearchTerm(val)
  // }

  const handleStatusAssignedToChange = (val: any) => {
    setStatusAssignedTo(val?.value)
  }

  const handleGroupAssignedToChange = (val: any) => {
    setGroupAssignedTo(val)
    localStorage.setItem("groupCategory", JSON.stringify(val))
    if (location?.state?.id) {
      location.state.id = null
    }
    if (location?.state?.name) {
      location.state.name = null
    }
  }

  const handleExport = () => {
    setExport(!exports)
  }
  const handleAdd = () => {
    if (!groupAssignedTo || !groupAssignedTo?.value) {
      notificationError(t("InfomationChannel"))
    }
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

  const filterGroupUnitTemPlate = () => {
    return (
      <div style={{ width: '230px' }}>
        <Select
          value={optionGroup.find(
            (val: any) => val.value === groupAssignedTo?.value
          )}
          options={optionGroup}
          onChange={handleGroupAssignedToChange}
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
    },
    {
      template: filterGroupUnitTemPlate,
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
              breadCrumb={breadCrumb}
              breadCrumbChild={breadCrumbChild}
            />
          </CardBody>
        </Card>
        {/* <Card className="table-bar bar__query">
          <CardBody className="pe-0 ps-0">
            <FilterHeader
              handleGroupAssignedToChange={handleGroupAssignedToChange}
              optionGroup={optionGroup}
              handleTextChange={handleTextChange}
              handleStatusAssignedToChange={handleStatusAssignedToChange}
              groupAssignedTo={groupAssignedTo}
            />
          </CardBody>
        </Card> */}
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
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            height={windowSize.innerHeight - 310}
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
