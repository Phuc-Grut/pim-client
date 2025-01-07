import { Fragment } from "react"
import toast from "react-hot-toast"

export const notificationSuccess = (title: string) => {
  return (
    toast.success(
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title mt-50">{title}</h6>
          </div>
        </div>
        {/* <div className="toastify-body">
          <ul className="list-unstyled mb-0">
            <li>ádadaads</li>
          </ul>
        </div> */}
      </Fragment>
    )
  )
}

export const notificationError = (title: string) => {
  return (
    toast.error(
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title mt-50">{title}</h6>
          </div>
        </div>
      </Fragment>
    )
  )
}