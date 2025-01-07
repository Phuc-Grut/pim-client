// ** React Imports
import React, { Suspense, lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'

// ** Redux Imports
import { store } from '@src/redux/configureStore'
import { Provider } from 'react-redux'

// ** Intl, CASL & ThemeColors Context
//import defineAbilitiesFor from './configs/acl/ability'
import { AbilityContext } from '@src/utility/context/Can'
import { ThemeContext } from '@src/utility/context/ThemeColors'

// ** ThemeConfig

// ** Toast
import { Toaster } from 'react-hot-toast'

// ** i18n
import './configs/i18n'

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner'

// ** Ripple Button
import './@core/components/ripple-button'

// ** Fake Database
import './@fake-db'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Hot Toast Styles
import './@core/scss/react/libs/react-hot-toasts/react-hot-toasts.scss'

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './index.scss'
import './assets/scss/style.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// ** Service Worker
import * as serviceWorker from './serviceWorker'
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } }
})

// ** Lazy load app
const LazyApp = lazy(() => import('./App'))
// react 17
// import ReactDOM from 'react-dom'
// react 18
import { createRoot } from 'react-dom/client'
import { IOCProvider, container } from './ioc.react'
import themeConfig from './configs/themeConfig'
// key license syncfusion
import { registerLicense } from '@syncfusion/ej2-base'
registerLicense('ORg4AjUWIQA/Gnt2VVhiQlFadVlJXmJWf1FpTGpQdk5yd19DaVZUTX1dQl9hSXlTckVmXHtfcHNVRGM=')
const wrapContainer = document.getElementById('root')
const root = createRoot(wrapContainer!)

import initialAbility from '@src/configs/acl/initialAbility'
import { AppProvider } from './contexts/AppContext'
if (!(crypto as any).randomUUID) {
  ;(crypto as any).randomUUID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
}
const App: React.FC = () => {
  return (
    <IOCProvider container={container}>
      <BrowserRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <AppProvider>
              <Suspense fallback={<Spinner />}>
                <AbilityContext.Provider value={initialAbility}>
                  <ThemeContext>
                    <LazyApp />
                    <Toaster
                      position={themeConfig.layout.toastPosition}
                      toastOptions={{ className: 'react-hot-toast' }}
                    />
                  </ThemeContext>
                </AbilityContext.Provider>
              </Suspense>
              <ReactQueryDevtools />
            </AppProvider>
          </QueryClientProvider>
        </Provider>
      </BrowserRouter>
    </IOCProvider>
  )
}

// ReactDOM.render(<App />, document.getElementById('root'))
root.render(<App />)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
