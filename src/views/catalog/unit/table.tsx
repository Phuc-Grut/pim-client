import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import GridTableTemplate from "@components/grid-table-template"
import { Fragment, useContext, useEffect, useState } from "react"
import * as Icon from "becoxy-icons"
import { useTranslation } from "react-i18next"
import Select from "react-select"
import {
  Button,
  Card,
  CardBody
} from "reactstrap"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
// import classnames from 'classnames'
// ** Table Columns
import { headerColumns, sortColumns } from "./columns"
import { useUnit } from "./hooks"
import { UnitContext } from "./useContext"
import ModalSortComponent from "@components/sort-component"
import {canContextMenuItems} from "@src/views/catalog/unit/contextMenu"
import {CanPer} from "@utils/context/Can"
import {userAction, userSubject} from "../../../configs/acl/ability"
import {expressionAnd, expressionOr } from "@src/utility/Common"
import { notificationError, notificationSuccess } from "@components/notifications"
import { useGroupUnit } from "../group-unit/hooks"

const MySwal = withReactContent(Swal)

const ButtonHeader = ({
  setTypeModal,
  setDataItem,
  handleModal
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
        <BreadCrumbsNotLink breadCrumbActive={t("Unit")} breadCrumbParent={{ title: t('Catalog'), link: '/catalog' }}/>
      </div>
      <div className="bar__action-right d-flex">
        <CanPer I={userAction.ADD} a={userSubject.Unit}>
          <Button color="primary" onClick={handleAdd} className="me-1 d-flex">
            <Icon.Plus fontSize={14} className="me-50" />
            {t("Add")}
          </Button>
        </CanPer>
      </div>
    </div>
  )
}

const Table = () => {
  const { t } = useTranslation()
  const { handleModal, setDataItem, setTypeModal, handleModalDetail, windowSize } =
    useContext(UnitContext)
  // ** States
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [exports, setExport] = useState<boolean>()
  const [openModalSort, setOpenModalSort] = useState(false)
  const [dataSort, setDataSort] = useState([])
  const [listGroupUnit, setListGroupUnit] = useState([])
  const [queryFilter, setQueryFilter] = useState([])
  // const [optionType, setOptionType] = useState<any>()
  const [status, setStatus] = useState<any>({ value: 1, label: t("Active") })
  // const [optionTypeDocument] = useState<any>([])
  const [queryOrder, setQueryOrder] = useState("")
  const [groupUnit, setGroupUnit] = useState<any>({ value: undefined, label: t("Select") })

  const listKey = ["status", "isDefault", "groupUnitId"]
  const listDate: any = ['suggestionDate']

  // ** Effect
  const {
    getUnitPagingApi,
    deleteUnitApi,
    getListUnitApi,
    sortUnitApi,
    checkInit
  } = useUnit()

  const { getListGroupUnitApi } = useGroupUnit()

  useEffect(() => {
    dataToRender()
  }, [
    currentPage,
    pageSize,
    searchTerm,
    status,
    queryFilter,
    checkInit,
    queryFilter,
    groupUnit
  ])

  const handleModalSort = () => {
    setOpenModalSort(!openModalSort)
  }

  const handleContextMenuClick = (args: any) => {
    if (args.rowInfo?.rowData) {
      // setRowData(args.rowInfo.rowData)

      if (args.item.id === "EDIT") {
        setDataItem(args.rowInfo.rowData)
        if (setTypeModal) {
          setTypeModal('Edit')
        }
        handleModal()
      } else if (args.item.id === "OPEN") {
        setDataItem(args.rowInfo.rowData)
        handleModalDetail()
      } else if (args.item.id === "ORDER") {
        onGetListUnit(args.rowInfo.rowData)
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
  useEffect(() => {
    getListGroupUnitApi({ $status: 1 })
      .unwrap()
      .then((rs) => {
        //rs.splice(0, 0, { value: "", label: t("Group unit") })
        setListGroupUnit(rs)
      })
      .catch((ex) => console.log(ex))
  }, [])

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
      if (rs.length > 0) {
        return status ? `$status==${status?.value}` : ""
      } else {
        return status ? `status==${status?.value}` : ""
      }
    }

    const $groupUnit = () => {
      if (rs.length > 0 || status) {
        return groupUnit?.value ? `$groupUnitId==${groupUnit?.value}` : ""
      } else {
        return groupUnit?.value ? `groupUnitId==${groupUnit?.value}` : ""
      }
    }

    getUnitPagingApi({
      Filter: `${rs}${$status()}${$groupUnit()}`,
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
    deleteUnitApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          notificationSuccess(`${t("Delete Item successful")}!`)
        } else {
          notificationError(`${t(`${rs.errors[0].errorMessage}`)}!`)
        }
      }).catch(() => { notificationError(`${t("Delete Item error")}!`) })
  }

  const handleExport = () => {
    setExport(!exports)
  }


  const onGetListUnit = (rowData: any) => {
    if (rowData) {
      const obj = rowData
      getListUnitApi({
        $status: obj.status,
        $groupUnitId: obj.groupUnitId,
        $nullAble: !obj.groupUnitId
      })
        .unwrap()
        .then((rs) => {
          setDataSort(rs)
          handleModalSort()
        })
        .catch((ex) => console.log(ex))
    }
  }
  const handleStatus = (val: any) => {
    setStatus(val)
  }
  
  const handleGroupUnit = (val: any) => {
    setGroupUnit(val)
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

  const filterGroupUnitTemPlate = () => {
    return (
      <div style={{ width: '230px' }}>
        <Select
          options={listGroupUnit}
          onChange={handleGroupUnit}
          value={groupUnit}
          isClearable={true}
          placeholder={t("Select")}
          className='react-select w-100'
          classNamePrefix='select' ></Select>
      </div >
    )
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

  const optionIsDefault: any = [
    {
      value: true,
      label: `${t("IsManinUnit")}`
    },
    {
      value: false,
      label: `${t("NotIsManinUnit")}`
    }
  ]

  const dataSourceFilter = [
    {
      key: listKey[0],
      data: optionStatus
    },
    {
      key: listKey[1],
      data: optionIsDefault
    },
    {
      key: listKey[2],
      data: listGroupUnit
    }
  ]

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
              setTypeModal={setTypeModal}
              setDataItem={setDataItem}
              handleExport={handleExport}
              handleModal={handleModal}
            />
          </CardBody>
        </Card>
        <GridTableTemplate
          resource="tableUnits"
          idTable="Units"
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
      </div>
      <ModalSortComponent
        openModal={openModalSort}
        handleModal={handleModalSort}
        data={dataSort}
        setData={setDataSort}
        columns={sortColumns}
        sortApi={sortUnitApi}
      />
    </Fragment>
  )
}

export default Table
