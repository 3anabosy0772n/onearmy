import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import { Routes } from './pages'
import { stores } from './stores'
import { theme } from './themes/app.theme'

import './index.css'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  // provider makes all stores available through the app via @inject
  <Provider {...stores}>
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
