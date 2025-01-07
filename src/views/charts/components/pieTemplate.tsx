import { AccumulationChartComponent, 
  AccumulationDataLabel, 
  AccumulationLegend, 
  AccumulationSeriesCollectionDirective, 
  AccumulationSeriesDirective, 
  AccumulationTooltip, 
  Inject,
  PieSeries 
} from "@syncfusion/ej2-react-charts"

const PieTemplate = () => {
  const data1: any[] = [
    { x: 'Chrome', y: 59.28, text: 'Chrome: 59.28%' }, 
    { x: 'UC Browser', y: 4.37, text: 'UC Browser: 4.37%' },
    { x: 'Opera', y: 3.12, text: 'Opera: 3.12%' },
    { x: 'Sogou Explorer', y:1.73, text: 'Sogou Explorer: 1.73%' },
    { x: 'QQ', y: 3.96, text: 'QQ: 3.96%' },
    { x: 'Safari', y:4.73, text: 'Safari: 4.73%' },
    { x: 'Internet Explorer', y:6.12, text: 'Internet Explorer: 6.12%' },
    { x: 'Edge', y: 7.48, text: 'Edge: 7.48%' },
    { x: 'Others', y: 9.57, text: 'Others: 9.57%' } 
  ]
  
  return (
    <div className="template" >
      <AccumulationChartComponent id='pie-chart' 
        //ref={pie => this.pie = pie}
        //load={this.load.bind(this)}
        legendSettings={{ visible: true,
          toggleVisibility: false
        }}
        enableSmartLabels={true}
        enableAnimation={false}
        center={{x: '50%', y: '50%'}}
        enableBorderOnMouseMove={false}
        selectionMode={'Point'}
        tooltip={{ enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: `@{subreddit}` }}
        //loaded={this.onChartLoad.bind(this)}
        style={{ height: "100%", width: "100%" }}
      >
        <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective dataSource={data1} name='Browser' xName='x' yName='y'
            explode={true} explodeOffset='10%' explodeIndex={0} startAngle={30}
            dataLabel={{
              visible: true,
              position: 'Outside',
              name: 'text',
              font: {
                fontWeight: '600'
              }
            }}
            radius='70%'
          >
          </AccumulationSeriesDirective>
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </div>
    // <PanelDirective sizeX={3} sizeY={2} row={0} col={0} content={''}/>
  )
}
export default PieTemplate