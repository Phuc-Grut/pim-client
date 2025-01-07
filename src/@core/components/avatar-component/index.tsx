import { Controller } from "react-hook-form"
import { Label, FormFeedback, Input, Button, Modal, ModalBody } from "reactstrap"
import classnames from "classnames"
import avatarDefault from '@src/assets/images/avatars/no-image.jpg'
import { useTranslation } from "react-i18next"
import { BASE_URL_CDN } from "@src/domain/constants"
import { X } from "becoxy-icons"
import { Fragment, useState } from "react"
import ModalHeader from "@components/modal-header"
import { isNullOrUndefined } from "@src/utility/hooks/isNullOrUndefined"

const AvatarComponent = ({ control, name, labelSeize, errors, height, width, disabled, callback, isUseLink }: any) => {
  const { t } = useTranslation()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [link, setLink] = useState('')
  const handleModal = () => {
    setOpenModal(!openModal)
  }
  const handleModalOpened = () => {
  }
  const handleModalClosed = () => {
    setLink('')
  }
  return (
    <>
      <div
        className={classnames({
          [labelSeize]: labelSeize,
          'form-row-inline-error': errors
        })}
      >
        {labelSeize ? <Label className="form-label" for={name}> </Label> : ''}
        <div className='form-input-content'>
          <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <div className='d-flex'>
                  <div className='me-25 position-relative img-wrap'>
                    <span className="position-absolute b-1 btn-remove d-block" onClick={() => onChange('')}><X fontSize={15} color='red' strokeWidth={4} /></span>
                    <div className='rounded me-50 border' style={{ overflow: 'Hidden' }}>
                      <img 
                        alt='' 
                        src={(!isNullOrUndefined(link) && link !== '') ? link : (value ? ((typeof (value) === 'string') ? (`${BASE_URL_CDN}/${value}`) : URL.createObjectURL(value)) : avatarDefault)} 
                        width={width} height={height} />
                    </div>
                  </div>
                  {isUseLink === true && <Modal
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
                        onChange={(val: any) => {
                          setLink(val.target?.value)
                        }}
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
                            onChange(link)
                            handleModal()
                          }}>{t('Save')}</div>
                        </Button>
                        <Button color='secondary' onClick={() => {
                          handleModal()
                          onChange('')
                        }} outline>
                          {t('Close')}
                        </Button>
                      </Fragment>
                    </div>

                  </Modal>}
                  <div className='d-flex align-items-end mt-75 ms-1'>
                    {disabled ? null : <div>
                      <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                        {t('Upload')}
                        <Input type='file' onChange={(e: any) => {
                          onChange(e.target.files[0])
                          setLink('')
                          if (callback) {
                            callback(e)
                          }
                        }} hidden accept='image/*' />
                      </Button>
                      {isUseLink === true && <Button tag={Label} className='mb-75 me-75' size='sm' color='primary' onClick={() => setOpenModal(!openModal)}>
                        {t('Link')}
                      </Button>}
                      {/* <Button className='mb-75' color='secondary' size='sm' outline onClick={() => onChange('')}>
                        {t('Reset image')}
                      </Button> */}
                      <p className='mb-0'>{t('jpg, gif or png')}</p>
                    </div>
                    }
                  </div>
                </div>
              )
            }}
          />
          {errors && <FormFeedback>{errors?.message}</FormFeedback>}
        </div>
      </div>
    </>
  )
}
export default AvatarComponent