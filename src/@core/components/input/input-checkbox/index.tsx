import { Controller } from "react-hook-form"
import {Input, Label} from "reactstrap"
import classnames from "classnames"
import {Fragment} from "react"
import {useTranslation} from "react-i18next"

interface IFormInput {
  control: any,
  name: string,
  label: string,
  labelSize?: string,
  disabled?: boolean,
  callback?: any,
  isLabel?: boolean,
  inLine?: boolean
  reverse?: boolean
}
const CheckboxInput = (props: IFormInput) => {
  const { t } = useTranslation()
  const { control, name, label, labelSize, disabled, callback, isLabel, inLine, reverse, ...rest } = props

  const renderLabel = () => {
    return (
      <Fragment>
        {isLabel === false ? '' : <Label className="form-label" for={name}>{t(label)} </Label>}
      </Fragment>
    )
  }

  const renderInput = () => {
    return (
      <Fragment>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, ...props } }) => (
            <Input
              {...rest}
              {...props}
              type='checkbox'
              disabled={disabled}
              checked={value}
              // onChange={(e: any) => (setValue ? onChange(e.target.checked, setValue(e.target.checked)) : onChange(e.target.checked))}
              onChange={(val: any) => {
                onChange(val.target.checked)
                if (callback) {
                  callback(val.target.checked)
                }
              }}
            />
          )}
        />
      </Fragment>
    )
  }
  return (
    <Fragment>
      <div
        className={classnames(inLine === false ? 'form-group ' : 'form-row-inline d-flex', {
          [labelSize ? labelSize : '']: labelSize,
          reverse
        }
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

export default CheckboxInput