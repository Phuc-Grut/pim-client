import { Category, ChartComponent, ColumnSeries, DataLabel, Inject, Legend, SeriesCollectionDirective, SeriesDirective, Tooltip } from "@syncfusion/ej2-react-charts"

const LineTemplate = () => {
  const data1: any = [
    { x: 'Jan', y: 46 },
    { x: 'Feb', y: 27 },
    { x: 'Mar', y: 26 }
  ]
  const data2: any = [
    { x: 'Jan', y: 37 },
    { x: 'Feb', y: 23 },
    { x: 'Mar', y: 18 }
  ]
  const data3: any = [
    { x: 'Jan', y: 38 },
    { x: 'Feb', y: 17 },
    { x: 'Mar', y: 26 }
  ]
  return (
    <div className="template">
      <ChartComponent
        style={{ height: '100%', width: '100%' }}
        primaryXAxis={{
          valueType: 'Category',
          interval: 1,
          majorGridLines: { width: 0 }
        }}
        primaryYAxis={{
          majorGridLines: { width: 0 },
          majorTickLines: { width: 0 },
          lineStyle: { width: 0 },
          labelStyle: { color: 'transparent' }
        }}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
      >
        <Inject
          services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}
        />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={data1}
            xName="x"
            yName="y"
            name="Jan"
            type="Column"
            marker={{ dataLabel: { visible: false } }}
            fill="#00bdae"
          ></SeriesDirective>
          <SeriesDirective
            dataSource={data2}
            xName="x"
            yName="y"
            name="Feb"
            type="Column"
            marker={{ dataLabel: { visible: false } }}
            fill="#e56691"
          ></SeriesDirective>
          <SeriesDirective
            dataSource={data3}
            xName="x"
            yName="y"
            name="Mar"
            type="Column"
            marker={{ dataLabel: { visible: false } }}
            fill="#357cd2"
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  )
}
export default LineTemplate