import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
import classnames from "classnames"
import { Minus, Plus } from "becoxy-icons"
import InputNumber from "rc-input-number"
const InputNumberCustom = ({ control, name, label, labelSeize, required, errors, typeModal, ...props }: any) => {
  return (
    <>
      <div
        className={classnames({
          [labelSeize]: labelSeize,
          'form-row-inline-error': errors
        })}
      >
        {
          (typeModal !== "Detail") ? (required ? <Label className="form-label" for={name}>
            {label} <span className="text-danger">*</span>
          </Label> : <Label className="form-label" for={name}>
            {label}  </Label>) : <Label className="form-label" style={{ fontWeight: "600" }} for={name}>
            {label}:
          </Label>
        }
        <div className='form-input-content'>
          {typeModal === "Detail" ? <Controller
            name={name}
            control={control}
            render={({ field: { value } }) => (
              <div>
                {value ? value : "Chưa cập nhật"}
              </div>
            )}
          /> : <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <InputNumber
                upHandler={<Plus />}
                downHandler={<Minus />}
                disabled={typeModal === "Detail"}
                {...props}
                {...field}
              />
            )}
          />}
          {errors && <FormFeedback>{errors?.message}</FormFeedback>}
        </div>
      </div>
    </>
  )
}
export default InputNumberCustom