import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
import Select from "react-select"
import classnames from "classnames"
import {Fragment} from "react"
import {useTranslation} from "react-i18next"
import {isNullOrUndefined} from "@hooks/isNullOrUndefined"
//import themeConfig from "@configs/themeConfig"

interface IFSelectBoxGroup {
  control: any,
  name: string,
  placeholder?: string,
  disabled?: boolean,
  options: any[],
  label?: string,
  isLabel?: boolean,
  inLine?: boolean,
  labelSize?: string,
  required?: boolean,
  errors?: any,
  isMulti?: boolean,
  isClearable?: boolean,
  labelComponent?: any,
  callback?: any,
  typeModal?: string
  handleGroupClick?: any
  iconGroup: any
}
const SelectBoxGroup = (props: IFSelectBoxGroup) => {
  const { t } = useTranslation()
  const {control, placeholder, disabled, name, options, label, isLabel, inLine, labelSize, required, errors, isMulti, isClearable, labelComponent, handleGroupClick, iconGroup, callback, ...rest } = props

  const renderSelect = () => {
    return (
      <Fragment>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Fragment>
              <div className='d-flex select-group'>
                <Select
                  {...rest}
                  // value={options.find((val: any) => val.value === value)}
                  value={(!isNullOrUndefined(value) && value !== '' && (isMulti ? value?.length > 0 : true)) ? options.find((val: any) => val.value === value) : ''}
                  onChange={(val: any) => {
                    onChange((val && isMulti) ? val.map((item: any) => item.value) : (val && !isMulti) ? val.value : undefined)
                    if (callback) {
                      callback(val)
                    }
                  }}
                  form={name}
                  placeholder={placeholder}
                  classNamePrefix="select"
                  className={`react-select ${errors && 'is-invalid'}`}
                  //styles={{ menuPortal: base => ({ ...base, zIndex: themeConfig.selectZIndex }) }}
                  options={options}
                  isMulti={isMulti}
                  isDisabled={disabled}
                  isClearable={isClearable}
                  menuPosition="fixed"
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
      </Fragment>
    )
  }
  
  return (
    <Fragment>
      <div
        className={classnames(inLine === false ? 'form-group ' : 'form-row-inline d-flex', 'align', {
          [labelSize ? labelSize : '']: labelSize,
          'form-row-inline-error': errors}
        )}>

        {isLabel === false ? '' : <Label className="form-label" for={name}>{t(label ? label : '')} {required ? <span className="text-danger">*</span> : ''} </Label>}

        <div className={classnames('form-input-content', {'hidden-label': isLabel === false})}>

          { renderSelect()}
        </div>
      </div>
    </Fragment>
  )
}
export default SelectBoxGroup