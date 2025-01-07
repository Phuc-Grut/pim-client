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
const MySwal = withReactContent(Swal)

const TableProductVariantAttributeCombination = () => {
  const { t } = useTranslation()
  const { dataItem, setTypeSidebar, setDataSidebar, handleSidebar, tabIndex } = useContext(ProductContext)
  const [data, setData] = useState([])
  const [commandData, setCommandData] = useState<any>({})
  const { checkProductSpecificationAttributeMappingInit, getPagingProductSpecificationAttributeMappingApi, deleteProductSpecificationAttributeMappingApi } = useProduct()

  const canContextMenuItems: IContextMenu[] = []

  const listContextMenuPermission = [{ id: 'DELETE' }]

  listContextMenuPermission.map((item: any) => {
    const rs: any = ContextMenuItems.find((menu: any) => menu.id === item.id)
    if (rs) {
      canContextMenuItems.push(rs)
    }
  })

  useEffect(() => {
    if (tabIndex === '3' && dataItem?.id) {
      getPagingProductSpecificationAttributeMappingApi({
        $skip: 0,
        $top: 100,
        $productId: dataItem?.id
      }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setData(rs.items)
          }, 100)
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
  }, [tabIndex, checkProductSpecificationAttributeMappingInit])

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
    deleteProductSpecificationAttributeMappingApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          notificationSuccess(t('Delete Item successful!'))
        }
      })
  }

  const handleAdd = () => {
    handleSidebar('attrComb')
    setDataSidebar((old:any) => ({...old, attrComb: {}}))
    if (setTypeSidebar) {
      setTypeSidebar((old:any) => ({...old, attrComb: {value: 'Add'}}))
    }
  }

  const headerColumns: IGridColumns[] = [
    {
      field: 'name',
      headerText: 'Product attribute name',
      visible: true,
      width: 200,
      minWidth: 180,
      maxWidth: 250,
      headerTemplate
    },
    {
      field: 'isActive',
      headerText: 'Active',
      visible: true,
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      headerTemplate
    },
    {
      field: 'price',
      headerText: 'Price',
      visible: true,
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      headerTemplate
    },
    {
      field: 'sku',
      headerText: 'SKU',
      visible: true,
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      headerTemplate
    },
    {
      field: 'stockQuantity',
      headerText: 'Stock quantity',
      visible: true,
      width: 100,
      minWidth: 100,
      maxWidth: 100,
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
          idTable='tableAttributeCombinations'
          dataTable={data}
          showContextMenu={true}
          contextMenuItems={canContextMenuItems}
          setRowInfo={setCommandData}
          columns={headerColumns}
          showPagination={false}
          // allowGrouping={true}
          // groupSettings={groupOptions}
        />
      </div>
    </Fragment >
  )
}
export default TableProductVariantAttributeCombination