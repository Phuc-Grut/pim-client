import * as Icon from 'becoxy-icons'
import {Fragment} from "react"

const IconCustom = (props: any) => {
  const {iconName, size} = props
  if (iconName === '') {
    return null
  } else {
    // @ts-ignore
    const TagIcon = iconName === '' ? '' : Icon[iconName]
    return (
      <Fragment>
        {iconName === '' ? '' : <TagIcon fontSize={size}/>}
      </Fragment>
    )
  }
}

export default IconCustom