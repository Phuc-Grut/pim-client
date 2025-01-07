import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as store from '../store'


export const useDashboard = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.productCategory)

  const getCountProduct = () => {
    return dispatch(store.getCountProduct())
  }
  const getCountProductByType = () => {
    return dispatch(store.getCountProductByType())
  }
  const getTopBrand = () => {
    return dispatch(store.getTopBrand())
  }
  const getTopCategory = () => {
    return dispatch(store.getTopCategory())
  }
  const getTopManufacturer = () => {
    return dispatch(store.getTopManufacturer())
  }
  const getTopProductInventory = () => {
    return dispatch(store.getTopProductInventory())
  }
  const getTopNewProduct = () => {
    return dispatch(store.getTopNewProduct())
  }

  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getTopProductInventory,
    getTopManufacturer,
    getTopCategory,
    getTopBrand,
    getCountProductByType,
    getTopNewProduct,
    getCountProduct
  }
}
