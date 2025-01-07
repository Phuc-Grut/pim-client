import { Controller } from "react-hook-form"
import { Label, FormFeedback} from "reactstrap"
import classnames from "classnames"
import {Fragment} from "react"
import InputNumber from "rc-input-number"
import {Minus, Plus} from "becoxy-icons"
import {useTranslation} from "react-i18next"
import {isNullOrUndefined} from "@hooks/isNullOrUndefined"

interface IFormInput {
  control: any,
  name: string,
  label: string,
  labelSize: string,
  required?: boolean,
  errors?: any,
  // height?: number | string,
  disabled?: boolean,
  isLabel?: boolean,
  inLine?: boolean,
  placeholder?: string
  min?: number
  max?: number
  callback?: any
}
const NumberInputCustom = (props: IFormInput) => {
  const { t } = useTranslation()
  const { control, name, label, labelSize, required, errors, disabled, isLabel, placeholder, min, max, inLine, callback, ...rest } = props

  const renderLabel = () => {
    return (
      <Fragment>
        {isLabel === false ? '' : <Label className="form-label" for={name}>{t(label)} {required ? <span className="text-danger">*</span> : ''} </Label>}
      </Fragment>
    )
  }

  const renderInput = () => {
    return (
      <Fragment>
        <Controller
          name={name}
          control={control}
          render={({ field: {value, onChange} }) => (
            <InputNumber
              {...rest}
              value={ !isNullOrUndefined(value) ? value : 0}
              onChange={(val: any) => {
                onChange(val.target.value)
                if (callback) {
                  callback(val.target.value)
                }
              }}
              upHandler={<Plus />}
              downHandler={<Minus />}
              min={min}
              max={max}
              placeholder={placeholder}
              disabled={disabled}
            />
          )}
        />
        {errors && <FormFeedback>{errors?.message}</FormFeedback>}
      </Fragment>
    )

  }
  return (
    <Fragment>
      <div
        className={classnames(' align', {
          [labelSize ? labelSize : '']: labelSize,
          'form-row-inline-error': errors
        }, inLine === false ? 'form-group ' : 'form-row-inline d-flex'
        )}
      >
        {renderLabel()}
        <div className={classnames('form-input-content', {'hidden-label': isLabel === false})}>

          {renderInput()}
        </div>
      </div>
    </Fragment>
  )
}

export default NumberInputCustom