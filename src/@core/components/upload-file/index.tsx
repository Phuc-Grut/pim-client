import * as React from 'react'
import { UploaderComponent, UploadingEventArgs } from '@syncfusion/ej2-react-inputs'
import { UPLOADFILE } from '@src/domain/constants'
import { getToken } from '@src/infra/api/user'

interface IFDataUploadFile {
  allowedExtensions: string,
  response?: any
}
const UploadFileComponent = (props: IFDataUploadFile) => {
  const { allowedExtensions, response } = props

  const settings = {
    saveUrl: UPLOADFILE.URL_API.UPLOAD_FILE_API,
    chunkSize: 100000000
  }
  const addHeaders = (args: UploadingEventArgs) => {
    (args.currentRequest as XMLHttpRequest).setRequestHeader('Authorization',  `Bearer ${getToken()}`)
  }
  const onSuccsess = (rs: any) => {
    response(JSON.parse(rs.e?.currentTarget?.response))
  }

  return (
    <React.Fragment>
      <div className='upload_wrapper'>
        {/* Render Uploader */}
        <UploaderComponent multiple={true} autoUpload={true} asyncSettings={settings} uploading={addHeaders} allowedExtensions={allowedExtensions} success={onSuccsess} />
      </div>
    </React.Fragment>
  )
}

export default UploadFileComponent
