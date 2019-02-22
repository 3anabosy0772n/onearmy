import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import { Routes } from './pages'
import { stores } from './stores'
import { theme } from './themes/app.theme'
import { GlobalStyle } from './themes/app.globalStyle.js'

import './index.css'

import registerServiceWorker from './registerServiceWorker'
import { SWUpdateNotification } from './pages/common/SWUpdateNotification/SWUpdateNotification'
import ErrorBoundary from './common/ErrorBoundary'
import { initErrorHandler } from './common/errors'
initErrorHandler()
ReactDOM.render(
  // provider makes all stores available through the app via @inject
  <Provider {...stores}>
    <MuiThemeProvider theme={theme}>
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
      <SWUpdateNotification />
      <GlobalStyle />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement,
)

// callback function updates global store when service worker registered
const onUpdate = () => {
  console.log('sw updated receive in index')
  stores.platformStore.setServiceWorkerStatus('updated')
}

registerServiceWorker(onUpdate)
