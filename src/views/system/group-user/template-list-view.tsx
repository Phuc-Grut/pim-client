import { statusDefault } from "@src/domain/constants/constantSelect"
import { useContext } from "react"
import { Trash, Edit } from "becoxy-icons"
import { useTranslation } from "react-i18next"
import { Col, Row } from "reactstrap"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useSystemGroupUser } from "./hooks"
import { GroupUserContext } from "./useContext"
import {notificationError, notificationSuccess} from "@utils/notification"
import {CanPer} from "@utils/context/Can"
import {userAction, userSubject} from "@configs/acl/ability"
const MySwal = withReactContent(Swal)

function ListViewTemplate(data: any): JSX.Element {
  const { t } = useTranslation()
  const { handleModal, setDataItem, setTypeModal } = useContext(GroupUserContext)

  const {
    deleteGroupUserApi
  } = useSystemGroupUser()

  const EditHandle = (e: MouseEvent) => {
    e.stopPropagation()
    if (setTypeModal) {
      setTypeModal('Edit')
    }
    setDataItem(data)
    handleModal()
  }

  const DeleteHandle = (e: MouseEvent) => {
    e.stopPropagation()
    MySwal.fire({
      title: t('Confirm'),
      text: t('Do you want to delete item?'),
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: t('Delete'),
      cancelButtonText: t('Cancel'),
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ms-1'
      },
      buttonsStyling: false
    }).then(async (result) => {
      if (result.value) {
        deleteGroupUserApi(data.id)
          .unwrap()
          .then((rs) => {
            if (rs.isValid) {
              notificationSuccess(`${t('Delete')} ${t('success')} `)
            }
          })
          .catch(() => notificationError(`${t('Delete')} ${t('error')} `))
      } 
    })
  }

  const objStatus = statusDefault.reduce((a: any, v: any) => ({ ...a, [v.value]: v.label }), {})
  return (
    <div className='d-flex p-75 list-view-item'>
      <div className="w-100">
        <Row className='mt-25 ms-25 w-100' style={{ fontSize: '15.5px', fontWeight: '500' }}>
          <Col sm='12' md='10' className="p-0 pe-75">
            <span>
              {data.name}
            </span>
          </Col>
          <Col sm='12' md='2' className="d-flex justify-content-end p-0 pe-50">
            <CanPer I={userAction.EDIT} a={userSubject.Store} >
              <div className='icon-list-view me-25' title={t('Edit')}>
                <Edit fontSize={16} onClick={(e: any) => EditHandle(e)} />
              </div>
            </CanPer>

            <CanPer I={userAction.DELETE} a={userSubject.Store} >
              <div className='icon-list-view' title={t('Delete')}>
                <Trash fontSize={16} onClick={(e: any) => DeleteHandle(e)} />
              </div>
            </CanPer>
            
            
          </Col>
        </Row>
        <div className='ms-25' style={{marginTop:'2px'}}>
          {/* <div style={{ fontSize: '13px', color: data.status === 1 ? 'green' : "" }} > */}
          <span style={{ fontSize: '13px' }} >
            {objStatus[data.status]}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ListViewTemplate