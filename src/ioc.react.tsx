import React, { useContext } from 'react'
import { Container, interfaces } from 'inversify'
export const container = new Container()

//----------------------------------------------------------------
const InversifyContext = React.createContext<{ container: Container | null }>({ container: null })
type Props = {
  children: React.ReactNode
  container: Container
}
export const IOCProvider: React.FC<Props> = props => {
  return <InversifyContext.Provider value={{ container: props.container }}>{props.children}</InversifyContext.Provider>
}

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const { container } = useContext(InversifyContext)
  if (!container) {
    throw new Error()
  }
  return container.get<T>(identifier)
}
