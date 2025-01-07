import ModalHeader from '@components/modal-header'
import React, { useContext } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { Badge, Col, Label, Modal, ModalBody, Row } from 'reactstrap'
import { ProductTopicPageContext } from '../useContext'
import ModalFooterView from '@components/modal-footer-view'
import { useTranslation } from 'react-i18next'

const ModalView = () => {
  const { t } = useTranslation()
  const {
    openModalDetail,
    handleModalDetail,
    setDataItem,
    windowSize,
    dataItem
  } = useContext(ProductTopicPageContext)

  const statusObj: any = {
    0: 'light-secondary',
    1: 'light-success'
  } 
  
  const optionStatusObj: any = {
    0: 'Inactive',
    1: 'Active'
  }
    
  const handleFormOpened = async () => {
  }

  const handleModalDetailClosed = () => {
    setDataItem({})
  }

  return (
    <Modal
      isOpen={openModalDetail}
      backdrop='static'
      toggle={handleModalDetail}
      className='modal-dialog-centered modal-lg modal-detail'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleModalDetailClosed}
    >
      <ModalHeader typeModal='Detail' handleModal={handleModalDetail} title='Product topic page'/>
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMax={windowSize.innerHeight - 180}>
        <ModalBody> 
          <div className='box form-box__border mb-2'>
            <Row className='m-0'> 
              <Col lg={12} md={12} xs={12} className='p-0'>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Code')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.code}</p>
                  </div>
                </div>
              </Col>   
              <Col lg={12} md={12} xs={12} className='p-0'>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Name')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.name}</p>
                  </div>
                </div>
              </Col> 
              <Col lg={12} md={12} xs={12} className='p-0'>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Subject')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.slug}</p>
                  </div>
                </div>
              </Col> 
              <Col lg={12} md={12} xs={12} className='p-0'>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Template')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.description}</p>
                  </div>
                </div>
              </Col>           
              <Col lg={12} md={12} xs={12} className='p-0'>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Sender')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.keywords}</p>
                  </div>
                </div>
              </Col> 
              <Col lg={12} md={12} xs={12} className='p-0'>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Compaign data')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.image}</p>
                  </div>
                </div>
              </Col> 
              <Col lg={12} md={12} xs={12} className='p-0'>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Prefetch count')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.icon}</p>
                  </div>
                </div>
              </Col> 
              <Col lg={12} md={12} xs={12} className='p-0'>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Deplay')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.icon2}</p>
                  </div>
                </div>
              </Col> 
              <Col lg={12} md={12} xs={12} className='p-0'>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Deplay')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.tags}</p>
                  </div>
                </div>
              </Col> 
              <Col lg={12} md={12} xs={12} className='p-0'>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Status')}</Label>
                  <div className='form-input-content'>
                    <Badge className='text-capitalize' color={statusObj[dataItem.status]} pill>
                      {t(optionStatusObj[dataItem.status])}
                    </Badge>
                  </div>
                </div>
              </Col> 
            </Row>
          </div>
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