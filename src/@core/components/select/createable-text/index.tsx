import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
import classnames from "classnames"
import {Fragment, useState} from "react"
import {useTranslation} from "react-i18next"
import CreatableSelect from "react-select/creatable"

interface IFCreatableSelectBox {
  isMulti?: boolean,
  isLabel?: boolean,
  inLine?: boolean,
  control: any,
  placeholder?: string,
  name: string,
  label?: any,
  labelSize?: any,
  required?: boolean,
  errors?: any,
  cssClass?: string,
  isClearable?: boolean,
  labelComponent?: any,
  onInputChange?: any,
  callback?: any
  inputValue?: any
  onKeyDown?: any
  value?: any
  setValue?: any
}

const components = {
  DropdownIndicator: null
}

const createOption = (label: string) => ({
  label,
  value: label
})

interface Option {
  readonly label: string;
  readonly value: string;
}


const CreatableText = (props: IFCreatableSelectBox) => {
  const { t } = useTranslation()
  const {isLabel, control, placeholder, name, label, labelSize, required, errors, inLine, isClearable, setValue, value,  callback, ...rest } = props

  const [inputValue, setInputValue] = useState('')
  const [vals, setVals] = useState<readonly Option[]>(value ? value : [])

  const handleKeyDown = (event: any) => {
    if (!inputValue) { return }
    switch (event.key) {
    case 'Enter':
    case 'Tab':
      const val = [...vals, createOption(inputValue)]
      setValue(name, val)
      setVals((prev: any) => [...prev, createOption(inputValue)])
      setInputValue('')
      event.preventDefault()
    }
  }
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
            render={({ field: { value, onChange  } }) => (
              <CreatableSelect
                {...rest}
                components={components}
                inputValue={inputValue}
                isClearable={isClearable}
                isMulti
                placeholder={placeholder}
                classNamePrefix="select"
                className={`react-select ${errors && 'is-invalid'}`}
                menuIsOpen={false}
                onChange={(val: any) => {
                  onChange(val)
                  setVals(val)
                  if (callback) {
                    callback(val)
                  }
                }}
                onInputChange={(newValue) => setInputValue(newValue)}
                onKeyDown={handleKeyDown}
                value={value}
              />
            )}
          />
          {errors && <FormFeedback>{errors?.message}</FormFeedback>}
        </div>
      </div>
    </Fragment>
  )
}
export default CreatableText