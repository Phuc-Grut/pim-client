import { createContext } from 'react'

interface IWindowSize {
  innerWidth: number
}

export interface IContext {
  nodes?: any,
  setNodes?: any,
  onNodesChange?: any
  openModal?: boolean
  handleModal?: any
  selectedNode?: any
  setSelectedNode?: any
  windowSize?: any
}
export const FlowContext = createContext<IContext>({})
