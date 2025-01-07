import { Controller } from "react-hook-form"
import { Label, FormFeedback} from "reactstrap"
import classnames from "classnames"
import { Fragment, useEffect } from "react"
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs"
import { useTranslation } from "react-i18next"
import { isNullOrUndefined } from "@hooks/isNullOrUndefined"
import { L10n, loadCldr, setCurrencyCode, setCulture } from "@syncfusion/ej2-base"

interface IFormInput {
  control: any,
  name: string,
  label: string,
  labelSize?: any,
  required?: boolean,
  errors?: any,
  height?: number | string,
  disabled?: boolean,
  isLabel?: boolean,
  inLine?: boolean,
  placeholder?: string
  min?: number
  max?: number
  step?: number
  format?: string
  title?: string
  currency?: string
  callback?: any
}


const NumberInput = (props: IFormInput) => {
  const { t } = useTranslation()
  const lag = window.localStorage.getItem('i18nextLng')
  const lang = lag ? lag : 'vi'

  loadCldr()
  L10n.load(require(`@public/assets/data/locales/${lang}.json`)) // load corresponding culture text
  useEffect(() => {
    loadCldr(
      require('@src/assets/cldr-data/main/vi/currencies.json'),
      require("@src/assets/supplemental/numberingSystems.json"),
      require("@src/assets/supplemental/currencyData.json")
    )
    setCulture(lang) // Change the Grid culture
    setCurrencyCode(currency ? currency : 'VND')// Change the currency code
  }, [lang])

  const { control, name, label, labelSize, required, errors, disabled, isLabel, placeholder, min, max, step, format, inLine, callback, title, currency, ...rest } = props
  const renderLabel = () => {
    return (
      <Fragment>
        {isLabel === false ? '' : <Label className="form-label" title={title} for={name}>{t(label)} {required ? <span className="text-danger">*</span> : ''} </Label>}
      </Fragment>
    )
  }

  const renderInput = () => {
    return (
      <Fragment>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <NumericTextBoxComponent
              {...rest}
              format={format && value > 0 ? format : 'n0'}
              placeholder={placeholder}
              disabled={disabled}
              showSpinButton={false}
              currency={currency ? currency : undefined}
              min={min}
              max={max}
              value={ !isNullOrUndefined(value) ? value : 0}
              onChange={(val: any) => {
                onChange(val.target.value)
                if (callback) {
                  callback(val.target.value)
                }
              }}
              cssClass = { errors ? 'is-invalid' : ''}
              step={step ? step : 1}/>
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
        <div className={classnames('form-input-content numericTextBox-edit', { 'hidden-label': isLabel === false })}>

          {renderInput()}
        </div>
      </div>
    </Fragment>
  )
}

export default NumberInput