import { IUserInfoModel } from '@src/domain/interfaces/IUserModel'
import { getUserInfoApi } from '@src/infra/api/auth'
import { getCookie } from '@src/utility/Utils'
import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useMemo, useReducer, type FC, type ReactNode } from 'react'

// =================================================================================
type InitialState = {
  userInfo?: IUserInfoModel
  isLoadingUser: boolean
  isAuthenticated: boolean
}
type UserChange = { type: 'CHANGE_USER'; payload: IUserInfoModel }
type UserLoadingChange = { type: 'CHANGE_USER_LOADING'; payload: boolean }
type UpdateAnyType = { type: 'UPDATE_ANY_TYPE'; payload: InitialState }

type ActionType = UserChange | UserLoadingChange | UpdateAnyType

const INITIAL_STATE = {
  userInfo: undefined,
  isLoadingUser: true,
  isAuthenticated: true
}

interface ContextProps {
  state: InitialState
  // eslint-disable-next-line no-unused-vars
  dispatch: (args: ActionType) => void
}

const AppContext = createContext<ContextProps>({
  state: INITIAL_STATE,
  dispatch: () => {}
})

const reducer = (state: InitialState, action: ActionType) => {
  switch (action.type) {
    case 'CHANGE_USER':
      return { ...state, userInfo: action.payload }

    case 'CHANGE_USER_LOADING':
      return { ...state, isLoadingUser: action.payload }
    case 'UPDATE_ANY_TYPE':
      return { ...state, ...action.payload }

    default: {
      return state
    }
  }
}

// =======================================================
type AppProviderProps = { children: ReactNode }
// =======================================================

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [stateData, dispatch] = useReducer(reducer, INITIAL_STATE)

  const { data: userInfo, isLoading: isLoadingUser } = useQuery({
    queryKey: ['getUserInfo'],
    cacheTime: 5000,
    queryFn: () => {
      return getUserInfoApi()
    },
    select: ({ data }) => data,
    onSuccess(data) {
      return data
    },
    // onError() {
    //   dispatch({ type: 'CHANGE_USER_LOADING', payload: false })
    //   dispatch({ type: 'CHANGE_USER', payload: null })
    // },
    retry: false,
    enabled: !Boolean(stateData.userInfo)
  })

  const isAuthenticated = () => {
    const isHasCookie = Boolean(getCookie('_Gidu_'))
    console.log('🚀 ~ isAuthenticated ~ isHasCookie:', isHasCookie)
    return Boolean(isHasCookie || (!isLoadingUser && userInfo && userInfo.id))
  }

  useEffect(() => {
    dispatch({
      type: 'UPDATE_ANY_TYPE',
      payload: {
        userInfo,
        isLoadingUser,
        isAuthenticated: isAuthenticated()
      } as InitialState
    })
  }, [userInfo, isLoadingUser])

  const contextValue = useMemo(() => ({ state: stateData, dispatch }), [stateData, dispatch])

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext<ContextProps>(AppContext)

export default AppContext
