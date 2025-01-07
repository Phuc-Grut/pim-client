// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'
import { Modal, ModalBody, Button, Form } from 'reactstrap'
import * as Icon from "becoxy-icons"
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

const ModalHeader = (props: any) => {
  const { children, handleModal } = props
  return (
    <div className="modal-header d-flex align-items-center justify-content-between mb-1">
      <h5 className="modal-title">{children}</h5>
      <div className="todo-item-action d-flex align-items-center">
        <Icon.X
          className="fw-normal mt-25 cursor-pointer"
          fontSize={16}
          onClick={handleModal}
        />
      </div>
    </div>
  )
}
const ModalSortComponent = (props: any) => {
  // ** Props
  const {
    openModal,
    handleModal,
    columns,
    data,
    setData,
    sortApi,
    sortClient,
    setDataCallback
  } = props

  const { t } = useTranslation()

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const [windowSize, setWindowSize] = useState(getWindowSize())

  const gird = useRef<GridComponent>(null)
  const handleModalClosed = () => {
    setData([])
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])


  const handleFormOpened = () => {

  }
  const handleSidebarTitle = () => {
    return t('Sort')
  }

  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color="secondary" onClick={handleModal} outline>
          {t('Close')}
        </Button>
      </Fragment>
    )
  }

  const rowDrop = () => {
    if (sortClient) {
      setDataCallback([...data])
    } else {
      setTimeout(() => {
        const sortData: any = gird.current?.currentViewData.map((x: any, index: number) => ({ id: x.value, sortOrder: index + 1 }))
        sortApi({ sortList: sortData })
          .unwrap()
          .then()
          .catch((ex: any) => console.log(ex))
      }, 100)
    }
  }

  const sort = (type: number) => {
    const ls = data.filter((x: any) => x)
    ls.sort((a: any, b: any) => {
      if (type === 0) {
        return a.label.localeCompare(b.label)
      } else {
        return b.label.localeCompare(a.label)
      }
    })
    setData(ls)
    rowDrop()
  }

  const commands: any = [
    { id: 'MOVEUP', buttonOption: { cssClass: 'e-flat', iconCss: 'e-chevron-up-fill-4 e-icons' }, title: 'Up' },
    { id: 'MOVEDOWN', buttonOption: { cssClass: 'e-flat', iconCss: 'e-chevron-down-fill-4 e-icons' }, title: 'Down' }
  ]

  const rowDataBound = (e: any) => {
    const lastBtn = e.data === data[data.length - 1] ? "lastBtn" : ""
    const firstBtn = e.data === data[0] ? "firstBtn" : ""
    if (firstBtn) {
      e.row.querySelector("button[title='Up']").ej2_instances[0].cssClass = "e-disabled e-flat"
    }
    if (lastBtn) {
      e.row.querySelector("button[title='Down']").ej2_instances[0].cssClass = "e-disabled e-flat"
    }


  }

  const commandClick = (args: any) => {
    const index = data.findIndex((x: any) => x.value === args.rowData.value)
    if (gird?.current) {
      if (args.commandColumn.id === 'MOVEUP' && index !== 0) {
        gird.current.reorderRows([index], index - 1)
        rowDrop()
      } else if (args.commandColumn.id === 'MOVEDOWN' && index !== data.length - 1) {
        gird.current.reorderRows([index], index + 1)
        rowDrop()
      }

    }
  }
  return (
    <Modal
      isOpen={openModal}
      toggle={handleModal}
      className='modal-dialog modal-lg'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleModalClosed}
    >
      <Form id='form-modal-sort' className='todo-modal'>
        <ModalHeader handleModal={handleModal}>
          {handleSidebarTitle()}
        </ModalHeader>
        <Scrollbars
          autoHide
          autoHeight
          autoHeightMin={180}
          autoHeightMax={windowSize.innerHeight - 180}
        >
          <ModalBody>
            <div className='control-pane'>
              <div className='control-section'>
                <div className='d-flex justify-content-end w-100 mb-2'>
                  <div className='bar__action-right d-flex'>
                    <Button color='primary' className='ms-1 d-flex rounded' onClick={() => sort(0)} outline>
                      {t('Ascending sort')}
                      <Icon.ArrowUp fontSize={14} className='ms-50' />
                    </Button>
                    <Button color='primary' className='ms-1 d-flex rounded' onClick={() => sort(1)} outline>
                      {t('Descending sort')}
                      <Icon.ArrowDown fontSize={14} className='ms-50' />
                    </Button>
                  </div>
                </div>
                <GridComponent
                  dataSource={data}
                  ref={gird}
                  allowRowDragAndDrop={true}
                  commandClick={commandClick}
                  rowDataBound={rowDataBound}
                  rowDrop={(e: any) => {
                    gird.current?.reorderRows([e.fromIndex], e.dropIndex)
                    rowDrop()
                    e.cancel = true
                  }}>
                  <ColumnsDirective>
                    {columns.map((col: any, index: number) => (
                      <ColumnDirective key={index} {...col} />
                    ))}
                    <ColumnDirective headerText={t('Sort')} width='120' commands={commands} />
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

export default ModalSortComponent
