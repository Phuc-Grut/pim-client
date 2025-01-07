/* eslint-disable implicit-arrow-linebreak */
// ** React Imports
import { useContext } from 'react'
import { AbilityContext } from '@src/utility/context/Can'
/**
 * Return which component to render based on it's data/context
 * @param {Object} item nav menu item
 */
export const resolveVerticalNavMenuItemComponent = (item: any) => {
  if (item.resAttributes && item.resAttributes.ISHEADER === '1') { return 'VerticalNavMenuSectionHeader' }
  if (item.children && item.resAttributes.HIDDEN_CHILDREN !== '1') { return 'VerticalNavMenuGroup' }
  return 'VerticalNavMenuLink'
}

/**
 * Return which component to render based on it's data/context
 * @param {Object} item nav menu item
 */
export const resolveHorizontalNavMenuItemComponent = (item: any) => {
  if (item.children) { return 'HorizontalNavMenuGroup' }
  return 'HorizontalNavMenuLink'
}

/**
 * Check if nav-link is active
 * @param {Object} link nav-link object
 */
export const isNavLinkActive = (link: any, currentURL: any, routerProps: any) => {
  return (
    currentURL === link ||
    (routerProps && routerProps.meta && routerProps.meta.navLink && routerProps.meta.navLink === link)
  )
  // return currentURL === link
}

/**
 * Check if the given item has the given url
 * in one of its children
 *
 * @param item
 * @param activeItem
 */
export const hasActiveChild = (item: any, currentUrl: any) => {
  const { children } = item

  if (!children) {
    return false
  }

  for (const child of children) {
    if (child.children) {
      if (hasActiveChild(child, currentUrl)) {
        return true
      }
    }

    // Check if the child has a link and is active
    if (child && child.navLink && currentUrl && (child.navLink === currentUrl || currentUrl.includes(child.navLink))) {
      return true
    }
  }

  return false
}

/**
 * Check if this is a children
 * of the given item
 *
 * @param children
 * @param openGroup
 * @param currentActiveGroup
 */
export const removeChildren = (children: any, openGroup: any, currentActiveGroup: any) => {
  children.forEach((child: any) => {
    if (!currentActiveGroup.includes(child.id)) {
      const index = openGroup.indexOf(child.id)
      if (index > -1) {
        openGroup.splice(index, 1)
      }
      if (child.children) {
        removeChildren(child.children, openGroup, currentActiveGroup)
      }
    }
  })
}

const checkForVisibleChild = (arr: any, ability: any) => {
  return arr.some((i: any) => {
    const action = i.status === 1 ? 'read' : null
    if (i.children) {
      return checkForVisibleChild(i.children, ability)
    } else {
      return ability.can(action, 'Menu')
    }
  })
}

export const canViewMenuGroup = (item: any) => {
  const action: any = item.status === 1 ? 'read' : null
  const ability = useContext(AbilityContext)
  // ! This same logic is used in canViewHorizontalNavMenuGroup and canViewHorizontalNavMenuHeaderGroup. So make sure to update logic in them as well
  const hasAnyVisibleChild = item.children && checkForVisibleChild(item.children, ability)

  // ** If resource and action is defined in item => Return based on children visibility (Hide group if no child is visible)
  // ** Else check for ability using provided resource and action along with checking if has any visible child
  if (!(item.action && item.resource)) {
    return hasAnyVisibleChild
  }
  return ability.can(action, 'Menu') && hasAnyVisibleChild
}

export const canViewMenuItem = (item: any) => {
  const action: any = item.status === 1 ? 'read' : null
  const ability = useContext(AbilityContext)
  return ability.can(action, 'Menu')
}
