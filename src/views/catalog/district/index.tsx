import { Fragment, useState } from "react"
import { DistrictContext } from "./useContext"
import TableTheme from "./table"
import ModalComponent from "./modal"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
const District = () => {
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
        <title>{t('Catalog')} - {t("District")}</title>
      </Helmet>
      <DistrictContext.Provider value={{ openModal, handleSidebar, dataItem, setDataItem, type, setTypeModal}} >
        <div className="app-user-list">
          <TableTheme />
          <ModalComponent></ModalComponent>
        </div>
      </DistrictContext.Provider>
    </Fragment>
  )
}
export default District