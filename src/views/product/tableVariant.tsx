import { Fragment, useState, useEffect, useContext } from 'react'
import GridTableTemplate from "@components/grid-table-template"
import { Button, Card, CardBody, Modal, ModalBody } from "reactstrap"
import * as Icon from 'becoxy-icons'
import { useTranslation } from 'react-i18next'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { notificationSuccess } from '@components/notifications'
import { ProductContext } from './useContext'
import { useProduct } from './hooks'
import { headerColumnsVariant } from './columns'
import Scrollbars from 'react-custom-scrollbars'
import ModalHeader from '@components/modal-header'
import TableProductAttr from './components/table-product-attribute'
import initAbility from "@configs/acl/initialAbility"
import {userAction, userSubject} from "@configs/acl/ability"
import {canContextMenuVariant} from "@src/views/product/contextMenu"
import {IRowSelected} from "@src/domain/models/ITableGrid"

const MySwal = withReactContent(Swal)

const TableVariant = () => {
  const { dataItem, setTypeSidebar, setDataSidebar, handleSidebar, openSidebar, windowSize, setDataItem, handleModalVariant, setTabIndex } = useContext(ProductContext)
  const { t } = useTranslation()
  const { checkProductVariantInit, getProductPagingApi, deleteProductApi, getProductByIdApi, checkInit, createAllVariant } = useProduct()

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [listContextShow, setListContextShow] = useState<any>(undefined)
  const [listContextHide, setListContextHide] = useState<any>(undefined)

  const listContext = (actions: string[]) => {
    const result = actions.map(x => {
      const mappedAction = {
        CANCEL: "EDIT",
        APPROVAL: "APPROVE"
      }[x] || x

      return initAbility.can(userAction[mappedAction as keyof typeof userAction], userSubject.Product) && x
    })

    return result.filter(Boolean)
  }

  const rowSelected = (args: IRowSelected): void => {
    if (args.rowData) {
      switch (args.rowData.isActive) {
      case 0:

        setListContextShow({ list: listContext(['APPROVAL']), type: 'SHOW' })
        setListContextHide({ list: listContext(['CANCEL']), type: 'HIDE' })
        break
      case 1:
        setListContextShow({ list: listContext(['CANCEL']), type: 'SHOW' })
        setListContextHide({ list: listContext(['APPROVAL']), type: 'HIDE' })
        break
      case 2:
        setListContextShow({ list: listContext(['APPROVAL']), type: 'SHOW' })
        setListContextHide({ list: listContext(['CANCEL']), type: 'HIDE' })
        break
      }
    }
  }
  useEffect(() => {
    if (openSidebar?.variant === true) {
      dataToRender()
    }
  }, [currentPage, pageSize, checkProductVariantInit, openSidebar.variant, checkInit])


  const dataToRender = () => {
    if (dataItem?.id) {
      const queryParma = [
        { key: "parentId", ope: "==", value: dataItem?.id, predicate: "" },
        { key: "deleted", ope: "==", value: false, predicate: ";" }
      ]
      const rs = queryParma.map((x: any) => `${x.key}${x.ope}${x.value}`).join(';')
      getProductPagingApi({
        Filter: rs,
        Order: 'createdDate;desc',
        PageNumber: currentPage,
        PageSize: pageSize,
        Keyword: ''
      })
        .unwrap()
        .then((rs) => {
          if (rs?.items) {
            setTimeout(() => {
              setData(rs?.items?.map((a: any) => ({ ...a, attr: JSON.parse(a.attributesJson) })))
            }, 100)
            setTotalItem(rs.totalCount)
          }
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
  }


  const handleContextMenuClick = (args: any) => {
    if (args.rowInfo?.rowData) {

      if (args.item.id === "EDIT") {
        getProductByIdApi(args.rowInfo.rowData.id)
          .unwrap()
          .then((rs: any) => {
            if (rs) {
              handleModalVariant()
              if (setTypeSidebar) {
                setTypeSidebar((old: any) => ({ ...old, variant: { value: 'Edit' } }))
              }
              setDataSidebar((old: any) => ({ ...old, variant: rs }))
            }
          })
      } else if (args.item.id === 'DELETE') {
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
            handleDelete(args.rowInfo.rowData.id)
          } else if (result.dismiss === MySwal.DismissReason.cancel) {
          }
        })
      }
    }
  }

  const handleDelete = (id: string) => {
    deleteProductApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          notificationSuccess(t('Delete Item successful!'))
        }
      })
  }

  const handleAdd = () => {
    handleModalVariant()
    if (setTypeSidebar) {
      setTypeSidebar((old: any) => ({ ...old, variant: { value: 'Add' } }))
    }
  }
  const handleCreateAllVariant = () => {
    MySwal.fire({
      title: t('Confirm'),
      text: t('warningCreateAllVariant?'),
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: t('Confirm'),
      cancelButtonText: t('Cancel'),
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ms-1'
      },
      buttonsStyling: false
    }).then(async (result) => {
      if (result.value) {
        createAllVariant(dataItem?.id).unwrap()
          .then((rs) => {
            if (rs.isValid) {
              notificationSuccess(t('Create Variant successful!'))
            } else {
              notificationSuccess(t('Create Variant failure!'))
            }
          })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
      }
    })
  }

  const handleCancel = () => {
    handleSidebar('variant')
  }

  const handleFormDuplicateOpened = () => {
    setTabIndex('2')
  }

  const handleFormDuplicateClosed = () => {
    setDataItem({})
    setTabIndex('0')
  }

  return (
    <Modal
      isOpen={openSidebar?.variant}
      toggle={handleCancel}
      className='modal-dialog-centered modal-xl'
      contentClassName='p-0'
      onOpened={handleFormDuplicateOpened}
      onClosed={handleFormDuplicateClosed}
    >
      <ModalHeader handleModal={handleCancel} typeModal={'View'} title='VariantProduct' />
      <ModalBody>
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <Fragment>
            <div className='react-dataTable m-2'>
              <TableProductAttr></TableProductAttr>
            </div>
            <div className='react-dataTable m-2 p-50 b-1'>
              <div className='table-toolbar'>
                <Card className='table-bar bar__action'>
                  <CardBody>
                    <div className='d-flex justify-content-between align-items-start w-100'>
                      <span className='bolder'>
                      </span>
                      <div className='d-flex'>
                        <Button color='primary' onClick={handleCreateAllVariant} className='me-50 d-flex'>
                          <Icon.Plus fontSize={14} className='me-1' />
                          {t('CreateAllVariant')}
                        </Button>
                        <Button color='primary' onClick={handleAdd} className=' d-flex'>
                          <Icon.Plus fontSize={14} className='me-50' />
                          {t('Add')}
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <GridTableTemplate
                idTable={'tableVariant'}
                dataTable={data}
                columns={headerColumnsVariant}
                showPagination={true}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalItem={totalItem}
                showContextMenu={true}
                contextMenuItems={canContextMenuVariant}
                handleContextMenuClick={handleContextMenuClick}
                allowPaging={true}
                listContextShow={listContextShow}
                listContextHide={listContextHide}
                rowSelected={rowSelected}
              />
            </div>
          </Fragment >
        </Scrollbars>
      </ModalBody>
      <div
        className='d-flex justify-content-end p-1'
        style={{ boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)' }}
      >
        <Fragment>
          <Button color='secondary' onClick={handleCancel} outline>
            {t('Close')}
          </Button>
        </Fragment>
      </div>
    </Modal>
  )
}
export default TableVariant