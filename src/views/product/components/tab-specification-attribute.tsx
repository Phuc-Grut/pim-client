import { Fragment, useState, useEffect, useContext, FC, Dispatch, SetStateAction } from 'react'
import { IContextMenu } from "@src/domain/models/IContextMenu"
import { ContextMenuItems } from "@src/domain/constants/constantContextMenu"
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useProduct } from '../hooks'
import { ProductContext } from '../useContext'
import TableEdit, { IColumnTable } from '@components/table-edit'
import { IFDataProductSpecificationAttributeMapping } from '@src/domain/models/IProductSpecificationAttributeMapping'
import { useSpecificationAttribute } from '@src/views/attribute/specification-attribute/hooks'
const MySwal = withReactContent(Swal)

const defaultValueDetail: IFDataProductSpecificationAttributeMapping = {
  // productId: '',
  // specificationAttributeOptionId: '',
  specificationAttributeId: '',
  displayOrder: 0
  // id: ''
}

interface IProps {
  dataSpeciAttribute: IFDataProductSpecificationAttributeMapping[]
  setDataSpeciAttribute: Dispatch<SetStateAction<IFDataProductSpecificationAttributeMapping[]>>
}

const TableSpecAttr: FC<IProps> = (props) => {
  const { dataSpeciAttribute, setDataSpeciAttribute } = props
  const { dataItem, tabIndex } = useContext(ProductContext)
  const { checkProductSpecificationAttributeMappingInit, getPagingProductSpecificationAttributeMappingApi } = useProduct()
  const { getListSpecificationAttributeApi, getAllSpecificationAttributeOptionApi } = useSpecificationAttribute()
  const [commandData, setCommandData] = useState<any>({})
  const [optionSpecificationAttribute, setOptionSpecificationAttribute] = useState<any[]>([])
  const [optionSpecificationAttributeOption, setOptionSpecificationAttributeOption] = useState<any[]>([])
  const canContextMenuItems: IContextMenu[] = []

  const listContextMenuPermission = [
    { id: 'OPEN' },
    { id: 'EDIT' },
    { id: 'DELETE' }
  ]

  listContextMenuPermission.map((item: any) => {
    const rs: any = ContextMenuItems.find((menu: any) => menu.id === item.id)
    if (rs) {
      canContextMenuItems.push(rs)
    }
  })

  useEffect(() => {
    if (tabIndex === '2' && dataItem?.id) {
      getPagingProductSpecificationAttributeMappingApi({
        $skip: 0,
        $top: 100,
        $productId: dataItem?.id
      }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setDataSpeciAttribute(rs.items)
          }, 100)
        })
        .catch((ex) => {
          console.log(ex)
        })

      getListSpecificationAttributeApi({$status: 1}).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setOptionSpecificationAttribute(rs)
          }, 10)
        })
        .catch((ex) => {
          console.log(ex)
        })

      getAllSpecificationAttributeOptionApi().unwrap()
        .then((rs) => {
          setTimeout(() => {
            setOptionSpecificationAttributeOption(rs.map((x: any) => ({...x, value: x.id, key: x.code, label: x.name})))
          }, 10)
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
  }, [tabIndex, checkProductSpecificationAttributeMappingInit])

  useEffect(() => {
    if (commandData.id === 'DELETE') {
      dataSpeciAttribute.splice(commandData.index, 1)
      setDataSpeciAttribute(dataSpeciAttribute.length > 0 ? [...dataSpeciAttribute] : [])
    }
  }, [commandData])

  const rowChange = (item: IFDataProductSpecificationAttributeMapping, index: number, field: string) => {
    dataSpeciAttribute[index] = item
    return field === 'specificationAttributeId'
  }

  const headerColumns: IColumnTable[] = [
    {
      field: '#',
      headerText: 'STT',
      fixedType:'left',
      invisibleDisable: true
    },
    {
      field: 'specificationAttributeId',
      headerText: 'Specification attribute',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "select",
      options: optionSpecificationAttribute,
      callback: (val: any, index: number) => {
        const item: IFDataProductSpecificationAttributeMapping = dataSpeciAttribute[index]
        item.specificationAttributeId = val.value
      },
      template: (data: IFDataProductSpecificationAttributeMapping) => {
        return (optionSpecificationAttribute.find((item: any) => item.value === data.specificationAttributeId)?.label)
      }
    },
    {
      field: 'specificationAttributeOptionId',
      headerText: 'Option',
      visible: true,
      editEnable: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      editType: "select",
      options: optionSpecificationAttributeOption,
      template: (data: IFDataProductSpecificationAttributeMapping) => {
        // return (optionSpecificationAttributeOption.filter((item: any) => data.listOptionId?.some(x => x === item.value)).map(x => x.label).join(", "))
        return (optionSpecificationAttributeOption.find((item: any) => item.value === data.specificationAttributeOptionId)?.label)
      },
      validateOption:(item: any, row:IFDataProductSpecificationAttributeMapping) => {
        return item.specificationAttributeId === row.specificationAttributeId
      }
      // callback: (val: any, index: number) => {
      //   const item: IFDataProductSpecificationAttributeMapping = dataSpeciAttribute[index]
      //   item.specificationAttributeOptionId = val.value
      // }
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
        dataSource={dataSpeciAttribute}
        setDataSource={setDataSpeciAttribute}
        commandClick={setCommandData}
        rowChange={rowChange}
        columns={headerColumns}
        defaultValue={defaultValueDetail}
        showBottomToolbar
      />
    </Fragment >
  )
}
export default TableSpecAttr