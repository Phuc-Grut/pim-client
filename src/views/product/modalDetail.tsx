// ** React Imports
import { Fragment, useContext, useEffect, useState } from "react"
import {
  Modal, ModalBody,
  Label, Row, Col, Badge, Input, Card, CardBody
} from "reactstrap"
import "@styles/react/libs/editor/editor.scss"
import ModalHeader from "@components/modal-header"
import { ProductContext } from "./useContext"
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from "react-i18next"
import AvatarViewComponent from "@components/avatar-commponent-view"
import {editorBeforeView} from '@src/utility/Utils'
import { optionCondition, tierPriceMethod, manageInventoryMethod } from "@src/domain/constants/constantSelect"
import { useUnit } from "@src/views/catalog/unit/hooks"
import { useGroupCategory } from "@src/views/catalog/group-category/hooks"
import { useTaxCategory } from "@src/views/catalog/tax-category/hooks"
import GridTableTemplate from "@components/grid-table-template"
import {
  headerColumnsProductRelated,
  headerColumnsProductAttribute, headerColumnsSpecialAttribute, headerColumnsServiceAdd, headerColumnsTier,
  headerColumnsWarehouse, headerColumnsPackage
} from "./columns"
import { useProduct } from "./hooks"
import { useWarehouse } from "@src/views/warehouse/hooks"
// import { Editor } from "react-draft-wysiwyg"
// import htmlToDraft from 'html-to-draftjs'
// import { ContentState, EditorState } from 'draft-js'
import { useProductType } from "../product-type/hooks"
import { QRCodeGeneratorComponent, BarcodeGeneratorComponent } from '@syncfusion/ej2-react-barcode-generator'
import RickEditor from "@components/editor"
import { addPeriod } from "@src/utility/Common"
import ModalFooterView from "@components/modal-footer-view"

