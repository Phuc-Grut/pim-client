import { Fragment, useEffect, useState } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown, Col, Tooltip } from 'reactstrap'
import * as Icon from 'becoxy-icons'
import { Scrollbars } from 'react-custom-scrollbars'
import api from '@src/infra/api'
import { useAppContext } from '@src/contexts/AppContext'
import { CDN_URL_VIEW } from '@src/domain/constants'

const AppsDropdown = () => {
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [apps, setApps] = useState<any[]>([])

  const { state } = useAppContext()
  const { userInfo } = state

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    api.configApi
      .getConfigByCodeApi({ code: 'SHORT_LINK_APP' })
      .then(rs => {
        window.localStorage.setItem('SHORT_LINK_APP', rs.value)
        setApps(JSON.parse(rs.value))
      })
      .catch(ex => console.log(ex))
  }, [])

  return (
    <Fragment>
      <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25' id='ListApp'>
        <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
          <Icon.Grid fontSize={20} />
        </DropdownToggle>
        <DropdownMenu className='custom-dropdown icon-dropdown'>
          <Scrollbars autoHeight autoHeightMin={180} autoHeightMax={windowSize.innerHeight - 150}>
            <div className='pt-1 pb-1'>
              {/*<h5 className='ps-75'><strong>Ứng dụng</strong></h5>*/}
              <Row className='gy-25 ps-75 pe-75 m-0'>
                {apps?.map((item: any, index: number) => {
                  return (
                    <Col key={index} xs={4} sm={4} md={4} lg={4} className='p-0 d-flex- justify-content-center'>
                      <DropdownItem className='ps-0 pe-0 pt-50 pb-50' style={{ borderRadius: '6px' }} tag='div'>
                        <a
                          href={`${item.link}?tenant=${userInfo?.tenant}`}
                          target={'_blank'}
                          className='d-flex flex-column justify-content-center align-items-center'
                        >
                          <img
                            src={item.image.startsWith('http') ? item.image : `${CDN_URL_VIEW}/${item.image}`}
                            className=''
                            style={{ width: '65px' }}
                            alt=''
                          />
                          <p className='m-0 pt-50'>{item.shortName}</p>
                        </a>
                      </DropdownItem>
                    </Col>
                  )
                })}
              </Row>
            </div>
          </Scrollbars>
        </DropdownMenu>
      </UncontrolledDropdown>
      <Tooltip placement='top' isOpen={tooltipOpen} target='ListApp' toggle={() => setTooltipOpen(!tooltipOpen)}>
        Ứng dụng !
      </Tooltip>
    </Fragment>
  )
}

export default AppsDropdown
