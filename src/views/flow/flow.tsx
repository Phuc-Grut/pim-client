import React, {Fragment, useCallback, useContext, useRef, useState} from 'react'
import {Button} from "reactstrap"
import ReactFlow, {
  addEdge,
  // useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  // PanOnScrollMode,
  updateEdge,
  useReactFlow,
  useStoreApi, MarkerType, Panel, Controls, getIncomers, getOutgoers, getConnectedEdges
} from 'reactflow'

import 'reactflow/dist/style.css'
import './style.scss'

import { ContextMenu } from './contextMenu'
import {FlowContext} from "@src/views/flow/useContext"
import CustomConnectionLine from "@src/views/flow/line"
import CustomEdge from './edges/customEdge'
import ButtonEdge from './edges/ButtonEdge'


import ActionNode from "@src/views/flow/nodes/AcctionNode"
import StartNode from "@src/views/flow/nodes/StartNode"
import TaskNode from "@src/views/flow/nodes/TaskNode"
import CompleteNode from "@src/views/flow/nodes/CompleteNode"
import CancelNode from "@src/views/flow/nodes/CancelNode"
import ProcessNode from "@src/views/flow/nodes/ProcessNode"
import SubjectNode from "@src/views/flow/nodes/SubjectNode"
import ApproveNode from "@src/views/flow/nodes/ApproveNode"
import NotApproveNode from "@src/views/flow/nodes/NotApproveNode"
import ApproveActionNode from "@src/views/flow/nodes/ApproveActionNode"
import SignatureNode from "@src/views/flow/nodes/SignatureNode"
import SendEmailNode from "@src/views/flow/nodes/SendEmailNode"
import ConstraintNode from "@src/views/flow/nodes/ConstraintNode"
import ActionStatusNode from "@src/views/flow/nodes/ActionStatusNode"
import PauseNode from "@src/views/flow/nodes/PauseNode"

import {
  initialEdges,
  initialNodes,
  nodeDefaults,
  styleNode
} from './node'
import ConditionNode from "@src/views/flow/nodes/ConditionNode"
import YesEdge from "@src/views/flow/edges/YesEdge"
import NoEdge from "@src/views/flow/edges/NoEdge"

// const MIN_DISTANCE = 150

const edgeTypes = {
  custom: CustomEdge,
  buttonEdge: ButtonEdge,
  yesEdge: YesEdge,
  noEdge: NoEdge
}

const nodeTypes: any = {
  startNode : StartNode,
  taskNode : TaskNode,
  processNode : ProcessNode,
  subjectNode : SubjectNode,
  approveNode : ApproveNode,
  notApproveNode : NotApproveNode,
  actionNode : ActionNode,
  approveActionNode : ApproveActionNode,
  signatureNode : SignatureNode,
  sendEmailNode : SendEmailNode,
  constraintNode : ConstraintNode,
  actionStatusNode : ActionStatusNode,
  completeNode : CompleteNode,
  cancelNode : CancelNode,
  pauseNode : PauseNode,
  conditionNode : ConditionNode
}

const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: '#c4c4c4' },
  type: 'smoothstep',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#c4c4c4'
  }
}

// const panOnScrollMode: any = 'vertical'

const connectionLineStyle = { stroke: '#c4c4c4' }

const contextmenuItems = [
  {id: 'setting', text: 'Cài đặt thông số', iconCss: 'e-icons e-settings'},
  {separator: true},
  {id: 'taskNode', text: 'Thêm công việc', title: 'Công việc', iconCss: 'e-icons e-list-ordered'},
  {id: 'conditionNode', text: 'Thêm quy trình', title: 'Quy trình', iconCss: 'e-icons e-bounding'},
  // {id: 'processNode', text: 'Thêm quy trình 111', title: 'Quy trình', iconCss: 'e-icons e-transform'},
  {id: 'subjectNode', text: 'Thêm tạo đối tượng', title: 'Tạo đối tượng', iconCss: 'e-icons e-plus'},
  {id: 'approveNode', text: 'Thêm duyệt', title: 'Duyệt', iconCss: 'e-icons e-check'},
  {id: 'notApproveNode', text: 'Thêm không duyệt', title: 'Không duyệt', iconCss: 'e-icons e-close'},
  {id: 'actionNode', text: 'Thêm hành động', title: 'Hành động', iconCss: 'e-icons e-play'},
  {id: 'approveActionNode', text: 'Thêm duyệt hành động', title: 'Duyệt hành động', iconCss: 'e-icons e-check'},
  {id: 'signatureNode', text: 'Thêm ký số', title: 'Ký số', iconCss: 'e-icons e-signature'},
  {id: 'sendEmailNode', text: 'Thêm gửi Email', title: 'Gửi Email', iconCss: 'e-icons'},
  {id: 'constraintNode', text: 'Thêm ràng buộc đồng thời', title: 'Đồng thời', iconCss: 'e-icons e-filters'},
  {id: 'actionStatusNode', text: 'Thêm hành động chuyển trạng thái', title: 'Chuyển trạng thái', iconCss: 'e-icons e-reset'},
  {id: 'completeNode', text: 'Thêm trạng thái hoàn thành', title: 'Hoàn thành', iconCss: 'e-icons e-circle-check'},
  {id: 'cancelNode', text: 'Thêm trạng thái hủy', title: 'Hủy', iconCss: 'e-icons e-circle-close'},
  {id: 'pauseNode', text: 'Thêm trạng thái tạm dừng', title: 'Tạm dừng', iconCss: 'e-icons e-pause'},
  {separator: true},
  {id: 'delete', text: 'Xóa', iconCss: 'e-icons e-trash'}
]

