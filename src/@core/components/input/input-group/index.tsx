import { Controller } from "react-hook-form"
import { Input, Label, FormFeedback, InputGroup, InputGroupText } from "reactstrap"
import classnames from "classnames"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { InputType } from "reactstrap/types/lib/Input"
import { isNullOrUndefined } from "@hooks/isNullOrUndefined"

// type InputType = 'text' | 'textarea' | 'email' | 'number'

interface IFFormInput {
  control: any,
  name: string,
  type?: InputType,
  label: string,
  labelSize?: string,
  required?: boolean,
  errors?: any,
  height?: number | string,
  disabled?: boolean,
  row?: number,
  isLabel?: boolean,
  inLine?: boolean,
  autoFocus?: boolean,
  placeholder?: string,
  callback?: any
  readOnly?: boolean,
  handleGroupClick?: any,
  iconGroup?: any
}
const TextInputGroup = (props: IFFormInput) => {
  const { t } = useTranslation()
  const { control, name, type, label, labelSize, required, errors, height, disabled, row, isLabel, placeholder, autoFocus, inLine, callback, readOnly, handleGroupClick, iconGroup, ...rest } = props

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
          render={({ field: { value, onChange } }) => (
            <InputGroup className=''>

              <Input
                value={!isNullOrUndefined(value) ? value : ''}
                onChange={(val: any) => {
                  onChange(val.target.value)
                  if (callback) {
                    callback(val)
                  }
                }}
                style={{ height: `${height}px` }}
                autoFocus={autoFocus}
                disabled={disabled}
                placeholder={placeholder}
                type={type ? type : 'text'}
                invalid={errors && true}
                rows={row}
                {...rest}
                readOnly={readOnly}
              />
              <InputGroupText className='cursor-pointer' onClick={handleGroupClick}>
                {iconGroup}
              </InputGroupText>
            </InputGroup>

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
        <div className={classnames('form-input-content', { 'hidden-label': isLabel === false })}>
          {renderInput()}
        </div>
      </div>
    </Fragment>
  )
}

export default TextInputGroup