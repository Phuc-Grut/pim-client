import { Fragment, useState } from "react"
import { WardContext } from "./useContext"
import TableTheme from "./table"
import ModalComponent from "./modal"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
const Ward = () => {
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
        <title>{t('Catalog')} - {t("Ward")}</title>
      </Helmet>
      <WardContext.Provider value={{ openModal, handleSidebar, dataItem, setDataItem, type, setTypeModal}} >
        <div className="app-user-list">
          <TableTheme />
          <ModalComponent></ModalComponent>
        </div>
      </WardContext.Provider>
    </Fragment>
  )
}
export default Ward