// ** React Imports
import { Fragment, useContext, useEffect, useState } from "react"
import { X, Minus, Plus } from "becoxy-icons"
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
import "@styles/react/libs/editor/editor.scss"
import InputNumber from "rc-input-number"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { isObjEmpty } from "@src/utility/Utils"
import { CountryContext } from "./useContext"
import { Scrollbars } from 'react-custom-scrollbars'
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useCountry } from "./hooks"
import { IFDataCountry } from "@src/domain/models/ICountry"
import {TextInput} from "@components/input"
import {SelectBox} from "@components/select"

const ModalHeader = (props: any) => {
  // ** Props
  const { children, handleModal } = props

  return (
    <div className="modal-header d-flex align-items-center justify-content-between mb-1">
      <h5 className="modal-title">{children}</h5>
      <div className="todo-item-action d-flex align-items-center">
        <X
          className="fw-normal mt-25 cursor-pointer"
          fontSize={16}
          onClick={handleModal}
        />
      </div>
    </div>
  )
}

const ModalComponent = () => {
  // ** Props
  const { t } = useTranslation()
  const { openModal, handleModal, dataItem, typeModal } =
    useContext(CountryContext)
  // ** States
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const { addCountryApi, editCountryApi } = useCountry()

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
    localName: yup.string().max(255, "The local name less than 255 characters"),
    note: yup.string().max(500, "The note less than 500 characters")
  })

  const defaultValues: IFDataCountry = {
    note: "",
    id: "",
    code: "",
    name: "",
    shortName: "",
    localName: "",
    displayOrder: 0,
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
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm<IFDataCountry>({
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
      Object.entries(dataItem).forEach(([name, value]: any) => {
        if (name.includes("Date") || name.includes("date")) {
          setValue(name, value ? new Date(value) : undefined)
        } else {
          setValue(name, value)
        }
      })
    } else {
      reset()
    }
  }

  // ** Function to run when sidebar closes
  const handleFormClosed = () => {
    clearErrors()
  }
  const handlehandleFormTitle = () => {
    if (typeModal === "Edit") {
      return t("Update")
    } else if (typeModal === "Add") {
      return t("Add new")
    } else if (typeModal === "Copy") {
      return t("Copy")
    } else if (typeModal === "Open") {
      return t("Open")
    }
  }
  // ** Function to reset fileds
  const handleCancel = () => {
    handleModal()
  }

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (typeModal === "Edit") {
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
    } else if (typeModal === "Copy" || typeModal === "Add") {
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
    } else if (typeModal === "Open") {
      return (
        <Fragment>
          <Button color="secondary" onClick={handleModal} outline>
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
  const onSubmit = (data: any) => {
    if (typeModal === "Add") {
      addCountryApi(data)
        .unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModal()
            notificationSuccess("Thêm mới")
          } else {
            for (let i = 0; i < rs.errors.length; i++) {
              setError(rs.errors[i].propertyName.toLowerCase(), {
                type: "custom",
                message: t(rs.errors[i].errorMessage)
              })
            }
          }
        })
        .catch((ex) => console.log(ex))
    } else {
      editCountryApi(data)
        .unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModal()
            notificationSuccess("Cập nhật")
          } else {
            for (let i = 0; i < rs.errors.length; i++) {
              setError(rs.errors[i].propertyName.toLowerCase(), {
                type: "custom",
                message: t(rs.errors[i].errorMessage)
              })
            }
          }
        })
        .catch((ex) => console.log(ex))
    }
  }
  return (
    <Modal
      isOpen={openModal}
      toggle={handleModal}
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
        <ModalHeader handleModal={handleModal}>
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
                    label={t("Country code")}
                    disabled={typeModal === "Detail"}
                    required={true}
                    labelSize="d-flex form-row-inline label-medium"
                    errors={errors.code}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="name"
                    label={t("Country name")}
                    disabled={typeModal === "Detail"}
                    required={true}
                    labelSize="d-flex form-row-inline label-medium"
                    errors={errors.name}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="shortName"
                    label={t("Short name")}
                    disabled={typeModal === "Detail"}
                    required={true}
                    labelSize="d-flex form-row-inline label-medium"
                    errors={errors.shortName}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="localName"
                    label={t("Local name")}
                    disabled={typeModal === "Detail"}
                    required={true}
                    labelSize="d-flex form-row-inline label-medium"
                    errors={errors.shortName}
                  />
                </Col>
                <Col md={6} xs={6}>
                  <div className="d-flex form-row-inline label-small">
                    <Label className="form-label">{t("Display Order")}</Label>
                    <div className="form-input-content">
                      <Controller
                        name="displayOrder"
                        control={control}
                        render={({ field }) => (
                          <InputNumber
                            upHandler={<Plus />}
                            downHandler={<Minus />}
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </div>
                </Col>
                <Col md={12} xs={12}>
                  <SelectBox
                    control={control}
                    name="status"
                    labelSize="label-medium"
                    label={t("Status")}
                    disabled={typeModal === "Detail"}
                    errors={errors.status}
                    placeholder={t("Select")}
                    options={optionStatus}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="note"
                    type="textarea"
                    label={t("Note")}
                    row={3}
                    disabled={typeModal === "Detail"}
                    required={false}
                    labelSize="d-flex form-row-inline label-medium"
                    errors={errors.shortName}
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
