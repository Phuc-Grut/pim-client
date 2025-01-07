import React from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { useTranslation } from 'react-i18next'

interface OptionsDropdownProps {
  dropdownOpen: boolean
  toggleDropdown: () => void
  // eslint-disable-next-line no-unused-vars
  toggleSpecificPrivilege: (privilegeName: string) => void 
  onSelectAll: () => void
  onUnselectAll: () => void
  disabled: boolean
  uniquePrivileges: string[]
}

const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  dropdownOpen,
  toggleDropdown,
  onSelectAll,
  toggleSpecificPrivilege,
  onUnselectAll,
  disabled,
  uniquePrivileges
}) => {
  const { t } = useTranslation()

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle caret color='primary' className='me-2' disabled={disabled}>
        {t('Options')}
      </DropdownToggle>
      <DropdownMenu className="w-100">
        <DropdownItem className="w-100" onClick={onSelectAll}>{t('Select all')}</DropdownItem>
        <DropdownItem className="w-100" onClick={onUnselectAll}>{t('Unselect all')}</DropdownItem>
        {uniquePrivileges.map((privilegeName, index) => (
          <DropdownItem className="w-100" key={index} onClick={() => toggleSpecificPrivilege(privilegeName)}>{t(privilegeName)}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default OptionsDropdown
