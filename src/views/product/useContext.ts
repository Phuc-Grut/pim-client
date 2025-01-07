import { createContext } from 'react'
import { IUseContext } from "@src/domain/models/IUseContext"
export interface IContext extends IUseContext {
  openAside?: boolean,
  setOpenAside?: any,
  handleAside?: any,
  itemId?: any,
  setItemId?: any,
  handleFormOpened?: any,
  tabIndex?: any,
  setTabIndex?: any,
  getValues?: any,
  dataItem?:any,
  setDataItem?:any,
  dataSidebar?:any,
  setDataSidebar?:any,
  typeSidebar?:any,
  setTypeSidebar?:any,
  openSidebar?:any,
  setOpenSidebar?:any,
  handleSidebar?:any,
  setOpenModalDetail?:any,
  optionGrCategory?:any, 
  setOptionGrCategory?:any,
  optionProCategory?:any,
  setOptionProCategory?:any,
  setOpenModalDuplicate?: any
  setUnit?: any,
  optionStore?:any
  optionCurrency?:any
  openModalVariant?:any
  handleModalVariant?:any,
  selectedImageVariant?:any[]
  setSelectedImageVariant?:any,
  dataTable?:any,
  setDataTable?: any
}
export interface IDataTable {
  name: string,
  code: string,
  groupItemID: null | string,
  type: number,
  unitID: string,
  standardPrice: string,
  onHandQty: string,
  availableQty: string,
  status: number
}

export interface IItem extends IDataTable {
  isSale: boolean,
  isPurchase: boolean,
  barcode: string,
  organizationID: string,
  includeChildren: boolean,
  unitTypeID: string,
  purchaseUnitID: string,
  package: string,
  tagID: string,

  brandID: string,
  madeInID: string,
  makerID: string,
  description: string,

  isChangePrice: boolean,
  saleTaxID: string,
  purchaseTaxID: string,

  calculateMethod: number,
  costPrice: string,
  lastPurchasePrice: string,
  weight: string
  length: string
  width: string
  height: string

  isChooseProduct: boolean

}


export const ProductContext = createContext<any>({})