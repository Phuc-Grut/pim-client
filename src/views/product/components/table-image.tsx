import { Fragment, useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useProduct } from '../hooks'
import { ProductContext } from '../useContext'
import { notificationSuccess } from '@components/notifications'
import { useUploadFile } from '@src/utility/hooks/useUploadFile'
import UploadMultiComponent from '@components/upload-multi-component'
import { Row } from 'reactstrap'
const MySwal = withReactContent(Swal)

const TableImage = (props: any) => {
  const {dataItem} = useContext(ProductContext)
  const {tabIndex} = props
  const { t } = useTranslation()
  const { uploadImageMultiApi } = useUploadFile()
  const { checkProductMediaInit, addMultiProductMediaApi, getPagingProductMediaApi, deleteProductMediaApi } = useProduct()
  const [fileList, setFileList] = useState<any>([])
  const [listAddImage, setListAddImage] = useState<any>([])
  const [displayOrderImage, setDisplayOrderImage] = useState<number>(0)
  
  useEffect(() => {
    if (tabIndex === '7' && dataItem?.id) {

      getPagingProductMediaApi({ $top: 100, $skip: 0, $productId: dataItem?.id })
        .unwrap()
        .then((rs) => {
          if (rs.items.length > 0) {
            setFileList(rs.items)
            setDisplayOrderImage(Math.max(...rs.items.map((a: any) => a.displayOrder)))
          }
        })
    }
  }, [tabIndex, checkProductMediaInit])


  const handleUpload = () => {
    if (listAddImage.length > 0) {
      const fromData = new FormData()
      listAddImage.map((a: any) => fromData.append('becoxy', a))
      uploadImageMultiApi(fromData).unwrap()
        .then((rs: any) => {
          if (!(rs.errors?.length > 0 || rs.detailErrors?.length > 0)) {
            const d = rs.infoFiles.map((a: any, i: any) => ({
              id: '',
              name: a.name,
              path: a.path,
              mediaType: a.type,
              productId: dataItem?.id,
              displayOrder: displayOrderImage + i
            }))
            addMultiProductMediaApi({ ListAtt: d }).unwrap()
              .then(() => {
                setListAddImage([])
                notificationSuccess(t('Upload successful'))
              })
          }
        })
    }
  }

  const handleDelete = (id: string) => {
    if (id !== null && id !== undefined && id !== '') {
      MySwal.fire({
        title: t("Confirm"),
        text: t("cornfirmDeleteImage"),
        icon: "warning",
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: t("Delete"),
        cancelButtonText: t("Cancel"),
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-danger ms-1"
        },
        buttonsStyling: false
      }).then(async (result) => {
        if (result.value) {
          deleteProductMediaApi(id).unwrap()
            .then((rs) => {
              if (rs.isValid) {
                notificationSuccess(t('Delete Successful'))
              }
            })
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
        }
      })
    }
  }
  return (
    <Fragment>
      <div className='box form-box__border mb-3'>
        <h5 className="m-0 form-box__border--title">{t('Image')}</h5>
        <Row className='gy-1 mb-1'>
          <UploadMultiComponent
            name='image'
            height={100}
            width={100}
            labelSize='label-medium'
            errors={null}
            fileList={fileList}
            setFileList={setFileList}
            handleUpload={() => handleUpload()}
            handleDelete={(id:string) => handleDelete(id)}
            setListAdd={setListAddImage}
            listAdd={listAddImage}
          />
        </Row>
      </div>
    </Fragment >
    
  )
}
export default TableImage