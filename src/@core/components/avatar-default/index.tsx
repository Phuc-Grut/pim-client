// ** React Imports
import { forwardRef } from 'react'

// ** Third Party Components
import Proptypes from 'prop-types'
import classnames from 'classnames'

// ** Reactstrap Imports
import { Badge } from 'reactstrap'
import {CDN_URL_VIEW} from "@src/domain/constants"

type Props = {
  img?: any
  size?: any
  icon?: any
  color?: string
  status?: any
  badgeUp?: any
  content?: string
  initials?: boolean
  imgWidth?: number | string
  imgHeight?: number | string
  className?: any
  badgeText?: string
  badgeColor?: string
  imgClassName?: any
  contentStyles?: any
  style?: any
}

const AvatarDefault = forwardRef((props: Props, ref: any) => {
  // ** Props
  const {
    img,
    size,
    icon,
    color,
    status,
    badgeUp,
    content,
    initials,
    imgWidth,
    className,
    badgeText,
    imgHeight,
    badgeColor,
    imgClassName,
    contentStyles,
    ...rest
  } = props

  // ** Function to extract initials from content
  const getInitials = (str: any) => {
    const results: any = []
    const wordArray = str.split(' ')
    wordArray.forEach((e: any) => {
      results.push(e[0])
    })
    return results.join('')
  }

  return (
    <div
      className={classnames('avatar', {
        [className]: className,
        [`bg-${color}`]: color,
        [`avatar-${size}`]: size
      })}
      ref={ref}
      {...rest}
    >
      {img ? (
        <img
          className={classnames({
            [imgClassName]: imgClassName
          })}
          // src={img}
          src={ img.startsWith("http") ? img : `${CDN_URL_VIEW}/${img}`}
          alt='avatarImg'
          height={imgHeight && !size ? imgHeight : 32}
          width={imgWidth && !size ? imgWidth : 32}
        />

      ) : (
        <span
          className={classnames('avatar-content 123123', {
            'position-relative': badgeUp
          })}
          style={{
            ...contentStyles,
            height: imgHeight ? imgHeight : 32,
            width: imgWidth ? imgWidth : 32
          }}
        >
          {initials ? getInitials(content) : content}

          {icon ? icon : null}
          {badgeUp ? (
            <Badge color={badgeColor ? badgeColor : 'primary'} className='badge-sm badge-up' pill>
              {badgeText ? badgeText : '0'}
            </Badge>
          ) : null}
        </span>
      )}
      {status ? (
        <span
          className={classnames({
            [`avatar-status-${status}`]: status,
            [`avatar-status-${size}`]: size
          })}
        ></span>
      ) : null}
    </div>
  )
})

export default AvatarDefault

// ** PropTypes
AvatarDefault.propTypes = {
  icon: Proptypes.node,
  img: Proptypes.string,
  badgeUp: Proptypes.bool,
  content: Proptypes.string,
  badgeText: Proptypes.string,
  className: Proptypes.string,
  imgClassName: Proptypes.string,
  contentStyles: Proptypes.object,
  size: Proptypes.oneOf(['sm', 'lg', 'xl']),
  status: Proptypes.oneOf(['online', 'offline', 'away', 'busy']),
  imgHeight: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  imgWidth: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  badgeColor: Proptypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'info',
    'warning',
    'dark',
    'light-primary',
    'light-secondary',
    'light-success',
    'light-danger',
    'light-info',
    'light-warning',
    'light-dark'
  ]),
  color: Proptypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'info',
    'warning',
    'dark',
    'light-primary',
    'light-secondary',
    'light-success',
    'light-danger',
    'light-info',
    'light-warning',
    'light-dark'
  ])
}
