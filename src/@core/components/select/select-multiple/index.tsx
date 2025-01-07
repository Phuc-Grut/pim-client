import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
import Select from "react-select"
import classnames from "classnames"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { isNullOrUndefined } from "@hooks/isNullOrUndefined"
//import themeConfig from "@configs/themeConfig"
interface IFSelectBox {
  control: any,
  name: string,
  placeholder?: string,
  disabled?: boolean,
  options: any[],
  label?: string,
  isLabel?: boolean,
  labelSize?: string,
  classes?: string,
  required?: boolean,
  errors?: any,
  isClearable?: boolean,
  labelComponent?: any,
  callback?: any,
  inLine?: boolean,
  menuPosition?: "fixed" | "absolute"
}

const SelectBox = (props: IFSelectBox) => {
  const { t } = useTranslation()
  const { control, placeholder, disabled, menuPosition, name, options, label, isLabel, labelSize, classes, required, errors, isClearable, labelComponent, callback, inLine, ...rest } = props
  const renderSelect = () => {
    return (
      <Fragment>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => {
            return <Select
              {...rest}
              value={(value?.length > 0) ? (value.map((x: any) => options.find((e: any) => e.value === x))) : ''}
              onChange={(val: any) => {
                onChange((!isNullOrUndefined(val)) ? val.map((item: any) => item.value) : undefined)
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
              isMulti={true}
              isDisabled={disabled}
              isClearable={isClearable}
              menuPosition={menuPosition ?? "fixed"}
              formatOptionLabel={labelComponent ? labelComponent : undefined}
            />
          }}
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
          [classes ? classes : '']: classes,
          'form-row-inline-error': errors
        }
        )}>

        {isLabel === false ? '' : <Label className="form-label" for={name}>{t(label ? label : '')} {required ? <span className="text-danger">*</span> : ''} </Label>}

        <div className={classnames('form-input-content', { 'hidden-label': isLabel === false })}>

          {renderSelect()}
        </div>
      </div>
    </Fragment>
  )
}
export default SelectBox