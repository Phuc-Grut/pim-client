
import React, { memo} from 'react'
import { Handle, Position } from 'reactflow'
import CustomHandle from "@src/views/flow/nodes/CustomHandle"

export default memo(({ data, isConnectable }: any) => {
  return (
    <div className='shape-node condition-node'>
      <Handle
        className='custom-handle'
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <svg
        width={100}
        height={100}
        style={{display: "block", overflow: "visible"}}
      >
        <path d="M0,50 L50,0 L100,50 L50,100 z" fill="#ff6700" strokeWidth={2} stroke="#ff6700"></path>
      </svg>

      <div style={{position: "absolute"}}>
        <span style={{whiteSpace: "nowrap", fontSize: 12, color: '#fff'}}>{data.title}</span>
      </div>
      {/*<Handle*/}
      {/*  className='custom-handle'*/}
      {/*  type="source"*/}
      {/*  position={Position.Top}*/}
      {/*  id="top"*/}
      {/*  style={{ background: '#555' }}*/}
      {/*  isConnectable={isConnectable}*/}
      {/*/>*/}
      <CustomHandle
        className='custom-handle'
        type="source"
        position={Position.Top}
        id="top"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
        maxConnections={data.maxConnections}
      />

      <CustomHandle
        className='custom-handle'
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
        maxConnections={data.maxConnections}
      />

      {/*<Handle*/}
      {/*  className='custom-handle'*/}
      {/*  type="source"*/}
      {/*  position={Position.Bottom}*/}
      {/*  id="bottom"*/}
      {/*  style={{ background: '#555' }}*/}
      {/*  isConnectable={isConnectable}*/}
      {/*/>*/}
    </div>
  )
})
