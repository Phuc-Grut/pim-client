// ** React Imports
import { Fragment, useContext } from "react"
import { Modal, ModalBody, Button } from "reactstrap"
import "@styles/react/libs/editor/editor.scss"

import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from "react-i18next"
//import moment from 'moment'
import { ServiceAddContext } from "./useContext"
import ModalHeader from "@components/modal-header"
import { addPeriod } from "@src/utility/Common"
import themeConfig from "@src/configs/themeConfig"
import moment from "moment"

const ModalDetail = () => {
  // ** Props
  const { t } = useTranslation()
  const {
    openModalDetail,
    handleModalDetail,
    windowSize,
    dataItem
    // dataItem
  } = useContext(ServiceAddContext)
  // ** States

  // ** Function to run when sidebar opens
  const handleFormOpened = () => {}

  // ** Function to run when sidebar closes
  const handleModalDetailClosed = () => {}

  const renderFooterButtons = () => {
    return (
      <Fragment>
        <div className='d-flex justify-content-between align-items-center w-100'>
          <div>
            <p className='m-0'>
              <strong style={{ color: '#5e5873' }}>Ngày tạo:</strong> <span>{moment(dataItem.createdDate).utcOffset('+07:00').format(themeConfig.system.dateTimeFormat)}</span>
              <strong className='ms-2' style={{ color: '#5e5873' }}>Người tạo:</strong> <span>{dataItem.createdByName}</span>
            </p>
            <p className='m-0'>
              {dataItem.updatedDate && <>
                <strong style={{ color: '#5e5873' }}>Ngày sửa:</strong> <span>{moment(dataItem.updatedDate).utcOffset('+07:00').format(themeConfig.system.dateTimeFormat)}</span>
              </>}
              {dataItem.updatedBy &&
          <>
            <strong style={{ color: '#5e5873' }} className='ms-2'>Người sửa:</strong> <span>{dataItem.updatedByName}</span>
          </>
              }
            </p>
          </div>
          <div>
            <Button color='secondary' onClick={handleModalDetail} outline>
              {t('Close')}
            </Button>
          </div>
        </div>
      </Fragment>
    )
  }

  return (
    <Modal
      isOpen={openModalDetail}
      backdrop="static"
      toggle={handleModalDetail}
      className="modal-dialog-centered modal-lg-1 modal-detail"
      contentClassName="p-0"
      onOpened={handleFormOpened}
      onClosed={handleModalDetailClosed}
    >
      <ModalHeader
        handleModal={handleModalDetail}
        typeModal="View"
        title="ServiceAdd"
      />
      <Scrollbars
        
        autoHide
        autoHeight
        autoHeightMax={windowSize.innerHeight - 180}
      >
        <ModalBody>
          <div className="row-detail">
            <span className="row-detail__label">{t("ServiceCode")}:</span>

            <p className="row-detail__content">{dataItem.code}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("ServiceName")}:</span>

            <p className="row-detail__content">{dataItem.name}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("Description")}:</span>

            <p className="row-detail__content">{dataItem.description}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("CalculationMethod")}:</span>

            <p className="row-detail__content">
              {dataItem.calculationMethod === 0 ? "Cố định" : dataItem.calculationMethod === 1 ? "Biến động" : ""}
            </p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("Currency")}:</span>

            <p className="row-detail__content">{dataItem.currency}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("FixPrice")}:</span>

            <p className="row-detail__content">{addPeriod(dataItem.price)}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("MinPrice")}:</span>

            <p className="row-detail__content">
              {addPeriod(dataItem.minPrice)}
            </p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("MaxPrice")}:</span>

            <p className="row-detail__content">
              {addPeriod(dataItem.maxPrice)}
            </p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("PriceSyntax")}:</span>

            <p className="row-detail__content">{dataItem.priceSyntax}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("Status")}:</span>

            <p className="row-detail__content">
              {dataItem.status === 1 ? t("Active") : t("Inactive")}
            </p>
          </div>
        </ModalBody>
      </Scrollbars>
      <div
        className="d-flex justify-content-end p-1"
        style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}
      >
        {renderFooterButtons()}
      </div>
    </Modal>
  )
}

export default ModalDetail
