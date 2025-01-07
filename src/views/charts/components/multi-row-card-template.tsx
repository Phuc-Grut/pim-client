import {Card, CardBody, Col, Row} from "reactstrap"

const MultiRowCardTemplate = (props: any) => {
  const {data} = props
  return (
    <div className='template overflow-hidden'>
      <Card className='card-statistics py-50 px-50 m-0' style={{height: '100%', width: '100%'}}>
        <CardBody className='p-0 mt-25'>
          <Row className='gx-25 gy-50 h-100'>
            {data?.data?.map((item: any, index: number) => (
              <Col lg={3} key={index} className=''>
                <div className='h-100  d-flex justify-content-between align-items-center' style={{boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)', backgroundColor: item.background}}>
                  <div
                    style={{ width: 'calc( 100% - 100px)'}}
                    className='h-100 d-flex align-items-center text-white  ps-1 pe-50 fw-bold'>
                    {item.title}
                  </div>
                  <div className='pt-50 text-end ps-50 pe-1 text-white' style={{fontWeight: 'bold', fontSize: '22px', width: '100px'}}>{item.value}</div>
                </div>
              </Col>
            ))}
          </Row>

        </CardBody>
      </Card>
    </div>
  )
}

export default MultiRowCardTemplate
