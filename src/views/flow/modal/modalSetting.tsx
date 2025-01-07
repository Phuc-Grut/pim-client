import {Fragment, useContext} from "react"
import {Button, Col, Form, Modal, ModalBody, Row} from "reactstrap"
import {Scrollbars} from "react-custom-scrollbars"
import {useTranslation} from "react-i18next"

import {FlowContext} from "@src/views/flow/useContext"
import {X} from "becoxy-icons"
import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup/dist/yup"
import {TextInput} from "@components/input"
import {SelectBox} from "@components/select"
import {isObjEmpty} from "@utils/Utils"

const timeUnitOption = [
  {
    value: 0,
    label: 'Ngày'
  },
  {
    value: 1,
    label: 'Giờ'
  }
]
const EmployeeOption = [
  {
    value: 0,
    label: 'không cho phép'
  },
  {
    value: 'NV001',
    label: 'Dương Văn Minh'
  }
]
const completeOption = [
  {
    value: 0,
    label: 'Theo % người dùng tự cập nhật'
  },
  {
    value: 1,
    label: 'Theo người quản lý cập nhật'
  }
]

const ModalHeader = (props: any) => {
  const {title, handleModal} = props
  const { t } = useTranslation()
  return (
    <div className='modal-header d-flex align-items-center justify-content-between mb-1'>
      <h5 className='modal-title'>
        {t(title)}
      </h5>
      <div className='todo-item-action d-flex align-items-center'>
        <X
          className='fw-normal mt-25 cursor-pointer'
          fontSize={20}
          onClick={handleModal}
        />
      </div>
    </div>
  )
}

const ModalSetting = () => {
  const { t } = useTranslation()
  const {openModal, handleModal, windowSize, selectedNode, setSelectedNode, setNodes} = useContext(FlowContext)

  const formSchema = yup.object().shape({

    title: yup.string()
      .required("Name is required")
      .max(150, "The name less than 150 characters")
      .min(2, "The name greater than 2 characters")
    // shortName: yup
    //   .string()
    //   .max(255, "The short name less than 255 characters"),
    // note: yup
    //   .string()
    //   .max(500, "The note less than 500 characters")
  })

  const defaultValues: any = {
    id: "",
    title: "",
    assign: "",
    manager: "",
    time: "",
    timeUnit: '',
    permission: '',
    typeComplete: ''
  }

  const {
    control,
    handleSubmit,
    reset,
    // clearErrors,
    setValue,
    formState: { errors }
  } = useForm<any>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })

  const handleCancel = () => {
    handleModal()
  }

  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color="primary" className="mb-75 me-1">
          {t('Save')}
        </Button>
        <Button color="secondary" onClick={handleCancel} outline className="mb-75 me-1">
          {t('Close')}
        </Button>
      </Fragment>
    )
  }

  const handleFormOpened = () => {
    if (!isObjEmpty(selectedNode)) {
      Object.entries(selectedNode.node.data).forEach(
        ([name, value]: any) => {
          setValue(name, value)
        }
      )
    } else {
      reset()
    }
  }

  const handleFormClosed = () => {
    setSelectedNode({})
    reset()
  }

  const onSubmit = (data: any) => {
    setNodes((nds: any) => nds.map((node: any) => {
      if (node.id === selectedNode.node.id) {
        node.data = {
          ...node.data,
          ...data
        }
      }

      return node
    })
    )
    handleModal()

  }
  return (
    <Fragment>
      <Modal
        isOpen={openModal}
        toggle={handleModal}
        className='modal-md'
        contentClassName='p-0'
        onOpened={handleFormOpened}
        onClosed={handleFormClosed}
      >
        <Form id='form-modal-globalzone' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader handleModal={handleModal} title="Cài đặt thông số" />
          <Scrollbars autoHide
            autoHeight
            autoHeightMax={windowSize.innerHeight - 180}>
            <ModalBody>
              <div>
                <Row>
                  <Col xs={12}>
                    <TextInput
                      control={control}
                      name='title'
                      label='Tên công việc'
                      inLine={false}
                      required={true}
                      errors={errors.title}
                    />
                  </Col>

                  <Col xs={12}>
                    <TextInput
                      control={control}
                      name='assign'
                      label='Người/ Nhón thực hiện'
                      placeholder='Chọn người dùng, phòng ban, vị trí'
                      inLine={false}
                      required={true}
                      errors={errors.assign}
                    />
                  </Col>

                  <Col xs={12}>
                    <TextInput
                      control={control}
                      name='manager'
                      label='Người quản lý'
                      placeholder='Phòng ban, vị trí, người dùng'
                      inLine={false}
                      required={true}
                      errors={errors.manager}
                    />
                  </Col>

                  <Col xs={6}>

                    <TextInput
                      control={control}
                      name='time'
                      label='Thời gian'
                      inLine={false}
                      type='number'
                    />
                  </Col>

                  <Col xs={6}>
                    <SelectBox
                      control={control}
                      label='Đơn vị'
                      name='timeUnit'
                      options={timeUnitOption}
                      placeholder='Ngày/ Giờ'
                      inLine={false}
                    />

                  </Col>

                  <Col xs={12}>
                    <SelectBox
                      control={control}
                      label='Người có quyền cập nhật thời gian dự kiến'
                      name='permission'
                      options={EmployeeOption}
                      inLine={false}
                      isClearable={true}
                    />
                  </Col>

                  <Col xs={12}>
                    <SelectBox
                      control={control}
                      label='Cách tính kết quả công việc'
                      name='typeComplete'
                      placeholder='Chọn cách tính kết quả'
                      options={completeOption}
                      inLine={false}
                      isClearable={true}
                    />
                  </Col>
                </Row>
              </div>
            </ModalBody>
          </Scrollbars>
          <div
            className="d-flex justify-content-end p-1"
            style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}
          >
            {renderFooterButtons()}
          </div>
        </Form>
      </Modal>
    </Fragment>
  )

}

export default ModalSetting
