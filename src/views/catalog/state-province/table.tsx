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
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledButtonDropdown
} from "reactstrap"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useCountry } from "../countries/hooks"
// import classnames from 'classnames'
// ** Table Columns
import { columns } from "./columns"
import { useStateProvince } from "./hooks"
import { StateProvinceContext } from "./useContext"

const MySwal = withReactContent(Swal)

const ButtonHeader = ({
  setTypeModal,
  setDataItem,
  handleSidebar,
  handleExport
}: any) => {
  const { t } = useTranslation()
  const handleAdd = () => {
    setTypeModal("Add")
    setDataItem(Math.random())
    handleSidebar()
  }
  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <div className="bar__action-left">
        <BreadCrumbsNotLink
          breadCrumbActive={t("Province")}
          breadCrumbParent={{
            title: t("Catalog"),
            link: "/category/dashboard"
          }}
        />
      </div>
      <div className="bar__action-right d-flex">
        <Button color="primary" onClick={handleAdd} className="me-1 d-flex">
          <Icon.Plus fontSize={14} className="me-50" />
          {t("Add")}
        </Button>
        <UncontrolledButtonDropdown>
          <DropdownToggle
            outline
            color="primary"
            className="dropdown-no-icon d-flex"
            caret
          >
            <Icon.MoreVertical fontSize={13} />
            Thao tác
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={handleExport} tag="a">
              Export
            </DropdownItem>
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

const FilterHeader = ({
  handleStatusAssignedToChange,
  handleTextChange,
  handleCountryAssignedToChange,
  optionCountry
}: any) => {
  const { t } = useTranslation()
  const optionStatus = [
    {
      value: null,
      label: t("Select Option")
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
    <div className="d-flex justify-content-between align-items-center w-100">
      <Row className="m-0 gx-1 d-flex flex-wrap justify-content-end align-items-center w-100">
        <Col xs={12} sm={6} md={3} lg={2} className="pt-25 pb-25">
          <Input
            type="text"
            id="search-permission"
            className="w-100"
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Tìm kiếm"
          />
        </Col>
        <Col xs={12} sm={6} md={3} lg={2} className="pt-25 pb-25">
          <Select
            options={optionCountry}
            onChange={handleCountryAssignedToChange}
            placeholder={t("Select Option")}
            className="react-select"
            classNamePrefix="select"
          ></Select>
        </Col>
        <Col xs={12} sm={6} md={3} lg={2} className="pt-25 pb-25">
          <Select
            options={optionStatus}
            onChange={handleStatusAssignedToChange}
            placeholder={t("Select Option")}
            className="react-select"
            classNamePrefix="select"
          ></Select>
        </Col>
      </Row>
    </div>
  )
}

const Table = () => {
  const { t } = useTranslation()
  const { handleSidebar, setDataItem, setTypeModal } =
    useContext(StateProvinceContext)
  // ** States
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [commandData, setCommandData] = useState<any>({})
  const [statusAssignedTo, setStatusAssignedTo] = useState<number>()
  const [countryAssignedTo, setCountryAssignedTo] = useState<any>()
  const [optionCountry, setOptionCountry] = useState<any>()
  const [exports, setExport] = useState<boolean>()

  // ** Effect
  const { getStateProvincePagingApi, deleteStateProvinceApi, checkInit } =
    useStateProvince()

  const { getListCountryApi } = useCountry()

  useEffect(() => {
    dataToRender()
  }, [
    currentPage,
    rowsPerPage,
    searchTerm,
    statusAssignedTo,
    checkInit,
    countryAssignedTo
  ])

  useEffect(() => {
    getDataCountry()
  }, [])

  useEffect(() => {
    if (commandData.type === "Edit") {
      setDataItem(commandData.data)
      setTypeModal("Edit")
      handleSidebar()
    } else if (commandData.type === "Detail") {
      setDataItem(commandData.data)
      setTypeModal("Detail")
      handleSidebar()
    } else if (commandData.type === "Delete") {
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
          handleDelete(commandData.data.id)
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
        }
      })
    }
  }, [commandData])
  

  const handleContextMenuClick = (args: any) => {
    if (args.rowInfo?.rowData) {

      if (args.item.id === "EDIT") {
        handleSidebar()
        setDataItem(args.rowInfo.rowData)
        setTypeModal("Edit")
      } else if (args.item.id === "DETAIL") {
        handleSidebar()
        setDataItem(args.rowInfo.rowData)
        setTypeModal("Detail")
      } else if (args.item.id === "DELETE") {
        MySwal.fire({
          title: t("Confirm"),
          text: t("Do you want to delete item?"),
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
  //call api
  //getDataTable
  const dataToRender = () => {
    getStateProvincePagingApi({
      $skip: (currentPage - 1) * rowsPerPage,
      $top: rowsPerPage,
      $keyword: searchTerm,
      $status: statusAssignedTo,
      $parentId: countryAssignedTo
    })
      .unwrap()
      .then((rs) => {
        setTimeout(() => {
          setData(rs.items)
        }, 100)
        setTotalItem(rs.total)
      })
      .catch((ex) => {
        console.log(ex)
      })
  }

  const getDataCountry = () => {
    getListCountryApi({ $status: 1 })
      .unwrap()
      .then((rs) => {
        rs.splice(0, 0, { value: "", label: t("All country") })
        setTimeout(() => {
          setOptionCountry(rs)
        }, 10)
      })
      .catch((ex) => {
        console.log(ex)
      })
  }

  const handleDelete = (id: string) => {
    deleteStateProvinceApi(id)
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
        }
      })
  }
  const handleTextChange = (val: string) => {
    setSearchTerm(val)
  }

  const handleStatusAssignedToChange = (val: any) => {
    setStatusAssignedTo(val.value)
  }

  const handleCountryAssignedToChange = (val: any) => {
    setCountryAssignedTo(val.value)
  }
  const contextMenuItems = [
    {
      text: t("Edit"),
      target: ".e-content",
      id: "EditRecord",
      iconCss: "e-flat e-icons e-edit"
    },
    {
      text: t("Delete"),
      target: ".e-content",
      id: "DeleteRecord",
      iconCss: "e-flat e-icons e-delete"
    }
  ]
  const handleExport = () => {
    setExport(!exports)
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
              handleSidebar={handleSidebar}
            />
          </CardBody>
        </Card>
        <Card className="table-bar bar__query">
          <CardBody className="pe-0 ps-0">
            <FilterHeader
              searchTerm={searchTerm}
              handleTextChange={handleTextChange}
              handleStatusAssignedToChange={handleStatusAssignedToChange}
              handleCountryAssignedToChange={handleCountryAssignedToChange}
              optionCountry={optionCountry}
            />
          </CardBody>
        </Card>
        <GridTableTemplate
          idTable="tableStateProvinces"
          resource="StateProvinces"
          dataTable={data}
          columns={columns}
          showToolbar={false}
          allowFilter={false}
          allowSort={false}
          showPagination={true}
          setCurrentPage={setCurrentPage}
          pageSize={rowsPerPage}
          setPageSize={setRowsPerPage}
          totalItem={totalItem}
          setCommandData={setCommandData}
          showContextMenu={true}
          contextMenuItems={contextMenuItems}
          handleContextMenuClick={handleContextMenuClick}
          exports={exports}
          allowExcelExport={true}
          allowPaging={true}
        />
      </div>
    </Fragment>
  )
}

export default Table
