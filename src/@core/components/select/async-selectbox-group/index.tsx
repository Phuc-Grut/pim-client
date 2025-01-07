import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
import AsyncSelect from "react-select/async"
import classnames from "classnames"
import { isNullOrUndefined } from "@hooks/isNullOrUndefined"
import {Fragment} from "react"
import {useTranslation} from "react-i18next"

interface IAsyncSelectBoxGroup {
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
  isClearable?: boolean
  errors?: any,
  cssClass?: string
  callback?: any
  handleGroupClick?: any
  iconGroup?: any
}
const AsyncSelectBoxGroup = (props: IAsyncSelectBoxGroup) => {
  const { t } = useTranslation()
  const {isMulti, isLabel, labelComponent, defaultOptions, loadOptions, control, placeholder, disabled, name, label, labelSize, required, errors, inLine, callback, isClearable, handleGroupClick, iconGroup, ...rest } = props

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
              <Fragment>
                <div className='d-flex select-group'>
                  <AsyncSelect
                    {...rest}
                    value={(!isNullOrUndefined(value) && value !== '' && (isMulti ? value?.length > 0 : true)) ? defaultOptions.find((val: any) => val.value === value) : ''}
                    onChange={(val: any) => {
                      onChange((val && isMulti) ? val.map((item: any) => item.value) : (val && !isMulti) ? val.value : undefined)
                      if (callback) {
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
                    menuPosition="fixed"
                    loadOptions={loadOptions}
                    cacheOptions
                    defaultOptions={defaultOptions}
                    formatOptionLabel={labelComponent ? labelComponent : undefined}
                  />
                  <span onClick={handleGroupClick} className='input-group-text'>
                    {iconGroup}
                  </span>
                </div>
              </Fragment>

            )}
          />
          {errors && <FormFeedback>{errors?.message}</FormFeedback>}
        </div>
      </div>
    </Fragment>
  )
}
export default AsyncSelectBoxGroup