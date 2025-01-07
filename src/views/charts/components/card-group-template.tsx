// import {Fragment, useContext} from "react"
import {Card, CardBody, Col, Row} from "reactstrap"
import CardLineChartTemplate from "@src/views/charts/components/card-line-chart-template"
// import { ThemeColors } from '@src/utility/context/ThemeColors'
const CardGroupTemplate = (props: any) => {
  const {data} = props
  console.log(data)
  // const { colors } = useContext(ThemeColors)
  return (
    <div className='template overflow-hidden'>
      <Card className='card-statistics py-50 px-50 m-0' style={{height: '100%', width: '100%'}}>
        {/*<CardHeader className='d-flex justify-content-center pt-75 pb-75' style={{boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)', height: 50}}>*/}
        {/*  <CardText tag='h5' className="p-0 text-center">{data.title}:  <strong style={{fontSize: 20}}>{data.total}</strong></CardText>*/}
        {/*</CardHeader>*/}
        <CardBody className='p-0 mt-25'>
          <Row className='gx-25 gy-50 h-100'>
            {data.data.map((item: any, index: number) => (
              <Col lg={6} key={index} >
                <CardLineChartTemplate
                  dataSource={item}
                />
              </Col>
            ))}
          </Row>

        </CardBody>
      </Card>
    </div>
  )
}

export default CardGroupTemplate
