import { Fragment } from "react"
import './progress-bar.scss'

interface IFCircleProgressBar {
  circleWidth: number,
  percent: number
}

const CircleProgressBar = (props: IFCircleProgressBar) => {
  const radius = (props.circleWidth / 2) - (props.circleWidth / 10)
  const dashArray = radius * Math.PI * 2
  const dashOffet = dashArray - ((dashArray * props.percent) / 100)
  return (
    <Fragment>
      <svg
        width={props.circleWidth}
        height={props.circleWidth}
        viewBox={`0 0 ${props.circleWidth} ${props.circleWidth}`}
      >
        <circle
          cx={props.circleWidth / 2}
          cy={props.circleWidth / 2}
          strokeWidth={props.circleWidth / 10}
          r={radius}
          className="circle-background"
        >
        </circle>
        <circle
          cx={props.circleWidth / 2}
          cy={props.circleWidth / 2}
          strokeWidth={props.circleWidth / 10}
          r={radius}
          className="circle-progress"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffet
          }}
          // transform={`rotate(-90)${props.circleWidth / 2}`}
        ></circle>
        {/* <text x="50%" y="50%" dy="0.3em" className="percent-text" style={{ fontSize: `${props.circleWidth / 5}` }}>{props.percent} %</text> */}
      </svg>
    </Fragment>
  )
}
export default CircleProgressBar