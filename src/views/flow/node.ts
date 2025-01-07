import { Position } from 'reactflow'

export const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left
}

export const styleNode: any = {
  startNode: {
    borderRadius: '100%',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #c4c4c4'
  },
  taskNode: {
    backgroundColor: '#22B14C',
    width: 80,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    border: '1px solid #c4c4c4'
  },
  processNode: {
    backgroundColor: '#22B14C',
    width: 80,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    border: '1px solid #c4c4c4'
  },
  subjectNode: {
    borderRadius: '100%',
    backgroundColor: '#A349A4',
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #8E408F'
  },
  approveNode: {
    borderRadius: 4,
    backgroundColor: '#32F78A',
    width: 60,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #28c76f'
  },
  notApproveNode: {
    borderRadius: 4,
    backgroundColor: '#E8E8E8',
    width: 60,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #c4c4c4'
  },
  actionNode: {
    backgroundColor: '#fff',
    width: 60,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    border: '1px solid #c4c4c4'
  },
  approveActionNode: {
    borderRadius: 4,
    backgroundColor: '#9FFCFD',
    width: 60,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #8DE0E0'
  },
  signatureNode: {
    borderRadius: 4,
    backgroundColor: '#fff',
    width: 60,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #c4c4c4'
  },
  sendEmailNode: {
    borderRadius: 4,
    backgroundColor: '#fff',
    width: 60,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #c4c4c4'
  },
  constraintNode: {
    borderRadius: 4,
    backgroundColor: '#fff',
    width: 60,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #c4c4c4'
  },
  actionStatusNode: {
    borderRadius: '100%',
    backgroundColor: '#32F78A',
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #28c76f'
  },
  completeNode: {
    borderRadius: '100%',
    backgroundColor: '#32F78A',
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #28c76f'
  },
  cancelNode: {
    borderRadius: '100%',
    backgroundColor: '#E8E8E8',
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #c4c4c4'
  },
  pauseNode: {
    borderRadius: '100%',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #c4c4c4'
  },
  conditionNode: {
    // borderRadius: '100%',
    // backgroundColor: '#fff',
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
    // border: '1px solid #c4c4c4'
  }
}


const initialNodes = [
  {
    id: 'start',
    position: { x: 0, y: 0 },
    type: 'startNode',
    data: {
      label: '⬛',
      value: 'test',
      title: 'Bắt đầu'
    },
    style: styleNode.startNode,
    ...nodeDefaults
  }
]

const initialEdges: any = []

export { initialEdges, initialNodes }
