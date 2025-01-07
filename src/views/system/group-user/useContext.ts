import { createContext } from 'react'
import { IUseContext } from "@src/domain/models/IUseContext"
export interface IContext extends IUseContext {
  handleModalAddMember?: any
  openModalAddMember?: any
}


export interface IDataTable {
  id?: string,
  name: string,
  description: string,
  status: number
}

export interface IItem extends IDataTable {
}

export const GroupUserContext = createContext<IContext>({})