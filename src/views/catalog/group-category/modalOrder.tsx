// ** React Imports
import { Fragment, useContext, useRef } from 'react'

import { Modal, ModalBody, Button, Form} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Selection,
  RowDD,
  Inject,
  CommandColumn
} from '@syncfusion/ej2-react-grids'
import { IContext, GroupCategoryContext } from './useContext'
import { useGroupCategory } from './hooks'
import ModalHeader from '@components/modal-header'

const ModalOrderComponent = () => {
  // ** Props
  const { t } = useTranslation()
  
  const {typeModal, handleModalOrder, openModalOrder, windowSize, optionGroupCategory} = useContext<IContext>(GroupCategoryContext)
  // ** Function to run when sidebar opens
  const gird = useRef<GridComponent>(null)
  
  const {
    updateDataSortApi
  } = useGroupCategory()
 

  // ** Function to run when sidebar closes
  const handleModalClosed = () => {
    
  }
  const handleFormOpened = () => {
    
  }
  
  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color="secondary" onClick={handleModalOrder} outline>
          {t('Close')}
        </Button>
      </Fragment>
    )
  }
  const rowDrop = () => {
    setTimeout(() => {
      const data  : any = gird.current?.currentViewData.map((x: any, i) => ({id: x.id, sortOrder: i + 1}))    
      updateDataSortApi({listGui: data})
        .unwrap()
        .then()
        .catch(ex => console.log(ex))
    }, 100)
  }


  const commands: any = [
    {  id: 'MOVEUP', buttonOption: { cssClass: 'e-flat', iconCss: 'e-chevron-up-fill-4 e-icons' }, title: 'Up'},
    {  id: 'MOVEDOWN', buttonOption: { cssClass: 'e-flat', iconCss: 'e-chevron-down-fill-4 e-icons' }, title: 'Down'}
  ]

  const rowDataBound = (e: any) => {
    const lastBtn = e.data === optionGroupCategory[optionGroupCategory.length - 1] ? "lastBtn" : ""
    const firstBtn = e.data === optionGroupCategory[0] ? "firstBtn" : ""

    if (firstBtn) {
      e.row.querySelector("button[title='Up']").ej2_instances[0].cssClass = "e-disabled e-flat"
    }

    if (lastBtn) {
      e.row.querySelector("button[title='Down']").ej2_instances[0].cssClass = "e-disabled e-flat"
    }


  }

  const commandClick = (args: any) => {
    const index = optionGroupCategory.findIndex((x: any) => x.id === args.rowData.id)
    if (gird?.current) {
      if (args.commandColumn.id === 'MOVEUP' && index !== 0) {
        gird.current.reorderRows([index], index - 1)
        rowDrop()
      } else if (args.commandColumn.id === 'MOVEDOWN' && index !== optionGroupCategory.length - 1) {
        gird.current.reorderRows([index], index + 1)
        rowDrop()
      }

    }
  }

  return (
    <Modal
      isOpen={openModalOrder}
      toggle={handleModalOrder}
      className='modal-dialog modal-lg'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleModalClosed}
    >
      <Form id='form-modal-globalzone' className='todo-modal'>
        {/* dong form */}
        <ModalHeader typeModal={typeModal} handleModal={handleModalOrder} title='InfomationChannel'>
        </ModalHeader>
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <ModalBody>
            <div className='control-pane'>
              <div className='control-section'>
                <GridComponent
                  dataSource={optionGroupCategory}
                  ref= {gird}
                  allowRowDragAndDrop={true}
                  commandClick={commandClick}
                  rowDataBound={rowDataBound}
                  rowDrop={rowDrop}
                >
                  <ColumnsDirective>
                    <ColumnDirective field='code' headerText={t("InfomationChannelCode")} width='100'/>
                    <ColumnDirective field='name' headerText={t("InfomationChannelName")} width='150'/>
                    <ColumnDirective headerText='Sắp xếp' width='120' commands={commands}/>
                  </ColumnsDirective>
                  <Inject services={[RowDD, Selection, CommandColumn]} />
                </GridComponent>
              </div>
            </div>
          </ModalBody>
        </Scrollbars>
        <div
          className="d-flex justify-content-end p-1"
          style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}
        >
          {renderFooterButtons()}
        </div>
      </Form>
    </Modal >
  )
}

export default ModalOrderComponent
