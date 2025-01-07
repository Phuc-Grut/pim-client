// ** React Imports
import { Fragment, useContext } from 'react'
import * as Icon from 'becoxy-icons'
import {
  Modal,
  ModalBody,
  Button
} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'

import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
//import moment from 'moment'
import { ProductAttributeContext } from '../useContext'
import ModalHeader from "@components/modal-header"
import ModalOptionsComponent from './modalOption'
import moment from 'moment'
import themeConfig from '@src/configs/themeConfig'


const ModalDetail = () => {
  // ** Props
  const { t } = useTranslation()
  const {
    openModalDetail,
    handleModalDetail,
    windowSize,
    dataItem
    // dataItem
  } = useContext(ProductAttributeContext)
  // ** States

  // ** Function to run when sidebar opens
  const handleFormOpened = () => {
  }

  // ** Function to run when sidebar closes
  const handleModalDetailClosed = () => {
  }

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
      backdrop='static'
      toggle={handleModalDetail}
      className='modal-dialog-centered modal-lg-1 modal-detail'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleModalDetailClosed}
    >
      <ModalHeader handleModal={handleModalDetail} typeModal='View' title='Product attribute' />
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMax={windowSize.innerHeight - 180}>
        <ModalBody>
          <section>
            <div className='box form-box__border mb-3' style={{ padding: '15px' }}>
              <h5 className="m-0 form-box__border--title">{t('General information')}</h5>
              <div className='row-detail'>
                <span className='row-detail__label'>{t('Product attribute code')}:</span>

                <p className='row-detail__content'>{dataItem.code}</p>
              </div>
              <div className='row-detail'>
                <span className='row-detail__label'>{t('Product attribute name')}:</span>

                <p className='row-detail__content'>{dataItem.name}</p>
              </div>
              <div className='row-detail'>
                <span className='row-detail__label'>{t('SearchType')}:</span>

                <p className='row-detail__content'>{dataItem.searchType === 1 ? 'Chọn một' : 'Chọn nhiều'}</p>
              </div>
              <div className='row-detail'>
                <span className='row-detail__label'>{t('Allow filtering')}:</span>

                <p className='row-detail__content'>{dataItem.allowFiltering ? <Icon.Check fontSize={12} /> : <Icon.X fontSize={12} />}</p>
              </div>
              <div className='row-detail'>
                <span className='row-detail__label'>{t('Status')}:</span>

                <p className='row-detail__content'>{dataItem.status === 1 ? t("Active") : t("Inactive")}</p>
              </div>
              <div className='row-detail'>
                <span className='row-detail__label'>{t('Display order')}:</span>

                <p className='row-detail__content'>{dataItem.displayOrder}</p>
              </div>
            </div>
          </section>
          <section>
            <div className='box form-box__border mb-3' style={{ padding: '15px' }}>
              <h5 className="m-0 form-box__border--title">{t('Select Option')}</h5>
              <ModalOptionsComponent />
            </div>
          </section>
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
