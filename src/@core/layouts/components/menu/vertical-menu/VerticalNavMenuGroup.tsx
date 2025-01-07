// ** React Imports
import { useEffect, FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Collapse, Badge } from 'reactstrap'

// ** Vertical Menu Items Component
import VerticalNavMenuItems from './VerticalNavMenuItems'

// ** Utils
import { hasActiveChild, removeChildren } from '@layouts/utils'
import IconCustom from '@components/icon'

// Define types for the props
interface VerticalNavMenuGroupProps {
  item: {
    id: string
    title: string
    children?: any[] // Adjust based on the actual structure of children items
    resAttributes?: {
      VLAYOUT_ICON?: string
    }
    typeIcon?: string
    badge?: string
    badgeText?: string
  }
  groupOpen: string[]
  menuHover: boolean
  activeItem: string | null
  parentItem?: any // Adjust as per the parentItem structure if available
  groupActive: string[]
  setGroupOpen: React.Dispatch<React.SetStateAction<string[]>>
  menuCollapsed: boolean
  setGroupActive: React.Dispatch<React.SetStateAction<string[]>>
  currentActiveGroup: string[]
  setCurrentActiveGroup: React.Dispatch<React.SetStateAction<string[]>>
}

const VerticalNavMenuGroup: FC<VerticalNavMenuGroupProps> = ({
  item,
  groupOpen,
  menuHover,
  activeItem,
  parentItem,
  groupActive,
  setGroupOpen,
  menuCollapsed,
  setGroupActive,
  currentActiveGroup,
  setCurrentActiveGroup,
  ...rest
}) => {
  // ** Hooks
  const { t } = useTranslation()
  const location = useLocation()

  // ** Current URL
  const currentURL = location.pathname

  // ** Toggle Open Group
  const toggleOpenGroup = (item: VerticalNavMenuGroupProps['item'], parent?: VerticalNavMenuGroupProps['item']) => {
    let openGroup = [...groupOpen]
    const activeGroup = [...groupActive]

    if (openGroup.includes(item.id)) {
      openGroup.splice(openGroup.indexOf(item.id), 1)
      if (item.children) {
        removeChildren(item.children, openGroup, activeGroup)
      }
    } else if (activeGroup.includes(item.id) || currentActiveGroup.includes(item.id)) {
      if (!activeGroup.includes(item.id) && currentActiveGroup.includes(item.id)) {
        activeGroup.push(item.id)
      } else {
        activeGroup.splice(activeGroup.indexOf(item.id), 1)
      }
      setGroupActive(activeGroup)
    } else if (parent) {
      if (parent.children) {
        removeChildren(parent.children, openGroup, activeGroup)
      }
      if (!openGroup.includes(item.id)) {
        openGroup.push(item.id)
      }
    } else {
      openGroup = [item.id]
    }
    setGroupOpen(openGroup)
  }

  const onCollapseClick = (e: React.MouseEvent, item: VerticalNavMenuGroupProps['item']) => {
    toggleOpenGroup(item, parentItem)
    e.preventDefault()
  }

  useEffect(() => {
    if (hasActiveChild(item, currentURL)) {
      if (!groupActive.includes(item.id)) {
        groupActive.push(item.id)
      }
    } else {
      const index = groupActive.indexOf(item.id)
      if (index > -1) {
        groupActive.splice(index, 1)
      }
    }
    setGroupActive([...groupActive])
    setCurrentActiveGroup([...groupActive])
    setGroupOpen([])
  }, [location])

  const openClassCondition = (id: string) => {
    if ((menuCollapsed && menuHover) || !menuCollapsed) {
      return groupActive.includes(id) || groupOpen.includes(id)
    } else if (groupActive.includes(id) && menuCollapsed && !menuHover) {
      return false
    } else {
      return null
    }
  }

  return (
    <li
      className={classnames('nav-item has-sub', {
        open: openClassCondition(item.id),
        'menu-collapsed-open': groupActive.includes(item.id),
        'sidebar-group-active':
          groupActive.includes(item.id) || groupOpen.includes(item.id) || currentActiveGroup.includes(item.id)
      })}
    >
      <Link className='d-flex align-items-center' to='/' onClick={e => onCollapseClick(e, item)}>
        <IconCustom typeIcon={item.typeIcon} iconName={item.resAttributes?.VLAYOUT_ICON || ''} fontSize={17} />
        <span className='menu-title text-truncate'>{t(item.title)}</span>
        {item.badge && item.badgeText ? (
          <Badge className='ms-auto me-1' color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </Link>

      <ul className='menu-content'>
        <Collapse isOpen={groupActive.includes(item.id) || groupOpen.includes(item.id)}>
          <VerticalNavMenuItems
            {...rest}
            items={item.children}
            groupActive={groupActive}
            setGroupActive={setGroupActive}
            currentActiveGroup={currentActiveGroup}
            setCurrentActiveGroup={setCurrentActiveGroup}
            groupOpen={groupOpen}
            setGroupOpen={setGroupOpen}
            parentItem={item}
            menuCollapsed={menuCollapsed}
            menuHover={menuHover}
            activeItem={activeItem}
          />
        </Collapse>
      </ul>
    </li>
  )
}

export default VerticalNavMenuGroup
