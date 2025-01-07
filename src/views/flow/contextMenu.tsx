import { memo, useEffect, useRef} from 'react'
// import classnames from "classnames"
// import {Button} from "reactstrap"
// import PerfectScrollbar from "react-perfect-scrollbar"
import {ContextMenuComponent} from "@syncfusion/ej2-react-navigations"
import '@syncfusion/ej2-base/styles/bootstrap5.css'


export const ContextMenu = memo((props: any) => {
  const { isOpen, position, contextmenuItems = [], contextMenuClick, currentNode, nodes, edges, reactFlow } = props
  // const { isOpen, contextmenuItems = [], position, reactFlow } = props

  const cMenu: any = useRef()

  useEffect(() => {
    // console.log(position.x)
    // console.log(position.x + 330)
    // console.log(reactFlow.width)
    if (isOpen) {
      cMenu.current.open(position.y - 70, (position.x + 100) <= reactFlow.width ? position.x + 50 : position.x - 350)
    } else {
      cMenu.current.close()
    }
  }, [isOpen, position])

  const handleContextMenuClick = (value: any) => {
    // console.log(value)
    contextMenuClick({id: value.item.id, title: value.item.title, ...position, node: currentNode, nodes, edges})
    // setIsOpen(false)
    // action.effect()
  }

  // const itemBeforeEvent = (args: any) => {
  //   console.log(args)
  // }


  // return (
  //   <div
  //     ref={ref}
  //     className={classnames('list-context-menu', {
  //       open: isOpen
  //     })}
  //     style={{
  //       position: 'absolute',
  //       // left: position.x - 200,
  //       top: position.y + 50,
  //       inset: '0px 0px auto auto',
  //       zIndex: 1000,
  //       border: 'solid 1px #CCC',
  //       borderRadius: 3,
  //       backgroundColor: 'white',
  //       padding: 5,
  //       // display: 'flex',
  //       flexDirection: 'column'
  //     }}
  //     // onMouseLeave={onMouseLeave}
  //   >
  //     {/*<PerfectScrollbar style={{maxHeight: 500}}>*/}
  //     <div className='menu-wrapper'>
  //       <Button color='flat-success' className='d-flex context-menu-item' onClick={() => handleContextMenuClick(
  //         {id: 'Setting', title: 'Cài đặt thông số', icon: ''}
  //       )}>
  //         <Icon.Settings fontSize={16}/>
  //         <span className='ms-1'>Cài đặt thông số</span>
  //
  //       </Button>
  //
  //       <hr className='mt-0 mb-0'/>
  //
  //
  //       {contextmenuItems.map((item: any, index: number) => {
  //         // @ts-ignore
  //         const IconTag = Icon[item.icon]
  //         return (
  //           <Button color='flat-success' className='context-menu-item d-flex' key={index} onClick={() => handleContextMenuClick(item)}>
  //             <IconTag fontSize={16} />
  //             <span className='ms-1'>{item.title}</span>
  //           </Button>
  //         )
  //       })}
  //       <hr className='mt-0 mb-0'/>
  //       <Button color='flat-success' className='context-menu-item d-flex' onClick={() => handleContextMenuClick(
  //         {id: 'Delete', title: 'Xóa', icon: ''}
  //       )}>
  //         <Icon.Settings fontSize={16}/>
  //         <span className='ms-1'>Xóa</span>
  //       </Button>
  //
  //
  //     </div>
  //     {/*</PerfectScrollbar>*/}
  //
  //   </div>
  // )

  return (
    <ContextMenuComponent
      id='contextmenu'
      ref={cMenu}
      items={contextmenuItems}
      select={handleContextMenuClick}
      // beforeItemRender={itemBeforeEvent}
      style={{width: 300, padding: '5px 0'}}
      // beforeOpen={itemBeforeEvent}
    />
  )


}
)
