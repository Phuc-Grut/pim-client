// ** React Imports
import { useContext, useEffect, useState } from 'react'
import { X, ChevronDown, ChevronUp } from 'becoxy-icons'
import { Row } from 'reactstrap'
import { Scrollbars } from 'react-custom-scrollbars'
import { Icon } from '@components/icon-file'
import CircleProgressBar from '@components/progress-bar'
import {  UploadFileContext } from '@src/utility/context/Upload'

const ModalUploadFile = () => {
  const [openDetail, setOpenDetail] = useState(true)
  // ** Function to run when sidebar opens
  const { uploadings, openModal, setOpenModalUploadFile } = useContext(UploadFileContext)

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const [windowSize, setWindowSize] = useState(getWindowSize())
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  const handleDetail = () => {
    setOpenDetail(!openDetail)
  }

  const handleModal = () => {
    setOpenModalUploadFile(!openModal)
  }

  return (
    <Row
      style={{ display: openModal ? 'flex' : 'none' }}
      className='modal-uploadding-file'
    >
      <div className="modal-header-uploadding-file d-flex align-items-center justify-content-between">
        <h6 className="modal-title-uploadding-file">Đang tải lên 5 mục</h6>
        <div className="todo-item-action d-flex align-items-center">
          <ChevronDown
            className="fw-normal mt-25 cursor-pointer mx-1"
            fontSize={20}
            style={{ display: openDetail ? '' : 'none' }}
            onClick={handleDetail}
          />
          <ChevronUp
            className="fw-normal mt-25 cursor-pointer mx-1"
            fontSize={20}
            style={{ display: !openDetail ? '' : 'none' }}
            onClick={handleDetail}
          />
          <X
            className="fw-normal mt-25 cursor-pointer"
            fontSize={20}
            onClick={handleModal}
          />
        </div>
      </div>
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMax={windowSize.innerHeight / 4}
        style={{ display: openDetail ? '' : 'none'}}
      >
        <Row>
          {uploadings?.map((element: any, index: number) => {
            return (
              <div key={index} className='item-uploadding-file d-flex align-items-center justify-content-between'>
                <Icon fileType={element.type} />
                <div>{element.name}</div>
                <CircleProgressBar circleWidth={25} percent={element.percent}></CircleProgressBar>
              </div>
            )
          })}
        </Row>
      </Scrollbars>
    </Row>
  )
}

export default ModalUploadFile
