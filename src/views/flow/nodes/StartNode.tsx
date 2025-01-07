import React, { memo} from 'react'
import { Handle, Position } from 'reactflow'

export default memo(({ data, isConnectable }: any) => {
  return (
    <div className='custom-node start-node node-circle'>
      {/*<Handle*/}
      {/*  type="target"*/}
      {/*  position={Position.Left}*/}
      {/*  style={{ background: '#555' }}*/}
      {/*  onConnect={(params) => console.log('handle onConnect', params)}*/}
      {/*  isConnectable={isConnectable}*/}
      {/*/>*/}
      <div >
        {data.label}
      </div>
      <div style={{position: "absolute", bottom: -20}}>
        <span style={{whiteSpace: "nowrap", fontSize: 12}}>{data.title}</span>
      </div>

      <Handle
        className='custom-handle handle-source'
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      {/*<Handle*/}
      {/*  type="source"*/}
      {/*  position={Position.Right}*/}
      {/*  id="b"*/}
      {/*  style={{ bottom: 10, top: 'auto', background: '#555' }}*/}
      {/*  isConnectable={isConnectable}*/}
      {/*/>*/}
    </div>
  )
})
