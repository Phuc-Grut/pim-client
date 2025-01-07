import {Fragment} from "react"
import moment from "moment/moment"
import {Button} from "reactstrap"
import {useTranslation} from "react-i18next"
import { getLocalDate } from "@src/utility/context/map-object"
interface IAuthorModalFooter {
  createdDate: any,
  updatedDate: any,
  createdByName: any,
  updatedByName: any,
  handleModal: any,
}

const ModalFooterView = (props: IAuthorModalFooter) => {
  const { t } = useTranslation()
  const { createdDate, updatedDate, createdByName, updatedByName, handleModal} = props
  return (
    <Fragment>


      <Fragment>
        <div className='align-items-center w-100'>
          <div className='d-flex align-items-center'>
            <p className='m-0'>
              <strong style={{color: '#5e5873'}}>Ngày tạo:</strong> <span>{createdDate ? moment(getLocalDate(createdDate)).format("DD/MM/YYYY hh:mm") : ""}</span>
            </p>
            <p className='m-0'>
              <strong className='ms-2' style={{color: '#5e5873'}}>Người tạo:</strong> <span>{createdByName}</span>
            </p>
          </div>
          <div className='d-flex align-items-center'>
            <p className='m-0'>
              <strong style={{color: '#5e5873'}}>Ngày sửa:</strong> <span>{updatedDate ? moment(getLocalDate(updatedDate)).format("DD/MM/YYYY hh:mm") : ""}</span>
            </p>
            <p className='m-0'>
              <strong className='ms-2' style={{color: '#5e5873'}}>Người sửa:</strong> <span>{updatedByName}</span>
            </p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <Button color='secondary' onClick={handleModal} outline>
            {t('Close')}
          </Button>
        </div>
      </Fragment>
    </Fragment>
  )
}

export default ModalFooterView