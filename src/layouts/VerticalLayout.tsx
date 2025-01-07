import { Outlet, useLocation } from 'react-router-dom'
import Layout from '../@core/layouts/VerticalLayout'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTreeMenuApi } from './store'

const VerticalLayout = (props: any) => {
  const location = useLocation()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [dataMenu, setDataMenu] = useState<any>([])
  const productCode = process.env.REACT_APP_PRODUCT_CODE
  const dispatch = useDispatch()
  const store = useSelector((state: any) => state.menu?.dataTreeMenu)

  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', handleWindowWidth)
    }
  }, [windowWidth])

  useEffect(() => {
    if (menuVisibility && windowWidth < 992) {
      setMenuVisibility(true)
    }
  }, [location])

  // ** For ServerSide navigation
  useEffect(() => {
    setDataMenu(store)
  }, [store])


  // Use store
  useEffect(() => {
    // call api use store
    // @ts-ignore
    dispatch(getTreeMenuApi(productCode))
  }, [])

  return (
    <Layout menuData={dataMenu} {...props}>
      <Outlet />
    </Layout>

  )
}

export default VerticalLayout
