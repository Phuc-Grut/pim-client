import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
import classnames from "classnames"
import { DropDownTreeComponent } from "@syncfusion/ej2-react-dropdowns"
import './select-tree.scss'
import {Fragment} from "react"
import {useTranslation} from "react-i18next"

const SelectTreeCustom = (props: any) => {
  const { control, children, name, label, isLabel, labelSize, required, errors, options, typeModal, setValue, fieldValue, popupHeight, inLine, ...rest } = props
  const { t } = useTranslation()
  const field: Object = {
    dataSource: options,
    value: 'value',
    text: 'label',
    child: children
  }
  return (
    <Fragment>
      <div
        className={classnames(inLine === false ? 'form-group ' : 'form-row-inline d-flex', 'align', {
          [labelSize ? labelSize : '']: labelSize,
          'form-row-inline-error': errors}
        )}>
        {isLabel === false ? '' : <Label className="form-label" for={name}>{t(label)} {required ? <span className="text-danger">*</span> : ''} </Label>}

        <div className='form-input-content'>
          {typeModal === "Detail" ? <Controller
            name={name}
            control={control}
            render={({ field: { value } }) => (
              <div>
                {value ? options.find((val: any) => (fieldValue ? val[fieldValue] === value : val.value === value))?.label : "Chưa cập nhật"}
              </div>
            )}
          /> : <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
              <DropDownTreeComponent
                fields={field}
                cssClass="select-tree"
                value={options.find((val: any) => (fieldValue ? val[fieldValue] === value : val.value === value))}
                popupHeight={popupHeight}
                select={(val: any) => (setValue ? onChange((fieldValue ? val.itemData[fieldValue] : val.itemData.id), setValue(val.itemData.id)) : onChange((fieldValue ? val.itemData[fieldValue] : val.itemData.id)))}
                {...rest}
              />
            )}
          />
          }
          {errors && <FormFeedback>{errors.message}</FormFeedback>}
        </div>
      </div>
    </Fragment>
  )
}
export default SelectTreeCustom
