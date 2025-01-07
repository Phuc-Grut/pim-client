import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
import classnames from "classnames"
import AsyncSelect from 'react-select/async'

const AsyncSelectBox = ({
  control, callback, placeholder, isDisabled, name, label, labelSize, required, errors, classname, isClearable, isMulti, loadOptions,
  ...props
}: any) => {
  return (
    <>
      <div
        className={classname === undefined ? classnames('d-flex form-row-inline align', {
          [labelSize]: labelSize,
          'form-row-inline-error': errors
        }) : classnames({ [classname]: classname }, {
          [labelSize]: labelSize,
          'form-row-inline-error': errors
        })}
      >
        {label && <Label className="form-label" for={name}>
          {label} {required && <span className="text-danger">*</span>}
        </Label>}
        <div className='form-input-content'>
          <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <AsyncSelect
                  {...props}
                  value={value}
                  onChange={(val: any) => {
                    onChange(val)
                    if (callback) {
                      callback(val)
                    }
                  }}
                  isMulti={isMulti}
                  placeholder={placeholder}
                  classNamePrefix="select"
                  className={`react-select ${errors && 'is-invalid'}`}
                  defaultOptions
                  loadOptions={loadOptions}
                  cacheOptions
                  isDisabled={isDisabled}
                  menuPosition='fixed'
                  isClearable={isClearable}
                />
              )
            } }
          />
          {errors && <FormFeedback>{errors?.message}</FormFeedback>}
        </div>
      </div>
    </>
  )
}
export default AsyncSelectBox
