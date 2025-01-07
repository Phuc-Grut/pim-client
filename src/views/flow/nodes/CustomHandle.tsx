import React, { useCallback } from 'react'
import {getConnectedEdges, Handle, useNodeId, useStore} from 'reactflow'

const selector = (nodeId: any, isConnectable = true, maxConnections = Infinity) => (s: any) => {
  // If the user props say this handle is not connectable, we don't need to
  // bother checking anything else.
  if (!isConnectable) { return false }

  const node = s.nodeInternals.get(nodeId)
  const connectedEdges = getConnectedEdges([node], s.edges)

  return connectedEdges.length <= maxConnections
}

const CustomHandle = (props: any) => {
  const nodeId = useNodeId()
  const isConnectable = useStore(
    useCallback(selector(nodeId, props.isConnectable, props.maxConnections), [
      nodeId,
      props.isConnectable,
      props.maxConnections
    ])
  )

  return (
    <Handle
      className={props.className}
      type={props.type}
      position={props.position}
      id={props.id}
      style={props.style}
      isConnectable={isConnectable}
    />
  )
}

export default CustomHandle