const statusObj: any = {
  0: 'warning',
  1: 'success',
  2: 'secondary',
  3: 'danger'
}
const ModalDetail = () => {
  const { t } = useTranslation()
  const statusOptions: any = {
    0: t("Inactive"),
    1: t("Active")
  }
  // ** Props
  const {
    openModalDetail, handleModalDetail, windowSize, dataItem, typeModal } = useContext(ProductContext)
  const { getListUnitApi } = useUnit()
  const { getListGroupCategoryApi } = useGroupCategory()
  const { getListTaxCategoryApi } = useTaxCategory()
  const { getListWarehouseApi } = useWarehouse()
  const { getListProductTypeApi } = useProductType()
  const { getPagingRelatedProductApi, getPagingProductAttributeMappingApi, getPagingProductSpecificationAttributeMappingApi,
    getPagingProductPackageApi, getPagingTierPriceApi, getPagingProductServiceAddApi, getPagingProductInventoryApi, getPagingProductMediaApi
  } = useProduct()

  // ** States
  const [optionUnit, setOptionUnit] = useState<any>([])
  const [optionGrCategory, setOptionGrCategory] = useState<any>([])
  const [optionTaxCategory, setOptionTaxCategory] = useState<any>([])
  const [dataTierPrice, setDataTierPrice] = useState<any>([])
  const [dataServiceAdd, setDataServiceAdd] = useState<any>([])
  const [dataWarehouse, setDataWarehouse] = useState<any>([])
  const [fileList, setFileList] = useState<any>([])
  const [dataPackage, setDataPackage] = useState<any>([])
  const [dataSpecialAttribute, setDataSpecialAttribute] = useState<any>([])
  const [dataProductAttribute, setDataProductAttribute] = useState<any>([])
  const [dataProductRelated, setDataProductRelated] = useState<any>([])
  // const [valueEditorUpdate, setValueEditorUpdate] = useState<any>()
  const [optionProductType, setOptionProductType] = useState<any>([])

  useEffect(() => {
    if (openModalDetail === true) {
      getListUnitApi({ $status: 1 }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setOptionUnit(rs)
          }, 10)
        })
        .catch((ex) => {
          console.log(ex)
        })
      getListGroupCategoryApi({ $status: 1 }).unwrap()
        .then((rs: any) => {
          setTimeout(() => {
            setOptionGrCategory(rs)
          }, 10)

        })
        .catch((ex) => {
          console.log(ex)
        })
      getListTaxCategoryApi({ $status: 1 }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setOptionTaxCategory(rs)
          }, 10)
        })
        .catch((ex) => {
          console.log(ex)
        })
      getPagingTierPriceApi({
        $skip: 0,
        $top: 100,
        $productId: dataItem?.id
      }).unwrap()
        .then((rs: any) => {
          const newrs = rs.items?.map((c: any) => ({
            ...c,
            method: t(tierPriceMethod.find((a: any) => a.value === c.calculationMethod)?.label ?? '')
          }))
          setTimeout(() => {
            setDataTierPrice(newrs)
          }, 100)
        })
        .catch((ex) => {
          console.log(ex)
        })
      getPagingProductServiceAddApi({
        $skip: 0,
        $top: 100,
        $productId: dataItem?.id
      }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setDataServiceAdd(rs.items)
          }, 100)
        })
        .catch((ex) => {
          console.log(ex)
        })
      getListWarehouseApi({}).unwrap()
        .then((rs: any) => {
          setTimeout(() => {
            const nrs = rs.map((a: any) => ({ ...a, productId: dataItem?.id, warehouseId: a.value, code: a.key, name: a.label, id: a.value, stockQuantity: null, reservedQuantity: null, plannedQuantity: null }))
            getPagingProductInventoryApi({
              $skip: 0,
              $top: 100,
              $productId: dataItem?.id
            }).unwrap()
              .then((rs) => {
                if (rs?.items) {
                  const data = nrs.map((a: any) => {
                    const warehouse = rs?.items.find((b: any) => b.warehouseId === a.id)
                    if (warehouse) {
                      return ({ ...a, ...warehouse, status: true })
                    } else {
                      return ({ ...a, status: false })
                    }
                  })
                  setDataWarehouse(data)
                }
              })
          }, 10)
        })
        .catch((ex: any) => {
          console.log(ex)
        })

      getPagingProductPackageApi({
        $skip: 0,
        $top: 100,
        $productId: dataItem?.id
      }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setDataPackage(rs.items)
          }, 100)
        })
        .catch((ex) => {
          console.log(ex)
        })

      getPagingProductMediaApi({ $top: 100, $skip: 0, $productId: dataItem?.id })
        .unwrap()
        .then((rs) => {
          if (rs.items) {
            setFileList(rs.items)
          }
        })

      getPagingProductSpecificationAttributeMappingApi({
        $skip: 0,
        $top: 100,
        $productId: dataItem?.id
      }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setDataSpecialAttribute(rs.items)
          }, 100)
        })
        .catch((ex) => {
          console.log(ex)
        })
      getPagingProductAttributeMappingApi({
        $skip: 0,
        $top: 100,
        $productId: dataItem?.id
      }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            const newss = rs?.items.map((a: any) => {
              const option = a?.options.map((b: any) => {
                return b.label
              }).join(' ,')
              return ({ ...a, opt: option })
            }, '')
            setDataProductAttribute(newss)
          }, 100)
        })
        .catch((ex) => {
          console.log(ex)
        })
      getPagingRelatedProductApi({
        $skip: 0,
        $top: 100,
        $productId1: dataItem?.id
      }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setDataProductRelated(rs.items)
          }, 100)
        })
        .catch((ex) => {
          console.log(ex)
        })
      getListProductTypeApi({ $status: 1 }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setOptionProductType(rs)
          }, 10)
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
    // if (dataItem?.fullDescription) {
    //   const fullDes = dataItem?.fullDescription
    //   if (fullDes) {
    //     const contentBlock = htmlToDraft(editorBeforeView(fullDes))
    //     const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
    //     const editorState = EditorState.createWithContent(contentState)
    //     setValueEditorUpdate(editorState)
    //   }
    //
    // }
  }, [openModalDetail])
  // ** Function to run when sidebar opens
  const handleFormDetailOpened = () => { }

  // ** Function to run when sidebar closes
  const handleModalDetailClosed = () => { }

  // const renderFooterButtons = () => {
  //   return (
  //     <Fragment>
  //       <div className='d-flex justify-content-between align-items-center w-100'>
  //         <div>
  //           <p className='m-0'>
  //             <strong style={{ color: '#5e5873' }}>Tạo lúc:</strong> <span>{moment(dataItem.createdDate).utcOffset('+07:00').format(themeConfig.system.dateTimeFormat)}</span>
  //             <strong className='ms-2' style={{ color: '#5e5873' }}>bởi:</strong> <span>{dataItem.createdByName}</span>
  //           </p>

  //           <p className='m-0'>
  //             {dataItem.updatedDate && <>
  //               <strong style={{ color: '#5e5873' }}>Sửa lần cuối lúc:</strong> <span>{moment(dataItem.updatedDate).utcOffset('+07:00').format(themeConfig.system.dateTimeFormat)}</span>
  //             </>}
  //             {dataItem.updatedBy &&
  //               <>
  //                 <strong style={{ color: '#5e5873' }} className='ms-2'>bởi:</strong> <span>{dataItem.updatedByName}</span>
  //               </>
  //             }
  //           </p>

  //         </div>

  //         <div>
  //           <Button color='secondary' onClick={handleModalDetail} outline>
  //             {t('Close')}
  //           </Button>
  //         </div>
  //       </div>

  //     </Fragment>
  //   )
  // }
  const handleCondition = (value: any) => {
    const val = optionCondition.find((x: any) => (x.value === value))
    if (val === undefined || val === null) {
      return ""
    }
    return val.label
  }
  const handleManagingMethod = (value: any) => {
    const val = manageInventoryMethod.find((x: any) => (x.value === value))
    if (val === undefined || val === null) {
      return ""
    }
    return t(val.label)
  }

  const handleUnit = (value: any) => {
    const val = optionUnit.find((x: any) => (x.value === value))
    if (val === undefined || val === null) {
      return ""
    }
    return val.label
  }
  const handleTax = (value: any) => {
    const val = optionTaxCategory.find((x: any) => (x.value === value))
    if (val === undefined || val === null) {
      return ""
    }
    return val.label
  }
  const handleCategories = (dataItem: any) => {
    if (!dataItem.listGroupCategory) {
      return ''
    }
    return dataItem.listGroupCategory?.map((val: any, i: number) => {
      const label = optionGrCategory.find((x: any) => x.value === val.value)?.label
      const category = dataItem.listCategory?.filter((x: any) => x.groupCategoryId === val.value).map((x: any) => x.label).join(", ")
      return <Col lg={12} md={12} xs={12} key={i}><div className='d-flex form-row-inline label-medium'>
        <Label className='form-label'>{label}</Label>
        <div className='form-input-content'>
          <p>{category}</p>
        </div>
      </div>
      </Col>
    }
    )
  }
  const handleProductType = (value: any) => {
    const val = optionProductType.find((x: any) => (x.value === value))
    if (val === undefined || val === null) {
      return ""
    }
    return val.label
  }
  const renderGeneralInfomation = () => {
    return (
      <>
        <section>
          <div className='box form-box__border mb-3 p-2'>
            <h5 className="m-0 form-box__border--title">{t('Product information')}</h5>
            <Row className='gy-1 mb-1'>
              <Col lg={12} md={12} xs={12}>
                <Row className='gy-1 mb-1'>
                  <Col lg={3} md={3} xs={12}>
                    <AvatarViewComponent
                      height={125}
                      width={125}
                      label={t('Image')}
                      labelSize='label-medium'
                      image={dataItem.image} />
                  </Col>
                  <Col lg={5} md={5} xs={12}>
                    <Row className='gy-1 mb-1'>
                      <Col lg={12} md={12} xs={12}>
                        <div className='d-flex form-row-inline label-medium'>
                          <Label className='form-label'>{t('ProductCode')}</Label>
                          <div className='form-input-content'>
                            <p>{dataItem.code}</p>
                          </div>
                        </div>
                      </Col>
                      <Col lg={12} md={12} xs={12}>
                        <div className='d-flex form-row-inline label-medium'>
                          <Label className='form-label'>{t('Product type')}</Label>
                          <div className='form-input-content'>
                            <p>{handleProductType(dataItem.productTypeId)}</p>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4} md={4} xs={12}>
                        <div className='d-flex form-row-inline label-medium'>
                          <Label className='form-label'>{t('Can be sold')}</Label>
                          <div className='form-input-content'>
                            <Input type='checkbox' defaultChecked={dataItem.forSale} disabled />
                          </div>
                        </div>
                      </Col>
                      <Col lg={4} md={4} xs={12}>
                        <div className='d-flex form-row-inline label-medium'>
                          <Label className='form-label'>{t('Can be purchased')}</Label>
                          <div className='form-input-content'>
                            <Input type='checkbox' defaultChecked={dataItem.forBuy} disabled />
                          </div>
                        </div>
                      </Col>
                      <Col lg={4} md={4} xs={12}>
                        <div className='d-flex form-row-inline label-medium'>
                          <Label className='form-label'>{t('Can be produced')}</Label>
                          <div className='form-input-content'>
                            <Input type='checkbox' defaultChecked={dataItem.forProduction} disabled />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className='gy-1 '>
                      <Col lg={12} md={12} xs={12}>
                        <div className='d-flex form-row-inline label-medium'>
                          <Label className='form-label'>{t('Status')}</Label>
                          <div className='form-input-content'>
                            <p>
                              <Badge className='text-capitalize' color={statusObj[dataItem.status]} pill >
                                {statusOptions[dataItem.status]}
                              </Badge>
                            </p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={4} md={4} xs={12}>
                    <Row className='gy-1'>
                      <Col lg={12} md={12} xs={12}>
                        <div className="d-flex">
                          <div className="QRCode" style={{ height: '150px', width: '250px' }}>
                            <QRCodeGeneratorComponent
                              id="qrcode"
                              displayText={{ visibility: false }}
                              mode="SVG"
                              type="QRCode"
                              value={dataItem.code}
                            />
                          </div>
                          <div className="QRCode" style={{ height: '150px', width: '250px' }}>
                            <BarcodeGeneratorComponent
                              id="barcode"
                              displayText={{ visibility: false }}
                              mode="SVG"
                              type="Code128B"
                              value={dataItem.code}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='gy-1 mb-1'>
              <Col lg={12} md={12} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Product name')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.name}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('SourceLink')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.sourceLink}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Short description')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.shortDescription}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <RickEditor
                  showToolbar={false}
                  label={t('Full description')}
                  value={editorBeforeView(dataItem?.fullDescription)}
                  labelSize={'label-medium'}
                  readonly={true}
                />
              </Col>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Condition of products')}</Label>
                  <div className='form-input-content'>
                    <p>{t(handleCondition(dataItem.condition))}</p>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Unit')}</Label>
                  <div className='form-input-content'>
                    <p>{handleUnit(dataItem.unitId)}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Store limited')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.stores}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('InfomationChannel')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.groupCategories}</p>
                  </div>
                </div>
              </Col>
              {handleCategories(dataItem)}
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Product origin')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.origin}</p>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Product brand')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.brand}</p>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Manufacturers')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.manufacturer}</p>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Manufacturer code')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.manufacturerNumber}</p>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Classify')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.tags}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div></section>
      </>
    )
  }
  const renderSalesInfomation = () => {
    return (
      <>
        <section>
          <div className='box form-box__border mb-3 p-2'>
            <h5 className="m-0 form-box__border--title">{t('Sales information')}</h5>
            <Row className='gy-1 mb-1'>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('productCost')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.productCost} {dataItem.currencyCost}</p>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Sales cost')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.price} {dataItem.currency}</p>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Tax exempt')}</Label>
                  <div className='form-input-content'>
                    <Input type='checkbox' defaultChecked={dataItem.isTaxExempt} disabled />
                  </div>
                </div>
              </Col>
              {!dataItem.isTaxExempt && (
                <Col lg={6} md={6} xs={12}>
                  <div className='d-flex form-row-inline label-medium'>
                    <Label className='form-label'>{t('Tax type')}</Label>
                    <div className='form-input-content'>
                      <p>{handleTax(dataItem.taxCategoryId)}</p>
                    </div>
                  </div>
                </Col>
              )}
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Purchase maximum quantity')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.orderMaximumQuantity}</p>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Purchase minimum quantity')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.orderMinimumQuantity}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className='react-dataTable p-50 b-1'>
                  <div className='table-toolbar'>
                    <Card className='table-bar bar__action'>
                      <CardBody>
                        <div className='d-flex justify-content-between align-items-center w-100'>
                          <span className='bolder'>{t('Price classification')}</span>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                  <GridTableTemplate
                    idTable="tableTierPrice"
                    dataTable={dataTierPrice}
                    columns={headerColumnsTier}
                    showPagination={false}
                  />
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className='react-dataTable p-50 b-1'>
                  <div className='table-toolbar'>
                    <Card className='table-bar bar__action'>
                      <CardBody>
                        <div className='d-flex justify-content-between align-items-center w-100'>
                          <span className='bolder'>{t('Charge service')}</span>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                  <GridTableTemplate
                    idTable="tableServiceAdd"
                    dataTable={dataServiceAdd}
                    columns={headerColumnsServiceAdd}
                    showPagination={false}
                  />
                </div>
              </Col>
            </Row>
          </div></section>
      </>
    )
  }
  const renderInventoryShipping = () => {
    return (
      <>
        <section>
          <div className='box form-box__border mb-3 p-2'>
            <h5 className="m-0 form-box__border--title">{t('Sales information')}</h5>
            <Row className='gy-1 mb-1'>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Managing method')}</Label>
                  <div className='form-input-content'>
                    <p>{handleManagingMethod(dataItem.manageInventoryMethodId)}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className='react-dataTable p-50 b-1'>
                  <div className='table-toolbar'>
                    <Card className='table-bar bar__action'>
                      <CardBody>
                        <div className='d-flex justify-content-between align-items-center w-100'>
                          <span className='bolder'>{t('Stock information')}</span>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                  <GridTableTemplate
                    idTable="tableWarehouse"
                    dataTable={dataWarehouse}
                    columns={headerColumnsWarehouse}
                    showPagination={false}
                  />
                </div>
              </Col>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Number of packages')}</Label>
                  <div className='form-input-content'>
                    <p>{dataPackage?.length}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <GridTableTemplate
                  idTable="tablePackage"
                  dataTable={dataPackage}
                  columns={headerColumnsPackage}
                  showPagination={false}
                />
              </Col>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Delivery time')}</Label>
                  <div className='form-input-content'>
                    <p>{""}</p>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Free shipping')}</Label>
                  <div className='form-input-content'>
                    <Input type='checkbox' defaultChecked={dataItem.isFreeShipping} disabled />
                  </div>
                </div>
              </Col>
              <Col lg={3} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Shipping fee from')}</Label>
                  <div className='form-input-content'>
                    <p>{addPeriod(dataItem.additionalShippingCharge)}</p>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Currency')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.currency}</p>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Can return')}</Label>
                  <div className='form-input-content'>
                    <Input type='checkbox' defaultChecked={dataItem.canReturn} disabled />
                  </div>
                </div>
              </Col>
            </Row>
          </div></section>
      </>
    )
  }
  const imageList = () => {
    if (!fileList) {
      return ""
    }
    return fileList?.map((image: any) => (
      <div className='mr-1'>
        <AvatarViewComponent
          height={100}
          width={100}
          labelSize='label-meidum'
          image={image?.path} />
      </div>

    ))
  }
  const renderImages = () => {
    return (
      <>
        <section>
          <div className='box form-box__border mb-3 p-2'>
            <h5 className="m-0 form-box__border--title">{t('Image')}</h5>
            <div className='gy-1 mb-1 d-flex'>
              {imageList()}
            </div>
          </div></section>
      </>
    )
  }
  const renderSpecialAttribute = () => {
    return (
      <>
        <section>
          <div className='box form-box__border mb-3 p-2'>
            <h5 className="m-0 form-box__border--title">{t('Specification attribute')}</h5>
            <div className='gy-1 mb-1 d-flex'>
              <Col lg={12} md={12} xs={12}>
                <GridTableTemplate
                  idTable="tableSpecAttr"
                  dataTable={dataSpecialAttribute}
                  columns={headerColumnsSpecialAttribute}
                  showPagination={false}
                />
              </Col>
            </div>
          </div></section>
      </>
    )
  }
  const renderProductAttribute = () => {
    return (
      <Fragment>
        <div className='box form-box__border mb-3 p-2'>
          <h5 className="m-0 form-box__border--title">{t('Product attribute')}</h5>
          <div className='gy-1 mb-1 d-flex'>
            <Col lg={12} md={12} xs={12}>
              <GridTableTemplate
                idTable="tableProdAttr"
                dataTable={dataProductAttribute}
                columns={headerColumnsProductAttribute}
                showPagination={false}
              />
            </Col>
          </div>
        </div>
      </Fragment>
    )
  }
  const renderProductRelated = () => {
    return (
      <>
        <section>
          <div className='box form-box__border mb-3 p-2'>
            <h5 className="m-0 form-box__border--title">{t('Product related')}</h5>
            <div className='gy-1 mb-1 d-flex'>
              <Col lg={12} md={12} xs={12}>
                <GridTableTemplate
                  idTable="tableProdRelated"
                  dataTable={dataProductRelated}
                  columns={headerColumnsProductRelated}
                  showPagination={false}
                />
              </Col>
            </div>
          </div></section>
      </>
    )
  }
  return (
    <Modal
      isOpen={openModalDetail}
      backdrop="static"
      keyboard={false}
      toggle={handleModalDetail}
      className='modal-xl modal-detail'
      contentClassName="p-0"
      onOpened={handleFormDetailOpened}
      onClosed={handleModalDetailClosed}
    >
      <ModalHeader
        handleModal={handleModalDetail}
        typeModal={typeModal}
        title="Product"
      />
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMax={windowSize.innerHeight - 180}
      >
        <ModalBody>
          {renderGeneralInfomation()}
          {renderSalesInfomation()}
          {renderInventoryShipping()}
          {renderImages()}
          {renderSpecialAttribute()}
          {renderProductAttribute()}
          {renderProductRelated()}
        </ModalBody>
      </Scrollbars>
      <div
        className="d-flex justify-content-end p-1"
        style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}
      >
        <ModalFooterView
          createdDate={dataItem.createdDate}
          createdByName={dataItem.createdByName}
          updatedDate={dataItem.updatedDate}
          updatedByName={dataItem.updatedByName}
          handleModal={handleModalDetail}
        />
      </div>
    </Modal>
  )
}

export default ModalDetail
