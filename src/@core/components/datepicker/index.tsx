import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
import classnames from "classnames"
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars"
import {Fragment, useRef} from "react"
import {useTranslation} from "react-i18next"
import themeConfig from "@configs/themeConfig"
interface IDatepicker {
  control: any,
  name: string,
  label: string,
  labelSize?: any,
  required?: boolean,
  errors?: any,
  isLabel?: boolean
  min?: any
  max?: any,
  inLine?: boolean
}
const DatePickerInput = (props: IDatepicker) => {

  const { control, name, label, labelSize, required, errors, isLabel, min, max, inLine, ...rest } = props
  const { t } = useTranslation()
  const dateRef: any = useRef()
  const checkNull = (d: any) => {
    if (d === null || d === undefined) {
      return false
    }
    return true
  }

  const renderLabel = () => {
    return (
      <Fragment>
        {isLabel === false ? '' : <Label className="form-label" for={name}>{t(label)} {required ? <span className="text-danger">*</span> : ''} </Label>}
      </Fragment>
    )
  }
  const onClick = () => {
    if (dateRef) {
      dateRef.current.show()
    }
  }
  return (
    <Fragment>
      <div
        className={classnames(' align', {
          [labelSize]: labelSize,
          'form-row-inline-error': errors
        }, inLine === false ? 'form-group ' : 'form-row-inline d-flex')}
      >
        {renderLabel()}
        <div className='form-input-content'>
          <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePickerComponent
                ref={dateRef}
                onClick={onClick}
                openOnFocus={true}
                form={name}
                cssClass = {classnames('sync-datepicker', errors ? 'is-invalid' : '')}
                value={value}
                serverTimezoneOffset={0}
                className= 'form-control'
                onChange={(date: any) => onChange(checkNull(date?.value) ? date.value : undefined)}
                format= {themeConfig.system.dateFormat}
                min={min}
                max={max}
                {...rest}
              />
            )}
          />
          {errors && <FormFeedback>{errors?.message}</FormFeedback>}
        </div>
      </div>
    </Fragment>
  )
}
export default DatePickerInput
