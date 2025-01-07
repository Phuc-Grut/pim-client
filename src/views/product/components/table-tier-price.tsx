import { Fragment, useState, useEffect, useContext, Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { IContextMenu } from "@src/domain/models/IContextMenu"
import { ContextMenuItems } from "@src/domain/constants/constantContextMenu"
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useProduct } from '../hooks'
import { ProductContext } from '../useContext'
import { tierPriceMethod } from '@src/domain/constants/constantSelect'
import TableEdit, { IColumnTable } from '@components/table-edit'
import { IFDataTierPrice } from '@src/domain/models/ITierPrice'
const MySwal = withReactContent(Swal)

const defaultValueDetail: IFDataTierPrice = {
  quantity: 0,
  price: 0,
  calculationMethod: 0
}

interface Props{
  tabIndex: any
  dataTierPrice: IFDataTierPrice[]
  setDataTierPrice: Dispatch<SetStateAction<IFDataTierPrice[]>>
}
const TableTierPrice = (props: Props) => {
  const { tabIndex, dataTierPrice, setDataTierPrice } = props
  const { t } = useTranslation()
  const { dataItem, openModal, optionStore } = useContext(ProductContext)
  const [commandData, setCommandData] = useState<any>({})
  const { checkTierPriceInit, getPagingTierPriceApi } = useProduct()
  const optionCalculateMethod = tierPriceMethod.map((a:any) => ({...a, label: t(a.label)}))
  const canContextMenuItems: IContextMenu[] = []

  const listContextMenuPermission = [
    { id: 'EDIT' },
    { id: 'OPEN' },
    { id: 'DELETE' }
  ]

  listContextMenuPermission.map((item: any) => {
    const rs: any = ContextMenuItems.find((menu: any) => menu.id === item.id)
    if (rs) {
      canContextMenuItems.push(rs)
    }
  })

  useEffect(() => {
    if (tabIndex === '5' && openModal === true) {
      dataToRender()
    }
  }, [tabIndex, checkTierPriceInit, optionStore])


  const dataToRender = () => {
    if (dataItem?.id && optionStore.length > 0) {
      getPagingTierPriceApi({
        $skip: 0,
        $top: 100,
        $productId: dataItem?.id
      }).unwrap()
        .then((rs) => {
          const newrs = rs.items?.map((c:any) => ({
            ...c,
            method: t(tierPriceMethod.find((a:any) => a.value === c.calculationMethod)?.label ?? ''),
            store: optionStore.find((a:any) => a.value === c.storeId)?.label ?? ''
          })) 
          setTimeout(() => {
            setDataTierPrice(newrs)
          }, 100)
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
  }

  useEffect(() => {
    if (commandData.id === 'DELETE') {
      dataTierPrice.splice(commandData.index, 1)
      setDataTierPrice(dataTierPrice.length > 0 ? [...dataTierPrice] : [])
    }
  }, [commandData])
  
  const headerColumns: IColumnTable[] = [
    {
      field: '#',
      headerText: 'STT',
      fixedType:'left',
      invisibleDisable: true
    },
    {
      field: 'storeId',
      headerText: 'Store',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "select",
      options: optionStore,
      // callback: (val: any, index: number) => {
      //   const item: IFDataProductSpecificationAttributeMapping = dataSpeciAttribute[index]
      //   item.specificationAttributeId = val.value
      // },
      template: (data: IFDataTierPrice) => {
        return (optionStore.find((item: any) => item.value === data.storeId)?.label)
      }
    },
    {
      field: 'calculationMethod',
      headerText: 'Calculation method',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "select",
      options: optionCalculateMethod,
      template: (data: IFDataTierPrice) => {
        return (optionCalculateMethod.find((item: any) => item.value === data.calculationMethod)?.label)
      }
    },
    {
      field: 'quantity',
      headerText: 'Quantity',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "numeric"
    },
    {
      field: 'price',
      headerText: 'Price/Percent',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "numeric"
    },
    {
      field: 'startDate',
      headerText: 'Start date',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "date"
    },
    {
      field: 'endDate',
      headerText: 'End date',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "date"
    },
    {
      field: 'command',
      visible: true,
      textAlign: "center",
      fixedType: 'right',
      width: 40,
      minWidth: 40,
      maxWidth: 40,
      commandItems: [{ id: 'DELETE', title: '', icon: 'Trash2', tooltip: "Xóa" }]
    }
  ]

  const rowChange = (item: IFDataTierPrice, index: number) => {
    dataTierPrice[index] = item
  }

  return (
    <Fragment>
      <TableEdit
        idTable='tableProductSpecificationCode'
        dataSource={dataTierPrice}
        setDataSource={setDataTierPrice}
        commandClick={setCommandData}
        rowChange={rowChange}
        columns={headerColumns}
        defaultValue={defaultValueDetail}
        showBottomToolbar
      />
    </Fragment >
  )
}
export default TableTierPrice