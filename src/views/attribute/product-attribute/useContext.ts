import { createContext } from 'react'
import {IUseContext} from "@src/domain/models/IUseContext"
export interface IContext extends IUseContext{
  dataTableDetail?: any;
  setDataTableDetail?: any;
  dataDeleteDetail?: any;
  setDataDeleteDetail?: any;
  handleSidebar?: any;
  dataSidebar?: any;
  setDataSidebar?: any;
  typeMo?: any;
  setTypeMo?: any;
  openSidebar?: any;
  setOpenSidebar?: any;
  indexRow?: any
  setIndexRow?: any
}


export interface IDataTable {
  id?: string,
  name: string,
  description: string,
  status: number
}

export interface IItem extends IDataTable{
}

export const ProductAttributeContext = createContext<IContext>({})