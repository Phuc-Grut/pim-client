import React, { Fragment, useContext, useEffect, useState } from 'react'
import { IContextMenu } from '@src/domain/models/IContextMenu'
import { ContextMenuItems } from '@src/domain/constants/constantContextMenu'
import { SpecificationAttributeContext } from './useContext'
import TableEdit, { IColumnTable } from '@components/table-edit'
// import { useUnit } from '@src/redux/pim/hook/unit'

const defaultValueDetail: any = {
  code: '',
  name: '',
  numberValue: 0,
  color: '',
  displayOrder: 0
}

const ModalOptionsComponent = () => {

  const {
    dataTableDetail,
    setDataTableDetail,
    typeModal
  } = useContext(SpecificationAttributeContext)

  const [commandData, setCommandData] = useState<any>({})

  const ColumnsOption: IColumnTable[] = [
    {
      field: '#',
      headerText: 'STT',
      fixedType:'left',
      invisibleDisable: true
    },
    {
      field: 'code',
      headerText: "Code",
      visible: true,
      width: 150,
      maxWidth: 150,
      minWidth: 80,
      editEnable: true
    },
    {
      field: 'name',
      headerText: "Name",
      visible: true,
      width: 200,
      minWidth: 250,
      maxWidth: 150,
      editEnable: true
    },
    {
      field: 'numberValue',
      headerText: "NumberValue",
      textAlign: 'right',
      visible: true,
      width: 100,
      editEnable: true,
      editType: "numeric"
    },
    {
      field: 'color',
      headerText: "ColorRGB",
      textAlign: 'center',
      editEnable: true,
      visible: true,
      template: (row: any) => {
        return <div style={{backgroundColor:(row?.color ? row?.color : '#000000'), height:'23px', width: '100%'}} />
      },
      width: 70,
      editType: "color"
    },
    {
      field: 'command',
      visible: true,
      textAlign: "center",
      fixedType: 'right',
      width: 40,
      minWidth: 40,
      maxWidth: 40,
      commandItems: [{ id: 'DELETE', title: '', icon: 'Trash2', tooltip: "Xóa" }],
      invisibleDisable: true
    }
  ]

  useEffect(() => {
    if (commandData.id === 'DELETE') {
      dataTableDetail.splice(commandData.index, 1)
      setDataTableDetail(dataTableDetail.length > 0 ? [...dataTableDetail] : [])
    }
  }, [commandData])

  const canContextMenuItems: IContextMenu[] = []
  const listContextMenuPermission = [
    { id: 'EDIT' },
    { id: 'ORDER' },
    { id: 'DELETE' }
  ]
  listContextMenuPermission.map((item: any) => {
    const rs: any = ContextMenuItems.find((menu: any) => menu.id === item.id)
    if (rs) {
      canContextMenuItems.push(rs)
    }
  })

  const ColumnsOptionView = () => {
    const columnsOptionView = ColumnsOption.filter(x => x.field !== "command")

    return columnsOptionView
  }

  const rowChange = (item: any, index: number, field: string) => {
    dataTableDetail[index] = item
    return field === 'color'
  }

  return (
    <Fragment>
      <div className='mb-1 table-edit'>
        <TableEdit
          idTable='tableProductSpecificationCode'
          dataSource={dataTableDetail}
          setDataSource={setDataTableDetail}
          commandClick={setCommandData}
          columns={typeModal === "Open" ? ColumnsOptionView() : ColumnsOption}
          defaultValue={defaultValueDetail}
          showBottomToolbar={typeModal !== "Open"}
          editDisable={typeModal === "Open"}
          rowChange={rowChange}
        />
      </div>

    </Fragment>
  )
}

export default ModalOptionsComponent