import classNames from 'classnames'
import './list-view.css'

interface IListViewSelect {
  data: any
  setSelected?: any
  setSelecteds?: any
  selected?: any
  selecteds?: any
  ismutil?: any
  Template: any
  showCheckBox: boolean
}

const ListViewSelectCustom = (props: IListViewSelect) => {

  const {
    data,
    setSelected,
    setSelecteds,
    selected,
    selecteds,
    Template,
    showCheckBox,
    ismutil
  } = props

  const handleSelect = (data: any) => {
    if (ismutil) {
      const ls = selecteds.filter((x: any) => x)
      const index = ls.findIndex((x: any) => x.id === data.id)
      if (index !== -1) {
        ls.splice(index, 1)
      } else {
        ls.push(data)
      }
      setSelecteds(ls)
    } else {
      setSelected(data)
    }
  }

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='tree-control_wrapper'>
          <div className='e-control e-listview e-lib e-touch e-list-custom'>
            <ul className='e-list-parent e-ul'>
              {
                data?.map((ele: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className={classNames('e-list-item e-level-1',
                        (ismutil ? selecteds.includes(ele) : selected === ele) ? 'e-active' : '')}
                      onClick={() => handleSelect(ele)}
                    >
                      <div className='d-flex align-items-top w-100 p-75'>
                        {showCheckBox ? <div>
                          {
                            (ismutil ? selecteds.includes(ele) : selected === ele) ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-square-fill " viewBox="0 0 16 16">
                              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-square" viewBox="0 0 16 16">
                              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            </svg>

                          }
                        </div> : <></>
                        }
                        <Template dataItem={ele}></Template>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </div >
  )
}
export default ListViewSelectCustom