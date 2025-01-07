// ** React Imports
import { Fragment, useContext, useEffect, useState } from "react"
import { X } from "becoxy-icons"
import { useForm, Controller } from "react-hook-form"
import {
  Modal,
  ModalBody,
  Button,
  Form,
  Label,
  Row,
  Col
} from "reactstrap"
import Select from "react-select"
import "@styles/react/libs/editor/editor.scss"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { isObjEmpty } from "@src/utility/Utils"
import { StateProvinceContext } from "./useContext"
import { Scrollbars } from 'react-custom-scrollbars'
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useStateProvince } from "./hooks"
import { IFDataStateProvince } from "@src/domain/models/IStateProvince"
import {TextInput} from "@components/input"
import { useCountry } from "../countries/hooks"

const ModalHeader = (props: any) => {
  // ** Props
  const { children, handleSidebar } = props

  return (
    <div className="modal-header d-flex align-items-center justify-content-between mb-1">
      <h5 className="modal-title">{children}</h5>
      <div className="todo-item-action d-flex align-items-center">
        <X
          className="fw-normal mt-25 cursor-pointer"
          fontSize={16}
          onClick={handleSidebar}
        />
      </div>
    </div>
  )
}

const ModalComponent = () => {
  // ** Props
  const { t } = useTranslation()
  const { openModal, handleSidebar, dataItem, type } =
    useContext(StateProvinceContext)
  // ** States
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const { addStateProvinceApi, editStateProvinceApi } = useStateProvince()

  const { getListCountryApi } = useCountry()
  const [optionCountry, setOptionCountry] = useState<any>([])

  // ** States
  const formSchema = yup.object().shape({
    code: yup
      .string()
      .required("Code is required")
      .matches(/^[A-Za-z0-9]+$/, "Do not contain special characters")
      .max(50, "The code less than 50 characters")
      .min(2, "The code greater than 2 characters"),
    name: yup
      .string()
      .required("Name is required")
      .max(150, "The name less than 150 characters")
      .min(2, "The name greater than 2 characters"),
    shortName: yup.string().max(255, "The short name less than 255 characters"),
    note: yup.string().max(500, "The note less than 500 characters")
  })

  const defaultValues: IFDataStateProvince = {
    note: "",
    id: "",
    code: "",
    name: "",
    shortName: "",
    countryId: "",
    status: 1,
    createdBy: undefined,
    createdDate: undefined,
    updatedBy: undefined,
    updatedDate: undefined
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors }
  } = useForm<IFDataStateProvince>({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(formSchema)
  })
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const optionStatus = [
    {
      value: 1,
      label: t("Active")
    },
    {
      value: 0,
      label: t("Inactive")
    }
  ]
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  // ** Function to run when sidebar opens
  const handleFormOpened = () => {
    if (!isObjEmpty(dataItem)) {
      setValue("id", dataItem.id)
      setValue("code", dataItem.code)
      setValue("name", dataItem.name)
      setValue("shortName", dataItem.shortName ? dataItem.shortName : "")
      setValue("note", dataItem.note)
      setValue("status", dataItem.status)
      setValue("countryId", dataItem.countryId)
    } else {
      setValue("code", "")
      setValue("name", "")
      setValue("shortName", "")
      setValue("note", "")
    }
    dataToRender()
  }

  const dataToRender = () => {
    getListCountryApi({ $status: 1 })
      .unwrap()
      .then((rs) => {
        setTimeout(() => {
          setOptionCountry(rs)
        }, 100)
      })
      .catch((ex) => {
        console.log(ex)
      })
  }
  // ** Function to run when sidebar closes
  const handleFormClosed = () => {
    clearErrors()
  }
  const handlehandleFormTitle = () => {
    if (type === "Edit") {
      return t("Update")
    } else if (type === "Add") {
      return t("Add new")
    } else if (type === "Copy") {
      return t("Copy")
    } else if (type === "Open") {
      return t("Open")
    }
  }
  // ** Function to reset fileds
  const handleCancel = () => {
    handleSidebar()
  }

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (type === "Edit") {
      return (
        <Fragment>
          <Button color="primary" className="update-btn update-todo-item me-1">
            {t("Update")}
          </Button>
          <Button color="secondary" onClick={handleCancel} outline>
            {t("Close")}
          </Button>
        </Fragment>
      )
    } else if (type === "Add" || type === "Copy") {
      return (
        <Fragment>
          <Button color="primary" className="add-todo-item me-1">
            {t("Add")}
          </Button>
          <Button color="secondary" onClick={handleCancel} outline>
            {t("Close")}
          </Button>
        </Fragment>
      )
    } else if (type === "Open") {
      return (
        <Fragment>
          <Button color="secondary" onClick={handleCancel} outline>
            {t("Close")}
          </Button>
        </Fragment>
      )
    }
  }

  const notificationSuccess = (param: string) => {
    return toast.success(
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title">{param} thành công</h6>
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
  const notificationError = (param: string) => {
    return toast.error(
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title">{param} thất bại</h6>
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

  const onSubmit = (data: any) => {
    if (type === "Add") {
      addStateProvinceApi(data)
        .unwrap()
        .then((rs) => {
          if (rs.errors.length === 0) {
            handleSidebar()
            notificationSuccess("Thêm mới")
          } else {
            notificationError("Thêm mới")
          }
        })
        .catch((ex) => console.log(ex))
    } else {
      editStateProvinceApi(data)
        .unwrap()
        .then((rs) => {
          if (rs.errors.length === 0) {
            notificationSuccess("Cập nhật")
            handleSidebar()
          } else {
            notificationError("Cập nhật")
          }
        })
        .catch((ex) => console.log(ex))
    }
  }
  return (
    <Modal
      isOpen={openModal}
      toggle={handleSidebar}
      className="modal-dialog-centered modal-lg"
      contentClassName="p-0"
      onOpened={handleFormOpened}
      onClosed={handleFormClosed}
    >
      <Form
        id="form-modal-globalzone"
        className="todo-modal"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader handleSidebar={handleSidebar}>
          {handlehandleFormTitle()}
        </ModalHeader>
        <Scrollbars
          
          autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}
        >
          <ModalBody>
            <div>
              <Row className="m-0 gy-1 mb-2 me-1">
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="code"
                    label={t("State province code")}
                    required={true}
                    labelSize="label-small"
                    errors={errors.code}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="name"
                    label={t("State province name")}
                    required={true}
                    labelSize="label-small"
                    errors={errors.name}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="shortName"
                    label={t("Short name")}
                    required={true}
                    labelSize="label-small"
                    errors={errors.shortName}
                  />
                </Col>
                <Col md={6} xs={6}>
                  <div className="d-flex form-row-inline label-small">
                    <Label className="form-label">
                      {t("Country")}
                      <span className="text-danger">*</span>
                    </Label>
                    <div className="form-input-content">
                      <Controller
                        name="countryId"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            value={optionCountry.find(
                              (val: any) => val.value === value
                            )}
                            onChange={(val: any) => onChange(val.value)}
                            placeholder={t("Select")}
                            classNamePrefix="select"
                            className="react-select"
                            options={optionCountry}
                          />
                        )}
                      />
                    </div>
                  </div>
                </Col>
                {type === "Add" ? (
                  <></>
                ) : (
                  <Col md={6} xs={6}>
                    <div className="d-flex form-row-inline label-small">
                      <Label className="form-label">
                        {t("Status")}
                        <span className="text-danger">*</span>
                      </Label>
                      <div className="form-input-content">
                        <Controller
                          name="status"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <Select
                              value={optionStatus.find(
                                (val: any) => val.value === value
                              )}
                              onChange={(val: any) => onChange(val.value)}
                              placeholder={t("Select")}
                              classNamePrefix="select"
                              className="react-select"
                              options={optionStatus}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </Col>
                )}
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="note"
                    type="textarea"
                    height={'105'}
                    label={t("Note")}
                    labelSize="label-small"
                    errors={errors.note}
                  />
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Scrollbars>
        <div
          className="d-flex justify-content-end p-1"
          style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}
        >
          {renderFooterButtons()}
        </div>
      </Form>
    </Modal>
  )
}

export default ModalComponent
