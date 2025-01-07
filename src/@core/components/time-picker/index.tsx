import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
import classnames from "classnames"
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars"
import { Fragment } from "react"
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
  step?: number
  widthLabel?: number
  max?: any
  isDetail?: boolean
}
const TimePickerInput = (props: IDatepicker) => {

  const { control, name, label, labelSize, required, errors, isLabel, min, max, isDetail, step, widthLabel, ...rest } = props
  const { t } = useTranslation()

  const checkNull = (d: any) => {
    if (d === null || d === undefined) {
      return false
    }
    return true
  }

  const renderLabel = () => {
    return (
      <Fragment>
        {isLabel === false ? '' : <Label className="form-label" style={{ width: `${widthLabel}px` }} for={name}>{t(label)} {required ? <span className="text-danger">*</span> : ''} </Label>}
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div
        className={classnames('d-flex form-row-inline', {
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
              <TimePickerComponent
                openOnFocus={true}
                form={name}
                cssClass={classnames('sync-datepicker', errors ? 'is-invalid' : '')}
                value={value}
                className='form-control'
                onChange={(date: any) => onChange(checkNull(date?.value) ? date.value : undefined)}
                format={themeConfig.system.timeFormat}
                step={step}
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
export default TimePickerInput