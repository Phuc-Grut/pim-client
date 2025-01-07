import { Category, ChartComponent, ColumnSeries, DataLabel, Inject, Legend, SeriesCollectionDirective, SeriesDirective, Tooltip } from "@syncfusion/ej2-react-charts"
import {Card} from "reactstrap"

const ColumnTemplate = (props: any) => {
  const {data} = props
  return (
    <Card className="template" >
      <div className='card-container p-1 d-flex flex-column justify-content-between h-100'>
        <div className='card-item__header'>
          <h4 className='text-center'>{data.title}</h4>
        </div>
        <ChartComponent
          style={{ height: "100%", width: "100%" }}
          primaryXAxis={{ valueType: 'Category',  majorGridLines: { width: 0 }, labelStyle:{size:'11px'} }}
          primaryYAxis={{
            minimum:0,
            // maximum:100,
            // interval:20,
            majorTickLines: { width: 0 },
            labelFormat: '{value}',
            lineStyle: { width: 0 },
            labelStyle:{size:'11px'},
            titleStyle:{size:'13px'}
          }}
          tooltip={{ enable: true }}
          legendSettings={{ padding:5, shapeHeight:8, shapeWidth:8}}
          chartArea={{ border: { width: 0 } }}  >
          <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}></Inject>
          <SeriesCollectionDirective>
            <SeriesDirective
              type="Column"
              dataSource={data.data}
              xName="x"
              yName="y"
              fill='#2485FA'
              marker={{ dataLabel: { visible: true, position: 'Middle', font: { color: 'white' } } }}>

            </SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>

    </Card>
  )
}
export default ColumnTemplate
