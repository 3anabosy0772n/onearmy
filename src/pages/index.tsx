import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { observer, inject } from 'mobx-react';

import Docs from "./Docs/Docs";
import { HomePage } from "./Home/Home";
import { NotFoundPage } from "./NotFound/NotFound";
import ScrollToTop from "./../components/ScrollToTop/ScrollToTop";

export class Routes extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
            <Switch>
              <Route path="/docs" component={Docs} />
              <Route exact path="/" component={HomePage} />
              <Route component={NotFoundPage} />
            </Switch>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}
