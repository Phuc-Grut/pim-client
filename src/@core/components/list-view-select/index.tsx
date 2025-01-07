import { ListViewComponent } from '@syncfusion/ej2-react-lists'
import React, { useEffect } from 'react'
import './_list-view.scss'

interface IListViewSelect {
  data: any
  setSelected: any
  selected?: any
  Template: any
  showCheckBox: boolean
}

const ListViewSelect = (props: IListViewSelect) => {

  const {
    data,
    setSelected,
    selected,
    Template,
    showCheckBox
  } = props

  let listView: ListViewComponent | null

  const handleSelect = (e: any) => {
    setSelected(e.data)
  }

  useEffect(() => {
    if (listView) {
      listView.selectItem(selected)
    }
  }, [selected])

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='tree-control_wrapper'>
          <ListViewComponent
            ref={g => {
              listView = g
            }}
            dataSource={data}
            showHeader={true}
            cssClass='e-list-custom'
            template={Template}
            select={handleSelect}
            showCheckBox={showCheckBox}
          />
        </div>
      </div>
    </div>
  )
}
export default ListViewSelect