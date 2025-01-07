import {forwardRef, Fragment} from "react"
import {Col, Input, Label, Row} from "reactstrap"
import {useTranslation} from "react-i18next"
import classnames from "classnames"
import {DatePickerComponent} from "@syncfusion/ej2-react-calendars"
import themeConfig from "@configs/themeConfig"

const DynamicForm = forwardRef((props: any, ref: any) => {
  const format = themeConfig.system.dateFormat
  const { t } = useTranslation()
  const {value, onFormChange, labelSize, ...rest} = props
  const moreInfo = value ? JSON.parse(value) : []


  const onChange = (index: any, val: any) => {
    const data: any = [...moreInfo]
    data[index].value = val.target.value
    onFormChange(JSON.stringify(data))
  }

  const renderFormElement = (item: any, index: number) => {
    switch (item.type) {
    case 'select' : 
      return (
        <Fragment></Fragment>
      )
    case 'date' :
      return (
        <Fragment>
          <DatePickerComponent
            openOnFocus={true}
            cssClass='sync-datepicker'
            value={item.value}
            id={`end-picker-${index}`}
            serverTimezoneOffset={0}
            className= 'form-control'
            onChange={(val: any) => onChange(index, val)}
            format= {format}
          />
        </Fragment>
      )
    default :
      return (
        <Fragment>
          <Input
            type={item.type}
            value={item.value}
            onChange={(val: any) => onChange(index, val)}
          />
        </Fragment>
      )
    }
  }
  return (
    <Fragment>
      <div {...rest} ref={ref} className='box form-box__border'>
        <h5 className="m-0 form-box__border--title">{t('Other information')}</h5>
        <Row className='gy-1 mb-1'>
          {moreInfo.map((item: any, index: number) => {
            return (
              <Col xs={12} key={index}>
                <div
                  className={classnames('d-flex form-row-inline align', {
                    [labelSize]: labelSize
                  })}
                >
                  <Label className="form-label" for={item.name} style={{width: '5px'}}>
                    {item.label}
                  </Label>
                  <div className='form-input-content'>
                    {renderFormElement(item, index)}

                  </div>
                </div>

              </Col>
            )
          })}
        </Row>
      </div>
    </Fragment>
  )
})

export default DynamicForm