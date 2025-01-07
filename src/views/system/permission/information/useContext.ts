import { createContext } from 'react'
import {IUseContext} from "@src/domain/models/IUseContext"
export interface IContext extends IUseContext{
}

export const PermissionInformationContext = createContext<IContext>({})