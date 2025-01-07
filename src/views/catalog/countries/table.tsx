import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import GridTableTemplate from "@components/grid-table-template"
import { Fragment, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import Select from "react-select"
import * as Icon from "becoxy-icons"
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
// import classnames from 'classnames'
// ** Table Columns
import { headerColumns } from "./columns"
import { useCountry } from "./hooks"
import { CountryContext } from "./useContext"
import {canContextMenuItems} from "@src/views/catalog/countries/contextMenu"

const MySwal = withReactContent(Swal)

const ButtonHeader = ({
  setTypeModal,
  setDataItem,
  handleModal,
  handleExport
}: any) => {
  const { t } = useTranslation()
  const handleAdd = () => {
    setTypeModal('Add')
    setDataItem(Math.random())
    handleModal()
  }
  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <div className="bar__action-left">
        <BreadCrumbsNotLink
          breadCrumbActive={t("Country")}
          breadCrumbParent={{ title: t("Catalog"), link: "/hr/dashboard" }}
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
  handleTextChange
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
  const { handleModal, setDataItem, setTypeModal, windowSize } = useContext(CountryContext)
  // ** States
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [statusAssignedTo, setStatusAssignedTo] = useState<number>()
  const [exports, setExport] = useState<boolean>()


  // ** Effect
  const { getCountryPagingApi, deleteCountryApi, checkInit } = useCountry()

  useEffect(() => {
    dataToRender()
  }, [currentPage, rowsPerPage, searchTerm, statusAssignedTo, checkInit])


  const handleContextMenuClick = (args: any) => {
    if (args.rowInfo?.rowData) {

      if (args.item.id === "EDIT") {
        setDataItem(args.rowInfo.rowData)
        if (setTypeModal) {
          setTypeModal('Edit')
        }
        handleModal()
      } else if (args.item.id === "OPEN") {
        if (setTypeModal) {
          setTypeModal('Open')
        }
        setDataItem(args.rowInfo.rowData)
        handleModal()
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

  //call api
  //getDataTable
  const dataToRender = () => {
    getCountryPagingApi({
      $skip: (currentPage - 1) * rowsPerPage,
      $top: rowsPerPage,
      $keyword: searchTerm,
      $status: statusAssignedTo
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
  const handleDelete = (id: string) => {
    deleteCountryApi(id)
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
              handleModal={handleModal}
            />
          </CardBody>
        </Card>
        <Card className="table-bar bar__query">
          <CardBody className="pe-0 ps-0">
            <FilterHeader
              searchTerm={searchTerm}
              handleTextChange={handleTextChange}
              handleStatusAssignedToChange={handleStatusAssignedToChange}
            />
          </CardBody>
        </Card>
        <GridTableTemplate
          resource="tableCountrys"
          idTable="Countrys"
          height={windowSize.innerHeight - 310}
          dataTable={data}
          columns={headerColumns}
          showToolbar={false}
          allowFilter={false}
          allowSort={false}
          showPagination={true}
          setCurrentPage={setCurrentPage}
          pageSize={rowsPerPage}
          setPageSize={setRowsPerPage}
          totalItem={totalItem}
          showContextMenu={true}
          contextMenuItems={canContextMenuItems}
          handleContextMenuClick={handleContextMenuClick}
          allowPaging={true}
          //exports={exports}
          //allowExcelExport={true}
        />
      </div>
    </Fragment>
  )
}

export default Table
