// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, ModalBody } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useProduct } from '../../hooks'
import { useCategory } from "@src/views/channel-list/hook"
import { ProductContext } from '../../useContext'
import { IFDataProductRelated } from '@src/domain/models/IProductRelated'
import { AsyncSelectBox, SelectBox } from '@components/select'
import moment from 'moment'
import GridTableTemplate from '@components/grid-table-template'
import { headerTemplate } from "@utils/Common"
import { IRowSelected } from '@src/domain/models/ITableGrid'
import classNames from 'classnames'
import ModalHeader from '@components/modal-header'
import { pictureTemplate } from '../../columns'
import { notificationError, notificationSuccess } from '@components/notifications'
const SidebarProductRelated = (props: any) => {
  const { t } = useTranslation()
  const { addRelatedProductApi, getProductPagingApi } = useProduct()
  const { getCbxCategoryApi } = useCategory()
  const { 
    dataItem, 
    typeSidebar, 
    setDataSidebar, 
    // setTypeSidebar, 
    optionGrCategory, 
    windowSize,
    initSideBar,
    dataRelated
    // setInitSideBar
  } = useContext(ProductContext)
  const { openModal, handleModal } = props
  const [list, setList] = useState([])
  const [listCategory, setListCategory] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItem, setTotalItem] = useState(0)
  const [dataSelected, setDataSelected] = useState<any[]>([])
  const selectionSettings: Object = { persistSelection: true }

  const defaultValues: IFDataProductRelated = {
    id: "",
    productId1: '',
    productId2: [],
    displayOrder: 0,
    categoryId: undefined,
    idGroupCategories: undefined
  }

  const {
    control,
    watch
  } = useForm<IFDataProductRelated>({
    mode: 'onChange',
    defaultValues
  })

  useEffect(() => {
    if (openModal.prodRelated) {
      renderDataProduct()
    }
  }, [initSideBar, searchTerm, rowsPerPage, currentPage, dataRelated, watch("categoryId"), watch("idGroupCategories")])

  const renderDataProduct = () => {
    const queryParma = [
      { key: 'name', ope: '~=', value: searchTerm, predicate: ';' }, { key: 'deleted', ope: '==', value: false, predicate: ';' }, { key: 'idCategories', ope: '~=', value: watch("categoryId") ? watch("categoryId") : "", predicate: ';' },
      { key: 'idGroupCategories', ope: '~=', value: watch("idGroupCategories") ? watch("idGroupCategories") : "", predicate: '' }
    ]
    const rs = queryParma.map((x: any) => `${x.key}${x.ope}${convertDate(listDate, x.key, x.value)}${x.predicate}`).join('')
    const rs_2 = (rs.slice(-1) === '$' || rs.slice(-1) === ';') ? rs.slice(0, -1) : rs

    const filter = dataRelated?.map((x: any) => `code!=${x.code}`).join(";")
    getProductPagingApi({
      Filter: `${rs_2};and$${filter};and`,
      Order: '',
      PageNumber: currentPage,
      PageSize: rowsPerPage,
      Keyword: searchTerm
    })
      .unwrap()
      .then((rs) => {
        setTimeout(() => {
          setList(rs.items)
          setTotalItem(rs.totalCount)
        }, 100)
      })
      .catch((ex) => {
        console.log(ex)
      })
  }

  // ** Function to reset fileds
  const handleCancel = () => {
    setDataSidebar((old: any) => ({ ...old, prodRelated: {} }))
    handleModal('prodRelated')
  }

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color="primary" type="submit" onClick={onSubmit} className="mb-75 me-1">
          {t('Save')}
        </Button>
        <Button color="secondary" onClick={handleCancel} outline className="mb-75 me-1">
          {t('Close')}
        </Button>
      </Fragment>
    )
  }
  const listDate = ["date"]
  const convertDate = (listDate: string[], key: string, param: any) => {
    const object = listDate.find((d) => d === key)
    if (object) {
      return moment(param).format("YYYY/MM/DD")
    }
    return param
  }

  let timeOut: any

  useEffect(() => {
    if (openModal.prodRelated) {
      getCbxCategoryApi({ $status: 1, $groupCategoryId: watch("idGroupCategories"), $parentCategoryId: '', $keyword: "" })
        .unwrap()
        .then((rs: any) => {
          setTimeout(() => {
            setListCategory([...rs])
          }, 100)

        })
        .catch(() => {
        })
    }

  }, [watch("idGroupCategories"), openModal.prodRelated])

  const loadOptionsCategory = (a: any, callback: any) => {
    const text = a
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      getCbxCategoryApi({ $status: 1, $groupCategoryId: watch("idGroupCategories"), $parentCategoryId: '', $keyword: text })
        .unwrap()
        .then((rs: any) => {
          setTimeout(() => {
            callback(rs)
          }, 100)
        })
        .catch(() => {
        })
    }, 200)
  }

  const onSubmit = () => {
    const data: any = {
      productId1: dataItem?.id,
      listProductId2: dataSelected.length > 0 ? dataSelected.map(x => x.id) : []
    }
    addRelatedProductApi(data).unwrap()
      .then((rs) => {
        if (rs.errors.length === 0) {
          notificationSuccess(t('Add Successful'))
        } else {
          notificationError(t('Add Failed'))
        }
      })
      .catch((ex) => console.log(ex))
  }

  const headerColumns: any[] = [
    {
      width: 20,
      type: 'checkbox'
    },
    {
      isPrimaryKey: false,
      field: "image",
      headerText: "Picture",
      visible: true,
      textAlign: "center",
      width: 30,
      minWidth: 20,
      maxWidth: 35,
      headerTemplate,
      template: pictureTemplate,
      allowFiltering: false
    },
    {
      field: 'code',
      headerText: 'ProductCode',
      visible: true,
      width: 50,
      minWidth: 40,
      maxWidth: 60,
      headerTemplate
    },
    {
      field: 'name',
      headerText: 'Product name',
      visible: true,
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      headerTemplate
    }
  ]

  const btnTemPlate = () => {
    return (
      <div className='bar__action-right d-flex'>
        <div >
          <span className="text-nowrap m-60 mx-1">
            {t('Selected')} {dataSelected?.length}
          </span>
        </div>
      </div>
    )
  }

  const filterInfomationChannel = () => {
    return <div style={{ width: '200px' }}>
      <SelectBox
        control={control}
        name="idGroupCategories"
        isLabel={false}
        // label={t("InfomationChannel")}
        disabled={false}
        placeholder={t("Select")}
        isClearable={true}
        options={optionGrCategory}
      />
    </div >
  }

  const filterCategoryProduct = () => {
    return <div style={{ width: '200px' }}>
      <AsyncSelectBox
        control={control}
        name={"categoryId"}
        label={t("CategoryProduct")}
        loadOptions={loadOptionsCategory}
        defaultOptions={listCategory}
        isLabel={false}
        isClearable={true}
        placeholder={t("Select")}
        callback={() => { }}
      />
    </div >
  }

  const toolbarTemplate = [
    {
      template: dataSelected?.length > 0 && btnTemPlate,
      align: 'right'
    },
    {
      template: filterInfomationChannel,
      align: 'left'
    },
    {
      template: filterCategoryProduct,
      align: 'left'
    }
  ]

  const toolbarOptions: any = [...toolbarTemplate]

  const rowSelected = (value: IRowSelected) => {
    setDataSelected(value.selected)
  }
  
  const render = () => {
    if (typeSidebar.prodRelated?.value === 'Add' || typeSidebar.prodRelated?.value === 'Edit') {
      return <div
        className={classNames('customizer customizer-900 d-none d-md-block', {
          open: openModal.prodRelated
        })}
      >
        <Scrollbars autoHide
          autoHeight
          autoHeightMin={windowSize.innerHeight - 50}>
          <ModalBody>
            <ModalHeader typeModal={"Add"} handleModal={() => {
              handleModal('prodRelated')
            }} title='Product related' style={{ backgroundColor: '#f8f8f8 !important' }} />
            <GridTableTemplate
              resource="StandardWorkEmployee"
              idTable="StandardWorkEmployee"
              height={windowSize.innerHeight - 280}
              dataTable={list}
              columns={headerColumns}
              allowFilter={false}
              allowSort={false}
              allowPaging={true}
              allowResizing={true}
              showPagination={true}
              setCurrentPage={setCurrentPage}
              pageSize={rowsPerPage}
              setPageSize={setRowsPerPage}
              totalItem={totalItem}
              selectionSettings={selectionSettings}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              toolbarTemplate={toolbarOptions}
              showToolbar={true}
              showColumnChooser={false}
              rowSelected={rowSelected}
              typeSelect='Multiple'
            />
          </ModalBody>
        </Scrollbars>
        <div
          className="d-flex justify-content-end p-1 align-align-items-center"
          style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}
        >
          {renderFooterButtons()}
        </div>
      </div>
    } else {
      return <></>
    }
  }

  return render()
}

export default SidebarProductRelated
