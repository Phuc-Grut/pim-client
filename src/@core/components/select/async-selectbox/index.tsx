import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
import AsyncSelect from "react-select/async"
import classnames from "classnames"
import { isNullOrUndefined } from "@src/utility/hooks/isNullOrUndefined"
import {Fragment} from "react"
import {useTranslation} from "react-i18next"

interface IAsyncSelectBox {
  name: string,
  control: any,
  // options: any[],
  isMulti?: boolean,
  isLabel?: boolean,
  inLine?: boolean,
  labelComponent?: any,
  defaultOptions: any[],
  loadOptions?: any,
  placeholder?: string,
  disabled?: boolean,
  label?: any
  labelSize?: any
  required?: boolean
  errors?: any,
  cssClass?: string
  callback?: any
  isClearable?: boolean,
}
const AsyncSelectBox = (props: IAsyncSelectBox) => {
  const { t } = useTranslation()
  const {
    isMulti, isLabel, labelComponent, defaultOptions, loadOptions, control, placeholder, disabled, 
    name, label, labelSize, required, errors, inLine, callback, isClearable, ...rest 
  } = props

  return (
    <Fragment>
      <div
        className={classnames(inLine === false ? 'form-group ' : 'form-row-inline d-flex', 'align', {
          [labelSize ? labelSize : '']: labelSize,
          'form-row-inline-error': errors}
        )}>

        {isLabel === false ? '' : <Label className="form-label" for={name}>{t(label)} {required ? <span className="text-danger">*</span> : ''} </Label>}

        <div className={classnames('form-input-content', {'hidden-label': isLabel === false})}>

          <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
              <AsyncSelect
                {...rest}
                value={(!isNullOrUndefined(value) && value !== '' && (isMulti ? value?.length > 0 : true)) ? defaultOptions.find((val: any) => val.value === value) : ''}
                // value={value}
                // onChange={onChange}
                onChange={(val: any) => {
                  onChange((val && isMulti) ? val.map((item: any) => item.value) : (val && !isMulti) ? val.value : undefined)
                  //edit by sontd
                  if (callback && value !== val.value) {
                    callback(val)
                  }
                }}
                isClearable={isClearable}
                isMulti={isMulti}
                placeholder={placeholder}
                classNamePrefix="select"
                className={`react-select ${errors && 'is-invalid'}`}
                // options={defaultOptions}

                isDisabled={disabled}
                // menuPosition="fixed"
                loadOptions={loadOptions}
                cacheOptions
                defaultOptions={defaultOptions}
                formatOptionLabel={labelComponent ? labelComponent : undefined}
              />
            )}
          />
          {errors && <FormFeedback>{errors?.message}</FormFeedback>}
        </div>
      </div>
    </Fragment>
  )
}
export default AsyncSelectBox