import { Fragment, useEffect, useState } from "react"
import { Card, CardBody, Row, Col } from "reactstrap"
import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import Scrollbars from "react-custom-scrollbars"
import { useSelector } from "react-redux"
import { Helmet } from "react-helmet"

const Catalogs = () => {
  const { t } = useTranslation()

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [dataMenu, setDataMenu] = useState([])
  const store = useSelector((state: any) => state.menu?.dataTreeMenu)

  useEffect(() => {
    const index = store?.findIndex((x: any) => x.code === 'Catalog')
    if (index > -1) {
      setDataMenu(store[index].children)
    }
  }, [store])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <Fragment>
      <Helmet>
        <title>{t('Catalog')}</title>
      </Helmet>
      <div className="table-toolbar">
        <Card className="table-bar bar__action">
          <CardBody>
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="bar__action-left">
                <BreadCrumbsNotLink
                  breadCrumbActive={t("Catalog")}
                />
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="table-bar bar__action">
          <CardBody>
            <Scrollbars autoHide
              autoHeight
              autoHeightMin={windowSize.innerHeight - 190}
              autoHeightMax={windowSize.innerHeight - 190}>
              <div className='mt-2 p-1' >
                <Row className='gy-2'>
                  {dataMenu?.map((item: any, index: number) => {
                    return (
                      <Col xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                        <h4 className='mb-1'>{item.name}</h4>
                        <ul className='p-0'>
                          {item?.children?.map((i: any, index: number) => {
                            return (
                              <li key={index} className='mb-1' style={{ listStyle: 'none' }}>
                                <Link to={i.url}>{i.name}</Link>
                              </li>
                            )
                          })}
                        </ul>
                      </Col>
                    )
                  })}
                </Row>
              </div>
            </Scrollbars>
          </CardBody>
        </Card>
      </div>
    </Fragment >
  )
}

export default Catalogs
