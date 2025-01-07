import { createContext } from 'react'
import {IUseContext} from "@src/domain/models/IUseContext"

export interface IContext extends IUseContext{
    groupAssignedTo?: any,
    setGroupAssignedTo?: any,
    parentCategory?: any,
    setParentCategory?: any,
    parentCategoryIdQuery?: any,
    setParentCategoryIdQuery?: any,
    handleModalDetail?: any,
    openModalDetail?: any,
    setOpenModalDetail?: any,
    windowSize?: any,
    setWindowSize?: any,
    breadCrumb?:any, 
    setBreadCrumb?: any
}
export const CategoryContext = createContext<IContext>({})