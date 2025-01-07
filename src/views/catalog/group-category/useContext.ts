import { createContext } from 'react'
import {IUseContext} from "@src/domain/models/IUseContext"
export interface IContext extends IUseContext{
  openModalOrder?: any
  handleModalOrder?: any,
  optionGroupCategory?: any,
  setOptionGroupCategory?: any
  handleModalDetail?: any
  setOpenModalDetail?: any
  openModalDetail?: any
}


export interface IDataTable {
  id?: string,
  code: string,
  name: string,
  title: string,
  description: string,
  status: number
}

export interface IItem extends IDataTable{

}

export const GroupCategoryContext = createContext<IContext>({})