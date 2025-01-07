// ** React Imports
import { Fragment } from 'react'
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content"
import toast from 'react-hot-toast'
import { TFunction } from 'react-i18next'
const MySwal = withReactContent(Swal)

export const notificationSuccess = (param: string) => {
  return (
    toast.success(
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title">{param}</h6>
          </div>
        </div>
        <div className="toastify-body">
          <ul className="list-unstyled mb-0">
            <li></li>
          </ul>
        </div>
      </Fragment>
    )
  )
}

export const messageBoxError = (t: TFunction<"translation", undefined>, message: string) => {
  MySwal.fire({
    title: t('Important'),
    text: t(message),
    allowOutsideClick: false,
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: t("Ok"),
    customClass: {
      cancelButton: "btn btn-danger ms-1"
    },
    buttonsStyling: false
  })
}

export const messageHtmlBoxError = (t: TFunction<"translation", undefined>, message: any[], title?: string) => {
  MySwal.fire({
    title: title ? t(title) : t('Important'),
    html: message.map((item, index: number) => {
      return (`<div style="min-width: 448px padding: 7px width:100% border: 1px solid #e0e0e0${index !== 0 ? ' border-top-width: 0px' : ''}">${item}</div>`)
    }).join(''),
    allowOutsideClick: false,
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: t("Ok"),
    width: 'auto',
    customClass: {
      cancelButton: "btn btn-danger ms-1"
    },
    buttonsStyling: false
  })
}

export const messageBoxConfirmDelete = (t: TFunction<"translation", undefined>, handle: any, data: any) => {
  MySwal.fire({
    title: t('Confirm'),
    text: t('Do you want to delete item?'),
    allowOutsideClick: false,
    showCancelButton: true,
    confirmButtonText: t('Delete'),
    cancelButtonText: t("Cancel"),
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-danger ms-1"
    },
    buttonsStyling: false
  }).then(async (result) => {
    if (result.value) {
      handle(data)
    }
  })
}

export const messageBoxConfirmApprove = (t: TFunction<"translation", undefined>, handle: any, data: any) => {
  MySwal.fire({
    title: t('Confirm'),
    text: t('Do you want to approve item?'),
    allowOutsideClick: false,
    showCancelButton: true,
    confirmButtonText: t('Approve'),
    cancelButtonText: t("Cancel"),
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-danger ms-1"
    },
    buttonsStyling: false
  }).then(async (result) => {
    if (result.value) {
      handle(data)
    }
  })
}

export const messageBoxConfirm = (t: TFunction<"translation", undefined>, handle: any, data: any, message: string) => {
  MySwal.fire({
    title: t('Confirm'),
    text: t(message),
    allowOutsideClick: false,
    showCancelButton: true,
    confirmButtonText: t('Ok'),
    cancelButtonText: t("Cancel"),
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-danger ms-1"
    },
    buttonsStyling: false
  }).then(async (result) => {
    if (result.value) {
      handle(data)
    }
  })
}

export const notificationError = (param: string) => {
  return (
    toast.error(
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title">{param}</h6>
          </div>
        </div>
        <div className="toastify-body">
          <ul className="list-unstyled mb-0">
            <li></li>
          </ul>
        </div>
      </Fragment>
    )
  )
}

export const messageBoxConfirm2 = async (t: TFunction<"translation", undefined>, data: any, data2: any, message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    MySwal.fire({
      title: t('Confirm'),
      text: t(message),
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: t('Ok'),
      cancelButtonText: t("Cancel"),
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1"
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}