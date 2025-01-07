import React from 'react'
import { BaseEdge, EdgeLabelRenderer, SmoothStepEdgeProps, getSmoothStepPath } from 'reactflow'

// import './buttonedge.css'

const onEdgeClick = (evt: any, id: any) => {
  evt.stopPropagation()
  console.log(id)
  console.log(evt)
  // alert(`remove ${id}`)
}

export default function ButtonEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd
}: SmoothStepEdgeProps) {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })

  return (
    <>
      <BaseEdge
        path={path}
        markerEnd={markerEnd}
        style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all'
          }}
          className="nodrag nopan"
        >
          <button className="edgebutton" onClick={(event) => onEdgeClick(event, id)}>
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}
