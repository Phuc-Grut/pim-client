// ** React Imports
import '@styles/react/libs/editor/editor.scss'
import { Fragment } from 'react'
import toast from 'react-hot-toast'
// import {useTranslation} from "react-i18next"

export const notificationError = (param: any) => {
  // const { t } = useTranslation()
  if (param && param.showCloseButton) {
    return (
      toast.error(
        <Fragment>
          <div onClick={() => toast.dismiss()} style={{cursor:'Pointer'}}>
            <div className="toastify-header">
              <div className="title-wrapper">
                <h6 className="toast-title">{param.text}</h6>
              </div>
            </div>
            <div className="toastify-body">
              <ul className="list-unstyled mb-0">
                <li></li>
              </ul>
            </div>
          </div>
        </Fragment>
      )
    )
  } else {
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
}

export const notificationSuccess = (param: any) => {
  // const { t } = useTranslation()
  if (param && param.showCloseButton) {
    return (
      toast.success(
        <Fragment>
          <div onClick={() => toast.dismiss()} style={{cursor:'Pointer'}}>
            <div className="toastify-header">
              <div className="title-wrapper">
                <h6 className="toast-title">{param} </h6>
                {/*<h6 className="toast-title">{param} {t("success")}</h6>*/}
              </div>
            </div>
            <div className="toastify-body">
              <ul className="list-unstyled mb-0">
                <li></li>
              </ul>
            </div>
          </div>
        </Fragment >
      )
    )
  } else {
    return (
      toast.success(
        <Fragment>
          <div className="toastify-header">
            <div className="title-wrapper">
              {/*<h6 className="toast-title">{param} {t("success")}</h6>*/}
              <h6 className="toast-title">{param}</h6>
            </div>
          </div>
          <div className="toastify-body">
            <ul className="list-unstyled mb-0">
              <li></li>
            </ul>
          </div>
        </Fragment >
      )
    )
  }
 
}
