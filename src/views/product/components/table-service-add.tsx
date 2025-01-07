import { Fragment, useState, useEffect, useContext, Dispatch, SetStateAction } from 'react'
import { IContextMenu } from "@src/domain/models/IContextMenu"
import { ContextMenuItems } from "@src/domain/constants/constantContextMenu"
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useProduct } from '../hooks'
import { ProductContext } from '../useContext'
import TableEdit, { IColumnTable } from '@components/table-edit'
import { IFDataProductServiceAdd } from '@src/domain/models/IProdcuctServiceAdd'
import { IFDataServiceAdd } from '@src/domain/models/IServiceAdd'
import { useServiceAdd } from '@src/views/service-add/hooks'
import { optionStatus, optionYesNO, tierPriceMethod } from '@src/domain/constants/constantSelect'
import { useTranslation } from 'react-i18next'
const MySwal = withReactContent(Swal)

const defaultValueDetail: IFDataProductServiceAdd = {
  payRequired: 1,
  price: 0,
  minPrice: 0,
  maxPrice: 0,
  calculationMethod: 0,
  priceSyntax: '',
  status: 1,
  currency: ''
}

interface Props{
  tabIndex: any
  dataServiceAdd: IFDataProductServiceAdd[]
  setDataServiceAdd: Dispatch<SetStateAction<IFDataServiceAdd[]>>
  optionCurrency: any[]
}

const TableServiceAdd = (props: any) => {
  const { tabIndex, dataServiceAdd, setDataServiceAdd, optionCurrency } = props

  const { t } = useTranslation()
  const { dataItem, openModal } = useContext(ProductContext)
  const { checkProductServiceAddInit, getPagingProductServiceAddApi } = useProduct()
  const { getServiceAddPagingApi } = useServiceAdd()
  const [commandData, setCommandData] = useState<any>({})
  const [optionServiceAdd, setOptionServiceAdd] = useState<any[]>([])
  const optionCalculateMethod = tierPriceMethod.map((a:any) => ({...a, label: t(a.label)}))
  const optionYN = optionYesNO.map((a:any) => ({...a, label: t(a.label)}))
  const optStatus = optionStatus.map((a:any) => ({...a, label: t(a.label)}))

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
    if (tabIndex === '6' && openModal === true) {
      dataToRender()
    }
  }, [tabIndex, checkProductServiceAddInit])


  const dataToRender = () => {
    if (dataItem?.id) {
      getPagingProductServiceAddApi({
        $skip: 0,
        $top: 100,
        $productId: dataItem?.id
      }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setDataServiceAdd(rs.items)
          }, 100)
        })
        .catch((ex) => {
          console.log(ex)
        })
    }

    getServiceAddPagingApi({
      Filter: "",
      Order: "",
      PageNumber: 0,
      PageSize: 100,
      Keyword: ""
    }).unwrap()
      .then((rs) => {
        if (rs?.items) {
          const newrs = rs?.items.map((a:any) => ({...a, value: a.id, label: a.name}))
          setTimeout(() => {
            setOptionServiceAdd(newrs)
          }, 100)
        }
      })
  }

  useEffect(() => {
    if (commandData.id === 'DELETE') {
      dataServiceAdd.splice(commandData.index, 1)
      setDataServiceAdd(dataServiceAdd.length > 0 ? [...dataServiceAdd] : [])
    }
  }, [commandData])

  const rowChange = (item: IFDataProductServiceAdd, index: number) => {
    dataServiceAdd[index] = item
  }

  const headerColumns: IColumnTable[] = [
    {
      field: '#',
      headerText: 'STT',
      fixedType:'left',
      invisibleDisable: true
    },
    {
      field: 'serviceAddId',
      headerText: 'Service',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "select",
      options: optionServiceAdd,
      callback: (val: any, index: number) => {
        const item: IFDataProductServiceAdd = dataServiceAdd[index]
        item.price = val.price
        item.maxPrice = val.maxPrice
        item.minPrice = val.minPrice
        item.currency = val.currency
        item.priceSyntax = val.priceSyntax
      },
      template: (data: IFDataProductServiceAdd) => {
        return (optionServiceAdd.find((item: any) => item.value === data.serviceAddId)?.label)
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
      template: (data: IFDataProductServiceAdd) => {
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
      editType: "numeric",
      textAlign: "right"
    },
    {
      field: 'payRequired',
      headerText: 'PayRequired',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "select",
      options: optionYN,
      template: (data: IFDataProductServiceAdd) => {
        return (optionYN.find((item: any) => item.value === data.payRequired)?.label)
      }
    },
    {
      field: 'price',
      headerText: 'Price',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "numeric",
      textAlign: "right"
    },
    {
      field: 'minPrice',
      headerText: 'MinPrice',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "numeric",
      textAlign: "right"
    },
    {
      field: 'maxPrice',
      headerText: 'MaxPrice',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "numeric",
      textAlign: "right"
    },
    {
      field: 'currency',
      headerText: 'Currency',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "select",
      options: optionCurrency,
      callback: (val: any, index: number) => {
        const item: IFDataProductServiceAdd = dataServiceAdd[index]
        item.currency = val.key
      }
      // template: (data: IFDataProductServiceAdd) => {
      //   return (optionCurrency.find((item: any) => item.key === data.currency)?.key)
      // }
    },
    {
      field: 'priceSyntax',
      headerText: 'PriceSyntax',
      visible: true,
      editEnable: true,
      width: 320
      // minWidth: 120,
      // maxWidth: 160
    },
    {
      field: 'status',
      headerText: 'Status',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "select",
      options: optStatus,
      template: (data: IFDataProductServiceAdd) => {
        return (optStatus.find((item: any) => item.value === data.status)?.label)
      }
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

  return (
    <Fragment>
      <TableEdit
        idTable='tableProductSpecificationCode'
        dataSource={dataServiceAdd}
        setDataSource={setDataServiceAdd}
        commandClick={setCommandData}
        rowChange={rowChange}
        columns={headerColumns}
        defaultValue={defaultValueDetail}
        showBottomToolbar
      />
    </Fragment >
  )
}
export default TableServiceAdd