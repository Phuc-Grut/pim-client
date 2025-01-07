export interface ISelectDefault {
  value: any,
  label: string,
  key?: any
}

export type IType = 'Add' | 'Edit' | 'View' | 'Process' | 'Copy' | 'Order' | 'Approval' | ''
export type ITypeModal = 'Add' | 'Edit' | 'View' | 'Process' | 'Copy' | 'Order' | 'Approval' | 'Detail' | 'Variant' | 'Duplicate' | 'Open' | ''