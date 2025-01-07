import { Fragment, useState, useEffect, useContext } from 'react'
import GridTableTemplate from "@components/table-sub-modelTemplate"
import { Button, Card, CardBody } from "reactstrap"
import * as Icon from 'becoxy-icons'
import { useTranslation } from 'react-i18next'
import { headerTemplate } from "@utils/Common"
import { IContextMenu } from "@src/domain/models/IContextMenu"
import { ContextMenuItems } from "@src/domain/constants/constantContextMenu"
import { useProduct } from '../hooks'
import { ProductContext } from '../useContext'
import { IGridColumns } from '@src/domain/interfaces/IGridColumns'
import { notificationSuccess } from '@components/notifications'

import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
const MySwal = withReactContent(Swal)

const TableProductAttr = () => {
  const { t } = useTranslation()
  const { dataItem, setTypeSidebar, setDataSidebar, handleSidebar, tabIndex, openSidebar, setDataTable } = useContext(ProductContext)
  const [data, setData] = useState([])
  const [commandData, setCommandData] = useState<any>({})
  const [dbClickData, setDbClickDate] = useState<any>({})
  const { checkProductAttributeMappingInit, getPagingProductAttributeMappingApi, deleteProductAttributeMappingApi } = useProduct()

  const canContextMenuItems: IContextMenu[] = []
  const context = [...ContextMenuItems, { id: 'OPTION', text: 'Option', target: '.e-content', iconCss:'e-flat e-icons e-add'}]
  const listContextMenuPermission = [
    { id: 'OPEN' },
    { id: 'EDIT' },
    { id: 'DELETE' }
  ]

  listContextMenuPermission.map((item: any) => {
    const rs: any = context.find((menu: any) => menu.id === item.id)
    if (rs) {
      canContextMenuItems.push(rs)
    }
  })

  useEffect(() => {
    if (tabIndex === '3') {
      dataToRender()
    }
  }, [tabIndex, checkProductAttributeMappingInit])

  useEffect(() => {
    setDataSidebar((old:any) => ({...old, prodAttr: dbClickData.rowData}))
  }, [dbClickData])


  const dataToRender = () => {
    if (dataItem?.id) {
      getPagingProductAttributeMappingApi({
        $skip: 0,
        $top: 100,
        $productId: dataItem?.id
      }).unwrap()
        .then((rs) => {
          if (rs?.items) {
            const newss = rs?.items.map((a:any) => {
              const option = a?.options.map((b:any) => {
                return b.label
              }).join(' ,')
              return ({...a, opt: option})
            }, '')
            setTimeout(() => {
              setData(newss)
              setDataTable({prodAtt: newss})
            }, 100)
          }
          
        })
    }
  }

  useEffect(() => {
    if (commandData.type === 'EDIT') {
      if (setTypeSidebar) {
        setTypeSidebar((old:any) => ({...old, prodAttr: {value: 'Edit'}}))
      }
      setDataSidebar((old:any) => ({...old, prodAttr: commandData.data}))
      handleSidebar('prodAttr')
    } if (commandData.type === 'OPTION') {
      if (setTypeSidebar) {
        setTypeSidebar((old:any) => ({...old, prodAttrOpt: {value: 'Add'}}))
      }
      setDataSidebar((old:any) => ({...old, prodAttrOpt: commandData.data}))
      handleSidebar('prodAttrOpt')
    } else if (commandData.type === 'DELETE') {
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
    deleteProductAttributeMappingApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          notificationSuccess(t('Delete Item successful!'))
        }
      })
  }

  const handleAdd = () => {
    handleSidebar('prodAttr')
    setDataSidebar((old:any) => ({...old, prodAttr: {}}))
    if (setTypeSidebar) {
      setTypeSidebar((old:any) => ({...old, prodAttr: {value: 'Add'}}))
    }
  }
   
  // const captionTemplates = (props: any) => {
  //   const item = props.items[0]
  //   return <div style={{ fontSize: '1.2em', fontWeight: '500' }}>{item['specificationAttributeOptionId']}</div>
  // }

  // const groupOptions: Object = {
  //   showGroupedColumn: false,
  //   columns: ['attributeName'],
  //   showDropArea: false,
  //   captionTemplate: captionTemplates
  // }

  const headerColumns: IGridColumns[] = [
    {
      isPrimaryKey: false,
      field: 'name',
      headerText: 'Product attribute name',
      visible: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      headerTemplate
    },
    {
      isPrimaryKey: false,
      field: 'opt',
      headerText: 'Option',
      visible: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      headerTemplate
    }
  ]
  return (
    <Fragment>
      <div className='react-dataTable p-50 b-1'>
        <div className='table-toolbar'>
          <Card className='table-bar bar__action'>
            <CardBody>
              <div className='d-flex justify-content-between align-items-center w-100'>
                <span className='bolder'>{openSidebar.variant ? t('Product attribute') : t('')}</span>
                <Button color='primary' onClick={handleAdd} className=' d-flex'>
                  <Icon.Plus fontSize={14} className='me-50' />
                  {t('Add')}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
        <GridTableTemplate
          idTable='tableProdAttr'
          dataTable={data}
          showContextMenu={true}
          contextMenuItems={canContextMenuItems}
          setRowInfo={setCommandData}
          columns={headerColumns}
          showPagination={false}
          recordDoubleClick={true}
          setDoubleClickData={setDbClickDate}
        />
      </div>
    </Fragment >
  )
}
export default TableProductAttr