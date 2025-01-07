// ** Third Party Components
import { X } from 'becoxy-icons'
import classnames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'

import { Button, Col, Row, Form, Label, Input } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { IContext, ProductAttributeContext } from '../useContext'
import { Controller, useForm } from 'react-hook-form'
import { Fragment, useContext, useEffect } from 'react'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { NumberInput, TextInput } from '@components/input'
import { isObjEmpty } from '@src/utility/Utils'

const SideOption = () => {

  // ** Props
  const { t } = useTranslation()
  const { setDataTableDetail, dataSidebar, typeMo, dataTableDetail, setDataSidebar, windowSize, indexRow, setIndexRow, openSidebar, handleSidebar } = useContext<IContext>(ProductAttributeContext)

  const defaultValues: any = {
    name: '',
    alias: '',
    priceAdjustment: 0,
    weightAdjustment: 0,
    isPreSelected: false,
    color: '',
    displayOrder: 1
  }
  const mapObject = (dataEdit: any, list: any, index: any) => {
    for (const [k, v] of Object.entries(dataEdit)) {
      list[index][k] = v
    }
    return list
  }
  const formSchema = yup.object().shape({
    name: yup.string().required()
  })
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<any>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })

  useEffect(() => {
    if (openSidebar === false) {
      reset()
      clearErrors()
      setDataSidebar({})
    } else {
      if (!isObjEmpty(dataSidebar)) {
        setTimeout(() => {
          Object.entries(dataSidebar).forEach(
            ([name, value]: any) => {
              if (name !== null) {
                setValue(name, value)
              }
            }
          )
        }, 200)
      } else {
        reset()
        clearErrors()
        setDataSidebar({})
      }
    }
  }, [openSidebar, indexRow])

  const onSubmit = async (data: any) => {
    if (typeMo['Sidebar']?.value === 'Add') {
      setDataTableDetail((old: any) => [...old, data])
    } else {
      const news = mapObject(data, [...dataTableDetail], indexRow)
      await setDataTableDetail([])
      await setDataTableDetail([...news])

      //dataTableDetail.updateRow(rowIndex, rowData)
      // const news = dataTableDetail.filter((a: any) => a.code === data.code)
      // setDataTableDetail([...news, data])
    }
    setIndexRow(null)
    setDataSidebar({})
    clearErrors()
    reset()
  }
  const render = () => {
    if (typeMo['Sidebar']?.value === 'Add' || typeMo['Sidebar']?.value === 'Edit') {
      return <div
        className={classnames('customizer customizer-400', {
          open: openSidebar
        })}
      >
        <Form
          id='form-detail'
          className='todo-modal'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='customizer-header p-50 position-relative bb-1'>
            <X onClick={handleSidebar} fontSize={16} /> {t('Select Option')}
            <hr />
          </div>
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMax={windowSize.innerHeight - 0}>
            <div className='modal-body flex-grow-1 pb-sm-0 pb-3 '>
              <section>
                <Row className="m-0 gy-1 mb-2 me-1">
                  <Col md={12} xs={12}>
                    <TextInput
                      control={control}
                      name='name'
                      label={t('Name')}
                      required={true}
                      labelSize='label-small'
                      errors={errors.name}
                      inLine={false}
                    />
                  </Col>
                  <Col md={12} xs={12}>
                    <TextInput
                      control={control}
                      name='alias'
                      label={t('Alias')}
                      required={true}
                      labelSize='label-small'
                      errors={errors.alias}
                      inLine={false}
                    />
                  </Col>
                  <Col md={12} xs={12}>
                    <NumberInput
                      control={control}
                      name='priceAdjustment'
                      label={t('PriceAdjustment')}
                      labelSize='label-small'
                      errors={errors.priceAdjustment}
                      inLine={false}
                    />
                  </Col>
                  <Col md={12} xs={12}>
                    <NumberInput
                      control={control}
                      name='weightAdjustment'
                      label={t('WeightAdjustment')}
                      labelSize='label-small'
                      errors={errors.priceAdjustment}
                      inLine={false}
                    />
                  </Col>
                  <Col md={12} xs={12}>
                    <Label className='form-label'>
                      <span>{t('ColorRGB')}</span>
                    </Label>
                    <div className='form-input-content'>
                      <Row>
                        <Col md={10} xs={12}>
                          <Controller
                            name='color'
                            control={control}
                            render={({ field: { onChange, value, ...props } }) => (
                              <Input
                                {...props}
                                type='text'
                                value={value}
                                onChange={(e: any) => onChange(e.target.value)}
                              />
                            )}
                          />
                        </Col>
                        <Col md={2} xs={12}>
                          <Controller
                            name='color'
                            control={control}
                            render={({ field: { onChange, value, ...props } }) => (
                              <Input
                                {...props}
                                type='color'
                                value={value}
                                onChange={(e: any) => onChange(e.target.value, console.log(e.target.value))}
                              />
                            )}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col md={12} xs={12}>
                    <TextInput
                      control={control}
                      name='displayOrder'
                      type='number'
                      label={t('Display order')}
                      labelSize='label-small'
                      errors={errors.priceAdjustment}
                      inLine={false}
                    />
                  </Col>
                  {/* <Col md={12} xs={12}>
                    <TextInput
                      control={control}
                      name='isPreSelected'
                      label={t('IsPreSelected')}
                      type='checkbox'
                      labelSize='label-small'
                    />
                  </Col> */}
                </Row>
              </section>
            </div>
          </Scrollbars>

          <div
            className="d-flex justify-content-end p-1"
            style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}>
            <Fragment>
              <Button color='primary' className='add-todo-item me-1'>
                {t('Save')}
              </Button>
              <Button color='secondary' onClick={handleSidebar} outline>
                {t('Close')}
              </Button>
            </Fragment>
          </div>
        </Form>
      </div>
    } else if (typeMo['Sidebar']?.value === 'View') {
      return <div className='modal-detail'>
        <div
          className={classnames('customizer customizer-400', {
            open: openSidebar
          })}
        >
          <Scrollbars autoHide
            autoHeight
            autoHeightMax={windowSize.innerHeight - 0}>
            <div className='customizer-header p-50 position-relative bb-1'>
              <h4 className='mb-0'>{t('')}</h4>
              <X onClick={handleSidebar} />
            </div>
            <div className='modal-body flex-grow-1 pb-sm-0 pb-3'>
              <section>
                <Row className='gy-20 mb-1'>
                </Row>
              </section>

            </div>
            <div className='customizer-footer px-2 pt-1 pb-0 position-relative'>
              <Fragment>
                <Button color='secondary' onClick={handleSidebar} outline>
                  {t('Close')}
                </Button>
              </Fragment>
            </div>
          </Scrollbars>
        </div>
      </div>
    } else {
      return <></>
    }
  }
  return render()
}

export default SideOption