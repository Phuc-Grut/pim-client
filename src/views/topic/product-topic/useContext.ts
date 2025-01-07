import { createContext } from 'react'
import {IUseContext} from "@src/domain/models/IUseContext"
export interface IContext extends IUseContext{
  optionProductTopicPage?: any
  setOptionProductTopicPage?: any
  handleModalQuery?: any
  setOpenModalQuery?: any
  openModalQuery?: any
  typeModalQuery?: any
  setTypeModalQuery?: any
  dataItemQuery?: any
  setDataItemQuery?: any
  productTopicPage?: any
  setProductTopicPage?: any
}


export interface IDataTable {
  id?: string,
  name: string,
  description: string,
  status: number
}

export interface IItem extends IDataTable{
}

export const ProductTopicContext = createContext<IContext>({})