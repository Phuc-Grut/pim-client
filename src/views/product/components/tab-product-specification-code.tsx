import { Fragment, useState, useEffect, Dispatch, SetStateAction, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import TableEdit, { IColumnTable } from '@components/table-edit'
import { Control, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { IFDataProduct } from '@src/domain/models/IProduct'
import { IFDataProductSpecificationCode } from '@src/domain/models/IProductSpecificationCode'
import { connectString_edit } from '@src/utility/hooks/connectString'
import { CheckSquare, XSquare } from 'becoxy-icons'
import { Badge } from 'reactstrap'
import { statusObjColorDefault, statusObjDefault_Status } from '@src/domain/constants/constantSelect'
import { ProductContext } from '../useContext'
import { useProduct } from '../hooks'

export interface IFPropsDetail {
  control: Control<IFDataProduct>
  errors: FieldErrors<IFDataProduct>
  watch: UseFormWatch<IFDataProduct>
  setValue: UseFormSetValue<IFDataProduct>
  openModal: any
  data: IFDataProductSpecificationCode[]
  setData: Dispatch<SetStateAction<IFDataProductSpecificationCode[]>>
}
const defaultValueDetail: IFDataProductSpecificationCode = {
  duplicateAllowed: false,
  status: 1,
  dataTypes: 0,
  name: ''
}
const commandList: any = [{ id: 'DELETE', title: '', icon: 'Trash2', tooltip: "Xóa" }]

const TableProductSpecificationCode = (props: IFPropsDetail) => {
  const { dataItem,  tabIndex } = useContext(ProductContext)
  const { checkProductSpecificationAttributeMappingInit, getPagingProductSpecificationCodeApi } = useProduct()
  const { data, setData } = props
  const { t } = useTranslation()

  const [commandData, setCommandData] = useState<any>({})

  useEffect(() => {
    if (tabIndex === '1' && dataItem?.id) {
      getPagingProductSpecificationCodeApi({
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

  const optionStatus = [
    { value: 1, label: t("Active") },
    { value: 0, label: t("Inactive") }
  ]

  const optionDatatypes = [
    { value: 0, label: t("Character") },
    { value: 1, label: t("Number") }
  ]

  const headerColumns: IColumnTable[] = [
    {
      field: '',
      headerText: 'Information field',
      textAlign: 'center',
      template: (_data: any, index: number) => {
        return connectString_edit(t, ['Specification code product', `${index + 1}`])
      },
      width: 100,
      minWidth: 80,
      maxWidth: 110
    },
    {
      field: 'name',
      headerText: 'Name',
      editEnable: true,
      width: 250,
      minWidth: 200,
      maxWidth: 300
    },
    {
      field: 'duplicateAllowed',
      headerText: 'Duplicates allowed',
      editType: 'checkbox',
      editEnable: true,
      textAlign: 'center',
      template: (data: IFDataProductSpecificationCode) => {
        return data.duplicateAllowed ? < CheckSquare color='green' fontSize={18} /> : <XSquare color='red' fontSize={18} />
      },
      width: 80,
      minWidth: 80,
      maxWidth: 80
    },
    {
      field: 'status',
      editType: 'select',
      headerText: 'Status',
      editEnable: true,
      textAlign: 'center',
      options: optionStatus,
      template: (data: IFDataProductSpecificationCode) => {
        return (
          <Badge className='text-capitalize' color={statusObjColorDefault[data.status]} pill>
            {t(statusObjDefault_Status[data.status])}
          </Badge>)
      },
      width: 80,
      minWidth: 80,
      maxWidth: 80
    },
    {
      field: 'dataTypes',
      editType: 'select',
      headerText: 'Datatypes',
      editEnable: true,
      options: optionDatatypes,
      template: (data: IFDataProductSpecificationCode) => {
        return (optionDatatypes.find((item) => item.value === data.dataTypes)?.label)
      },
      width: 80,
      minWidth: 80,
      maxWidth: 80
    },
    {
      field: 'command',
      visible: true,
      textAlign: "center",
      fixedType: 'right',
      width: 40,
      minWidth: 40,
      maxWidth: 40,
      commandItems: commandList
    }
  ]

  useEffect(() => {
    if (commandData.id === 'DELETE') {
      //data[commandData.index] = { ...defaultValueDetail }
      //setData([...data])
      data.splice(commandData.index, 1)
      setData(data.length > 0 ? [...data] : [])
    }
  }, [commandData])

  const rowChange = (item: IFDataProductSpecificationCode, index: number, field: string) => {
    data[index] = item
    return field === 'duplicateAllowed'
  }
  return (
    <Fragment>
      <TableEdit
        idTable='tableProductSpecificationCode'
        dataSource={data}
        setDataSource={setData}
        rowChange={rowChange}
        commandClick={setCommandData}
        columns={headerColumns}
        defaultValue={defaultValueDetail}
        showBottomToolbar={data.length < 10}
        addDisable={data.length >= 10}
      />
    </Fragment >
  )
}
export default TableProductSpecificationCode