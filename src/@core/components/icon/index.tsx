import * as Icon from 'becoxy-icons'
import {Fragment} from "react"

const IconCustom = (props: any) => {
  const { iconName, size, typeIcon } = props

  // @ts-ignore
  const TagIcon = iconName === '' ? '' : Icon[iconName]
  return (
    <Fragment>
      {typeIcon === 'svg' ? (
        <span dangerouslySetInnerHTML={{ __html: iconName }} />
      ) : iconName === '' || TagIcon === undefined ? (
        ''
      ) : (
        <TagIcon fontSize={size} />
      )}
    </Fragment>
  )
}

export default IconCustom