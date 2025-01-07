// ** React Imports
import  { Fragment, useContext, useEffect, useState } from 'react'

// ** Third Party Components
import {
  Modal,
  ModalBody,
  Button,
  Form, TabContent, TabPane
} from 'reactstrap'
// ** Styles Imports
// import { isObjEmpty } from '@src/utility/Utils'
// import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { ProductContext } from './useContext'
import { useProduct } from './hooks'
import { notificationError, notificationSuccess } from '@components/notifications'
import ModalHeader from '@components/modal-header'
import { useUploadFile } from '@src/utility/hooks/useUploadFile'
import { isObjEmpty } from '@src/utility/Utils'
import { checkNull } from '@src/utility/hooks/checkNull'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import TabGeneralInfo from './components/tab-general'
import { IFModelProduct } from '@src/domain/models/IProduct'
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations'
import TableSpecAttr from './components/tab-specification-attribute'
import ProductRelated from './components/tab-product-related'
import { isNullOrUndefined } from '@src/utility/hooks/isNullOrUndefined'
import { MODULECODE } from '@src/domain/constants'
import TableTierPrice from './components/table-tier-price'
import TableServiceAdd from './components/table-service-add'
import TableImage from './components/table-image'
import { connectString } from '@src/utility/hooks/connectString'
import TableProductAttr from './components/table-product-attribute'
import TableProductSpecificationCode from './components/tab-product-specification-code'
import { IFDataProductSpecificationCode } from '@src/domain/models/IProductSpecificationCode'
import { IFDataProductInventory } from '@src/domain/models/IProductInventory'
import { IFDataProductSpecificationAttributeMapping } from '@src/domain/models/IProductSpecificationAttributeMapping'
import { IFDataTierPrice } from '@src/domain/models/ITierPrice'
import { IFDataProductServiceAdd } from '@src/domain/models/IProdcuctServiceAdd'

