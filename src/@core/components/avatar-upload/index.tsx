import {Label, Input, Button, ModalBody, Modal, FormFeedback} from "reactstrap"
import classnames from "classnames"
import avatarDefault from '@src/assets/images/avatars/avatar-blank.png'
import productDefault from '@src/assets/images/avatars/default-pro.jpg'
import { useTranslation } from "react-i18next"
import {CDN_URL_VIEW, UPLOADFILE} from "@src/domain/constants"
import {Fragment, useEffect, useRef, useState} from "react"
import {UploaderComponent} from "@syncfusion/ej2-react-inputs"
import {L10n, loadCldr} from "@syncfusion/ej2-base"
import styled from "styled-components"
import ModalHeader from "@components/modal-header"
import {X} from "becoxy-icons"
import {notificationError} from "@components/notifications"

const UploadContainer = styled.div`
  .box-image-preview{
    position: relative;
    .action-reset {
      position: absolute;
      top: -8px;
      right: -8px;
      width: fit-content;
      height: fit-content;
    }
    .btn-reset {
      width: 20px;
      height: 20px;
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
  name: string,
  labelSize?: any,
  errors?: any,
  height?: number,
  width?: number,
  callback?: any,
  image?: string
  isLabel?: boolean
  inLine?: boolean
  label?: string
  type?: 'Product' | 'User'
}

const AvatarUpload = ({ name, labelSize, errors, height, width, callback, image, isLabel, label, inLine, type }: Props) => {
  // const { t } = useTranslation()

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
  const [path, setPath] = useState('')
  const [link, setLink] = useState('')

  const imageDefault = type === 'Product' ? productDefault : avatarDefault

  useEffect(() => {
    if (image) {
      setPath(image)
    }

  }, [image])

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

  const renderLabel = () => {
    return (
      <Fragment>
        {isLabel === false ? '' : <Label className="form-label" for={name}>{label}</Label>}
      </Fragment>
    )
  }

  const renderImage = () => {

    return (
      <Fragment>
        <img
          className='rounded'
          alt='Generic placeholder image'
          style={{maxHeight: '100%', maxWidth: '100%'}}
          src={(!path || path === '') ? imageDefault : path.startsWith("http") ? path : `${CDN_URL_VIEW}/${path}`}
        />
      </Fragment>
    )

  }
  return (
    <Fragment>
      <div className="d-flex">
        <div
          className={classnames(' align', {
            [labelSize]: labelSize,
            'form-row-inline-error': errors
          }, inLine === false ? 'form-group ' : 'form-row-inline d-flex')}
        >
          {renderLabel()}
          {errors && <FormFeedback>{errors?.message}</FormFeedback>}
        </div>


        <UploadContainer>
          {labelSize.includes('d-flex form-row-inline') ? <Label className="form-label" for={name}> </Label> : <></>}
          <div className='form-input-content'>
            <div className='d-flex flex-wrap'>

              <div className='box-image-preview me-1 p-25 mb-75 rounded border border-1 d-flex justify-content-center align-items-center' style={{width, height}}>


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

              <div className='d-flex flex-column justify-content-center'>
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
                <p className='mb-0 mt-50'>{t('Allowed jpg, gif or png')}</p>

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
                <ModalHeader handleModal={handleModal} typeModal={'Add'} title="AddImage" />
                <ModalBody className='p-1'>
                  <Input
                    value={link}
                    onChange={(e: any) => setLink(e.target.value)}
                    placeholder={t('LinkImage')}
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

export default AvatarUpload