import * as React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import DevTools from 'mobx-react-devtools'

import Docs from './Docs/Docs'
import { HomePage } from './Home/Home'
import { NotFoundPage } from './NotFound/NotFound'
import { TranslationDemoPage } from './TranslationDemo/TranslationDemo'
import ScrollToTop from './../components/ScrollToTop/ScrollToTop'

export class Routes extends React.Component {
  public render() {
    return (
      <div>
        <DevTools />
        <BrowserRouter>
          {/* on page change scroll to top */}
          <ScrollToTop>
            <Switch>
              <Route path="/docs" component={Docs} />
              <Route path="/translation" component={TranslationDemoPage} />
              <Route exact path="/" component={HomePage} />
              <Route component={NotFoundPage} />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </div>
    )
  }
}
