import { Controller } from "react-hook-form"
import {Input, Label} from "reactstrap"
import classnames from "classnames"
import {Fragment} from "react"
import {useTranslation} from "react-i18next"

interface IRadioOptions {
  value: any,
  label: string
}

interface IFFormInput {
  control: any,
  name: string,
  label: string,
  labelSize: string,
  height?: number | string,
  disabled?: boolean,
  isLabel?: boolean,
  inLine?: boolean,
  buttonInline?: boolean,
  radioOptions: IRadioOptions[]
}
const RadioInput = (props: IFFormInput) => {
  const { t } = useTranslation()
  const { control, name, label, labelSize, isLabel, radioOptions, inLine, buttonInline, disabled } = props

  const renderLabel = () => {
    return (
      <Fragment>
        {isLabel === false ? '' : <Label className={classnames('form-label', buttonInline === false ? ' ' : ' text-left mb-50')} for={name}>{label}</Label>}
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
            <div className={buttonInline ? 'd-flex w-100' : ''}>
              {radioOptions?.map((item: IRadioOptions, index:number) => {
                return (
                  <div className="d-flex" key={index}>
                    <Input
                      disabled={disabled}
                      type="radio"
                      className="me-1"
                      style={buttonInline ? {} : {marginLeft: index === 0 ? '0px' : '50px'}}
                      checked={value === item.value}
                      onChange={() => onChange(item.value)} />
                    <span style={{marginRight: '10px'}}>{t(item.label)}</span>
                  </div>
                )
              })}
            </div>
          )}
        />
      </Fragment>
    )

  }
  return (
    <Fragment>
      <div
        className={classnames(' align', {
          [labelSize ? labelSize : '']: labelSize
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

export default RadioInput