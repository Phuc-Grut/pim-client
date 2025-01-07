import {forwardRef, Fragment, useRef, useState} from "react"
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  Input
  // Button
} from "reactstrap"
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations'
import { Scrollbars } from 'react-custom-scrollbars'
import {AlertCircle, Database} from "becoxy-icons"
import {useOnClickOutside} from "@hooks/useOnClickOutside"
import {getString} from "@utils/Utils"
import {useTranslation} from "react-i18next"
import {isNullOrUndefined} from "@hooks/isNullOrUndefined"

const operator = ['+', '-', '*', '/', '(', ')', '=', ' ', ',']
const regex = /[,+*/=()\s-]/

const FormulaInput = forwardRef((props: any, ref: any) => {
  const { t } = useTranslation()
  const {type, parameters, ...rest} = props
  let filteredData: any = []
  const containerRef: any = useRef()
  const dropdownRef: any = useRef()

  const [show, setShow] = useState(false)
  const [showTab, setShowTab] = useState(false)
  const [suggestOpen, setSuggestOpen] = useState(false)
  // const [outSideInput, setOutSideInput] = useState(true)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [activeSuggestion, setActiveSuggestion] = useState(0)


  const headerText = [{ text: "Công thức" }, { text: "Tham số" }]

  const formula = [
    {
      type: 'formula',
      label: 'SUM',
      value: 'SUM(',
      description: '(X1, X2,...)'
    },
    { type: 'formula',
      label: 'IF',
      value: 'IF(',
      description: '(Logical_test, [value_if_true], [value_if_false])'
    },
    { type: 'formula',
      label: 'AND',
      value: 'AND(',
      description: '(X1, X2)'
    },
    { type: 'formula',
      label: 'OR',
      value: 'OR(',
      description: '(X1, X2)'
    },
    { type: 'formula',
      label: 'ROUND',
      value: 'ROUND(',
      description: '(number, num_digits)'
    },
    { type: 'formula',
      label: 'DATE',
      value: 'DATE(',
      description: '(year, month, day)'
    },
    { type: 'formula',
      label: 'MONTH',
      value: 'MONTH(',
      description: '(year, month, day)'
    },
    { type: 'formula',
      label: 'TODAY',
      value: 'TODAY(',
      description: '()'
    },
    { type: 'formula',
      label: 'DAY',
      value: 'DAY(',
      description: '(serial_number)'
    },
    { type: 'formula',
      label: 'INT',
      value: 'INT(',
      description: '(number)'
    }
  ]

  const suggestions = [...formula, ...parameters]
  const filterKey = 'label'

  const handleInsert = (val: string) => {
    if (ref?.current) {
      const start = ref.current.selectionStart
      const end = ref.current.selectionEnd
      const text = ref.current.value
      const before = text.substring(0, start)
      const beforeOne = text.substring(start - 1, start)
      const after  = text.substring(end, text.length)
      if (beforeOne === '(') {
        ref.current.value = (`${before + val  }${  after}`)
      } else {
        ref.current.value = (before + val + after)
      }
      ref.current.selectionStart = beforeOne === '(' ? ref.current.selectionEnd = start + val.length : ref.current.selectionEnd = start + val.length
      ref.current.focus()
      props.onChange(ref.current.value)
    }
  }

  // ** Suggestion Hover Event
  const onSuggestionItemHover = (index: any) => {
    setActiveSuggestion(index)
  }

  const handleSuggestClick = (val: any) => {
    const start = ref.current.selectionStart
    const end = ref.current.selectionEnd
    const text = ref.current.value
    const before = text.substring(0, start)
    const rsBefore = before.slice(0, start - userInput.length)
    const after  = text.substring(end, text.length)
    ref.current.value = (rsBefore + val.value + after)
    ref.current.selectionStart = ref.current.selectionEnd = start + val.value.length
    setShowTab(true)
    setSuggestOpen(false)
    props.onChange(rsBefore + val.value + after)
    ref.current.focus()

  }

  const renderGroupedSuggestion = (arr: any) => {
    const { customRender } = props

    const renderSuggestion = (item: any, i: any) => {
      if (!customRender) {
        return (

          <div key={item[filterKey]} className='formula-item d-flex' onClick={() => handleSuggestClick(item)}>
            <span style={{width: '40px'}}>
              {item.type === 'parameters' ?  <Database fontSize={20}/> : 'Fx'}

            </span>
            <div style={{width: 'calc(100% - 40px'}}>
              <p className='m-0'><span style={{fontWeight: '500'}}>{item.label}</span> {item.type === 'formula' ? <span>{item.description}</span> : ''}</p>
              {item.type === 'parameters' ? <p>{item.description}</p> : ''}
            </div>
          </div>
        )
      } else if (customRender) {
        return customRender(
          item,
          i,
          filteredData,
          activeSuggestion,
          handleSuggestClick,
          onSuggestionItemHover,
          userInput
        )
      } else {
        return null
      }
    }

    return arr.map((item: any, i: any) => {
      return renderSuggestion(item, i)
    })
  }

  const renderUngroupedSuggestions = () => {
    const { customRender, suggestionLimit } = props

    filteredData = []
    const sortSingleData = suggestions
      .filter((i: any) => {
        const startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
          includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase())
        if (startCondition) {
          return startCondition
        } else if (!startCondition && includeCondition) {
          return includeCondition
        } else {
          return null
        }
      })
      .slice(0, suggestionLimit)
    filteredData.push(...sortSingleData)
    if (sortSingleData.length) {
      return sortSingleData.map((suggestion: any, index: any) => {
        if (!customRender) {
          return (
            <div key={index} className='formula-item d-flex' onClick={() => handleSuggestClick(suggestion)}>
              <span style={{width: '40px'}} className='d-flex align-items-center'>
                {suggestion.type === 'parameters' ?  <Database fontSize={20}/> : 'Fx'}

              </span>
              <div style={{width: 'calc(100% - 40px'}}>
                {suggestion.type === 'formula' ? <p className='m-0'><span style={{fontWeight: '600'}}>{suggestion.label}</span>
                  <span>{suggestion.description}</span></p> : ''}

                {suggestion.type === 'parameters' ? <Fragment><p className='m-0'><span style={{fontWeight: '600'}}>{suggestion.label}</span></p>
                  <p className='m-0' style={{fontSize: '12px'}}>{suggestion.description}</p></Fragment> : ''}

              </div>
            </div>
          )
        } else if (customRender) {
          return customRender(
            suggestion,
            index,
            filteredData,
            activeSuggestion,
            handleSuggestClick,
            onSuggestionItemHover,
            userInput
          )
        } else {
          return null
        }
      })
    } else {
      return (
        <li className='suggestion-item no-result'>
          <AlertCircle fontSize={15} /> <span className='align-middle ms-50'>{t('NoResult')}</span>
        </li>
      )
    }
  }


  const renderSuggestions = () => {
    const { filterKey, grouped, filterHeaderKey, suggestions } = props

    // ** Checks if suggestions are grouped or not.
    if (grouped === undefined || grouped === null || !grouped) {
      return renderUngroupedSuggestions()
    } else {
      filteredData = []
      return suggestions.map((suggestion: any) => {
        const sortData = suggestion.data
          .filter((i: any) => {
            const startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
              includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase())
            if (startCondition) {
              return startCondition
            } else if (!startCondition && includeCondition) {
              return includeCondition
            } else {
              return null
            }
          })
          .slice(0, suggestion.searchLimit)

        filteredData.push(...sortData)
        return (
          <Fragment key={suggestion[filterHeaderKey]}>
            <li className='suggestion-item suggestion-title-wrapper'>
              <h6 className='suggestion-title'>{suggestion[filterHeaderKey]}</h6>
            </li>
            {sortData.length ? (
              renderGroupedSuggestion(sortData)
            ) : (
              <li className='suggestion-item no-result'>
                <AlertCircle fontSize={15} /> <span className='align-middle ms-50'>{t('NoResult')}</span>
              </li>
            )}
          </Fragment>
        )
      })
    }
  }

  const contentFormula = () => {
    return  (
      <Scrollbars autoHide style={{height: '250px'}}>
        <div className='p-1' style={{height: '200px'}}>
          {formula.map((item: any, index: number) => {
            return (
              <div key={index} className='formula-item d-flex' onClick={() => handleInsert(item.value)}>
                <span style={{width: '40px'}}>
                  Fx
                </span>
                <div style={{width: 'calc(100% - 40px'}}>
                  <p className='m-0'><span style={{fontWeight: '600'}}>{item.label}</span> {item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Scrollbars>
    )

  }

  const contentParameters = () => {
    return  (
      <Scrollbars autoHide style={{height: '250px'}}>
        <div className='p-1' style={{height: '200px'}}>
          {parameters.map((item: any, index: number) => {
            return (
              <div key={index} className='formula-item d-flex' onClick={() => handleInsert(item.value)}>
                <span className='d-flex align-items-center' style={{width: '40px'}}>
                  <Database fontSize={20}/>
                </span>
                <div style={{width: 'calc(100% - 40px'}}>
                  <p className='m-0'><span style={{fontWeight: '600'}}>{item.label}</span> </p>
                  <p className='m-0' style={{fontSize: '12px'}}>{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Scrollbars>
    )
  }

  const onChange = (val: any) => {
    props.onChange(val.target.value)
    if (val.target.value.startsWith('=')) {
      setShow(true)
    } else {
      setShow(false)
    }
    const start = ref.current.selectionStart
    const text = ref.current.value
    const before = text.substring(start - 1, start)

    const filterString = text.substring(0, start)
    const input = getString(filterString, regex)

    if (operator.includes(before)) {
      setUserInput('')
      setSuggestOpen(false)
      setShowTab(true)
    } else {
      setUserInput(input)
      setSuggestOpen(true)
      setShowTab(false)

    }
  }

  const handleDropdown = () => {
    setDropdownOpen(true)
  }


  useOnClickOutside(containerRef, () => {
    // if (props.externalClick) {
    //   props.externalClick()
    // } else {
    // }
  })

  useOnClickOutside(dropdownRef, () => {
    setDropdownOpen(false)
    if (props.externalClick) {
      props.externalClick()
    }
  })


  const handleFocus = () => {
    setSuggestOpen(false)
    setShowTab(true)
  }

  const handleBlur = () => {
  }

  return (
    <Fragment>
      <div ref={containerRef}>
        <Dropdown isOpen={dropdownOpen} toggle={handleDropdown}>
          <DropdownToggle tag='div' onClick={handleDropdown}>
            <Input
              {...rest}
              innerRef={ref}
              type={type}
              value={!isNullOrUndefined(props.value) ? props.value : '' }
              onChange={onChange}
              name='inputFormula'
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </DropdownToggle>

          {show && showTab ? <DropdownMenu id='test-id' className='formula-dropdown icon-dropdown'  style={{width: '600px', position: 'fixed'}} container='form-modal-globalzone'>
            <DropdownItem  className='ps-0 pe-0 pt-50 pb-50' style={{borderRadius: '6px'}} tag='div' header>
              <div style={{height: '300px'}} ref={dropdownRef}>

                <TabComponent heightAdjustMode='Auto' height={300} animation={{next: {effect: 'None'}, previous: {effect: 'None'}}}>
                  <TabItemsDirective >
                    <TabItemDirective header={headerText[0]} content={contentFormula}/>
                    <TabItemDirective header={headerText[1]} content={contentParameters}/>
                  </TabItemsDirective>
                </TabComponent>

              </div>
            </DropdownItem>

          </DropdownMenu> : ''}


          {show && suggestOpen ? <DropdownMenu className='formula-dropdown icon-dropdown' style={{width: '600px'}} container='form-modal-globalzone'>
            <DropdownItem className='ps-0 pe-0 pt-50 pb-50' style={{borderRadius: '6px'}} tag='div' header>
              <div style={{height: '300px'}} ref={dropdownRef}>
                <Scrollbars autoHide style={{height: '300px'}}>
                  <div className='p-1'>
                    {renderSuggestions()}
                  </div>
                </Scrollbars>
              </div>


            </DropdownItem>

          </DropdownMenu> : ''}

        </Dropdown >

      </div>

    </Fragment>
  )
})

export default FormulaInput