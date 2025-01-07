// ** React Imports
import { Fragment, useContext, useState } from "react"
import {
  Modal,
  ModalBody,
  Button,
  Badge,
  Table
} from "reactstrap"
import "@styles/react/libs/editor/editor.scss"
import ModalHeader from "@components/modal-header"
import { CategoryContext } from "./useContext"
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from "react-i18next"
import moment from "moment"
import themeConfig from "@src/configs/themeConfig"
import { useProductTag } from "../catalog/product-tag/hooks"

const ModalDetail = () => {
  const { t } = useTranslation()
  const { getListProductTagApi } = useProductTag()
  const [keywords, setKeywords] = useState<any[]>([])
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
  // ** Props
  const {
    openModalDetail,
    handleModalDetail,
    windowSize,
    dataItem,
    typeModal
  } = useContext(CategoryContext)
  // ** States

  // ** Function to run when sidebar opens
  const handleFormDetailOpened = () => {
    getListProductTagApi({$status: 1})
      .unwrap()
      .then((rs: any[]) => {

        if (dataItem?.keywords) {
          const listTag: string[] = dataItem?.keywords?.split(",")
          const result = rs.filter(x => listTag.includes(x.value))
          const newKeywords = listTag.map(tag => {
            const matchedResult = result.find(x => x.value === tag)
            return matchedResult ? matchedResult.label : tag
          })
          setKeywords(newKeywords)
        }
      })
  }

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
  
  const handleName = (data: any) => {
    if (!data) {
      return ""
    }
    return (
      <div>
        {keywords.map((x: any) => (
          <Badge key={x} ml-1 className="text-capitalize " color={"warning"}>
            {x}
          </Badge>
        ))}
      </div>
    )
  }
  const jsonDataArray = dataItem.jsonData ? JSON.parse(dataItem.jsonData) : []
  const renderTableBody = () => {
    if (!jsonDataArray || jsonDataArray.length === 0) {
      return ""
    }
    return (
      <Table style={{ fontSize: "1rem" }}>
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: "#EFF3FF",
                textTransform: "capitalize"
              }}
            >
              {t("Code")}
            </th>
            <th
              style={{
                backgroundColor: "#EFF3FF",
                textTransform: "capitalize"
              }}
            >
              {t("Value")}
            </th>
          </tr>
        </thead>
        <tbody>
          {jsonDataArray?.map((item: any, index: any) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.value}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
  return (
    <Modal
      isOpen={openModalDetail}
      backdrop="static"
      keyboard={false}
      toggle={handleModalDetail}
      className="modal-dialog-centered modal-lg"
      contentClassName="p-0"
      onOpened={handleFormDetailOpened}
      onClosed={handleModalDetailClosed}
    >
      <ModalHeader
        handleModal={handleModalDetail}
        typeModal={typeModal}
        title="Channel List"
      />
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMax={windowSize.innerHeight - 180}
      >
        <ModalBody>
          <div className="row-detail">
            <span className="row-detail__label">
              {t("CategoryProductCode")}:
            </span>

            <p className="row-detail__content">{dataItem.code}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">
              {t("CategoryProductName")}:
            </span>

            <p className="row-detail__content">{dataItem.name}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("ParentCategory")}:</span>

            <p className="row-detail__content">{dataItem.parentCategoryName}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("Image")}:</span>

            <p className="row-detail__content">{dataItem.image}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("Url")}:</span>

            <p className="row-detail__content">{dataItem.url}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("Keyword")}:</span>

            <p className="row-detail__content">
              {handleName(dataItem.keywords)}
            </p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("Description")}:</span>

            <p className="row-detail__content">{dataItem.description}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("Status")}:</span>

            <p className="row-detail__content">
              {t(
                optionStatus.find((x: any) => x.value === dataItem.status)
                  ?.label || ""
              )}
            </p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("Attribute")}:</span>

            <div className="row-detail__content">{renderTableBody()}</div>
          </div>
          {/* <section>
            <div className='box p-0'>
              <Row className='m-0'>
                <Col lg={6} md={12} xs={12} className='p-0'>
                  <div className='d-flex form-row-inline label-large'>
                    <Label className='form-label'>{t("CategoryProductCode")}</Label>
                    <div className='form-input-content'>
                      <p>{dataItem.code}</p>
                    </div>
                  </div>
                </Col>
                <Col lg={6} md={12} xs={12} className='p-0'>
                  <div className='d-flex form-row-inline label-large'>
                    <Label className='form-label'>{t("CategoryProductName")}</Label>
                    <div className='form-input-content'>
                      <p>{dataItem.name}</p>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className='m-0'>
                <Col lg={6} md={12} xs={12} className='p-0'>
                  <div className='d-flex form-row-inline label-large'>
                    <Label className='form-label'>{t("ParentCategory")}</Label>
                    <div className='form-input-content'>
                      <p>{dataItem.parentCategoryName}</p>
                    </div>
                  </div>
                </Col>
                <Col lg={6} md={12} xs={12} className='p-0'>
                  <div className='d-flex form-row-inline label-large'>
                    <Label className='form-label'>{t("Keyword")}</Label>
                    <div className='form-input-content'>
                      {handleName(dataItem.keywords)}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className='m-0'>
                <Col lg={6} md={12} xs={12} className='p-0'>
                  <div className='d-flex form-row-inline label-large'>
                    <Label className='form-label'>{t("Description")}</Label>
                    <div className='form-input-content'>
                      <p>{dataItem.description}</p>
                    </div>
                  </div>
                </Col>
                <Col lg={6} md={12} xs={12} className='p-0'>
                  <div className='d-flex form-row-inline label-large'>
                    <Label className='form-label'>{t("Status")}</Label>
                    <div className='form-input-content'>
                      <p>{t(optionStatus.find((x: any) => x.value === dataItem.status)?.label || '')}</p>
                    </div>
                  </div>
                </Col>
              </Row>
             
            </div>
          </section> */}
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
