// ** React Imports
import {Fragment, useEffect, useState} from 'react'

// ** Third Party Components
import Proptypes from 'prop-types'
interface  Props {
  showOffset? : any,
  scrollBehaviour?: any,
  children?: any,
  className2?: any
}

const ScrollTop  = (props: Props) => {
  // ** Props
  const {className2, showOffset, scrollBehaviour, children, ...rest }: Props = props

  // ** State
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset >= showOffset) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      })
    }
  }, [])

  const handleScrollToTop = () => {
    window.scroll({ top: 0, behavior: scrollBehaviour })
  }

  return (
    <Fragment>
      {visible ? (
        <div className='scroll-to-top' onClick={handleScrollToTop} {...rest}>
          <div className={className2}>
            {children}
          </div>
        </div>
      ) : null
      }
    </Fragment>
  )
}

export default ScrollTop

// ** PropTypes
ScrollTop.propTypes = {
  showOffset: Proptypes.number,
  children: Proptypes.any.isRequired,
  scrollBehaviour: Proptypes.oneOf(['smooth', 'instant', 'auto'])
}

ScrollTop.defaultProps = {
  scrollBehaviour: 'smooth'
}
