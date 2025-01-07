import {Label} from "reactstrap"
import classnames from "classnames"
import avatarDefault from '@src/assets/images/avatars/avatar-blank.png'
import { CDN_URL_VIEW} from "@src/domain/constants"
import {Fragment} from "react"
import {useTranslation} from "react-i18next"
import productDefault from "@src/assets/images/avatars/default-pro.jpg"
import styled from "styled-components"

type Props = {
  labelSize?: any,
  height?: number,
  width?: number,
  image: string
  isLabel?: boolean
  inLine?: boolean
  label?: string,
  type?: 'Product' | 'User'
}

const ImageStyle = styled.div`
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`

const AvatarViewComponent = ({ labelSize, height, width, image, isLabel, label, inLine, type }: Props) => {

  const imageDefault = type === 'Product' ? productDefault : avatarDefault

  const renderLabel = () => {
    const { t } = useTranslation()
    return (
      <Fragment>
        {isLabel === false ? '' : <Label className="form-label" for={''}>{t(label ? label : '')}</Label>}
      </Fragment>
    )
  }

  const renderInput = () => {
    return (
      <Fragment>
        <div style={{width, height}}>
          {/*<div style={{backgroundImage: (!image || image === '') ? avatarDefault : image.startsWith("http") ? image : `${CDN_URL_VIEW}/${image}`}}></div>*/}
          <ImageStyle style={{backgroundImage: `url(${(!image || image === '') ? imageDefault : image.startsWith("http") ? image : `${CDN_URL_VIEW}/${image}`})`}}></ImageStyle>
          {/*<img*/}
          {/*  className='rounded'*/}
          {/*  alt='Generic placeholder image'*/}
          {/*  style={{width: '100%'}}*/}
          {/*  src={(!image || image === '') ? avatarDefault : image.startsWith("http") ? image : `${CDN_URL_VIEW}/${image}`}*/}
          {/*/>*/}
        </div>

      </Fragment>
    )

  }

  return (
    <Fragment>
      <div
        className={classnames(' align', {
          [labelSize ? labelSize : '']: labelSize
        }, inLine === false ? 'form-group ' : 'd-flex'
        )}
      >
        {renderLabel()}
        <div className={classnames('form-input-content', { 'hidden-label': isLabel === false })} style={{  }}>
          {renderInput()}
        </div>
      </div>
    </Fragment>
  )
}
export default AvatarViewComponent