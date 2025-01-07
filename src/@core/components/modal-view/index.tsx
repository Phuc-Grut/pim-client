import ModalHeader from '@components/modal-header'
import React, { FC } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { Col, Label, Modal, ModalBody, Row } from 'reactstrap'
import ModalFooterView from '@components/modal-footer-view'
import { useTranslation } from 'react-i18next'

export interface IFieldView {
  value: string | number | JSX.Element
  label: string
  col?: number
  isHidden?: boolean
}

interface IPropsModalView {
  renderFields: IFieldView[]
  openModalDetail: boolean
  setDataItem: any
  windowSize: {
    innerWidth: number
    innerHeight: number
  }
  dataItem: any
  titleHeader: string
  labelSize?: "small" | "medium" | "large"
  modalSize?: "xl" | "lg" | "lg-1"
  handleModalDetail: () => void
  handleModalOpen?: () => void
  handleModalClose?: () => void
  Tabs?: () => JSX.Element
}

const ModalView: FC<IPropsModalView> = (props) => {
  const { 
    openModalDetail, 
    setDataItem, 
    windowSize, 
    dataItem, 
    renderFields, 
    titleHeader, 
    labelSize,
    modalSize,
    Tabs,
    handleModalDetail, 
    handleModalOpen,
    handleModalClose
  } = props
  const { t } = useTranslation()

  const handelOnOpened = () => {

  }

  const handleOnClosed = () => {
    setDataItem({})
  }

  return (
    <Modal
      isOpen={openModalDetail}
      backdrop='static'
      toggle={handleModalDetail}
      className={`modal-dialog-centered modal-${modalSize ? modalSize : "lg"} modal-detail`}
      contentClassName='p-0'
      onOpened={handleModalOpen ?? handelOnOpened}
      onClosed={handleModalClose ?? handleOnClosed}
    >
      <ModalHeader typeModal='Detail' handleModal={handleModalDetail} title={titleHeader}/>
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMax={windowSize.innerHeight - 180}>
        <ModalBody>
          <div className='box form-box__border mb-2'>
            <h5 className="m-0 form-box__border--title">{t("General information")}</h5>
            <Row className="m-0">
              {
                renderFields.map((item: IFieldView, index: number) => (
                  <Col lg={item.col ? item.col : 12} md={12} xs={12} className={`p-0 ${item.isHidden ? "d-none" : ""}`} key={`${item.value} - ${index}`}>
                    <div className={`d-flex form-row-inline label-${labelSize ? labelSize : "medium"}`}>
                      <Label className='form-label'>{t(item.label)}</Label>
                      <div className='form-input-content'>
                        <p>{item.value}</p>
                      </div>
                    </div>
                  </Col>
                ))
              }
            </Row>
          </div>
          {Tabs && <Tabs />}
        </ModalBody>
      </Scrollbars>
      <div
        className="d-flex justify-content-end p-1"
        style={{boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)"}}
      >
        <ModalFooterView
          createdDate={dataItem.createdDate}
          createdByName={dataItem.createdByName}
          updatedDate={dataItem.updatedDate}
          updatedByName={dataItem.updatedByName}
          handleModal={handleModalDetail}
        />
      </div>
    </Modal>
  )
}

export default ModalView