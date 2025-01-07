import { TreeViewComponent } from '@syncfusion/ej2-react-navigations'
import React from 'react'
import './treeview.css'

interface ITreeViewSelect {
  dataTree: any,
  allowMultiSelection?: boolean,
  showCheckBox?: boolean,
  treeId: string,
  treeText: string,
  TreeChild: string,
  SetSelectNodes: any
}

const TreeViewSelect = (props: ITreeViewSelect) => {

  const {
    dataTree,
    allowMultiSelection,
    showCheckBox,
    treeId,
    treeText,
    TreeChild,
    SetSelectNodes
  } = props

  const fields = { dataSource: dataTree, id: treeId, text: treeText, child: TreeChild }

  const ref: any = React.useRef()

  const customClass: string = "custom-treeview"

  const nodeClicked = () => {
    if (allowMultiSelection) {
      const data = ref.current.selectedNodes.filter((x: any) => x)
      SetSelectNodes(data)
    }
  }

  const nodeSelected = (e: any) => {
    if (!allowMultiSelection) {
      SetSelectNodes(e.nodeData.id)
    }
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='tree-control_wrapper'>
          <TreeViewComponent
            ref={ref}
            fields={fields}
            cssClass={customClass}
            showCheckBox={showCheckBox}
            nodeClicked={nodeClicked}
            nodeSelected={nodeSelected}
            allowMultiSelection={allowMultiSelection ? allowMultiSelection : false} />
        </div>
      </div>
    </div>
  )
}
export default TreeViewSelect