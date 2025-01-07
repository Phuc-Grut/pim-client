import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
import classnames from "classnames"
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars"
import {Fragment, useRef} from "react"
import { useTranslation } from "react-i18next"
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
  max?: any
  isDetail?: boolean,
  inLine?: boolean,
}
const DateTimePickerInput = (props: IDatepicker) => {

  const { control, name, label, labelSize, required, errors, isLabel, min, max, isDetail, inLine, ...rest } = props
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
        className={classnames(inLine === false ? 'form-group ' : 'form-row-inline d-flex', {
          [labelSize]: labelSize,
          'form-row-inline-error': errors
        })}
      >
        {renderLabel()}
        <div className='form-input-content'>
          {isDetail ? '' : <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
              <DateTimePickerComponent
                ref={dateRef}
                onClick={onClick}
                openOnFocus={true}
                form={name}
                cssClass={classnames('sync-datepicker', errors ? 'is-invalid' : '')}
                value={value}
                serverTimezoneOffset={(new Date().getTimezoneOffset()) / (-60)}
                className='form-control'
                onChange={(date: any) => onChange(checkNull(date?.value) ? date.value : undefined)}
                format={themeConfig.system.dateTimeFormat}
                min={min}
                max={max}
                {...rest}
              />
            )}
          />}

          {errors && <FormFeedback>{errors?.message}</FormFeedback>}
        </div>
      </div>
    </Fragment>
  )
}
export default DateTimePickerInput
