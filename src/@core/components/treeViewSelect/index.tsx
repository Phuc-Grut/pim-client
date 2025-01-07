import { TreeViewComponent } from '@syncfusion/ej2-react-navigations'
import React from 'react'
import './treeview.css'

interface ITreeViewSelect {
  dataTree: any,
  allowMultiSelection?: boolean,
  treeId: string,
  treeText: string,
  TreeChild: string,
  SetSelectNodes: any
}

const TreeViewMultiSelect = (props: ITreeViewSelect) => {

  const {
    dataTree,
    allowMultiSelection,
    treeId,
    treeText,
    TreeChild,
    SetSelectNodes
  } = props

  const fields = { 
    dataSource: dataTree, 
    id: treeId, 
    text: treeText,
    child: TreeChild }

  const ref: any = React.useRef()
  const showCheckBox: boolean = true
  
  const nodeCheck = (args: any) => {
    const checkedNode = [args.node]
    if (args.event.target.classList.contains('e-fullrow') || args.event.key === "Enter") {
      const getNodeDetails = ref.current?.getNode(args.node)
      if (getNodeDetails.isChecked === 'true') {
        ref.current?.uncheckAll(checkedNode)
      } else {
        ref.current?.checkAll(checkedNode)
      }
    }
    //const getNodeDetails = ref.current?.getNode(args.node)
    //const element = ref.current?.element.querySelector(`[data-uid="${ getNodeDetails.id  }"]`)
    const liElements = ref.current?.element.querySelectorAll('ul li')
    const arr = []
    for (let i = 0; i < liElements.length; i++) {
      const nodeData = ref.current?.getNode(liElements[i])
      if (nodeData.isChecked === 'true') {
        arr.push(nodeData)
      }
    }
    SetSelectNodes(arr)
  }

  const handleSelectOrg = (val: any) => {
    console.log(val.nodeData)
  }

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='tree-control_wrapper'>
          <TreeViewComponent
            ref={ref}
            fields={fields} 
            //cssClass={customClass}
            allowMultiSelection={allowMultiSelection ? allowMultiSelection : false}
            nodeClicked={nodeCheck} 
            showCheckBox={showCheckBox}
            nodeSelecting={(val: any) => handleSelectOrg(val)}
            keyPress ={nodeCheck}
          />
        </div>
      </div>
    </div>
  )
}
export default TreeViewMultiSelect