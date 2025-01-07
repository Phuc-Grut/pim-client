import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
import classnames from "classnames"
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars"
import moment from "moment"
import {useRef} from "react"
const DatePickerCustom = ({ control, name, label, labelSeize, required, errors, disabled, ...props }: any) => {

  const dateRef: any = useRef()
  const onClick = () => {
    if (dateRef) {
      dateRef.current.show()
    }
  }
  return (
    <>
      <div
        className={classnames({
          [labelSeize]: labelSeize,
          'form-row-inline-error': errors
        })}
      >
        {
          (!disabled) ? (required ? <Label className="form-label" for={name}>
            {label} <span className="text-danger">*</span>
          </Label> : <Label className="form-label" for={name}>
            {label}  </Label>) : <Label className="form-label" style={{ fontWeight: "600" }} for={name}>
            {label}:
          </Label>
        }
        <div className='form-input-content'>
          {disabled ? <Controller
            name={name}
            control={control}
            render={({ field: { value } }) => (
              <div>
                {moment(value).format('MM/DD/yyyy')}
              </div>
            )}
          /> : <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePickerComponent
                ref={dateRef}
                onClick={onClick}
                openOnFocus={true}
                cssClass='sync-datepicker'
                value={value}
                id='end-picker'
                serverTimezoneOffset={0}
                className='form-control'
                onChange={(date: any) => onChange(date)}
                format='dd/MM/yyyy'
                {...props}
              />
            )}
          />
          }
          {errors && <FormFeedback>{errors.message}</FormFeedback>}
        </div>
      </div>
    </>
  )
}
export default DatePickerCustom
