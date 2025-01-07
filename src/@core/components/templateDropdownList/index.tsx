import React, { Fragment} from 'react'
import { useTranslation } from 'react-i18next'

export const templateDropDownList = (props: any) => {
  const {t} = useTranslation()
  const item = props.column.source.find((x:any) => x.value === props[props.column.field])
  const _align = props.textAlign
  if (item) {
    return (
      <Fragment>
        {_align === "Center" && <div className='text-center'>{t(item?.label)}</div>}
        {_align === "Left" && <div className='text-left'>{t(item?.label)}</div>}
        {_align === "Right" && <div className='text-right'>{t(item?.label)}</div>}
        {(_align === null || _align === undefined) && <div>{t(item?.label)}</div>}
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div className='text-center'></div>
      </Fragment>
    )
  }
}