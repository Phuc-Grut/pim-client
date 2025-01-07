import { Category, ChartAnnotation, ChartComponent, Highlight, Inject, Legend, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries, Tooltip } from "@syncfusion/ej2-react-charts"

const splineTemplate = () => {
  return (
    <div className="template" >
      <ChartComponent style={{ height: "100%", width: "100%" }}
        primaryXAxis={{ majorTickLines: { width: 0 }, valueType: "Category", majorGridLines: { width: 0 }, labelStyle:{size:'11px'}}}
        //load={this.load.bind(this)}
        primaryYAxis={{
          majorTickLines: { width: 0 },
          minimum: 0,
          maximum: 12000,
          interval: 2000,
          edgeLabelPlacement: 'Shift',
          labelFormat: '${value}',
          lineStyle: { width: 0 },
          labelStyle:{size:'11px'},
          titleStyle:{size:'13px'}
        }} 
        //legendSettings={{ enableHighlight:true }} 
        tooltip={{ enable: true, shared: true, enableMarker:false}} chartArea={{ border: { width: 0 } }}  >
        <Inject services={[SplineAreaSeries, Legend, Tooltip, Category, ChartAnnotation, Highlight]}></Inject>
        <SeriesCollectionDirective>
          <SeriesDirective type="SplineArea" dataSource={[
            { period : 'Jan', percentage : 3600   }, { period: 'Feb', percentage: 6200  },
            { period: 'Mar', percentage: 8100  }, { period: 'Apr', percentage: 5900  },
            { period: 'May', percentage: 8900  }, { period: 'Jun', percentage: 7200  },
            { period: 'Jul', percentage: 4300  }, { period: 'Aug', percentage: 4600  },
            { period: 'Sep', percentage: 5500  }, { period: 'Oct', percentage: 6350  },
            { period: 'Nov', percentage: 5700  }, { period: 'Dec', percentage: 8000  }
          ]} xName="period" yName="percentage" name="Online" width={2.5} marker={{ visible: false }} fill="#2485FA" opacity={0.3} border={{width:2.75, color:'#2485FA'}}></SeriesDirective>
          <SeriesDirective type="SplineArea" dataSource={[
            { period : 'Jan', percentage : 6400   }, { period: 'Feb', percentage: 5300 },
            { period: 'Mar', percentage: 4900   }, { period: 'Apr', percentage: 5300   },
            { period: 'May', percentage: 4200   }, { period: 'Jun', percentage: 6500   },
            { period: 'Jul', percentage: 7900   }, { period: 'Aug', percentage: 3800   },
            { period: 'Sep', percentage: 6800   }, { period: 'Oct', percentage: 3400   },
            { period: 'Nov', percentage: 6400   }, { period: 'Dec', percentage: 6800   }
          ]} xName="period" yName="percentage" name="Retail" width={2.5} marker={{ visible: false }} fill="#FEC200" opacity={0.3} border={{width:2.75, color:'#FEC200'}}></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  )
}
export default splineTemplate