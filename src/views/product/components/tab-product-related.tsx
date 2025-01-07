import { Fragment, useState, useEffect, useContext } from 'react'
import GridTableTemplate from "@components/table-sub-modelTemplate"
import { Button, Card, CardBody } from "reactstrap"
import * as Icon from 'becoxy-icons'
import { useTranslation } from 'react-i18next'
import { headerTemplate } from "@utils/Common"
import { IContextMenu } from "@src/domain/models/IContextMenu"
import { ContextMenuItems } from "@src/domain/constants/constantContextMenu"
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useProduct } from '../hooks'
import { ProductContext } from '../useContext'
import { IGridColumns } from '@src/domain/interfaces/IGridColumns'
import { notificationSuccess } from '@components/notifications'
import { pictureTemplate } from '../columns'
const MySwal = withReactContent(Swal)

const ProductRelated = () => {
  const { t } = useTranslation()
  const { 
    dataItem, 
    setTypeSidebar, 
    setDataSidebar, 
    handleSidebar, 
    tabIndex,
    setInitSideBar,
    initSideBar,
    dataRelated,
    setDataRelated
  } = useContext(ProductContext)
  
  const [commandData, setCommandData] = useState<any>({})
  const { checkRelatedProductInit, getPagingRelatedProductApi, deleteRelatedProductApi } = useProduct()

  const canContextMenuItems: IContextMenu[] = []

  const listContextMenuPermission = [{ id: 'DELETE' }]

  listContextMenuPermission.map((item: any) => {
    const rs: any = ContextMenuItems.find((menu: any) => menu.id === item.id)
    if (rs) {
      canContextMenuItems.push(rs)
    }
  })

  useEffect(() => {
    if (tabIndex === '4' && dataItem?.id) {
      getPagingRelatedProductApi({
        $skip: 0,
        $top: 100,
        $productId1: dataItem?.id
      }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setDataRelated(rs.items)
          }, 100)
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
  }, [tabIndex, checkRelatedProductInit])

  useEffect(() => {
    if (commandData.type === 'DELETE') {
      MySwal.fire({
        title: t('Confirm'),
        text: t('Do you want to delete item?'),
        icon: 'warning',
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
          handleDelete(commandData.data.id)
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
        }
      })
    }
  }, [commandData])

  const handleDelete = (id: string) => {
    deleteRelatedProductApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          notificationSuccess(t('Delete Item successful!'))
        }
      })
  }

  const handleAdd = () => {
    handleSidebar('prodRelated')
    setDataSidebar((old:any) => ({...old, prodRelated: {}}))
    if (setTypeSidebar) {
      setTypeSidebar((old:any) => ({...old, prodRelated: {value: 'Add'}}))
    }
    setInitSideBar(!initSideBar)
  }

  const headerColumns: IGridColumns[] = [
    {
      isPrimaryKey: false,
      field: "image",
      headerText: "Picture",
      visible: true,
      textAlign: "center",
      width: 20,
      minWidth: 20,
      maxWidth: 25,
      headerTemplate,
      template: pictureTemplate,
      allowFiltering: false
    },
    {
      field: 'code',
      headerText: 'ProductCode',
      visible: true,
      width: 70,
      minWidth: 60,
      maxWidth: 80,
      headerTemplate
    },
    {
      field: 'name',
      headerText: 'Product name',
      visible: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      headerTemplate
    }
  ]

  return (
    <Fragment>
      <div className='react-dataTable ms-2 p-50 b-1'>
        <div className='table-toolbar'>
          <Card className='table-bar bar__action'>
            <CardBody>
              <div className='d-flex justify-content-between align-items-center w-100'>
                <span className='bolder'>{t('')}</span>
                <Button color='primary' onClick={handleAdd} className='me-50 d-flex'>
                  <Icon.Plus fontSize={14} className='me-50' />
                  {t('Add')}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
        <GridTableTemplate
          idTable='tableProdRelated'
          dataTable={dataRelated}
          showContextMenu={true}
          contextMenuItems={canContextMenuItems}
          setRowInfo={setCommandData}
          columns={headerColumns}
          showPagination={false}
        />
      </div>
    </Fragment >
  )
}
export default ProductRelated