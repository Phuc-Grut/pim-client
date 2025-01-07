import {createContext} from "react"

export interface IContext {
  uploadings: any[]
  openModal: boolean
  setOpenModalUploadFile?: any
  setUploadings?: any
}

export const UploadFileContext = createContext<IContext>({ uploadings: [], openModal: false })
