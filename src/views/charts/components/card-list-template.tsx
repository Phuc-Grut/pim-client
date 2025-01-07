import {
  Card,
  CardTitle,
  CardHeader
} from 'reactstrap'
import PerfectScrollbar from "react-perfect-scrollbar"
const CardListTemplate = (props: any) => {
  const {data} = props

  const renderStates = () => {
    return data?.data?.map((state: any, index: number) => {
      return (
        <div key={index} className='browser-states'>
          <div className='d-flex'>
            <h6 className='align-self-center mb-0'>{state.title}</h6>
          </div>
          <div className='d-flex align-items-center'>
            <div className='fw-bold text-body-heading me-1'>{state.value}</div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='template overflow-hidden'>
      <Card className='card-browser-states h-100 w-100'>
        <CardHeader style={{padding: '1rem'}} >
          <div>
            <CardTitle tag='h6'>{data.title}</CardTitle>
          </div>

        </CardHeader>
        {/*<CardBody className='p-0'>*/}
        <PerfectScrollbar
          style={{maxHeight: 'calc(100% - 60px)'}}
          className='mb-50'
        >
          <div className='p-1 pt-0'>
            {renderStates()}
          </div>

        </PerfectScrollbar>

        {/*</CardBody>*/}
      </Card>
    </div>

  )
}

export default CardListTemplate
