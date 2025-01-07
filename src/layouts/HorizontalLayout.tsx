// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '../@core/layouts/HorizontalLayout'

// ** Menu Items Array
// import navigation from '../navigation/horizontal'
import {useState, useEffect} from 'react'
// import axios from 'axios'
import {useSelector} from "react-redux"

const HorizontalLayout = (props:any) => {
  const [dataMenu, setDataMenu] = useState([])
  const store = useSelector((state: any) => state)
  const menuStore = (store.menu.dataTreeMenu)
  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get('/api/menu-left/horizontal').then((res: any) => {
  //     setDataMenu(res.data)
  //   })
  // }, [])

  useEffect(() => {
    setDataMenu(menuStore)
  }, [menuStore.length])
  return (
    <Layout menuData={dataMenu} {...props}>
      <Outlet />
    </Layout>
  )
}

export default HorizontalLayout
