import { createContext } from 'react'
import {IUseContext} from "@src/domain/models/IUseContext"
export interface IContext extends IUseContext{

}


export interface IDataTable {
  id?: string,
  name: string,
  description: string,
  status: number
}

export interface IItem extends IDataTable{
}

export const UserContext = createContext<IContext>({})