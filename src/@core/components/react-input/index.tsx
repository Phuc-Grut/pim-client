import { Fragment, useState } from "react"
import { Input } from "reactstrap"
import styled from "styled-components"
import { X } from "becoxy-icons"
import classnames from "classnames"

const BoxInput = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  .input__value{
    z-index: 1;
    &.is-clearable{
      padding-right: 25px !important;
    }

  }
  .input__clear-icon{
    position: absolute;
    right: 5px;
    z-index: 10;
  }
`

const ReactInput = (props: any) => {
  const {setSearchTerm, onKeyPress, placeholder, style}  = props
  const [value, setValue] = useState(props.value)

  const handelClear = () => {
    setValue('')
    setSearchTerm('')
  }
  return (
    <Fragment>
      <div>
        <BoxInput>
          <Input
            //{...props}
            style={style}
            placeholder={placeholder}
            onKeyPress = {onKeyPress}
            className={classnames('input__value', {
              'is-clearable': value
            })}
            value={value}
            onChange={(val: any) => setValue(val.target.value)}
          />
          {value ? <X className='input__clear-icon' onClick={handelClear} strokeWidth={3} fontSize={16} /> : ''}
        </BoxInput>


      </div>


    </Fragment>
  )
}

export default ReactInput
