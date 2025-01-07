import React, { Fragment, useContext, useEffect, useState } from 'react'
import { IContextMenu } from '@src/domain/models/IContextMenu'
import { ContextMenuItems } from '@src/domain/constants/constantContextMenu'
import { ProductAttributeContext } from '../useContext'
import TableEdit, { IColumnTable } from '@components/table-edit'
// import { useUnit } from '@src/redux/pim/hook/unit'

const defaultValueDetail: any = {
  name: '',
  alias: '',
  priceAdjustment: 0,
  weightAdjustment: 0,
  isPreSelected: false,
  color: '',
  displayOrder: 1
}

const ModalOptionsComponent = () => {

  // const { t } = useTranslation()
  
  const [commandData, setCommandData] = useState<any>({})

  const {
    // typeModal,
    dataTableDetail,
    setDataTableDetail,
    typeModal
    // dataDeleteDetail,
    //handleSidebar,
    // setDataSidebar,
    // setTypeMo,
    // typeMo,
    // setIndexRow,
    // setOpenSidebar
  } = useContext(ProductAttributeContext)
  // const [openModalSort, setOpenModalSort] = useState(false)
  // const [dataSort, setDataSort] = useState([])
  // const [dataCallback, setDataCallback] = useState<any>({})
  // const [fieldColor, setFieldColor] = useState("")
  // const [contextMenuClick, setContextMenuClick] = useState<any>({})

  const ColumnsOption: IColumnTable[] = [
    {
      field: '#',
      headerText: 'STT',
      fixedType:'left',
      invisibleDisable: true
    },
    {
      field: 'name',
      headerText: "Name",
      editEnable: true,
      width: 100
      // minWidth: 50,
      // maxWidth: 150
    },
    {
      field: 'alias',
      headerText: "Sign",
      editEnable: true,
      visible: true,
      width: 100
      // minWidth: 50,
      // maxWidth: 150
    },
    {
      field: 'priceAdjustment',
      headerText: "PriceAdjustment",
      textAlign: 'right',
      editType: 'numeric',
      editEnable: true,
      visible: true,
      width: 100,
      // minWidth: 50,
      // maxWidth: 150,
      haveSum: true
    },
    {
      field: 'weightAdjustment',
      headerText: "WeightAdjustment",
      textAlign: 'right',
      editEnable: true,
      visible: true,
      width: 100,
      // minWidth: 50,
      // maxWidth: 150,
      editType: "numeric"
    },
    {
      field: 'color',
      headerText: "ColorRGB",
      textAlign: 'center',
      visible: true,
      editEnable: true,
      width: 50,
      template: (row: any) => {
        return <div style={{backgroundColor:(row?.color ? row?.color : '#000000'), height:'23px', width: '100%'}} />
      },
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
    // ,
    // {
    //   field: 'isPreSelected',
    //   headerText: "IsPreSelected",
    //   visible: true,
    //   width: 80,
    //   minWidth: 100,
    //   maxWidth: 100,
    //   headerTemplate,
    //   template: checkTemplate
    // }
  ]
  
  
  // const sortColumns = [
  //   {
  //     isPrimaryKey: true,
  //     field: 'label',
  //     headerText: "Option",
  //     visible: true,
  //     width: 100,
  //     maxWidth: 120,
  //     minWidth: 80
  //   }
  // ]

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

  // useEffect(() => {
  //   if (!isObjEmpty(contextMenuClick)) {
  //     if (contextMenuClick.item.id === 'EDIT') {
  //       if (setTypeMo) {
  //         setTypeMo(Object.assign(typeMo, { ['Sidebar']: { value: 'Edit' } }))
  //         setIndexRow(contextMenuClick.rowInfo?.rowIndex)
  //       }
  //       setDataSidebar(contextMenuClick.rowInfo?.rowData)
  //       setOpenSidebar(true)
  //     } else if (contextMenuClick.item.id === 'DELETE') {
  //       const news = dataTableDetail.filter((x: any, index: any) => index !== contextMenuClick.rowInfo?.rowIndex)
  //       setDataTableDetail(news)
  //       setDataDeleteDetail((old: any) => [...old, { id: contextMenuClick.rowInfo?.rowData.id }])
  //     } else if (contextMenuClick.item.id === 'ORDER') {
  //       const data = dataTableDetail.map((x: any) => ({ value: x.alias, label: x.name }))
  //       setDataSort(data)
  //       handleModalSort()
  //     }
  //   }
  // }, [contextMenuClick])

  // useEffect(() => {
  //   if (dataCallback.length > 0) {
  //     const newData: any = []
  //     dataCallback.map((item: any) => {
  //       const rs: any = dataTableDetail.find((x: any) => x.alias === item.id)
  //       if (rs) {
  //         newData.push(rs)
  //       }
  //     })
  //     setDataTableDetail(newData)
  //   }
  // }, [dataCallback])

  useEffect(() => {
    if (commandData.id === 'DELETE') {
      dataTableDetail.splice(commandData.index, 1)
      setDataTableDetail(dataTableDetail.length > 0 ? [...dataTableDetail] : [])
    }
  }, [commandData])

  // const handle = () => {
  //   if (setTypeMo) {
  //     setTypeMo(Object.assign(typeMo, { ['Sidebar']: { value: 'Add' } }))
  //   }

  //   setIndexRow(dataTableDetail.length)
  //   setDataSidebar({})
  //   setOpenSidebar(true)
  // }

  // const handleModalSort = () => {
  //   setOpenModalSort(!openModalSort)
  // }

  // const rowChange = (item: any, index: number) => {
  //   dataTableDetail[index] = item
  // }

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
      {/* {typeModal !== 'Open' && <div className='table-toolbar'>
        <Card className='table-bar bar__action'>
          <CardBody>
            <div className='d-flex justify-content-between align-items-center w-100'>
              <div className='bar__action-right d-flex ms-auto'>
                <Button color='primary' onClick={handle} className='d-flex'>
                  <Icon.Plus fontSize={14} className='me-50' />
                  {t('Add')}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>} */}

      <div className='mb-1 table-edit'>
        {/* <TableTemplate
          typeModal={typeModal}
          resource={idTable}
          idTable={idTable}
          dataTable={dataTableDetail}
          setDataTable={setDataTableDetail}
          columns={ColumnsOption}
          showContextMenu={typeModal !== 'Open'}
          contextMenuItems={canContextMenuItems}
          setContextMenuClick={setContextMenuClick}
          inlineEdit
          allowAdding={false}
          allowEditing={false}
          allowDeleting={true}
          allowResizing
          totalItem={0}
          allowSelection={true}
          setListDelete={setDataDeleteDetail}
          listDelete={dataDeleteDetail}
        /> */}

        <TableEdit
          idTable='tableProductSpecificationCode'
          dataSource={dataTableDetail}
          setDataSource={setDataTableDetail}
          rowChange={rowChange}
          commandClick={setCommandData}
          columns={typeModal === "Open" ? ColumnsOptionView() : ColumnsOption}
          defaultValue={defaultValueDetail}
          showBottomToolbar={typeModal !== "Open"}
          editDisable={typeModal === "Open"}
          // addDisable
        />
        {/* <ModalSortComponent
          openModal={openModalSort}
          handleModal={handleModalSort}
          data={dataSort}
          setData={setDataSort}
          columns={sortColumns}
          sortClient={true}
          setDataCallback={setDataCallback}
        /> */}
      </div>

    </Fragment>
  )
}

export default ModalOptionsComponent