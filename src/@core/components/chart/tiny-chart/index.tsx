import { Card, CardBody } from 'reactstrap'

const TinyChart = (props: any) => {
  // ** Props
  const { title, stats, background } = props

  return (
    <Card className='card-tiny-line-stats template' style={{background: `linear-gradient(118deg, ${background[0]}, ${background[1]}`}}>
      <CardBody className='pb-50'>
        <h6 className='text-white'>{title}</h6>
        <h2 className='fw-bolder mb-25 text-white'>{stats}</h2>

      </CardBody>
    </Card>
  )
}

export default TinyChart
