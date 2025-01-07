import {Input, Button, ModalBody, Modal, DropdownToggle, DropdownMenu, DropdownItem, Dropdown} from "reactstrap"
// import classnames from "classnames"
import avatarDefault from '@src/assets/images/avatars/avatar-blank.png'
import { useTranslation } from "react-i18next"
import {CDN_URL_VIEW, UPLOADFILE} from "@src/domain/constants"
import {Fragment, useEffect, useRef, useState} from "react"
import {UploaderComponent} from "@syncfusion/ej2-react-inputs"
import {L10n, loadCldr} from "@syncfusion/ej2-base"
import styled from "styled-components"
import ModalHeader from "@components/modal-header"
import {X} from "becoxy-icons"
import {notificationError} from "@components/notifications"
import {useOnClickOutside} from "@hooks/useOnClickOutside"

const UploadContainer = styled.div`
  .box-image-preview{
    position: relative;
    .action-reset {
      position: absolute;
      top: 0px;
      right: 2px;
      width: fit-content;
      height: fit-content;
    }
    .btn-reset {
      width: 15px;
      height: 15px;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
    }
  }

`

const UploadStyle = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .e-upload {
    width: auto;
    margin-right: 10px;
    .e-upload-files{
      display: none;
    }
    & .e-file-select-wrap {
      padding: 0 5px;
      .e-btn, .e-css.e-btn {
        box-shadow: none;
        background: none;
      }
      .e-file-drop {
        display: none;
      }
    }
  }

`

type Props = {
  id?: string,
  height?: number,
  width?: number | string | undefined,
  callback?: any,
  image?: string
  defaultImage?: string
  onKeyDown?: any
}

const ImageUpload = ({ height, width, callback, image, defaultImage, id, onKeyDown }: Props) => {
  // const { t } = useTranslation()
  
  const dropdownRef: any = useRef()

  const lag = window.localStorage.getItem('i18nextLng')
  const lang = lag ? lag : 'vi'
  loadCldr()
  L10n.load(require(`@public/assets/data/locales/${lang}.json`)) // load corresponding culture text

  const uploadObj: any = useRef()

  const asyncSettings: any = {
    // chunkSize: 28400,
    retryCount: 1,
    saveUrl: UPLOADFILE.URL_API.UPLOAD_IMAGE_API
  }

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [path, setPath] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    if (image) {
      setPath(image)
    }

  }, [image])

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  useOnClickOutside(dropdownRef, () => {
    setDropdownOpen(false)
  })

  const uploading = (args: any) => {
    const xhr = args.currentRequest as XMLHttpRequest
    xhr.withCredentials = true
  }
  const onUploadSuccess = (args: any) => {
    const jsonUrl = args.e.currentTarget.response
    if (jsonUrl && JSON.parse(jsonUrl).path) {
      const path = JSON.parse(jsonUrl).path
      setPath(path)
      callback(path)
    }
  }

  const handleRemove = () => {
    const fileData = uploadObj.current.filesData
    uploadObj?.current?.remove(fileData[0], false, true)
  }


  const uploadFailure = () => {
    notificationError(t('UploadFail'))
  }


  // const chunkFailure = (args: any) => {
  //   console.log(args)
  //   notificationError(t('UploadFail'))
  // }


  const handleModal = () => {
    setOpenModal(!openModal)
  }
  const handleModalOpened = () => {}
  const handleModalClosed = () => {}

  const { t } = useTranslation()
  
  const renderImage = () => {

    return (
      <Fragment>
        <img
          className='rounded'
          alt='Generic placeholder image'
          style={{maxHeight: '100%', maxWidth: '100%'}}
          src={(!path || path === '') ? (defaultImage ? defaultImage : avatarDefault) : path.startsWith("http") ? path : `${CDN_URL_VIEW}/${path}`}
        />
      </Fragment>
    )

  }

  return (
    <Fragment>
      <div id={id} className="d-flex" onKeyDown={(e: any) => onKeyDown(e, path)}>

        <UploadContainer id={'UploadContainer'}>
          <div className='form-input-content'>
            <div className='d-flex flex-wrap position-relative justify-content-center align-items-center'>

              <div className='box-image-preview me-1 p-25 rounded border border-1 d-flex justify-content-center align-items-center' style={{width, height}}>
                {renderImage()}
                <div className='action-reset'>
                  <Button className='btn-reset btn btn-primary' color='primary' size='sm' outline onClick={() => {
                    setPath('')
                    callback('')
                    handleRemove()
                  }}>
                    <X fontSize={12} />
                  </Button>
                </div>
              </div>
              
              <div className='position-absolute'>
                <Dropdown direction='start'  isOpen={dropdownOpen} toggle={handleDropdown}>
                  <DropdownToggle tag='div' onClick={handleDropdown}>
                    <span>Chọn ảnh</span>
                  </DropdownToggle>

                  <DropdownMenu
                    id='test-id'
                    className='formula-dropdown icon-dropdown'
                    style={{width: 200, position: 'fixed'}}
                    container={'UploadContainer'}
                  >
                    <DropdownItem   className='ps-0 pe-0 pt-50 pb-50' style={{borderRadius: '6px', height: '100%'}} tag='div' header>
                      {/*<div className='d-flex flex-column px-50 justify-content-center' ref={dropdownRef}>*/}
                      <div className='' ref={dropdownRef}>
                        <UploadStyle>
                          <UploaderComponent
                            id='fileUpload'
                            locale={lang}
                            autoUpload={true}
                            allowedExtensions={'.jpg, .jpeg, .png, .gif'}
                            type='file'
                            ref={uploadObj}
                            multiple={false}
                            asyncSettings={asyncSettings}
                            uploading={uploading}
                            failure={uploadFailure}
                            success={(args: any) => onUploadSuccess(args)}
                            showFileList={false}
                            // chunkFailure={chunkFailure}
                          />

                          <Button className='btn btn-primary' color='primary' size='sm' outline onClick={() => setOpenModal(true)}>
                            {t('Link')}
                          </Button>
                        </UploadStyle>
                      </div>
                    </DropdownItem>

                  </DropdownMenu>

                </Dropdown >
              </div>
              

              <Modal
                isOpen={openModal}
                toggle={handleModal}
                className='modal-dialog-centered modal-lg'
                contentClassName='p-0'
                onOpened={handleModalOpened}
                onClosed={handleModalClosed}
                keyboard={false}
                backdrop='static'
                scrollable
              >
                <ModalHeader handleModal={handleModal} typeModal={'Add'} title="AddLinkImage" />
                <ModalBody className='p-1'>
                  <Input
                    value={link}
                    onChange={(e: any) => setLink(e.target.value)}
                    placeholder={t('VD: https://hinh-anh.jpg')}
                  />
                </ModalBody>
                <div
                  className='d-flex justify-content-end p-1'
                  style={{ boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)' }}
                >
                  <Fragment>
                    <Button color='primary' className='add-todo-item me-1'>
                      <div onClick={() => {
                        setPath(link)
                        callback(link)
                        handleModal()
                      }}>{t('Save')}</div>
                    </Button>
                    <Button color='secondary' onClick={() => {
                      handleModal()
                      setLink('')
                    }} outline>
                      {t('Close')}
                    </Button>
                  </Fragment>
                </div>

              </Modal>
            </div>
          </div>
        </UploadContainer>
      </div>
    </Fragment>
  )

}

export default ImageUpload