
import TinyChart from "@components/chart/tiny-chart"

const CardLineChartTemplate = (props: any) => {

  const {dataSource} = props
  // ** State

  return (
    <TinyChart
      background={dataSource.background}
      title={dataSource.title}
      stats={dataSource.stats}
      dataSource={dataSource.data}
      type='Line'
      markerColor='#fff'
    />
  )
}

export default CardLineChartTemplate
