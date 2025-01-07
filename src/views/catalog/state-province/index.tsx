import { Fragment, useState } from "react"
import { StateProvinceContext } from "./useContext"
import TableTheme from "./table"
import ModalComponent from "./modal"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
const StateProvince = () => {
  const [openModal, setOpenModal] = useState(false)
  const [dataItem, setDataItem] = useState({})
  const [type, setTypeModal] = useState('')
  const handleSidebar = () => {
    setOpenModal(!openModal)
  }
  const { t } = useTranslation()
  return (
    <Fragment>
      <Helmet>
        <title>{t('Catalog')} - {t("Province")}</title>
      </Helmet>
      <StateProvinceContext.Provider value={{ openModal, handleSidebar, dataItem, setDataItem, type, setTypeModal}} >
        <div className="app-user-list">
          <TableTheme />
          <ModalComponent></ModalComponent>
        </div>
      </StateProvinceContext.Provider>
    </Fragment>
  )
}
export default StateProvince