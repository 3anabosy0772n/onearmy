/* tslint:disable:no-eval */
import * as React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import DevTools from 'mobx-react-devtools'

import { DocsPage } from './Docs/Docs'
import { HomePage } from './Home/Home'
import { NotFoundPage } from './NotFound/NotFound'
import { TemplatePage } from './_Template/Template'
import ScrollToTop from './../components/ScrollToTop/ScrollToTop'
import { EventsPage } from './Events/Events'
import MainLayout from './common/MainLayout'
import Header from './common/Header/Header'

interface IState {
  singlePageMode: boolean
  displayPageComponent?: any
}
export interface IPageMeta {
  path: string
  component: any
  title: string
}

export const COMMUNITY_PAGES: IPageMeta[] = [
  { path: '/news', component: NotFoundPage, title: 'Newsfeed' },
  { path: '/docs', component: DocsPage, title: 'How-To' },
  { path: '/events', component: EventsPage, title: 'Events' },
]
export const COMMUNITY_PAGES_MORE: IPageMeta[] = [
  { path: '/discussions', component: NotFoundPage, title: 'Discussions' },
  { path: '/maps', component: NotFoundPage, title: 'Maps' },
  { path: '/discover', component: NotFoundPage, title: 'Discover' },
  { path: '/about', component: NotFoundPage, title: 'About' },
]
export const COMMUNITY_PAGES_PROFILE: IPageMeta[] = [
  { path: '/profile', component: NotFoundPage, title: 'Profile' },
  { path: '/settings', component: NotFoundPage, title: 'Settings' },
  { path: '/help', component: NotFoundPage, title: 'Help' },
]

export class Routes extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = this.getDisplayState()
  }

  public render() {
    const pages = [
      ...COMMUNITY_PAGES,
      ...COMMUNITY_PAGES_MORE,
      ...COMMUNITY_PAGES_PROFILE,
    ]
    // we are rendering different pages and navigation dependent on whether the user has navigated directly to view the
    // entire site, or just one page of it via subdomains. This is so we can effectively integrate just parts of this
    // platform into other sites. The first case is direct nav
    return !this.state.singlePageMode ? (
      <div>
        <DevTools />
        <BrowserRouter>
          {/* on page change scroll to top */}
          <ScrollToTop>
            <div
              style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Header variant="community" />
              <Switch>
                {pages.map(page => (
                  <Route
                    path={page.path}
                    component={page.component}
                    key={page.path}
                  />
                ))}
                <Route exact path="/" component={HomePage} />
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </ScrollToTop>
        </BrowserRouter>
      </div>
    ) : (
      // case display just a single component if viewing on subdomain
      <div>
        <BrowserRouter>
          <Switch>
            {/* <Route component={this.state.displayPageComponent} /> */}
            <Route
              path="/docs"
              render={() => <this.state.displayPageComponent nonav={true} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }

  // identify the current url subdomain, if it matches one of the designated subdomains then we only want
  // to render that component isolated
  private getDisplayState() {
    const availableSubdomains = ['documentation', 'map']
    const subdomain = window.location.hostname.split('.')[0]
    const showSinglePage = availableSubdomains.indexOf(subdomain) > -1
    const state: IState = {
      singlePageMode: showSinglePage,
      displayPageComponent: showSinglePage
        ? this.getSubdomainComponent(subdomain)
        : null,
    }
    return state
  }

  // once we know we are only rendering a single page, identify the page component to render depending on subdomain
  // *** NOTE - if you want to add more subdomains to render specific components also include in src/config.ts
  // to ensure production site is rendered and not development
  private getSubdomainComponent(subdomain: string) {
    switch (subdomain) {
      case 'documentation':
        return DocsPage
      default:
        return NotFoundPage
    }
  }
}
