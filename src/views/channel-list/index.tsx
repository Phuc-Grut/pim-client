import { Fragment, useState } from "react"
import { CategoryContext } from "./useContext"
import TableTheme from "./table"
import ModalComponent from "./modal"
import {Helmet} from "react-helmet"
import {useTranslation} from "react-i18next"
import {ITypeModal} from "@src/domain/models"
import ModalView, { IFieldView } from "@components/modal-view"
import { statusObjColorDefault, statusObjDefault_Status } from "@src/domain/constants/constantSelect"
import { Badge, Table } from "reactstrap"
import { useProductTag } from "../catalog/product-tag/hooks"
const Category = () => {
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const { t } = useTranslation()
  const { getListProductTagApi } = useProductTag()

  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [openModal, setOpenModal] = useState(false)
  const [dataItem, setDataItem] = useState<any>({})
  const [typeModal, setTypeModal] = useState<ITypeModal>('')
  const [groupAssignedTo, setGroupAssignedTo] = useState()
  const [breadCrumb, setBreadCrumb] = useState<any>([])
  const [parentCategory, setParentCategory] = useState()
  const [parentCategoryIdQuery, setParentCategoryIdQuery] = useState()
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [keywords, setKeywords] = useState<any[]>([])
  const handleModal = () => {
    setOpenModal(!openModal)
  }
  const handleModalDetail = () => {
    setOpenModalDetail(!openModalDetail)
  }

  const handleModalViewOpen = () => {
    getListProductTagApi({$status: 1, $type: 4})
      .unwrap()
      .then((rs: any[]) => {
        if (dataItem?.keywords) {
          const listTag: string[] = dataItem?.keywords?.split(",")
          const result = rs.filter(x => listTag.includes(x.value))
          const newKeywords = listTag.map(tag => {
            const matchedResult = result.find(x => x.value === tag)
            return matchedResult ? matchedResult.label : tag
          })
          setKeywords(newKeywords)
        }
      })
  }

  const handleName = (data: any) => {
    if (!data) {
      return ""
    }
    return (
      <div>
        {keywords.map((x: any) => (
          <Badge key={x} ml-1 className="text-capitalize " color={"warning"}>
            {x}
          </Badge>
        ))}
      </div>
    )
  }

  const jsonDataArray = dataItem.jsonData ? JSON.parse(dataItem.jsonData) : []
  const renderTableBody = () => {
    if (!jsonDataArray || jsonDataArray.length === 0) {
      return ""
    }
    return (
      <Table style={{ fontSize: "1rem" }}>
        <thead>
          <tr>
            <th className='form-input-content'
              style={{
                backgroundColor: "none",
                textTransform: "capitalize"
              }}
            >
              {t("Code")}
            </th>
            <th className='form-input-content'
              style={{
                backgroundColor: "none",
                textTransform: "capitalize"
              }}
            >
              {t("Value")}
            </th>
          </tr>
        </thead>
        <tbody>
          {jsonDataArray?.map((item: any, index: any) => {
            return (
              <tr key={index}>
                <td className='form-input-content'>{item.name}</td>
                <td className='form-input-content'>{item.value}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  const renderFields: IFieldView[] = [
    {
      value: dataItem.code, label: "CategoryProductCode"
    },
    {
      value: dataItem.name, label: "CategoryProductName"
    },
    {
      value: dataItem.parentCategoryName, label: "ParentCategory"
    },
    {
      value: dataItem.image, label: "Image"
    },
    {
      value: dataItem.url, label: "Url"
    },
    {
      value: handleName(dataItem.keywords), label: "Keyword"
    },
    {
      value: renderTableBody(), label: "Attribute"
    },
    {
      value: dataItem.description, label: "Description"
    },
    {
      value: <Badge className='text-capitalize' color={statusObjColorDefault[dataItem.status]} pill>
        {t(statusObjDefault_Status[dataItem.status])}
      </Badge>,
      label: "Status",
      col: 6
    }
  ]
  return (
    <Fragment>
      <Helmet>
        <title>{t('Catalog')} - {t('Channel List')}</title>
      </Helmet>
      <CategoryContext.Provider value={{openModal, handleModal, dataItem, setDataItem, typeModal, groupAssignedTo, setGroupAssignedTo, setTypeModal, parentCategory, setParentCategory, parentCategoryIdQuery, setParentCategoryIdQuery, openModalDetail, setOpenModalDetail, handleModalDetail, windowSize, setWindowSize, breadCrumb, setBreadCrumb}} >
        <div className="app-user-list">
          <TableTheme />
          <ModalComponent />
          <ModalView
            dataItem={dataItem}
            handleModalDetail={handleModalDetail}
            openModalDetail={openModalDetail}
            setDataItem={setDataItem}
            titleHeader='Channel List'
            windowSize={windowSize}
            renderFields={renderFields}
            handleModalOpen={handleModalViewOpen}
            labelSize='large'
          />
        </div>
      </CategoryContext.Provider>
    </Fragment>
  )
}
export default Category