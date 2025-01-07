import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import GridTableTemplate from "@components/grid-table-template"
import { IRowSelected} from "@src/domain/models/ITableGrid"
import { Fragment, memo, useContext, useEffect, useState } from "react"
import * as Icon from "becoxy-icons"
import { useTranslation } from "react-i18next"
import {
  Button,
  Card,
  CardBody
} from "reactstrap"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
// import classnames from 'classnames'
// ** Table Columns
import { headerColumns } from "./columns"
import { useProduct } from "./hooks"
import { ProductContext } from "./useContext"
import moment from "moment"
import {
  notificationError,
  notificationSuccess
} from "@components/notifications"
import { useDebounce } from "@src/utility/hooks/useDebounce"
import {useProductType} from "@src/views/product-type/hooks"
import {canContextMenuItems} from "@src/views/product/contextMenu"
import {CanPer} from "@utils/context/Can"
import {userAction, userSubject} from "@configs/acl/ability"
import initAbility from "@configs/acl/initialAbility"
import Select from "react-select"

const MySwal = withReactContent(Swal)
const Table = () => {
  const { t } = useTranslation()
  const {
    handleModal,
    setDataItem,
    setTypeModal,
    windowSize,
    setTabIndex,
    handleModalDetail,
    handleModalDuplicate,
    handleSidebar
  } = useContext(ProductContext)

  const idTable = 'Products'

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [queryFilter, setQueryFilter] = useState<any[]>([])
  // const [dataSourceFilter, setDataSourceFilter] = useState<IListCbxFilter[]>([{ key: "status", data: statusDefault }])
  const [queryOrder, setQueryOrder] = useState("createdDate;desc")
  const [listContextShow, setListContextShow] = useState<any>(undefined)
  const [listContextHide, setListContextHide] = useState<any>(undefined)
  const [productType, setProductType] = useState<any>([])
  const listKey = ["status"]
  const listDate: any[] = ['createdDate', 'updatedDate', 'date']
  const [status, setStatus] = useState<any>({ value: 1, label: t("Active") })

  // ** Effect
  const {
    getProductPagingApi,
    getProductByIdApi,
    deleteProductApi,
    checkInit
  } = useProduct()

  const {getProductTypePagingApi} = useProductType()
  const keyword = useDebounce(searchTerm, 500)

  const listContext = (actions: string[]) => {
    const result = actions.map(x => {
      const mappedAction = {
        CANCEL: "EDIT",
        APPROVAL: "APPROVE"
      }[x] || x

      return initAbility.can(userAction[mappedAction as keyof typeof userAction], userSubject.Product) && x
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

  useEffect(() => {
    getProductTypePagingApi({
      Filter: "",
      PageNumber: 0,
      PageSize: 1000
    })
      .unwrap()
      .then((rs) => {
        setTimeout(() => {
          // setData(rs.items)
          const type = rs.items.map((item: any) => ({
            value: item.name,
            label: item.name
          }))
          setProductType(type)
        }, 100)
      })
      .catch((ex) => {
        console.log(ex)
      })
  }, [])
  
  
  // useEffect(() => {
  //   if (productType && productType.length > 0) {
  //     setDataSourceFilter((old: IListCbxFilter[]) => [
  //       ...old,
  //       { key: "productType", data: productType }
  //     ])
  //   }

  // }, [productType])


  useEffect(() => {
    const queryParma = [
      ...queryFilter,
      { key: "isVariant", ope: "!=", value: true, predicate: "" },
      { key: "deleted", ope: "==", value: false, predicate: ";" }
    ]

    const $status = () => {
      return status ? `$status==${status?.value}` : ""
    }

    const rs = queryParma.map((x: any) => `${x.key}${x.ope}${listDate.find((d) => d === x.key) ? moment(x.value).format('YYYY/MM/DD') : x.value}`).join(';')
    getProductPagingApi({
      Filter: `${rs}${$status()}`,
      Order: queryOrder,
      PageNumber: currentPage,
      PageSize: pageSize,
      Keyword: searchTerm
    })
      .unwrap()
      .then((rs) => {
        if (rs?.items) {
          setTimeout(() => {
            setData(rs.items)
          }, 100)
          setTotalItem(rs.totalCount)
        }
      })
      .catch((ex) => {
        console.log(ex)
      })
  }, [pageSize, keyword, checkInit, currentPage, queryFilter, status])


  const handleDoubleClick = (args: any) => {
    if (args.rowData) {
      getProductByIdApi(args.rowData.id)
        .unwrap()
        .then((rs: any) => {
          setDataItem(rs)
          handleModalDetail()
        })
        .catch(() => notificationError(t("getDataError")))
      if (setTypeModal) {
        setTypeModal('View')
      }
    }
  }
  const handleContextMenuClick = (args: any) => {

    const id = args.rowInfo.rowData?.id

    if (id) {
      if (args.item.id === "EDIT") {
        getProductByIdApi(id)
          .unwrap()
          .then((rs) => {
            setTimeout(() => {
              if (rs?.listGroupCategory && rs?.listGroupCategory.length > 0) {
                const l = rs?.listGroupCategory.map((obj: any) => {
                  rs[obj.value] = rs?.listCategory?.filter(
                    (d: any) => d.groupCategoryId === obj.value
                  )
                  return obj.value
                })
                rs.idGroupCategories = l
              } else {
                rs.idGroupCategories = []
              }
              if (rs?.listStore && rs?.listStore.length > 0) {
                const l = rs?.listStore.map((obj: any) => {
                  return obj.value
                })
                rs.limitedToStores = l
              } else {
                rs.limitedToStores = []
              }
              if (rs?.listTag && rs?.listTag.length > 0) {
                rs.productTag = rs?.listTag
              } else {
                rs.productTag = []
              }
              setDataItem(rs)
              if (setTypeModal) {
                setTabIndex("0")
                setTypeModal('Edit')
              }
              handleModal()
            }, 100)
          })
          .catch(() => notificationError(t("getDataError")))
      } else if (args.item.id === "DETAIL") {
        getProductByIdApi(id)
          .unwrap()
          .then((rs) => {
            setTimeout(() => {
              setDataItem(rs)
              if (setTypeModal) {
                setTabIndex("0")
                setTypeModal('Detail')
              }
              handleModal()
            }, 100)
          })
          .catch((ex) => console.log(ex))
      } else if (args.item.id === "READ") {
        getProductByIdApi(id)
          .unwrap()
          .then((rs: any) => {
            if (rs) {
              setDataItem(rs)
              handleModalDetail()
            }
          })
          .catch(() => notificationError(t("getDataError")))
        if (setTypeModal) {
          setTypeModal('View')
        }
      } else if (args.item.id === "DUPLICATE") {
        setDataItem(args.rowInfo.rowData)
        if (setTypeModal) {
          setTypeModal('Duplicate')
        }
        handleModalDuplicate()
      } else if (args.item.id === "VARIANT") {
        setDataItem(args.rowInfo.rowData)
        if (setTypeModal) {
          setTypeModal('Variant')
        }
        handleSidebar('variant')
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
            handleDelete(id)
          } else if (result.dismiss === MySwal.DismissReason.cancel) {
          }
        })
      }
    }
  }

  const handleDelete = (id: string) => {
    deleteProductApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          notificationSuccess(t("Delete Successful"))
        }
      })
  }

  const handleAdd = () => {
    setTabIndex("0")
    if (setTypeModal) {
      setTypeModal('Add')
    }
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
    },
    { key: "productType", data: productType }
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
      <div className="table-toolbar table-edit">
        <div className="table-toolbar">
          <Card className="table-bar bar__action">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="bar__action-left">
                  <BreadCrumbsNotLink breadCrumbActive={t("Product")} />
                </div>
                <div className="bar__action-right d-flex">
                  <CanPer I={userAction.ADD} a={userSubject.Product}>
                    <Button
                      color="primary"
                      onClick={handleAdd}
                      className="me-1 d-flex"
                    >
                      <Icon.Plus fontSize={14} className="me-50" />
                      {t("Add")}
                    </Button>
                  </CanPer>
                  
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <GridTableTemplate
          resource="tableProducts"
          idTable={idTable}
          height={windowSize.innerHeight - 310}
          dataTable={data}
          columns={headerColumns}
          showToolbar={true}
          allowFilter={true}
          allowSort={true}
          showPagination={true}
          allowResizing={true}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalItem={totalItem}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          queryFilter={queryFilter}
          dataSourceFilter={dataSourceFilter}
          setQueryFilter={setQueryFilter}
          queryOrder={queryOrder}
          setQueryOrder={setQueryOrder}
          listDate={listDate}
          showContextMenu={true}
          contextMenuItems={canContextMenuItems}
          handleContextMenuClick={handleContextMenuClick}
          allowPaging={true}
          listContextShow={listContextShow}
          listContextHide={listContextHide}
          rowSelected={rowSelected}
          allowExcelExport={true}
          // enablePersistence={false}
          recordDoubleClick={true}
          handleDoubleClick={handleDoubleClick}
          toolbarTemplate={toolbarOptions}
        />
      </div>
    </Fragment>
  )
}

export default memo(Table)