const ModalComponent = () => {
  const { t } = useTranslation()
  // ** Props
  const { 
    openModal, 
    handleModal, 
    typeModal, 
    dataItem, 
    tabIndex, 
    setTypeModal,
    setTabIndex, 
    windowSize, 
    setDataSidebar, 
    setOpenSidebar, 
    setDataItem, 
    setTypeSubModal, 
    setProductId,
    optionCurrency
  } = useContext(ProductContext)

  const { addProductApi, editProductApi, getProductByIdApi } = useProduct()

  const { uploadImageApi } = useUploadFile()

  const [typeSubmit, setTypeSubmit] = useState(0)
  const [pathImage, setPathImage] = useState()
  const [edited, setEdited] = useState<boolean>(false)
  const [dataSpecificationCode, setDataSpecificationCode] = useState<IFDataProductSpecificationCode[]>([])
  const [dataWarehouse, setDataWarehouse] = useState<IFDataProductInventory[]>([])
  const [dataSpeciAttribute, setDataSpeciAttribute] = useState<IFDataProductSpecificationAttributeMapping[]>([])
  const [dataTierPrice, setDataTierPrice] = useState<IFDataTierPrice[]>([])
  const [dataServiceAdd, setDataServiceAdd] = useState<IFDataProductServiceAdd[]>([])
  const ListInventorySchema = {
    warehouseid: yup.string()
      .required(connectString(['requestChoose', 'Warehouse>']))
  }
  const formSchema = yup.object().shape({
    code: yup.string().nullable().when(['isAuto'], {
      is: (isAuto: number) => (isAuto === 0),
      then: yup.string().required(t("Product code") + t(" is required"))
        .max(50, (t("Code") + t(" must less than 50 characters")))
        .min(2, (t("Code") + t(" must greater than 2 characters")))
    }),
    name: yup.string().required(t("Product name") + t(" is required"))
      .max(400, (t("Name") + t(" must less than 400 characters")))
      .min(2, (t("Name") + t(" must greater than 2 characters"))),
    productCost: yup
      .string()
      .required(t("Product cost") + t(" is required")),
    unitType: yup
      .string()
      .required(t("Group unit") + t(" is required")),
    unitId: yup
      .string()
      .required(t("Unit") + t(" is required")),
    price: yup
      .string()
      .required(t("Price") + t(" is required")),
    currency: yup
      .string()
      .required(t("Currency") + t(" is required")),
    currencyCost: yup
      .string()
      .required(t("Currency") + t(" is required")),
    listInventory: yup.array().of(yup.object().shape(ListInventorySchema))
  })

  const defaultValues: IFModelProduct = {
    price: 0,
    stockQuantity: 0,
    status: 1,
    parentGroupedProductId: 0,
    forBuy: true,
    forSale: true,
    forProduction: true,
    condition: 0,
    isShipEnabled: true,
    isFreeShipping: false,
    additionalShippingCharge: 0,
    isTaxExempt: false,
    isEsd: false,
    multiPacking: false,
    orderMinimumQuantity: 0,
    orderMaximumQuantity: 0,
    quantityStep: 0,
    quantiyControlType: 0,
    productCost: 0,
    hasTierPrices: false,
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    productTag: [],
    deleted: false,
    createdOnUtc: undefined,
    updatedOnUtc: undefined,
    packages: 0,
    manageInventoryMethodId: 1,
    canReturn: true,
    isChangeAvata: false,
    isAuto: 0,
    moduleCode: MODULECODE.PRODUCT,
    listInventory: [],
    listPackage: [],
    fullDescription: '',
    sourceCode: ""
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    getValues,
    setError,
    reset,
    watch,
    formState: { errors }
  } = useForm<IFModelProduct>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })

  const handleModalOpened = () => {
    if (!isObjEmpty(dataItem) && (typeModal === 'Edit' || typeModal === 'Detail')) {
      setTimeout(() => {
        setDataWarehouse(dataItem.listProductInventory.map((a:any) => ({...a, specificationCode:[]})))
        Object.entries(dataItem).forEach(
          ([name, value]: any) => {
            if (name !== null && name !== 'listCategory' && name !== 'listGroupCategory' && name !== 'listStore' && name !== 'listTag') {
              setValue(name, value)
              if (name.includes("Date") || name.includes("date")) {
                setValue(name, checkNull(value) ? new Date(value) : undefined)
              }
            }
          }
        )
      }, 200)
    }
  }

  useEffect(() => {
    handleModalOpened()
  }, [edited])

  // ** Function to run when sidebar closes
  const handleModalClosed = () => {
    clearErrors()
    setTabIndex('0')
    setDataItem({})
    reset()
  }

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    return (
      <Fragment>
        {(typeModal === 'Add' || tabIndex) && <Button color='primary' className='add-todo-item me-1'>
          <div onClick={() => {
            setTypeSubmit(0)
          }}>{t('Save')}</div>
        </Button>}
        {(typeModal === 'Add' || tabIndex) && <Button color='primary' className='add-todo-item me-1'>
          <div onClick={() => {
            setTypeSubmit(1)
          }}>{t('Save and continue')}</div>
        </Button>}
        <Button color='secondary' onClick={handleModal} outline>
          {t('Close')}
        </Button>
      </Fragment>
    )
  }

  const renderError = (rs: any) => {
    for (let i = 0; i < rs?.errors.length; i++) {
      const string = rs?.errors[i].errorMessage?.split(' ').reduce((accumulator: string, currentValue: any) => `${accumulator} ${t(currentValue)}`, '')
      setError(
        rs?.errors[i].propertyName.toLowerCase(),
        { type: 'custom', message: string }
      )
    }
  }

  const removeEmpty = (data: any) => {
    const entries = Object.entries(data).filter(([, value]) => value !== null)
    const clean: any = entries.map(([key, v]) => {
      return [key, v]
    })

    return Object.fromEntries(clean)
  }

  const onSubmit = (_data: any) => {
    const data: any = removeEmpty(_data)
    const cates: any[] = data.idGroupCategories?.map((a: any) => {
      const cate: any[] = data[a]
      if (cate) {
        return cate?.map((c: any) => {
          return { groupCategoryId: a, categoryId: c?.value }
        })
      }
    })
    if (cates && cates?.length > 0) {
      const c = cates?.reduce((a: any, b: any) => a?.concat(b))
      const d = c?.map((a: any, i: any) => ({ ...a, displayOrder: i }))
      data.categories = d
    }
    for (let i = 0; i < dataWarehouse.length; i++) {
      dataWarehouse[i].productId = _data.id
    }
    data.listInventory = dataWarehouse
    data.listPackage = _data?.listPackage?.map((a: any) => ({ ...a, id: a.fieldid }))
    if (typeof (data.image) !== 'string' && data.isChangeAvata === true) {
      const fromData = new FormData()
      fromData.append('becoxy', data.image)
      uploadImageApi(fromData).unwrap()
        .then((rs: any) => {
          if (!(rs.errors?.length > 0 || rs.detailErrors?.length > 0)) {
            setValue('isChangeAvata', false)
            setValue('image', rs.path)
            setPathImage(rs.path)
            const obj = {
              ...data,
              idGroupCategories: data.idGroupCategories?.toString(),
              productTag: data.productTag?.toString(),
              categories: data.categories,
              image: rs.path,
              limitedToStores: data.limitedToStores?.toString()
            }
            if (typeModal === 'Add') {
              if (typeSubmit === 0) {
                addProductApi(obj).unwrap()
                  .then((rsA) => {
                    if (rsA.isValid === true) {
                      handleModal()
                      notificationSuccess(t('Add Successful'))
                    } else {
                      renderError(rsA)
                      notificationError(t("Add Fails"))
                    }
                  })
                  .catch((ex) => console.log(ex))
              } else if (typeSubmit === 1) {
                addProductApi(obj).unwrap()
                  .then((rsA) => {
                    if (rsA.isValid === true) {
                      clearErrors()
                      getProductByIdApi(rsA?.id)
                        .unwrap()
                        .then((rsP) => {
                          setTimeout(() => {
                            if (rsP?.listGroupCategory && rsP?.listGroupCategory.length > 0) {
                              const l = rsP?.listGroupCategory.map((obj: any) => {
                                rsP[obj.value] = rsP?.listCategory?.filter(
                                  (d: any) => d.groupCategoryId === obj.value
                                )
                                return obj.value
                              })
                              rsP.idGroupCategories = l
                            } else {
                              rsP.idGroupCategories = []
                            }
                            if (rsP?.listStore && rsP?.listStore.length > 0) {
                              const l = rsP?.listStore.map((obj: any) => {
                                return obj.value
                              })
                              rsP.limitedToStores = l
                            } else {
                              rsP.limitedToStores = []
                            }
                            if (rsP?.listTag && rsP?.listTag.length > 0) {
                              rsP.productTag = rsP?.listTag
                            } else {
                              rsP.productTag = []
                            }
                            setDataItem(rsP)
                            setEdited(!edited)
                            if (setTypeModal) {
                              setTypeModal('Edit')
                            }
                            setProductId(rsP.id)
                          }, 100)
                        })
                      notificationSuccess(t('Add Successful'))
                    } else {
                      renderError(rsA)
                      notificationError(t("Add Fails"))
                    }
                  })
                  .catch((ex) => console.log(ex))
              }
            } else {
              if (typeSubmit === 0) {
                editProductApi(obj).unwrap()
                  .then((rsE) => {
                    if (rsE.isValid === true) {
                      handleModal()
                      notificationSuccess(t('Add Successful'))
                    } else {
                      renderError(rsE)
                      notificationError(t("Add Fails"))
                    }
                  })
                  .catch((ex) => console.log(ex))
              } else if (typeSubmit === 1) {
                editProductApi(obj).unwrap()
                  .then((rsE) => {
                    if (rsE.isValid === true) {
                      clearErrors()
                      if (setTypeModal) {
                        setTypeModal('Edit')
                      }
                      notificationSuccess(t('Add Successful'))
                    } else {
                      renderError(rsE)
                      notificationError(t("Add Fails"))
                    }
                  })
                  .catch((ex) => console.log(ex))
              }
            }
          }
        })
    } else {
      const obj = {
        ...data,
        idGroupCategories: data.idGroupCategories?.toString(),
        productTag: data.productTag?.toString(),
        categories: data.categories,
        image: isNullOrUndefined(data.image) || data.image === '' ? pathImage : data.image,
        limitedToStores: data.limitedToStores?.toString(),
        sourceCode: ""
      }
      obj.ListProductSpecificationCode = dataSpecificationCode
      obj.ListProductSpecificationAttributeMapping = dataSpeciAttribute
      obj.ListTierPrice = dataTierPrice
      obj.ListProductServiceAdd = dataServiceAdd
      
      if (typeModal === 'Add') {
        if (typeSubmit === 0) {
          addProductApi(obj).unwrap()
            .then((rs) => {
              if (rs.isValid === true) {

                handleModal()
                notificationSuccess(t('Add Successful'))
              } else {
                renderError(rs)
                notificationError(t("Add Fails"))
              }
            })
            .catch((ex) => console.log(ex))
        } else if (typeSubmit === 1) {
          addProductApi(obj).unwrap()
            .then((rs) => {
              if (rs.isValid === true) {
                clearErrors()
                getProductByIdApi(rs?.id)
                  .unwrap()
                  .then((rsP) => {
                    setTimeout(() => {
                      if (rsP?.listGroupCategory && rsP?.listGroupCategory.length > 0) {
                        const l = rsP?.listGroupCategory.map((obj: any) => {
                          rsP[obj.value] = rsP?.listCategory?.filter(
                            (d: any) => d.groupCategoryId === obj.value
                          )
                          return obj.value
                        })
                        rsP.idGroupCategories = l
                      } else {
                        rsP.idGroupCategories = []
                      }
                      if (rsP?.listStore && rsP?.listStore.length > 0) {
                        const l = rsP?.listStore.map((obj: any) => {
                          return obj.value
                        })
                        rsP.limitedToStores = l
                      } else {
                        rsP.limitedToStores = []
                      }
                      if (rsP?.listTag && rsP?.listTag.length > 0) {
                        rsP.productTag = rsP?.listTag
                      } else {
                        rsP.productTag = []
                      }
                      setDataItem(rsP)
                      setEdited(!edited)                     
                      if (setTypeModal) {
                        setTypeModal('Edit')
                      }
                    }, 100)
                  })
                notificationSuccess(t('Add Successful'))
              } else {
                renderError(rs)
                notificationError(t("Add Fails"))
              }
            })
            .catch((ex) => console.log(ex))
        }
      } else {
        if (typeSubmit === 0) {
          editProductApi(obj).unwrap()
            .then((rs) => {
              if (rs.isValid === true) {
                handleModal()
                notificationSuccess(t('Edit Successful'))
              } else {
                renderError(rs)
                notificationError(t("Edit Fails"))
              }
            })
            .catch((ex) => console.log(ex))
        } else if (typeSubmit === 1) {
          editProductApi(obj).unwrap()
            .then((rs) => {
              if (rs.isValid === true) {
                if (setTypeModal) {
                  setTypeModal('Edit')
                }
                notificationSuccess(t('Edit Successful'))
              } else {
                renderError(rs)
                notificationError(t("Edit Fails"))
              }
            })
            .catch((ex) => console.log(ex))
        }
      }
    }
  }

  const headerText = [
    { text: t("General information") },
    { text: t("Product SpecificationCode") },
    { text: t("Specification attribute") },
    { text: t("Product attribute") },
    { text: t("Product related") },
    { text: t("Price classification") },
    { text: t("Charge service") },
    { text: t("Image") }
  ]

  const tabSelected = (args: any) => {
    if (tabIndex !== args.selectedIndex) {
      if (setDataSidebar) {
        setDataSidebar({ warehouse: {}, tierPrice: {}, serviceAdd: {}, package: {}, specAttr: {}, prodAttr: {}, prodAttrOpt: {}, prodRelated: {}, attrComb: {} })
      }
      if (setOpenSidebar) {
        setOpenSidebar({ warehouse: false, tierPrice: false, prodAttrOpt: false, serviceAdd: false, package: false, specAttr: false, prodAttr: false, prodRelated: false, attrComb: false })
      }
      setTabIndex(args.selectedIndex.toString())
    }
  }


  return (
    <Modal
      isOpen={openModal}
      toggle={handleModal}
      className='modal-dialog-centered modal-xl modal-tabs'
      contentClassName='p-0'
      onOpened={handleModalOpened}
      onClosed={handleModalClosed}
      keyboard={false}
      backdrop='static'
      scrollable
    >
      <Form
        id='form-modal-tenants'
        className='todo-modal modal-form-content'
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title="Product" />

        <ModalBody className={typeModal === 'Add' ? 'p-1' : ''}>
          {typeModal === 'Add' ? <TabGeneralInfo tabIndex={0} errors={errors} control={control} setValue={setValue} watch={watch}></TabGeneralInfo> : <Fragment>
            <TabComponent overflowMode='Popup' heightAdjustMode='Auto' animation={{ next: { effect: 'None' }, previous: { effect: 'None' } }} selected={tabSelected}>
              <TabItemsDirective>
                <TabItemDirective header={headerText[0]} />
                <TabItemDirective header={headerText[1]} />
                <TabItemDirective header={headerText[2]} />
                <TabItemDirective header={headerText[3]} />
                <TabItemDirective header={headerText[4]} />
                <TabItemDirective header={headerText[5]} />
                <TabItemDirective header={headerText[6]} />
                <TabItemDirective header={headerText[7]} />
              </TabItemsDirective>
            </TabComponent>

            <TabContent activeTab={tabIndex} className='modal-tab-content' style={{ height: `calc(${windowSize.innerHeight - 220}px)` }}>
              <TabPane key={0} tabId={'0'}>
                <TabGeneralInfo  
                  data={dataWarehouse} 
                  setData={setDataWarehouse} 
                  errors={errors} 
                  control={control} 
                  setValue={setValue}
                  setTypeSubModal={setTypeSubModal}
                  setProductId= {setProductId}
                  getValues={getValues} 
                  watch={watch}/>
              </TabPane>
              <TabPane key={1} tabId={'1'}>
                <TableProductSpecificationCode
                  control={control}
                  errors={errors}
                  openModal={openModal}
                  watch={watch}
                  setValue={setValue}
                  data={dataSpecificationCode}
                  setData={setDataSpecificationCode}
                />
              </TabPane>
              <TabPane key={2} tabId={'2'}>
                <TableSpecAttr 
                  dataSpeciAttribute={dataSpeciAttribute}
                  setDataSpeciAttribute={setDataSpeciAttribute}
                />
              </TabPane>
              <TabPane key={3} tabId={'3'}>
                <TableProductAttr></TableProductAttr>
              </TabPane>
              <TabPane key={4} tabId={'4'}>
                <ProductRelated ></ProductRelated>
              </TabPane>
              <TabPane key={5} tabId={'5'}>
                <TableTierPrice 
                  tabIndex={tabIndex}
                  dataTierPrice={dataTierPrice}
                  setDataTierPrice={setDataTierPrice}
                />
              </TabPane>
              <TabPane key={6} tabId={'6'}>
                <TableServiceAdd 
                  tabIndex={tabIndex} 
                  dataServiceAdd={dataServiceAdd}
                  setDataServiceAdd={setDataServiceAdd}
                  optionCurrency={optionCurrency}
                />
              </TabPane>
              <TabPane key={7} tabId={'7'}>
                <TableImage tabIndex={tabIndex}></TableImage>
              </TabPane>
            </TabContent>
          </Fragment>}
        </ModalBody>
        <div
          className='d-flex justify-content-end p-1'
          style={{ boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)' }}
        >
          {renderFooterButtons()}
        </div>
      </Form>
    </Modal>
  )
}

export default ModalComponent
