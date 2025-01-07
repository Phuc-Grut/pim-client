import { useProductBrand } from "@src/views/product-brand/hooks"
import { useProductOrigin } from "@src/views/product-origin/hooks"
import { useProductTag } from "@src/views/catalog/product-tag/hooks"
import { useTaxCategory } from "@src/views/catalog/tax-category/hooks"
import { useProductType } from "@src/views/product-type/hooks"
import { useUnit } from "@src/views/catalog/unit/hooks"
import { Fragment, useContext, useEffect, useState } from "react"
import { Controller, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Col, FormFeedback, Input, Label, Row } from "reactstrap"
import { ProductContext } from "../useContext"
import { useGroupUnit } from "@src/views/catalog/group-unit/hooks"
import { useCategory } from "@src/views/channel-list/hook"
import { useManufacturer } from "@src/views/manufacturer/hooks"
import { DropDownTreeComponent, MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns"
import { useDebounce } from "@src/utility/hooks/useDebounce"
import AsyncSelectBox from "./asyncSelectBox"
import TableMultiWarehouse from "./table-multi-warehouse"
import TablePackage from "./table-package"
import { isNullOrUndefined } from "@src/utility/hooks/isNullOrUndefined"
import { useDeliveryTime } from "@src/views/catalog/delivery-time/hooks"
import { SelectBox } from "@components/select"
import { NumberInput, TextInput } from "@components/input"
import { useCodeSyntax } from '../../../redux/system/codesyntax/hooks'
import { MODULECODE } from "@src/domain/constants"
import { useGroupCategory } from "@src/views/catalog/group-category/hooks"
import { useProductCategory } from "@src/views/catalog/information-category/hook"
import TableUseHookForm from "@src/assets/scss/theme/TableUseHookForm"
import RickEditorInput from "@components/input/editor-input"
import AvatarUpload from "@components/avatar-upload"
const TabGeneralInfo = (props: any) => {
  const {
    control, errors,
    setValue, watch,
    getValues,
    data,
    setData,
    setTypeSubModal,
    setProductId
  } = props
  const isAutoWatch = useWatch({
    control,
    name: "isAuto"
  })
  const isAutoUnitType = useWatch({
    control,
    name: "unitType"
  })
  const { t } = useTranslation()

  const { typeModal, openModal, dataItem, tabIndex, optionGrCategory, setOptionGrCategory, optionStore, optionCurrency
  } = useContext(ProductContext)
  const manageInventoryMethod = [
    {
      value: 0,
      label: t("Don't track inventory")
    },
    {
      value: 1,
      label: t("Track inventory")
    }
  ]
  const optionCondition = [
    {
      value: 0,
      label: t("New")
    },
    {
      value: 1,
      label: t("Refurbished")
    },
    {
      value: 2,
      label: t("used")
    },
    {
      value: 3,
      label: t("Problem")
    }
  ]
  const optionStatus = [
    {
      value: 1,
      label: t("Active")
    },
    {
      value: 0,
      label: t("Inactive")
    }
  ]
  // const [valueEditor, setValueEditor] = useState("")
  // const [valueEditorUpdate, setValueEditorUpdate] = useState<any>()
  const [hasTax, setHasTax] = useState(false)
  const [filterTag, setFilterTag] = useState<any>()
  const [optionDelieveryTime, setOptionDelieveryTime] = useState([])
  const [optionManufacturer, setOptionManufacturer] = useState([])
  const [optionBrand, setOptionBrand] = useState([])
  const [optionOrigin, setOptionOrigin] = useState([])
  const [optionUnit, setOptionUnit] = useState([])
  const [optionGroupUnit, setOptionGroupUnit] = useState([])
  const [optionTag, setOptionTag] = useState<any>([])
  const [optionTaxCategory, setOptionTaxCategory] = useState<any>([])
  const [selectedGrCate, setSelectedGrCate] = useState<any>([])

  const [optionProductType, setOptionProductType] = useState([])
  const [optionProCategory, setOptionProCategory] = useState([])

  const { getListManufacturerApi } = useManufacturer()
  const { getCbxCategoryApi } = useCategory()

  const { getListProductBrandApi } = useProductBrand()
  const { getListProductOriginApi } = useProductOrigin()
  const { getListUnitApi } = useUnit()
  const { getListGroupUnitApi } = useGroupUnit()
  const { getListProductTagApi } = useProductTag()
  const { getListTaxCategoryApi } = useTaxCategory()
  const { getListDeliveryTimeApi } = useDeliveryTime()
  const { getListProductTypeApi } = useProductType()
  const { getListGroupCategoryApi } = useGroupCategory()
  const { getListComboboxProCateApi } = useProductCategory()

  const {
    getCodeSyntaxPagingApi
  } = useCodeSyntax()

  // const onChangeContent = (data: any) => {
  //   setValueEditorUpdate(data)
  //   const rawContentState = convertToRaw(data.getCurrentContent())
  //   const _edit = draftToHtml(rawContentState)
  //   setValueEditor(_edit)
  // }
  const fieldsProCategory = {
    dataSource: optionProCategory,
    value: 'value',
    text: 'name',
    child: 'children'
  }

  useEffect(() => {
    if (openModal === true && tabIndex === '0') {
      if (optionProductType?.length === 0) {
        getListProductTypeApi({ $status: 1 }).unwrap()
          .then((rs) => {
            setTimeout(() => {
              setOptionProductType(rs)
              if (typeModal === 'Add') {
                setValue('productTypeId', rs[0].value)
                setValue('productType', rs[0].label)
              }
            }, 10)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
      if (optionManufacturer?.length === 0) {
        getListManufacturerApi({ $status: 1 }).unwrap()
          .then((rs) => {
            setTimeout(() => {
              setOptionManufacturer(rs)
            }, 10)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
      if (optionGrCategory?.length === 0) {
        getListGroupCategoryApi({ $status: 1 }).unwrap()
          .then((rs) => {
            setTimeout(() => {
              setTimeout(() => {
                setOptionGrCategory([...rs])
              }, 100)
            }, 10)
            if (dataItem.listGroupCategory?.length > 0) {
              const item = dataItem.listGroupCategory?.map((a: any) => {
                return { name: a.value, label: rs.find((b: any) => b.value === a.value)?.label }
              })
              setSelectedGrCate(item)
            }
          })
          .catch((ex) => {
            console.log(ex)
          })
      } else {
        if (dataItem.listGroupCategory?.length > 0) {
          const item = dataItem.listGroupCategory?.map((a: any) => {
            return { name: a.value, label: optionGrCategory.find((b: any) => b.value === a.value)?.label }
          })
          setSelectedGrCate(item)
        }
      }

      if (optionGroupUnit?.length === 0) {
        getListGroupUnitApi({ $status: 1 }).unwrap()
          .then((rs) => {
            setTimeout(() => {
              setOptionGroupUnit(rs?.map((a: any) => ({ ...a, value: a.key, key: a.value })))
            }, 10)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
      if (optionTaxCategory?.length === 0) {
        getListTaxCategoryApi({ $status: 1 }).unwrap()
          .then((rs) => {
            setTimeout(() => {
              setOptionTaxCategory(rs)
              setValue('taxCategoryId', rs[0].value)
            }, 10)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
      if (optionBrand?.length === 0) {
        getListProductBrandApi({ $status: 1 }).unwrap()
          .then((rs) => {
            setTimeout(() => {
              setOptionBrand(rs)
            }, 10)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
      if (optionOrigin?.length === 0) {
        getListProductOriginApi({ $status: 1 }).unwrap()
          .then((rs) => {
            setTimeout(() => {
              setOptionOrigin(rs)
            }, 10)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
      if (optionUnit?.length === 0) {
        getListUnitApi({ $status: 1 }).unwrap()
          .then((rs) => {
            setTimeout(() => {
              setOptionUnit(rs)
            }, 10)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
      if (optionDelieveryTime?.length === 0) {
        getListDeliveryTimeApi().unwrap()
          .then((rs) => {
            setTimeout(() => {
              setOptionDelieveryTime(rs)
            }, 10)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
    }
    if (typeModal === 'Edit') {
      setHasTax(dataItem?.isTaxExempt)
      // const fullDes = dataItem?.fullDescription
      // console.log(fullDes)
      // if (fullDes) {
      //   const contentBlock = htmlToDraft(fullDes)
      //   console.log(contentBlock)
      //   const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      //   const editorState = EditorState.createWithContent(contentState)
      //   console.log(editorState)
      //   setValueEditorUpdate('')
      // }

    }
    if (openModal === true && typeModal === 'Add') {
      getCodeSyntaxPagingApi({
        $syntaxCode: MODULECODE.PRODUCT,
        $status: 0
      }).unwrap()
        .then((rs: any) => {
          setValue("code", rs?.code)
        })
        .catch((ex: any) => {
          console.log(ex)
        })
    }
    if (optionProCategory?.length === 0) {
      getListComboboxProCateApi().unwrap()
        .then((rs) => {
          setTimeout(() => {
            setOptionProCategory(rs)
          }, 100)
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
    if (openModal === false) {
      setSelectedGrCate([])
    }
  }, [openModal, tabIndex, dataItem])

  useEffect(() => {
    if (optionCurrency?.length > 0) {
      if (typeModal === 'Add') {
        setValue('currency', optionCurrency[0].value)
        setValue('currencyCost', optionCurrency[0].value)
      }
    }
  }, [openModal, tabIndex, optionCurrency])

  useEffect(() => {
    setValue('listPackage', [])
    setValue('width', dataItem?.width)
    setValue('weight', dataItem?.weight)
    setValue('length', dataItem?.length)
    setValue('length', dataItem?.length)
    setValue('height', dataItem?.height)
  }, [watch('multiPacking')])

  useEffect(() => {
    if (isAutoWatch === 1) {
      setValue("code", null)
    } else if (typeModal === 'Add') {
      getCodeSyntaxPagingApi({
        $syntaxCode: MODULECODE.PRODUCT,
        $status: 0
      }).unwrap()
        .then((rs: any) => {
          setValue("code", rs?.code)
        })
        .catch((ex: any) => {
          console.log(ex)
        })
    }
  }, [isAutoWatch])

  useEffect(() => {
    const type: any = optionGroupUnit.find((a: any) => a.value === isAutoUnitType)
    if (type) {
      getListUnitApi({ $status: 1, $groupUnitId: type?.key }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setOptionUnit(rs)
          }, 10)
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
  }, [isAutoUnitType])
  const f = useDebounce(filterTag, 200)
  useEffect(() => {
    getListProductTagApi({ $status: 1, $type: 3, $keyword: f }).unwrap()
      .then((rs) => {
        setTimeout(() => {
          setOptionTag(rs)
        }, 10)
      })
      .catch((ex) => {
        console.log(ex)
      })
  }, [f])

  // useEffect(() => {
  //   setValue('fullDescription', valueEditor)
  // }, [valueEditor])

  useEffect(() => {
    if (!watch("manufacturerId")) {
      setValue("manufacturerNumber", "")
    }
  }, [watch("manufacturerId")])

  return (
    <Fragment>
      <div className='box form-box__border mb-3'>
        <h5 className="m-0 form-box__border--title">{t('Product information')}</h5>
        <Row className='gy-1 mb-1'>
          <Col lg={4} md={4} xs={12}>
            <AvatarUpload
              // control={control}
              image={dataItem.image}
              name='image'
              height={100}
              width={100}
              labelSize='label-medium'
              type={'Product'}
              callback={(val: any) => setValue('image', val)}
            />


          </Col>

          <Col lg={4} md={4} xs={12}>
            <Row className='gy-1 mb-1'>
              <Col xs={12}>
                <SelectBox
                  control={control}
                  name="productTypeId"
                  labelSize='label-medium'
                  label={t("Product type")}
                  disabled={typeModal === 'Detail'}
                  required={true}
                  placeholder={t("")}
                  options={optionProductType}
                  callback={(val: any) => {
                    if (val) {
                      setValue('productType', val?.label)
                    } else {
                      setValue('productType', '')
                    }
                  }}
                />
              </Col>
              <Col lg={9} md={9} xs={9}>
                <TextInput
                  control={control}
                  name='code'
                  label={t('ProductCode')}
                  disabled={typeModal === 'Detail' || isAutoWatch === 1 || typeModal === 'Edit'}
                  required={true}
                  labelSize='label-medium'
                  placeholder={isAutoWatch === 1 ? t("******") : ""}
                  errors={errors.code} />
              </Col>
              <Col lg={3} md={3} xs={3}>
                <div className='d-flex'>
                  <div className='form-check me-1'>
                    <Controller
                      name="isAuto"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Input
                          id='isAuto'
                          type='checkbox'
                          onChange={(val: any) => {
                            onChange(val.target.checked ? 1 : 0)
                          }}
                          checked={value === 1}
                          disabled={typeModal === 'Edit'}
                        />
                      )}
                    />
                    <Label className='form-label' for='isAuto'>
                      {t('Auto')}
                    </Label>
                  </div>
                </div>
              </Col>

            </Row>
          </Col>

          <Col lg={4} md={4} xs={12}>
            <Row className="gy-1 mb-1">
              <Col md={12} xs={12}>
                <div className='d-flex'>
                  <Label style={{ width: '100px' }} className='me-1'>{t('')}</Label>
                  <Row className='gy-1'>
                    <div className='d-flex'>
                      <div className='form-check me-2'>
                        <Controller
                          name="forSale"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              checked={field.value}
                              id='forSale'
                              type='checkbox'
                            />
                          )}
                        />
                        <Label className='form-label' for='forSale'>
                          {t('Can be sold')}
                        </Label>
                      </div>
                      <div className='form-check me-2'>
                        <Controller
                          name="forBuy"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              checked={field.value}
                              id='forBuy'
                              type='checkbox'
                            />
                          )}
                        />
                        <Label className='form-label' for='forBuy'>
                          {t('Can be purchased')}
                        </Label>
                      </div>
                      <div className='form-check'>
                        <Controller
                          name="forProduction"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              checked={field.value}
                              id='forProduction'
                              type='checkbox'
                            />
                          )}
                        />
                        <Label className='form-label' for='forProduction'>
                          {t('Can be produced')}
                        </Label>
                      </div>
                    </div>
                  </Row>
                </div>
              </Col>
              <Col md={12} xs={12}>
                <SelectBox
                  control={control}
                  name="status"
                  label={t("Status")}
                  labelSize='label-small'
                  disabled={typeModal === 'Detail'}
                  errors={errors.status}
                  required={true}
                  placeholder={t("Select")}
                  options={optionStatus}
                />
              </Col>
            </Row>
          </Col>

          <Col md={12} xs={12}>
            <TextInput
              control={control}
              name='name'
              label={t('Product name')}
              disabled={typeModal === 'Detail'}
              required={true}
              labelSize='label-medium d-flex form-row-inline'
              placeholder=''
              errors={errors.name} />
          </Col>
          <Col lg={12} md={12} xs={12}>
            <div className='d-flex form-row-inline label-medium'>
              <Label className='form-label'>{t('CategoryProduct')}</Label>
              <div className='form-input-content'>
                <Controller
                  name='categoryRootId'
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <DropDownTreeComponent
                        id="categoryRootId"
                        form='categoryRootId'
                        filterBarPlaceholder='Search'
                        cssClass={errors.categoryRootId ? 'is-invalid' : ''}
                        allowFiltering={true}
                        fields={fieldsProCategory}
                        value={isNullOrUndefined(value) ? undefined : [value]}
                        placeholder=''
                        popupHeight="220px"
                        select={(val: any) => {
                          onChange(val?.itemData?.id)
                          setValue('categoryRoot', val?.itemData?.value)
                        }}
                      />
                    )
                  }}
                />
                {errors.categoryRootId && <FormFeedback>{errors.categoryRootId?.message}</FormFeedback>}
              </div>
            </div>
          </Col>
          <Col md={12} xs={12}>
            <TextInput
              control={control}
              name='sourceLink'
              label={t('SourceLink')}
              disabled={typeModal === 'Detail'}
              required={false}
              labelSize='label-medium d-flex form-row-inline'
              placeholder='' />
          </Col>
          <Col md={12} xs={12}>
            <TextInput
              control={control}
              name='shortDescription'
              type='textarea'
              label={t('Short description')}
              labelSize='label-medium d-flex form-row-inline'
              placeholder=''
              row={3}
              disabled={typeModal === 'Detail'}
              errors={null} />
          </Col>
          <Col md={12} xs={12}>
            {/*<div className='d-flex form-row-inline label-medium'>*/}
            {/*  <Label className='form-label'>{t('Full description')}</Label>*/}
            {/*  <div className='form-input-content'>*/}

            {/*    <Controller*/}
            {/*      name='fullDescription'*/}
            {/*      control={control}*/}
            {/*      render={({ field: { value, onChange} }) => {*/}
            {/*        return (*/}
            {/*          <RichTextEditorComponent*/}
            {/*            // id="fullDescription"*/}
            {/*            toolbarSettings={toolbarSettings}*/}
            {/*            insertImageSettings={insertImageSettings}*/}
            {/*            imageUploadSuccess={imageUploaded}*/}
            {/*            imageUploading={imageUploading}*/}
            {/*            name="fullDescription"*/}
            {/*            className="form-control"*/}
            {/*            height={300}*/}
            {/*            // showCharCount={true}*/}
            {/*            placeholder={'Type something'}*/}
            {/*            value={value}*/}
            {/*            change={(val: any) => onChange(val.value)}*/}
            {/*          >*/}
            {/*            <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table]}/>*/}
            {/*          </RichTextEditorComponent>*/}
            {/*        )*/}
            {/*      }}*/}
            {/*    />*/}

            {/*  </div>*/}
            {/*</div>*/}

            <RickEditorInput
              label={''}
              control={control}
              name='fullDescription'
              placeholder={'Type something'}
              labelSize='label-medium'
            />
          </Col>
          <Col md={6} xs={12}>
            <SelectBox
              control={control}
              name="condition"
              label={t("Condition of products")}
              labelSize='label-medium'
              disabled={typeModal === 'Detail'}
              errors={null}
              required={true}
              placeholder={t("")}
              options={optionCondition}
            />
          </Col>
          <Col md={6} xs={12}>
            <div className='d-flex'>
              {<Col md={7} xs={12}>
                <SelectBox
                  control={control}
                  name="unitType"
                  labelSize='label-medium'
                  label={t("Unit")}
                  required={true}
                  disabled={typeModal !== 'Add'}
                  placeholder={t("Group unit")}
                  options={optionGroupUnit}
                  errors={errors.unitType}
                  callback={() => {
                    setValue('unitId', undefined)
                    setValue('unitCode', undefined)
                  }}
                />
              </Col>}
              <Col md={5} xs={12}>
                <SelectBox
                  control={control}
                  name="unitId"
                  labelSize='label-medium'
                  label={t("")}
                  isLabel={false}
                  errors={errors.unitId}
                  disabled={typeModal === 'Detail'}
                  placeholder={t("Unit")}
                  options={optionUnit}
                  callback={(val: any) => {
                    const grUnit: any = optionGroupUnit.find((a: any) => a.key === val.groupUnitId)
                    setValue('unitType', grUnit?.value)
                    setValue('unitCode', val?.key)
                  }}
                />
              </Col>
            </div>
          </Col>
          <Col md={12} xs={12}>
            <SelectBox
              control={control}
              name="limitedToStores"
              labelSize='label-medium'
              label={t("Store limited")}
              placeholder={t("")}
              options={optionStore}
              isMulti={true}
            />
          </Col>
          <Col md={12} xs={12}>
            <SelectBox
              control={control}
              name="idGroupCategories"
              labelSize='label-medium d-flex form-row-inline'
              label={t("InfomationChannel")}
              placeholder={t("")}
              isClearable={true}
              isMulti={true}
              options={optionGrCategory}
              callback={
                (val: any) => {
                  const arr: any[] = val
                  setSelectedGrCate([])
                  const list: any[] = []
                  arr?.map((id: any) => {
                    list.push({ name: id.value, label: id.label })
                  })
                  setTimeout(() => {
                    setSelectedGrCate(list)
                  }, 100)

                }
              }
            />
          </Col>
        </Row>
        {selectedGrCate && selectedGrCate?.map((val: any, i: any) => {
          let timeout: any
          return <Fragment key={i}>
            <Row className='gy-1 mb-1'>
              <Col md={12} xs={12}>
                <AsyncSelectBox
                  control={control}
                  name={val.name}
                  isMulti
                  label={t(val.label)}
                  isClearable={true}
                  placeholder={t('')}
                  labelSize='label-medium d-flex form-row-inline'
                  loadOptions={(a: any, callback: any) => {
                    const text = a
                    clearTimeout(timeout)
                    timeout = setTimeout(() => {
                      getCbxCategoryApi({ $status: 1, $groupCategoryId: val.name, $parentCategoryId: '', $keyword: text })
                        .unwrap()
                        .then((rs: any) => {
                          callback(rs)
                        })
                        .catch(() => {
                        })
                    }, 500)
                  }}
                />
              </Col>
            </Row>
          </Fragment>
        })
        }

        <Row className='gy-1 mb-1'>
          <Col md={6} xs={12}>
            <Row className="gy-1">
              <Col md={12} xs={12}>
                <SelectBox
                  control={control}
                  name="originId"
                  labelSize='label-medium'
                  label={t("Product origin")}
                  disabled={typeModal === 'Detail'}
                  isClearable
                  placeholder={t("")}
                  options={optionOrigin}
                />
              </Col>
              <Col md={12} xs={12}>
                <SelectBox
                  control={control}
                  name="brandId"
                  isClearable
                  isLabel={true}
                  labelSize='label-medium'
                  label={t("Product brand")}
                  disabled={typeModal === 'Detail'}
                  placeholder={t("")}
                  options={optionBrand}
                />
              </Col>
            </Row>
          </Col>
          <Col md={6} xs={12}>
            <Row className="gy-1">
              <Col md={12} xs={12}>
                <SelectBox
                  control={control}
                  name="manufacturerId"
                  isClearable
                  labelSize='label-medium'
                  label={t("Manufacturers")}
                  disabled={typeModal === 'Detail'}
                  placeholder={t("")}
                  options={optionManufacturer}
                  callback={(e: any) => setValue("manufacturerNumber", e.key)}
                />
              </Col>
              <Col md={12} xs={12}>
                <TextInput
                  control={control}
                  name='manufacturerNumber'
                  label={t('Manufacturer code')}
                  disabled={typeModal === 'Detail'}
                  required={false}
                  labelSize='label-medium d-flex form-row-inline'
                  placeholder='' />
              </Col>
            </Row>
          </Col>
          <Col md={12} xs={12}>
            <div className="d-flex form-row-inline label-medium">
              <Label className="form-label">{t("Classify")}</Label>
              <div className="form-input-content">
                <Controller
                  name='productTag'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <MultiSelectComponent
                      id="productTag"
                      value={value}
                      dataSource={optionTag}
                      fields={{ text: 'label', value: 'label' }}
                      allowCustomValue={true}
                      onChange={(val: any) => {
                        onChange(val)
                      }}
                      allowFiltering={true}
                      filtering={(val: any) => {
                        setFilterTag(val.text)
                      }}
                    />
                  )}
                />

              </div>
            </div>
          </Col>
        </Row>
      </div >
      <div className='box form-box__border mb-3'>
        <h5 className="m-0 form-box__border--title">{t('Sales information')}</h5>
        <Row className='gy-1 mb-1'>
          <Col md={6} xs={12}>
            <Row>
              <div className='d-flex'>
                <Col md={8} xs={8}>
                  <NumberInput
                    control={control}
                    name='productCost'
                    label={t('productCost')}
                    required={true}
                    placeholder=''
                    labelSize='label-medium'
                    errors={errors.productCost}
                  />
                </Col>
                <Col md={4} xs={4}>
                  <SelectBox
                    control={control}
                    name="currencyCost"
                    labelSize='label-small'
                    label={t("")}
                    isLabel={false}
                    errors={errors.currencyCost}
                    disabled={typeModal === 'Detail'}
                    placeholder={t("Currency")}
                    options={optionCurrency}
                  />
                </Col>
              </div>
            </Row>
          </Col>
          <Col md={6} xs={12}>
            <Row>
              <div className='d-flex'>
                <Col md={8} xs={8}>
                  <NumberInput
                    control={control}
                    name='price'
                    label={t('Sales cost')}
                    required={true}
                    placeholder=''
                    labelSize='label-medium'
                    errors={errors.price}
                  />
                </Col>
                <Col md={4} xs={4}>
                  <SelectBox
                    control={control}
                    name="currency"
                    labelSize='label-small'
                    label={t("")}
                    isLabel={false}
                    disabled={typeModal === 'Detail'}
                    required={true}
                    errors={errors.currency}
                    placeholder={t("Currency")}
                    options={optionCurrency}
                  />
                </Col>
              </div>
            </Row>
          </Col>
          <Col md={6} xs={12}>
            <div className='label-medium d-flex form-row-inline me-2' style={{ height: '28px' }}>
              <Label className="form-label" for='isTaxExempt'>{t('Tax exempt')}</Label>
              <div className='form-check me-1'>
                <Controller
                  name="isTaxExempt"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      checked={field.value}
                      id='isTaxExempt'
                      type='checkbox'
                      onClick={(val: any) => {
                        setHasTax(val.target.checked)
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </Col>
          <Col md={6} xs={12}>
            {!hasTax && <SelectBox
              control={control}
              name="taxCategoryId"
              labelSize='label-medium'
              isClearable
              label={t("Tax type")}
              disabled={typeModal === 'Detail'}
              errors={null}
              placeholder={t("")}
              options={optionTaxCategory}
            />}
          </Col>
          <Col md={6} xs={12}>
            <NumberInput
              control={control}
              name='orderMaximumQuantity'
              label={t('Purchase maximum quantity')}
              required={false}
              placeholder=''
              labelSize='label-medium'
            />
          </Col>
          <Col md={6} xs={12}>
            <NumberInput
              control={control}
              name='orderMinimumQuantity'
              label={t('Purchase minimum quantity')}
              required={false}
              placeholder=''
              labelSize='label-medium'
            />
          </Col>
        </Row>
      </div>
      {typeModal === 'Edit' && <div className='box form-box__border mb-3'>
        <h5 className="m-0 form-box__border--title">{t('Inventory and shipping')}</h5>
        <Row className='gy-1 mb-1'>
          <Col md={6} xs={12}>
            <SelectBox
              control={control}
              name="manageInventoryMethodId"
              labelSize='label-medium'
              label={t("Managing method")}
              // disabled={typeModal === 'Detail'}
              errors={null}
              placeholder={t("")}
              options={manageInventoryMethod}
            />
          </Col>
          {
            watch("manageInventoryMethodId") === 1 && <Col md={12} xs={12}>
              <div className='label-medium d-flex form-row-inline'>
                <Label className="form-label" for='isMultiWarehouse'>{t('Stock information')}</Label>
                <div style={{ width: 'calc(100% - 150px)' }}>
                  <TableMultiWarehouse
                    data={data}
                    setData={setData}
                    setValue={setValue}
                    getValues={getValues}
                    setTypeSubModal={setTypeSubModal}
                    setProductId={setProductId}
                  />
                </div>
              </div>
            </Col>
          }
          
        </Row>

        <Row className='gy-30 mb-1'>
          <Col md={12} xs={12}>
            <div className='label-medium d-flex form-row-inline me-2' style={{ height: '28px' }}>
              <Label className="form-label" for='MultiPacking'>{t('MultiPacking')}</Label>
              <div className='form-check me-1'>
                <Controller
                  name="multiPacking"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      checked={isNullOrUndefined(field.value) ? false : field.value}
                      id='MultiPacking'
                      type='checkbox'
                    />
                  )}
                />
              </div>
            </div>
          </Col>
          {watch('multiPacking') === true && <Col md={12} xs={12}>
            <div className='label-medium d-flex form-row-inline'>
              <Label className="form-label" for='isMultiWarehouse'>{t('Number of packages')}</Label>
              <div style={{ width: 'calc(100% - 150px)' }}>
                {isNullOrUndefined(watch('listPackage')) ? 0 : getValues('listPackage').length} {t('Package')}
              </div>
            </div>
          </Col>}
          {watch('multiPacking') === true ? <Col md={12} xs={12}>
            <div className='label-medium d-flex form-row-inline'>
              <Label className="form-label" for='isMultiWarehouse'>{t('')}</Label>
              <div style={{ width: 'calc(100% - 150px)' }}>
                <TablePackage control={control} errors={errors} />
              </div>
            </div>
          </Col> : <Col md={12} xs={12}>
            <div className='label-medium d-flex form-row-inline'>
              <Label className="form-label" for='MultiPacking'></Label>
              <div style={{ width: 'calc(100% - 150px)' }}>
                <div className='table-custom' style={{ border: 'none' }}>
                  <TableUseHookForm>
                    <table className='table table-custom'>
                      <thead className='table__row-header'>
                        <tr>
                          <td style={{ width: '25%' }} ><Label>{'W (g)'}</Label></td>
                          <td style={{ width: '25%' }} ><Label>{'W (mm)'}</Label></td>
                          <td style={{ width: '25%' }} ><Label>{'L (mm)'}</Label></td>
                          <td style={{ width: '25%' }} ><Label>{'H (mm)'}</Label></td>
                        </tr>
                      </thead>
                      <tbody className='table__row-body' style={{ maxHeight: '221px' }}>
                        <tr>
                          <td style={{ width: '25%' }}>
                            <NumberInput
                              control={control}
                              name='weight'
                              label={t('')}
                              isLabel={false}
                              placeholder=''
                              labelSize='label-medium'
                            />
                          </td>
                          <td style={{ width: '25%' }}>
                            <NumberInput
                              control={control}
                              name='width'
                              label={t('')}
                              isLabel={false}
                              placeholder=''
                              labelSize='label-medium'
                            />
                          </td>
                          <td style={{ width: '25%' }}>
                            <NumberInput
                              control={control}
                              name='length'
                              label={t('')}
                              isLabel={false}
                              placeholder=''
                              labelSize='label-medium'
                            />
                          </td>
                          <td style={{ width: '25%' }}>
                            <NumberInput
                              control={control}
                              name='height'
                              label={t('')}
                              isLabel={false}
                              placeholder=''
                              labelSize='label-medium'
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </TableUseHookForm>
                </div>
              </div>
            </div>
          </Col>}
        </Row>
        <Row className='gy-1 mb-1'>
          <Col md={6} xs={12}>
            <SelectBox
              control={control}
              name="deliveryTimeId"
              labelSize='label-medium'
              label={t("Delivery time")}
              // disabled={typeModal === 'Detail'}
              errors={null}
              placeholder={t("")}
              options={optionDelieveryTime}
            />
          </Col>
          <Col md={6} xs={12}>
            <div className='label-medium d-flex form-row-inline me-2' style={{ height: '28px' }}>
              <Label className="form-label" for='isMultiWarehouse'>{t('Free shipping')}</Label>
              <div className='form-check me-1'>
                <Controller
                  name="isFreeShipping"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      checked={field.value}
                      id='isFreeShipping'
                      type='checkbox'
                    />
                  )}
                />
              </div>
            </div>
          </Col>
          <Col md={3} xs={12}>
            <NumberInput
              control={control}
              name='additionalShippingCharge'
              label={t('Shipping fee from')}
              required={false}
              placeholder=''
              labelSize='label-medium'
            />
          </Col>
          <Col md={3} xs={12}>
            <SelectBox
              control={control}
              name='currency'
              label={t('Currency')}
              placeholder=''
              labelSize='label-small'
              options={optionCurrency}
            />
          </Col>
          <Col md={6} xs={12}>
            <div className='label-medium d-flex form-row-inline me-2' style={{ height: '28px' }}>
              <Label className="form-label" for='isMultiWarehouse'>{t('Can return')}</Label>
              <div className='form-check me-1'>
                <Controller
                  name="canReturn"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      checked={field.value}
                      id='canReturn'
                      type='checkbox'
                    />
                  )}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>}
    </Fragment >
  )
}

export default TabGeneralInfo
