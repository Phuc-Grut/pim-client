import { Label, FormFeedback } from "reactstrap"
import classnames from "classnames"
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars"
import {Fragment, useRef} from "react"
import { useTranslation } from "react-i18next"
interface IDatepicker {
  label: string,
  startDate: string,
  endDate: string,
  labelSize?: any,
  watch?: any,
  setValue?: any,
  required?: boolean,
  errors?: any,
  isLabel?: boolean
  inLine?: boolean
}
const DateRangePickerInput = (props: IDatepicker) => {

  const { watch, startDate, endDate, label, labelSize, required, errors, isLabel, setValue, inLine, ...rest } = props
  const { t } = useTranslation()
  const dateRef: any = useRef()
  const renderLabel = () => {
    return (
      <Fragment>
        {isLabel === false ? '' : <Label className="form-label" for={startDate}>{t(label)} {required ? <span className="text-danger">*</span> : ''} </Label>}
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
        <div
          className='form-input-content'
        >
          <DateRangePickerComponent
            ref={dateRef}
            onClick={onClick}
            startDate={watch(startDate)}
            className={`w-100`}
            cssClass={classnames('sync-datepicker', errors ? 'is-invalid' : '')}
            serverTimezoneOffset={0}
            endDate={watch(endDate)}
            onChange={(e: any) => {
              if (e.value) {
                setValue(startDate, new Date(Date.UTC(e.value[0] ? e.value[0]?.getFullYear() : 0, e.value[0] ? e.value[0]?.getMonth() : 0, e.value[0] ? e.value[0]?.getDate() : 0)))
                setValue(endDate, (new Date(Date.UTC(e.value[1] ? e.value[1]?.getFullYear() : 0, e.value[1] ? e.value[1]?.getMonth() : 0, e.value[1] ? e.value[1]?.getDate() : 0))))
              } else {
                setValue(startDate, undefined)
                setValue(endDate, undefined)
              }
            }}
            change={(e: any) => {
              if (e.value) {
                setValue(startDate, new Date(Date.UTC(e.value[0] ? e.value[0]?.getFullYear() : 0, e.value[0] ? e.value[0]?.getMonth() : 0, e.value[0] ? e.value[0]?.getDate() : 0)))
                setValue(endDate, (new Date(Date.UTC(e.value[1] ? e.value[1]?.getFullYear() : 0, e.value[1] ? e.value[1]?.getMonth() : 0, e.value[1] ? e.value[1]?.getDate() : 0))))
              } else {
                setValue(startDate, undefined)
                setValue(endDate, undefined)
              }
            }}
            {...rest}
          />
          {errors && <FormFeedback>{errors?.message}</FormFeedback>}
        </div>
      </div>
    </Fragment>
  )
}
export default DateRangePickerInput
