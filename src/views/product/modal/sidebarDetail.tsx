import ModalHeader from "@components/modal-header"
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react"
import { Button, ModalBody } from "reactstrap"
import classnames from "classnames"
import { Scrollbars } from 'react-custom-scrollbars'
import TableEdit, { IColumnTable } from "@components/table-edit"
import { Control, UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form"
import {  connectString_edit } from "@src/utility/hooks/connectString"
import { useTranslation } from "react-i18next"
import {  notificationError } from "@components/notifications"
import { IFModelProduct } from "@src/domain/models/IProduct"
import { useProduct } from "../hooks"
const STTColumn: IColumnTable =
{
  field: '#',
  headerText: 'STT',
  width: 40,
  minWidth: 40,
  maxWidth: 40,
  invisibleDisable: true
}
export interface IFPropsDetail {
  control: Control<IFModelProduct, any>
  typeSubModal: string
  windowSize: any
  setTypeSubModal: Dispatch<SetStateAction<string>>
  setProductId: Dispatch<SetStateAction<string>>
  setValue: UseFormSetValue<IFModelProduct>
  getValues: UseFormGetValues<IFModelProduct>
  watch: UseFormWatch<IFModelProduct>
  dataProductInventory: IFModelProduct[]
  setDataProductInventory: any
}
const SideDetail = (props: IFPropsDetail) => {
  const { t } = useTranslation()
  const {
    typeSubModal,
    setTypeSubModal,
    windowSize,
    getValues,
    dataProductInventory,
    setDataProductInventory
  } = props
  const listColumn: IColumnTable[] = [
    {
      field: 'quantity',
      editType: 'numeric',
      editEnable: true,
      validate: (value: number) => {
        return value > 0 ? '' : connectString_edit(t, ['Quantity', 'must be more than 0'])
      },
      invisibleDisable: true,
      headerText: 'Quantity',
      width: 150,
      minWidth: 150,
      maxWidth: 150,
      textAlign: 'right'
    },
    {
      field: 'command',
      visible: true,
      textAlign: "center",
      commandItems: [{ id: 'DELETE', title: '', icon: 'Trash2', tooltip: "Xóa" }],
      invisibleDisable: true,
      fixedType: 'right',
      width: 40,
      minWidth: 40,
      maxWidth: 40
    }
  ]
  const { getPagingProductSpecificationCodeApi } = useProduct()
  const [columns, setColumns] = useState<IColumnTable[]>([])
  const [commandDataExpense, setCommandDataExpense] = useState<any>({})
  const [quantity, setQuantity] = useState<number>(0)
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    if (typeSubModal === 'modalSidebar' && getValues('selectedIndex') !== -1) {
      console.log(getValues('selectedIndex'))   
      setData(dataProductInventory[getValues('selectedIndex') ?? 0].specificationCode ? [dataProductInventory[getValues('selectedIndex') ?? 0].specificationCode] : [{}])
      getPagingProductSpecificationCodeApi({
        $skip: 0,
        $top: 100,
        $productId: getValues('id')
      }).unwrap()
        .then((rs: any) => {
          if ((rs?.items?.length ?? 0) > 0) {
            const arr: IColumnTable[] = [STTColumn]
            let flag = true
            rs?.items?.forEach((element:any) => {
              if (element.status === 1) {
                arr.push({
                  field: `specificationCode${element.displayOrder}`,
                  editEnable: true,
                  editType: element.dataTypes === 0 ? 'text' : 'numeric',
                  textAlign: element.dataTypes === 0 ? 'left' : 'right',
                  headerText: element.name,
                  width: 130,
                  maxWidth: 150,
                  minWidth: 110
                })
                if (!element.duplicateAllowed && flag) {
                  flag = false
                }
              }
            })
            listColumn.forEach((item) => {
              if (item.field === 'quantity') {
                item.editEnable = flag
              }
              arr.push({ ...item })
            })
            setColumns([...arr])
          } else {
            setColumns([])
          }
        }).catch(() => notificationError(t('GetFail')))
    }
  }, [typeSubModal])


  const handleCancel = () => {
    setTypeSubModal("")
  }
  const calculateSum = (array: any[], property: string | number) => {
    const total = array.reduce((accumulator, object) => {
      return accumulator + object[property]
    }, 0)
  
    return total
  }
  const handleSubmit = () => {
    dataProductInventory[getValues('selectedIndex') ?? 0].stockQuantity = calculateSum(data, 'quantity')
    dataProductInventory[getValues('selectedIndex') ?? 0].specificationCode = data
    setDataProductInventory(dataProductInventory)
    setTypeSubModal("")
  }

  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color="primary" onClick={handleSubmit} className="me-1">
          {t("Confirm")}
        </Button>
        <Button color="secondary" onClick={handleCancel} outline>
          {t('Close')}
        </Button>
      </Fragment>
    )
  }

  const rowChange = (row: any, index: number, field: string) => {
    data[index] = row
    if (field === 'quantity' && (getValues('type') === 0 || getValues('type') === 1)) {
      setQuantity(data.reduce(function (accumulator: any, currentValue: any) {
        return (Number(accumulator ?? 0) + Number(currentValue.quantity ?? 0))
      }, 0))
    }
  }

  useEffect(() => {
    setQuantity(data.reduce(function (accumulator: any, currentValue: any) {
      return (Number(accumulator ?? 0) + Number(currentValue.quantity ?? 0))
    }, 0))
  }, [data])

  useEffect(() => {
    if (commandDataExpense.id === 'DELETE') {
      data.splice(commandDataExpense.index, 1)
      setData([...data])
    }
  }, [commandDataExpense])

  const toolbarTopOptions: any = [
    {
      template: () => {
        return (
          <div style={{ fontSize: 13, fontFamily: "Montserrat" }}>
            <div>{t('Product code')}:<strong className='ms-25'> {getValues('code')}</strong></div>
            <div style={{ marginTop: 1 }}>{t('Product name')}:<strong className='ms-25'> {getValues('name')}</strong></div>
          </div>)
      },
      align: 'left'
    },
    {
      template: () => {
        return (
          <div style={{ fontSize: 14, fontFamily: "Montserrat", marginRight: 10 }}>
            <div>{t('Quantity')}:<strong className='ms-25'> {quantity}</strong></div>
          </div>)
      },
      align: 'right'
    }
  ]
  return (
    <div
      className={classnames('customizer customizer-800 d-none d-md-block', {
        open: typeSubModal === 'modalSidebar'
      })}
    >
      <ModalHeader typeModal={'View'} handleModal={handleCancel} title='Detail' style={{ backgroundColor: '#f8f8f8 !important' }} />
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMin={windowSize.innerHeight - 120}
        autoHeightMax={windowSize.innerHeight - 120}>
        <ModalBody className='h-100'>
          <TableEdit
            key={'SaleSelectContractDetail'}
            dataSource={data}
            setDataSource={setData}
            haveSum={true}
            showBottomToolbar={true}
            showTopToolbar={true}
            toolbarOptions={toolbarTopOptions}
            defaultValue={{ quantity: 1 }}
            rowChange={rowChange}
            columns={columns}
            commandClick={setCommandDataExpense}
            maxHeight={windowSize.innerHeight - 240}
            minHeight={300}
          />
        </ModalBody>
      </Scrollbars>
      <div
        className="d-flex justify-content-end p-1 align-align-items-center"
        style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}
      >
        {renderFooterButtons()}
      </div>
    </div>
  )

}

export default SideDetail
