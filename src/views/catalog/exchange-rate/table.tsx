import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import GridTableTemplate from "@components/grid-table-template"
import { Fragment, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import Select from "react-select"
import { Card, CardBody } from "reactstrap"
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content"

import { headerColumns } from './columns'
import { useExchangeRate } from "./hooks"
import { ExchangeRateContext } from "./useContext"
import {canContextMenuItems} from "@src/views/catalog/exchange-rate/contextMenu"
import { expressionAnd, expressionOr } from "@src/utility/Common"

const MySwal = withReactContent(Swal)

const ButtonHeader = ({}: any) => {
  const { t } = useTranslation()
  
  return (
    <div className='d-flex justify-content-between align-items-center w-100'>
      <div className='bar__action-left'>
        <BreadCrumbsNotLink breadCrumbActive={t('Exchange rate')} breadCrumbParent={{ title: t('Catalog'), link: '/catalog' }} />
      </div>
    </div>
  )
}

const Table = () => {
  const { t } = useTranslation()
  const { handleModal, setDataItem, setTypeModal, handleModalDetail, windowSize } = useContext(ExchangeRateContext)
  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  // const [statusAssignedTo, setStatusAssignedTo] = useState<number>()
  // const [exports, setExport] = useState<boolean>()
  // const [optionCurrency, setOptionCurrency] = useState([{ value: null, label: t("Select Option") }])
  // const [currencyAssignedTo, setCurrencyAssignedTo] = useState({ value: "", label: "All currency" })
  const [queryFilter, setQueryFilter] = useState([])
  const [queryOrder, setQueryOrder] = useState('CreatedDate;desc')
  const listDate: any[] = []
  const listKey = ['status', 'calculation']
  const [status, setStatus] = useState<any>({ value: 1, label: t("Active") })

  // ** Effect
  const {
    getExchangeRatePagingApi,
    deleteExchangeRateApi,
    checkInit
  } = useExchangeRate()

  // const {
  //   getListCurrencyApi
  // } = useCurrency()

  useEffect(() => {
    dataToRender()
  }, [
    queryFilter, 
    currentPage, 
    pageSize, 
    searchTerm, 
    status, 
    checkInit
    // currencyAssignedTo
  ])


  // useEffect(() => {
  //   getListCurrencyApi({}).unwrap()
  //     .then((rs) => {
  //       setOptionCurrency((prev) => ([...prev, ...rs]))
  //     })
  //     .catch((ex) => console.log(ex))
  // }, [])
  

  const handleContextMenuClick = (args: any) => {
    if (args.rowInfo?.rowData) {

      if (args.item.id === 'EDIT') {
        setDataItem(args.rowInfo.rowData)
        if (setTypeModal) {
          setTypeModal('Edit')
        }
        handleModal()
      } else if (args.item.id === 'OPEN') {
        setDataItem(args.rowInfo.rowData)

        handleModalDetail()
      } else if (args.item.id === 'DELETE') {
        MySwal.fire({
          title: t('Confirm'),
          text: t('Do you want to delete item?'),
          icon: 'warning',
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: t('Delete'),
          cancelButtonText: t('Cancel'),
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger ms-1'
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

    getExchangeRatePagingApi({
      Filter: `${rs}${(rs.length > 0 && status) ? "$" : ""}${$status()}`,
      PageNumber: currentPage,
      PageSize: pageSize,
      Order: queryOrder ? queryOrder : 'CreatedDate;desc',
      Keyword: searchTerm
      // $status: statusAssignedTo,
      // $currency: currencyAssignedTo ? currencyAssignedTo.value : ""
    }).unwrap()
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
    deleteExchangeRateApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          toast.success(
            <Fragment>
              <div className="toastify-header">
                <div className="title-wrapper">
                  <h6 className="toast-title">{t("Delete Item successful!")}</h6>
                </div>
              </div>
              <div className="toastify-body">
                <ul className="list-unstyled mb-0">
                  <li></li>
                </ul>
              </div>
            </Fragment>
          )
        }
      })
  }
  // const handleTextChange = (val: string) => {
  //   setSearchTerm(val)
  // }

  // const handleStatusAssignedToChange = (val: any) => {
  //   setStatusAssignedTo(val.value)
  // }

  // const handleCurrencyAssignedToChange = (val: any) => {
  //   setCurrencyAssignedTo(val)
  // }

  // const handleExport = () => {
  //   setExport(!exports)
  // }

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

  const optionCalculation = [
    {
      value: "*",
      label: "*"
    },
    {
      value: "/",
      label: "/"
    }
  ]
  
  const dataSourceFilter = [
    {
      key: listKey[0],
      data: optionStatus
    },
    {
      key: listKey[1],
      data: optionCalculation
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
      <div className='table-toolbar'>
        <Card className='table-bar bar__action'>
          <CardBody>
            <ButtonHeader
              setTypeModal={setTypeModal}
              setDataItem={setDataItem}
              // handleExport={handleExport}
              handleModal={handleModal} />
          </CardBody>
        </Card>
        {/* <Card className='table-bar bar__query'>
          <CardBody className='pe-0 ps-0'>
            <FilterHeader
              handleCurrencyAssignedToChange={handleCurrencyAssignedToChange}
              optionCurrency={optionCurrency}
              handleTextChange={handleTextChange}
              handleStatusAssignedToChange={handleStatusAssignedToChange}
            />
          </CardBody>
        </Card> */}
        <GridTableTemplate
          resource='tableExchangeRates'
          idTable='ExchangeRates'
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
          recordDoubleClick={true}
          queryFilter={queryFilter}
          dataSourceFilter={dataSourceFilter}
          setQueryFilter={setQueryFilter}
          handleDoubleClick={handleDoubleClick}
          setQueryOrder={setQueryOrder}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          toolbarTemplate={toolbarOptions}
        />
      </div>
    </Fragment>
  )
}

export default Table