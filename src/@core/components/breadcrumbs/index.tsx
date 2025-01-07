// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next"

import Proptypes from 'prop-types'
import { Home } from 'becoxy-icons'

// ** Reactstrap Imports
import {Breadcrumb, BreadcrumbItem} from 'reactstrap'

const BreadCrumbs = (props: any) => {
  // ** Props
  const { data, title } = props
  const { t } = useTranslation()
  const renderBreadCrumbs = () => {
    if (!data) { return "" }
    return data?.map((item: any, index: any) => {
      const Wrapper: any = item.link ? Link : Fragment
      const myData = {
        id: item.id
      }
      return (
        <BreadcrumbItem
          tag='li'
          key={index}
          active={index === (data.length - 1) ? true : item.isActive}
        >
          <Link to={item.link} state={myData}>{t(item.title)}</Link>
        </BreadcrumbItem>
      )
    })
  }

  return (
    <div className='content-header row'>
      <div className='content-header-left col-md-9 col-12'>
        <div className='row breadcrumbs-top'>
          <div className='col-12'>
            {title ? <h2 className='content-header-title float-start mb-0'>{title}</h2> : ''}
            <div className='breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12'>
              <Breadcrumb>
                <BreadcrumbItem tag='li'>
                  <Link to='/'>
                    <Home fontSize={20}/>
                  </Link>
                </BreadcrumbItem>
                {renderBreadCrumbs()}
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BreadCrumbs

// ** PropTypes
BreadCrumbs.propTypes = {
  title: Proptypes.string.isRequired,
  data: Proptypes.arrayOf(
    Proptypes.shape({
      link: Proptypes.string,
      title: Proptypes.string.isRequired
    })
  )
}
