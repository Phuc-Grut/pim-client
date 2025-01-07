import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as uploadFileStore from '../stores/uploadFile'

export const useUploadFile = () => {
  const dispatch = useAppDispatch()
  const {
    dataUploadFile,
    status
  } = useAppSelector((state: RootState) => state.uploadFile)

  const uploadFileApi = (params: FormData) => {
    return dispatch(uploadFileStore.uploadFileApi(params))
  }

  const uploadImageApi = (params: FormData) => {
    return dispatch(uploadFileStore.uploadImageApi(params))
  }
  
  const uploadFileMultiApi = (params: FormData) => {
    return dispatch(uploadFileStore.uploadFileMultiApi(params))
  }

  const uploadImageMultiApi = (params: FormData) => {
    return dispatch(uploadFileStore.uploadImageMultiApi(params))
  }

  const handleAddUploadFile = (arr: any) => { return dispatch(uploadFileStore.handleAddUploadFile(arr)) }

  return {
    uploadFileApi,
    uploadImageApi,
    dataUploadFile,
    status,
    uploadImageMultiApi,
    uploadFileMultiApi,
    handleAddUploadFile
  }
}
