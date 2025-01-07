import { Controller } from "react-hook-form"
import { Label, FormFeedback, Row, Col } from "reactstrap"
import classnames from "classnames"
import CreatableSelect from 'react-select/creatable'
import { useTranslation } from "react-i18next"
const SelectLocation = ({ control,
  ward,
  district,
  province,
  country,
  optionCountry,
  optionProvince,
  optionDistrict,
  optionWard,
  setCountry,
  setProvince,
  setDistrict,
  setWard,
  label,
  labelSeize,
  required,
  errors,
  disabled,
  fieldValue,
  ...props }: any) => {
  const { t } = useTranslation()
  return (
    <>
      <div
        className={classnames({
          [labelSeize]: labelSeize,
          'form-row-inline-error': errors
        })}
      >
        {
          (disabled) ? <Label className="form-label" style={{ fontWeight: "600" }}>
            {label}:
          </Label> : (required ? <Label className="form-label">
            {label} <span className="text-danger">*</span>
          </Label> : <Label className="form-label">
            {label}  </Label>)
        }
        <div className='form-input-content'>
          {disabled ? <></> : <Row className="gy-1">
            <Col md={3} xs={12} >
              <Controller
                name={country}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CreatableSelect
                    styles={{ height: "100px" }}
                    value={optionCountry.find((val: any) => (fieldValue ? val[fieldValue] === value : val.value === value))}
                    onChange={(val: any) => (setCountry ? onChange((fieldValue ? val[fieldValue] : val.value), setCountry(val)) : onChange((fieldValue ? val[fieldValue] : val.value)))}
                    classNamePrefix="select"
                    className='react-select'
                    options={optionCountry}
                    placeholder={t('Country')}
                    menuPosition='fixed'
                    {...props}
                  />
                )}
              />
            </Col>
            <Col md={3} xs={12} >
              <Controller
                name={province}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CreatableSelect
                    styles={{ height: "100px" }}
                    value={optionProvince.find((val: any) => (fieldValue ? val[fieldValue] === value : val.value === value))}
                    onChange={(val: any) => (setProvince ? onChange((fieldValue ? val[fieldValue] : val.value), setProvince(val)) : onChange((fieldValue ? val[fieldValue] : val.value)))}
                    classNamePrefix="select"
                    className='react-select'
                    options={optionProvince}
                    placeholder={t('State province')}
                    menuPosition='fixed'
                    {...props}
                  />
                )}
              />
            </Col>
            <Col md={3} xs={12}>
              <Controller
                name={district}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CreatableSelect
                    styles={{ height: "100px" }}
                    value={optionDistrict.find((val: any) => (fieldValue ? val[fieldValue] === value : val.value === value))}
                    onChange={(val: any) => (setDistrict ? onChange((fieldValue ? val[fieldValue] : val.value), setDistrict(val)) : onChange((fieldValue ? val[fieldValue] : val.value)))}
                    classNamePrefix="select"
                    className='react-select'
                    options={optionDistrict}
                    placeholder={t('District')}
                    menuPosition='fixed'
                    {...props}
                  />
                )}
              />
            </Col>
            <Col md={3} xs={12} >
              <Controller
                name={ward}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CreatableSelect
                    styles={{ height: "100px" }}
                    value={optionWard.find((val: any) => (fieldValue ? val[fieldValue] === value : val.value === value))}
                    onChange={(val: any) => (setWard ? onChange((fieldValue ? val[fieldValue] : val.value), setWard(val)) : onChange((fieldValue ? val[fieldValue] : val.value)))}
                    classNamePrefix="select"
                    className='react-select'
                    options={optionWard}
                    placeholder={t('Ward')}
                    menuPosition='fixed'
                    {...props}
                  />
                )}
              />
            </Col>
          </Row>
          }
          {errors && <FormFeedback>{errors.message}</FormFeedback>}
        </div>
      </div>
    </>
  )
}
export default SelectLocation