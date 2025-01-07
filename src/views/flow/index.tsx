import React, {Fragment, useState} from 'react'

import ReactFow from './flow'

import 'reactflow/dist/style.css'
import './style.scss'


import {FlowContext} from "@src/views/flow/useContext"
import ModalSetting from "@src/views/flow/modal/modalSetting"
import {useNodesState} from "reactflow"
import {initialNodes} from "@src/views/flow/node"

const flowKey = 'react-flow'

const Flow = () => {

  const windowSize = window
  const rs: any = localStorage.getItem(flowKey)
  const storeFlow = JSON.parse(rs)

  const [nodes, setNodes, onNodesChange] = useNodesState(storeFlow ? storeFlow.nodes : initialNodes)

  const [openModal, setOpenModal] = useState(false)
  const [selectedNode, setSelectedNode] = useState<any>({})

  const handleModal = () => {
    setOpenModal(!openModal)
  }


  return (
    <Fragment>
      <FlowContext.Provider value={{
        nodes,
        setNodes,
        onNodesChange,
        openModal,
        handleModal,
        selectedNode,
        setSelectedNode,
        windowSize
      }}>
        <ReactFow />
        <ModalSetting />
      </FlowContext.Provider>

    </Fragment>

  )
}
export default Flow