const flowKey = 'react-flow'

const Flow = () => {
  const {handleModal, setSelectedNode, nodes, setNodes, onNodesChange} = useContext(FlowContext)
  const store = useStoreApi()
  const rs: any = localStorage.getItem(flowKey)
  const storeFlow = JSON.parse(rs)
  const { nodeInternals, edges: listEdges } = store.getState()

  const reactFlow = store.getState()
  const defaultViewport = {
    x: 0,
    y: reactFlow.height / 2,
    zoom : 1
  }


  const storeNodes = Array.from(nodeInternals.values())

  const edgeUpdateSuccessful: any = useRef(true)
  const { project, setViewport } = useReactFlow()

  // const [nodes, setNodes, onNodesChange] = useNodesState(storeFlow ? storeFlow.nodes : initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeFlow ? storeFlow.edges : initialEdges)

  const [rfInstance, setRfInstance] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [currentNode, setCurrentNode] = useState<any>(null)

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject()
      localStorage.setItem(flowKey, JSON.stringify(flow))
    }
  }, [rfInstance])

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const rs: any = localStorage.getItem(flowKey)
      const flow = JSON.parse(rs)

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport
        setNodes(flow.nodes || [])
        setEdges(flow.edges || [])
        setViewport({ x, y, zoom })
      }
    }

    restoreFlow()
  }, [setNodes, setViewport])

  const onCreateNew = useCallback(() => {
    const newFlow = async () => {
      setNodes(initialNodes)
      setEdges([])
      setViewport({ x: (reactFlow.width / 2) - 25, y: (reactFlow.height / 2) - 25, zoom: 1 })
    }

    newFlow()
    onSave()
  }, [setNodes, setViewport])

  const onEdgeUpdateStart = useCallback(() => {
    // edgeUpdateSuccessful.current = false
  }, [])

  const onEdgeUpdate = useCallback((oldEdge: any, newConnection: any) => {
    edgeUpdateSuccessful.current = true
    setEdges((els) => updateEdge(oldEdge, newConnection, els))
  }, [])

  const onEdgeUpdateEnd = useCallback((_: any, edge: any) => {
    console.log(edge)
    // if (!edgeUpdateSuccessful.current) {
    //   setEdges((eds) => eds.filter((e) => e.id !== edge.id))
    // }

    edgeUpdateSuccessful.current = true
  }, [])

  const onContextMenu = useCallback((e: any, node: any) => {
    e.preventDefault()
    // console.log(node)
    // const getNode = getCurrentNode(node)
    setIsOpen(true)
    setPosition({ x: e.clientX, y: e.clientY })
    setCurrentNode(node)
  }, [])

  const onNodeClick = useCallback((_: any, node: any) => {
    console.log('node', node)
    setCurrentNode(node)
  }, [])

  const onEdgeClick = useCallback((_: any, edge: any) => {
    console.log('edge', edge)
  }, [])

  const onNodesDelete = useCallback(
    (deleted: any) => {
      setEdges(
        deleted.reduce((acc: any, node: any) => {
          const incomers = getIncomers(node, nodes, edges)
          const outgoers = getOutgoers(node, nodes, edges)
          const connectedEdges = getConnectedEdges([node], edges)

          const remainingEdges = acc.filter((edge: any) => !connectedEdges.includes(edge))

          const createdEdges = incomers.flatMap(({ id: source }) => outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          )

          return [...remainingEdges, ...createdEdges]
        }, edges)
      )
    },
    [nodes, edges]
  )

  const onPaneContextMenu = (event: any) => console.log('onPaneContextMenu', event)

  const contextMenuClick = useCallback((val: any) => {

    console.log(val)
    const listTypeNode = val.nodes.filter((item: any) => item.type === val.id)

    switch (val.id) {
    case 'setting' :
      setSelectedNode(val)
      handleModal()
      break

    case 'delete' :
      setNodes((nds: any) => nds.filter((node: any) => node.id !== val.node.id))
      break

    case 'conditionNode' :
      const newConditionNode: any = {
        id: `${val.id}-${listTypeNode.length}`,
        type: val.id,
        // position: project({ x: val.node.position.x  + 200, y: (val.node.position.y - (val.node.height / 2)) }),
        position: project({ x: val.node.position.x  + 200, y: (val.node.position.y - ((styleNode[val.id].height - val.node.height) / 2)) }),

        data: {
          label: val.title,
          value: `${val.id}-${listTypeNode.length}`,
          title: val.title,
          content: val.title,
          maxConnections: 2
        },
        style: styleNode[val.id],
        ...nodeDefaults
      }
      const newYesNode: any = {
        id: `${val.id}-${listTypeNode.length}-yes`,
        type: 'actionNode',
        position: project({ x: val.node.position.x  + 400, y: (val.node.position.y - ((styleNode[val.id].height - val.node.height) / 2) - 100) }),
        data: {
          label: val.title,
          value: `${val.id}-${listTypeNode.length}`,
          title: 'Hành động',
          content: val.title
        },
        style: styleNode.actionNode,
        ...nodeDefaults
      }
      const newNoNode: any = {
        id: `${val.id}-${listTypeNode.length}-no`,
        type: 'actionNode',
        position: project({ x: val.node.position.x  + 400, y: (val.node.position.y + ((styleNode[val.id].height - val.node.height) / 2) + 100) }),
        data: {
          label: val.title,
          value: `${val.id}-${listTypeNode.length}`,
          title: 'Hành động',
          content: val.title
        },
        style: styleNode.actionNode,
        ...nodeDefaults
      }

      const newConditionEdge =  {
        id: `edge-${val.edges.length}`,
        source: val.node.id,
        target: `${val.id}-${listTypeNode.length}`,
        type: 'smoothstep',
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      }
      const newYesEdge =  {
        id: `edge-yes-${val.edges.length}`,
        source: `${val.id}-${listTypeNode.length}`,
        sourceHandle: 'top',
        updatable: 'target',
        target: `${val.id}-${listTypeNode.length}-yes`,
        type: 'yesEdge',
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      }
      const newNoEdge =  {
        id: `edge-no-${val.edges.length}`,
        source: `${val.id}-${listTypeNode.length}`,
        sourceHandle: 'bottom',
        updatable: 'target',
        target: `${val.id}-${listTypeNode.length}-no`,
        type: 'noEdge',
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      }

      setNodes((nds: any) => nds.concat(newConditionNode, newYesNode, newNoNode))
      setEdges((edge: any) => edge.concat(newConditionEdge, newYesEdge, newNoEdge))
      break

    default :
      console.log(styleNode[val.id].height)
      const newNode: any = {
        id: `${val.id}-${listTypeNode.length}`,
        type: val.id,
        position: project({ x: val.node.position.x  + 200, y: (val.node.position.y - ((styleNode[val.id].height - val.node.height) / 2)) }),

        data: {
          label: val.title,
          value: `${val.id}-${listTypeNode.length}`,
          title: val.title,
          content: val.title
        },
        style: styleNode[val.id],
        ...nodeDefaults
      }

      const newEdge =  {
        id: `edge-${val.edges.length}`,
        source: val.node.id,
        target: `${val.id}-${listTypeNode.length}`,
        type: 'smoothstep',
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      }

      setNodes((nds: any) => nds.concat(newNode))
      setEdges((edge) => edge.concat(newEdge))
      break

    }
  }, [setNodes, setEdges])

  return (
    <Fragment>
      <div style={{display: 'flex', width: '100%', height: 800}}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          onNodesDelete={onNodesDelete}
          // onNodeDrag={onNodeDrag}
          // onNodeDragStop={onNodeDragStop}
          onConnect={onConnect}
          onNodeContextMenu={onContextMenu}
          // onPaneClick={() => setIsOpen(false)}
          connectionLineComponent={CustomConnectionLine}
          connectionLineStyle={connectionLineStyle}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          panOnScroll={true}
          elementsSelectable={true}
          onPaneContextMenu={onPaneContextMenu}
          minZoom={1}
          maxZoom={3}
          onInit={setRfInstance}
          defaultViewport={defaultViewport}
          fitViewOptions={{
            minZoom: 1,
            maxZoom: 1
          }}
          fitView
        >
          <Panel position="top-right">
            <div >
              <Button className='me-1' onClick={onSave} >save</Button>
              <Button className='me-1' onClick={onRestore}>restore</Button>
              <Button className='me-1' onClick={onCreateNew}>Clear all</Button>
            </div>

          </Panel>
          <Controls />
          <Background variant={BackgroundVariant.Lines} gap={20} />
        </ReactFlow>

        <ContextMenu
          reactFlow={reactFlow}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          position={position}
          nodes={storeNodes}
          edges={listEdges}
          currentNode={currentNode}
          contextmenuItems={contextmenuItems}
          contextMenuClick={contextMenuClick}
        />
      </div>
    </Fragment>

  )
}

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
)
