import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as codeSyntaxStore from '../store'

import { IFGetCodeSyntaxApi } from '@src/domain/models/ICodeSyntax'

export const useCodeSyntax = () => {
  const dispatch = useAppDispatch()
  const {
    checkInit
  } = useAppSelector((state: RootState) => state.codeSyntax)

  const getCodeSyntaxPagingApi = (params: IFGetCodeSyntaxApi) => {
    return dispatch(codeSyntaxStore.getCodeSyntaxApi(params))
  }


  return {
    checkInit,
    getCodeSyntaxPagingApi
  }
}
