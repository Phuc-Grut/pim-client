import React, {Fragment, memo} from 'react'
import { Handle, Position } from 'reactflow'
import { X} from "becoxy-icons"

export default memo(({ data, isConnectable }: any) => {
  return (
    <Fragment>
      <Handle
        className='custom-handle'
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        <X color='#000' fontSize={18}/>
      </div>
      <div style={{position: "absolute", bottom: -20}}>
        <span style={{whiteSpace: "nowrap", fontSize: 12}}>{data.title}</span>
      </div>
      <Handle
        className='custom-handle'
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
    </Fragment>
  )
})
