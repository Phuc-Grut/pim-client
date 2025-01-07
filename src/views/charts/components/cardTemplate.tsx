import {Card} from "reactstrap"
const CardTemplate = (props: any) => {
  const {data} = props
  return (
    <div className='template'>
      <Card className='card-tiny-line-stats template' style={{background: `linear-gradient(118deg, ${data.background[0]}, ${data.background[1]}`}}>
        <div className='p-1'>
          <h6 className='text-white'>{data.title}</h6>
          <h2 className='fw-bolder mb-25 text-white'>{data.value}</h2>
        </div>
      </Card>
    </div>
  )
}

export default CardTemplate
